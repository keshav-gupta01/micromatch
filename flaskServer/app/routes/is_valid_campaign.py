from flask import Blueprint, jsonify, request
from app.services.is_valid_campaign_service import get_valid_campaign

is_valid_campaign_bp = Blueprint('is_valid_campaign_bp', __name__, url_prefix='/server')

@is_valid_campaign_bp.route('/is_valid_campaign', methods=['GET','POST'])
def is_valid_campaign():
    tokens_and_media = request.get_json()

    if not tokens_and_media or "access_token" not in tokens_and_media or "media" not in tokens_and_media:
        return jsonify({"error": "token_and_media not received"}), 400

    token = tokens_and_media["access_token"]
    media = tokens_and_media["media"]

    result = get_valid_campaign(token, media)
    return jsonify(result)






