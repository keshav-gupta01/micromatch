from flask import Blueprint, request, jsonify
from app.services.recommend_influencers_service import get_rank_influencers
recommend_influencers_bp = Blueprint('recommend_influencers_bp', __name__, url_prefix='/server')

@recommend_influencers_bp.route('/recommend_influencers', methods=['GET'])
def recommend_influencers():
    campaign_and_influencers = request.get_json()

    campaign_data = campaign_and_influencers.get('campaign_data')
    influencers = campaign_and_influencers.get('influencers')

    ranked_influencers = get_rank_influencers(campaign_data, influencers)

    return jsonify(ranked_influencers)
