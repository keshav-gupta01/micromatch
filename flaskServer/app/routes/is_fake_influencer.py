import requests
from flask import Blueprint, request, jsonify
from app.services.is_fake_influencer_service import check_fake_influencer

is_fake_influencer_bp = Blueprint("is_fake_influencer_bp", __name__, url_prefix="/server")

@is_fake_influencer_bp.route("/is_fake_influencer", methods=["GET"])
def is_fake_influencer():
    response = request.get_json()
    if not response:
        return jsonify({"is_fake": True, "description": "profile response not received."})

    access_token = response.get("access_token")

    # First check if user has at least 3000 followers
    user_info_url = "https://graph.instagram.com/v22.0/me"
    user_params = {
        "fields": "followers_count",
        "access_token": access_token
    }

    response = requests.get(user_info_url, params=user_params)

    if response.status_code == 200 and response.json().get('followers_count') < 3000:
        return jsonify({"is_fake": True, 'description': "Less than 3000 followers."})

    data = check_fake_influencer(access_token)
    return jsonify(data) # Final answer will be in data["report"]["recommendation"]




