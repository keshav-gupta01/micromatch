import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report
import joblib
import requests
from datetime import datetime
import re
import statistics
import logging
from collections import Counter
import json


class InstagramFakeFollowerDetectorML:
    def __init__(self, access_token=None, model_path=None):
        """
        Initialize the ML-based Instagram Fake Follower Detector

        Args:
            access_token (str): Instagram API access token
            model_path (str): Path to a pre-trained model file
        """
        self.logger = None
        self.access_token = access_token
        self.model = None
        self.setup_logging()

        # Load pre-trained model if provided
        if model_path:
            try:
                self.model = joblib.load(model_path)
                self.logger.info(f"Model loaded from {model_path}")
            except Exception as e:
                self.logger.error(f"Failed to load model: {e}")

    def setup_logging(self):
        """Configure logging for tracking API requests and analysis steps"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[logging.StreamHandler()]
        )
        self.logger = logging.getLogger("InstagramAuditML")

    def get_user_info(self):
        """Retrieve detailed user information"""
        self.logger.info("Fetching user information...")
        user_info_url = "https://graph.instagram.com/v22.0/me"
        user_params = {
            "fields": "id,username,account_type,followers_count,media_count,biography",
            "access_token": self.access_token
        }

        try:
            response = requests.get(user_info_url, params=user_params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching user info: {e}")
            return {}

    def get_media_data(self, user_id, limit=25):
        """Retrieve media data for analysis"""
        self.logger.info(f"Fetching last {limit} posts...")
        media_url = f"https://graph.instagram.com/{user_id}/media"
        media_params = {
            "fields": "id,caption,like_count,comments_count,timestamp,media_type,media_url,children{media_url,media_type}",
            "limit": limit,
            "access_token": self.access_token
        }

        try:
            response = requests.get(media_url, params=media_params)
            response.raise_for_status()
            return response.json().get("data", [])
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching media data: {e}")
            return []

    def get_media_comments(self, media_id, limit=50):
        """Retrieve comments for a specific post"""
        comments_url = f"https://graph.instagram.com/{media_id}/comments"
        comments_params = {
            "fields": "text,timestamp,username,like_count",
            "limit": limit,
            "access_token": self.access_token
        }

        try:
            response = requests.get(comments_url, params=comments_params)
            response.raise_for_status()
            return response.json().get("data", [])
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error fetching comments for media {media_id}: {e}")
            return []

    def extract_features(self, user_info, media_data):
        """
        Extract ML features from Instagram account data

        Args:
            user_info (dict): User profile information
            media_data (list): List of media posts

        Returns:
            dict: Dictionary of features
        """
        features = {}

        # Account features
        features['followers_count'] = user_info.get('followers_count', 0)
        features['media_count'] = user_info.get('media_count', 0)

        # Followers-to-media ratio
        if features['media_count'] > 0:
            features['followers_per_post'] = features['followers_count'] / features['media_count']
        else:
            features['followers_per_post'] = 0

        # Bio features
        bio = user_info.get('biography', '')
        features['bio_length'] = len(bio)
        features['bio_has_url'] = 1 if re.search(r'https?://', bio.lower()) else 0
        features['bio_has_spam_keywords'] = 0

        spam_patterns = [
            r"(buy followers|get likes|increase engagement)",
            r"(make money online|passive income|earn from home)",
            r"(follow to gain|follow for follow|f4f|l4l)",
            r"(click link in bio|check link in bio)",
        ]

        if any(re.search(pattern, bio.lower()) for pattern in spam_patterns):
            features['bio_has_spam_keywords'] = 1

        # Media features
        if not media_data:
            # Default values if no media data is available
            for feature in ['avg_likes', 'avg_comments', 'engagement_rate', 'likes_comments_ratio',
                            'posting_consistency', 'caption_length_avg', 'hashtags_avg',
                            'percent_generic_comments', 'comment_like_ratio', 'night_posting_ratio']:
                features[feature] = 0
            return features

        # Engagement metrics
        total_likes = sum(post.get('like_count', 0) for post in media_data)
        total_comments = sum(post.get('comments_count', 0) for post in media_data)

        features['avg_likes'] = total_likes / len(media_data) if media_data else 0
        features['avg_comments'] = total_comments / len(media_data) if media_data else 0

        # Engagement rate
        if features['followers_count'] > 0 and media_data:
            features['engagement_rate'] = (total_likes + total_comments) / (
                        features['followers_count'] * len(media_data)) * 100
        else:
            features['engagement_rate'] = 0

        # Likes to comments ratio
        features['likes_comments_ratio'] = total_likes / total_comments if total_comments > 0 else 100

        # Posting pattern analysis
        post_dates = [post.get('timestamp') for post in media_data if post.get('timestamp')]

        if len(post_dates) >= 3:
            # Convert string dates to datetime objects and sort
            dates = sorted([datetime.strptime(p[:19], "%Y-%m-%dT%H:%M:%S") for p in post_dates])

            # Calculate time gaps between posts in hours
            gaps = [(dates[i] - dates[i - 1]).total_seconds() / 3600 for i in range(1, len(dates))]

            # Standard deviation of posting intervals (higher = inconsistent)
            if len(gaps) > 1:
                features['posting_consistency'] = statistics.stdev(gaps) / (sum(gaps) / len(gaps)) if sum(
                    gaps) > 0 else 0
            else:
                features['posting_consistency'] = 0

            # Percentage of night posting (12am-5am)
            posting_hours = [d.hour for d in dates]
            night_posts = sum(1 for hour in posting_hours if 0 <= hour < 5)
            features['night_posting_ratio'] = night_posts / len(posting_hours) if posting_hours else 0
        else:
            features['posting_consistency'] = 0
            features['night_posting_ratio'] = 0

        # Content analysis
        captions = [post.get('caption', '') for post in media_data if post.get('caption')]
        features['caption_length_avg'] = sum(len(c) for c in captions) / len(captions) if captions else 0

        # Hashtag analysis
        hashtag_counts = [len(re.findall(r'#\w+', caption)) for caption in captions]
        features['hashtags_avg'] = sum(hashtag_counts) / len(hashtag_counts) if hashtag_counts else 0

        # Comment quality analysis
        generic_comment_count = 0
        total_analyzed_comments = 0

        for post in media_data[:5]:  # Analyze top 5 posts
            media_id = post.get('id')
            comments = self.get_media_comments(media_id, limit=20)
            post_likes = post.get('like_count', 0)

            for comment in comments:
                total_analyzed_comments += 1
                text = comment.get('text', '').lower()

                # Check for generic comments
                generic_patterns = [
                    r"^(nice|cool|awesome|wow|amazing|beautiful|love this|great|perfect)[\s!.]*$",
                    r"^(❤️|🔥|👍|😍){1,5}$",
                    r"^(follow me|check my profile|check my page)",
                ]

                if any(re.search(pattern, text) for pattern in generic_patterns):
                    generic_comment_count += 1

        features[
            'percent_generic_comments'] = generic_comment_count / total_analyzed_comments if total_analyzed_comments > 0 else 0

        # Additional ratios and distributions
        features['comment_like_ratio'] = features['avg_comments'] / features['avg_likes'] if features[
                                                                                                 'avg_likes'] > 0 else 0

        # Media type diversity
        media_types = [post.get('media_type', '') for post in media_data if post.get('media_type')]
        type_counter = Counter(media_types)
        features['media_type_diversity'] = len(type_counter) / len(media_types) if media_types else 0

        return features

    def train_model(self, training_data_path, save_model_path=None):
        """
        Train the ML model using labeled data

        Args:
            training_data_path (str): Path to CSV file with labeled data
            save_model_path (str): Path to save the trained model

        Returns:
            object: Trained model
        """
        try:
            # Load training data
            self.logger.info(f"Loading training data from {training_data_path}")
            data = pd.read_csv(training_data_path)

            # Split features and target
            X = data.drop('is_fake', axis=1)  # Features (all columns except is_fake)
            y = data['is_fake']  # Target variable

            # Split into training and testing sets
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

            # Create a pipeline with preprocessing and model
            pipeline = Pipeline([
                ('scaler', StandardScaler()),
                ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
            ])

            # Train the model
            self.logger.info("Training model...")
            pipeline.fit(X_train, y_train)

            # Evaluate the model
            y_pred = pipeline.predict(X_test)
            self.logger.info("\nModel Evaluation:")
            self.logger.info(classification_report(y_test, y_pred))

            # Save the model if requested
            if save_model_path:
                joblib.dump(pipeline, save_model_path)
                self.logger.info(f"Model saved to {save_model_path}")

            self.model = pipeline
            return pipeline

        except Exception as e:
            self.logger.error(f"Error training model: {e}")
            return None

    def analyze(self, features=None):
        """
        Analyze an Instagram account using ML model

        Args:
            features (dict, optional): Pre-extracted features. If None, will extract from API

        Returns:
            dict: Analysis results
        """

        if not self.model:
            return {"error": "No model loaded. Please train or load a model first."}

        try:
            # Extract features from API if not provided
            if not features:
                if not self.access_token:
                    return {"error": "No access token provided for API access"}

                # Get user info and media data
                user_info = self.get_user_info()
                if not user_info or "error" in user_info:
                    return {"error": "Failed to retrieve user information"}

                user_id = user_info.get("id")
                media_data = self.get_media_data(user_id, limit=25)

                # Extract features
                features = self.extract_features(user_info, media_data)

            # Convert features to DataFrame for prediction
            features_df = pd.DataFrame([features])

            # Make prediction
            prediction_proba = self.model.predict_proba(features_df)[0]
            fake_probability = prediction_proba[1]  # Probability of being fake
            prediction = self.model.predict(features_df)[0]  # Binary prediction

            # Get feature importances
            importances = None
            if hasattr(self.model['classifier'], 'feature_importances_'):
                importances = self.model['classifier'].feature_importances_
                feature_importance = dict(zip(features_df.columns, importances))
                # Sort by importance
                feature_importance = {k: v for k, v in sorted(feature_importance.items(),
                                                              key=lambda item: item[1], reverse=True)}

            # Determine indicators for the decision
            top_indicators = {}
            if importances is not None:
                # Get top 5 most important features
                top_features = list(feature_importance.keys())[:5]
                for feature in top_features:
                    feature_value = features[feature] if feature in features else features_df[feature].iloc[0]
                    top_indicators[feature] = feature_value

            # Compile detailed result
            username = user_info.get("username") if 'user_info' in locals() else "Unknown"

            result = {
                "username": username,
                "is_fake_account": bool(prediction),
                "fake_follower_probability": f"{fake_probability * 100:.2f}%",
                "confidence_score": fake_probability * 100,
                "top_indicators": top_indicators,
                "recommendation": not bool(prediction),
                "analyzed_at": datetime.now().isoformat()
            }

            # Add detailed metrics if available
            if 'user_info' in locals() and 'media_data' in locals():
                result.update({
                    "account_type": user_info.get("account_type", "UNKNOWN"),
                    "followers": user_info.get("followers_count", 0),
                    "media_count": user_info.get("media_count", 0),
                    "posts_analyzed": len(media_data),
                    "engagement_metrics": {
                        "avg_likes_per_post": features['avg_likes'],
                        "avg_comments_per_post": features['avg_comments'],
                        "engagement_rate": features['engagement_rate']
                    },
                })

            return result

        except Exception as e:
            self.logger.error(f"Analysis failed: {str(e)}")
            return {"error": f"Analysis failed: {str(e)}"}

    def generate_training_data(self, labeled_accounts_file, output_file):
        """
        Generate training data from labeled accounts

        Args:
            labeled_accounts_file (str): Path to JSON file with labeled accounts
                                        (each with access_token and is_fake label)
            output_file (str): Path to save generated CSV training data

        Returns:
            bool: Success status
        """
        try:
            # Load labeled accounts
            with open(labeled_accounts_file, 'r') as f:
                accounts = json.load(f)

            features_list = []
            labels = []

            # Process each account
            for account in accounts:
                # Store original access token
                original_token = self.access_token

                # Set account access token
                self.access_token = account.get('access_token')

                # Get account data
                user_info = self.get_user_info()
                if not user_info or "error" in user_info:
                    self.logger.warning(f"Skipping account: Failed to retrieve user info")
                    continue

                user_id = user_info.get("id")
                media_data = self.get_media_data(user_id, limit=25)

                # Extract features
                features = self.extract_features(user_info, media_data)

                # Add to dataset
                features_list.append(features)
                labels.append(account.get('is_fake', False))

                # Restore original token
                self.access_token = original_token

            # Create DataFrame
            df = pd.DataFrame(features_list)
            df['is_fake'] = labels

            # Save to CSV
            df.to_csv(output_file, index=False)
            self.logger.info(f"Training data generated and saved to {output_file}")

            return True

        except Exception as e:
            self.logger.error(f"Error generating training data: {e}")
            return False


def check_fake_influencer(access_token, model_path=None):
    """
    Main function to analyze an Instagram account using ML model

    Args:
        access_token (str): Instagram API access token
        model_path (str, optional): Path to pre-trained model

    Returns:
        dict: Analysis results
    """
    try:
        detector = InstagramFakeFollowerDetectorML(access_token, model_path)

        # If no model provided or loading failed, use default model
        if detector.model is None and model_path is None:
            detector.logger.warning("No model provided, falling back to default dummy analysis")
            user_info = detector.get_user_info()
            if not user_info or "error" in user_info:
                return {"is_fake": True, "description": "Failed to fetch the user details."}

            user_id = user_info.get("id")
            media_data = detector.get_media_data(user_id, limit=25)

            # Extract features for future model training
            features = detector.extract_features(user_info, media_data)

            # Basic heuristic analysis as fallback
            red_flags = 0

            if features['followers_per_post'] > 1000 and features['followers_count'] > 5000:
                red_flags += 1

            if features['engagement_rate'] < 0.5 and features['followers_count'] > 1000:
                red_flags += 2

            if features['percent_generic_comments'] > 0.7:
                red_flags += 1

            if features['night_posting_ratio'] > 0.4:
                red_flags += 1

            is_fake = red_flags >= 3

            return {
                "is_fake": is_fake,
                "description": "Influencer is likely fake." if is_fake else "Influencer is likely genuine.",
                "confidence": f"{min(red_flags * 25, 95)}%",
                "note": "Analysis performed using heuristics (no ML model available)"
            }

        # Use ML model for analysis
        result = detector.analyze()
        if "error" in result:
            return {"is_fake": True, "description": result["error"]}

        return {
            "is_fake": result["is_fake_account"],
            "description": "Influencer is likely fake." if result[
                "is_fake_account"] else "Influencer is likely genuine.",
            "confidence": result["fake_follower_probability"],
            "details": result
        }

    except Exception as e:
        logging.error(f"Analysis failed: {str(e)}")
        return {"is_fake": True, "description": f"Analysis failed: {str(e)}"}


# For model training:
# detector = InstagramFakeFollowerDetectorML()
# detector.generate_training_data("labeled_accounts.json", "training_data.csv")
# detector.train_model("training_data.csv", "instagram_fake_detector.joblib")

# For analysis:
# result = check_fake_influencer_ml("ACCESS_TOKEN", "instagram_fake_detector.joblib")
# print(json.dumps(result, indent=2))