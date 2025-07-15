from flask import Blueprint, jsonify, request
from app.services.provide_campaign_analytics_service import get_analytics

provide_campaign_analytics_bp = Blueprint('provide_campaign_analytics_bp', __name__, url_prefix='/server')

@provide_campaign_analytics_bp.route('/provide_campaign_analytics', methods=['GET', 'POST'])
def provide_campaign_analytics():
    data = request.get_json()

    token = data.get('access_token')
    if not token:
        return jsonify({"views":-1,"reach":-1,"shares":-1,  "error": False})

    analytics = get_analytics(token)
    return jsonify(analytics)
