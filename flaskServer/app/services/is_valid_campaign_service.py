import requests
from datetime import datetime, timedelta
import pytz

def not_completed_time(timestamp):
    # Convert to datetime object in UTC
    story_time_utc = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M:%S%z")
    story_time_utc = story_time_utc.replace(tzinfo=pytz.UTC)

    # Convert to IST
    IST = pytz.timezone('Asia/Kolkata')
    story_time_ist = story_time_utc.astimezone(IST)

    # Current time in IST
    current_time_ist = datetime.now(IST)

    # If dates are different, only take the time difference in hours and minutes
    if story_time_ist.date() != current_time_ist.date():
        story_time_today = current_time_ist.replace(hour=story_time_ist.hour, minute=story_time_ist.minute,
                                                    second=story_time_ist.second, microsecond=0)
        if story_time_today > current_time_ist:
            story_time_today -= timedelta(days=1)
        time_diff = current_time_ist - story_time_today
    else:
        time_diff = current_time_ist - story_time_ist

    # Calculate difference in hours and minutes
    hours = time_diff.total_seconds() // 3600
    # minutes = (time_diff.total_seconds() % 3600) // 60

    return hours >= 1


def get_valid_campaign(token, media):

    """
    for media object we have {"media_count", "media_list": ["IMAGE", "VIDEO"]}
    """

    """
    If everything is correct about the campaign then we will return media_url and and case value as false
    else will we will return media_url and case value as true where:
    case 1. media does not match
    case 2. media count does not match
    case 3. media 24 hrs duration is not completed
    """



    user_story_data = []
    story_response = requests.get("https://graph.instagram.com/v22.0/me/stories", params={"access_token": token})

    if story_response.status_code != 200:
        return {"error": True, "description": "story media not received", "user_story_data": []}

    story_response_data = story_response.json().get("data", [])

    if len(story_response_data) != media.get("media_count"):
        return {"error": True, "description": "media count does not match", "user_story_data": []}

    media_index = 0
    for story_id in story_response_data:
        story_url = f"https://graph.instagram.com/v22.0/{story_id.get('id')}"
        parameters = {
            "fields": "media_type,timestamp,media_url",
            "access_token": token
        }

        story_insights_response = requests.get(story_url, params=parameters)
        m_type = story_insights_response.json().get("media_type")

        if not (m_type == media["media_list"][media_index]):
            return {"error": True, "description": "media type does not match", "user_story_data": []}


        timestamp = story_insights_response.json().get("timestamp", [])
        if not_completed_time(timestamp):
            return {"error": True, "description": "Time period of story not completed", "user_story_data": []}

        m_url = story_insights_response.json().get("media_url")
        user_story_data.append(m_url)
        media_index += 1


    return {"error": False, "description": "Data got successfully", "user_story_data": user_story_data}

