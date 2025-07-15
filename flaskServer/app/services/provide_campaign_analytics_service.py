import requests

def get_analytics(token):

    story_response = requests.get("https://graph.instagram.com/v22.0/me/stories", params={"access_token": token})

    if story_response.status_code != 200:
        return {"views": -1, "reach": -1, "shares": -1, "error": True}

    views = 0 # To store total views on all stories of users
    reach = 0 # To store total reach on all stories of users
    shares = 0 # To store total shares on all stories of users

    story_metrics = {
        "metric": "views,reach,shares",
        "access_token": token
    }
    story_response_data = story_response.json()
    for story in story_response_data['data']:
        story_id = story['id']
        insights_response = requests.get(f"https://graph.instagram.com/v22.0/{story_id}/insights", params=story_metrics).json()
        insights_metrics = insights_response.get("data", [])

        views += insights_metrics[0]['values'][0]['value']
        reach += insights_metrics[1]['values'][0]['value']
        shares += insights_metrics[2]['values'][0]['value']

    return {"views":views,"reach":reach,"shares":shares,  "error": False} # First value is Instagram username, second in views, third is reach and last is shares




