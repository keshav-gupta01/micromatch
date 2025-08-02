import math
import pandas as pd
import requests

# Load dataset
pincode_df = pd.read_csv("app/pincode_new.csv")

# Get latitude and longitude from pincode
def get_lat_lon(pincode):
    row = pincode_df[pincode_df['Pincode'] == pincode]
    if not row.empty:
        lat = float(row.iloc[0]['Latitude'])
        lon = float(row.iloc[0]['Longitude'])
        return lat, lon
    return None, None

# Haversine formula to calculate distance
def haversine(lat1, lon1, lat2, lon2):
    if any(coord is None for coord in [lat1, lon1, lat2, lon2]):
        return float('inf')  # Return a large number for invalid coordinates
    
    try:
        R = 6371  # Earth radius in km
        phi1 = math.radians(float(lat1))
        phi2 = math.radians(float(lat2))
        dphi = math.radians(float(lat2) - float(lat1))
        dlambda = math.radians(float(lon2) - float(lon1))
        a = math.sin(dphi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c
    except (TypeError, ValueError):
        return float('inf')

# Fetch followers count using access token
def get_followers_count(access_token):
    url = "https://graph.instagram.com/v22.0/me"
    params = {"fields": "followers_count", "access_token": access_token}

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json().get("followers_count", 0)
    else:
        return 0

# Main function to rank influencers
def get_rank_influencers(campaign_data, influencers):
    weighted_map = []

    campaign_pincode = campaign_data.get('pincode')
    use_location = campaign_pincode is not None
    camp_lat, camp_long = get_lat_lon(campaign_pincode) if use_location else (None, None)

    # Set weights based on campaign type
    camp_type = campaign_data.get('camp_type')
    location_weight, follower_weight = 0.5, 0.5
    if camp_type == 0:
        location_weight, follower_weight = 0.7, 0.3
    elif camp_type == 2:
        location_weight, follower_weight = 0.3, 0.7

    for influencer in influencers:
        inf_id = influencer.get('id')
        inf_pin = influencer.get('pincode')
        inf_access_token = influencer.get('access_token')
        inf_followers = get_followers_count(inf_access_token)

        if use_location:
            inf_lat, inf_long = get_lat_lon(inf_pin)
            
            # Check if we have valid coordinates for both campaign and influencer
            if (camp_lat is not None and camp_long is not None and 
                inf_lat is not None and inf_long is not None):
                dist = haversine(camp_lat, camp_long, inf_lat, inf_long)
                proximity_score = 1 / (1 + dist)
                score = proximity_score * location_weight + inf_followers * follower_weight
            else:
                # If coordinates are missing, fall back to followers-only scoring
                print(f"Warning: Missing coordinates for campaign pincode {campaign_pincode} or influencer pincode {inf_pin}")
                score = inf_followers * follower_weight
        else:
            score = inf_followers  # Only followers count if no pincode


        weighted_map.append((score, inf_id))

    weighted_map.sort(key=lambda x: x[0], reverse=True)
    ranked_influencers = [inf_id for _, inf_id in weighted_map]

    return {"ranked_influencers": ranked_influencers}
