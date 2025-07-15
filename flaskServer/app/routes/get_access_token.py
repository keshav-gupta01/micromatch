from flask import Blueprint, jsonify, request, redirect
from app.services.get_access_token_service import get_access_token, get_long_live_token

get_access_token_bp = Blueprint('get_access_token_bp', __name__, url_prefix='/server')

@get_access_token_bp.route('/login', methods=['GET', 'POST'])
def get_url():
    auth_url = (
       "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1003793017976278&redirect_uri=https://micromatch.onrender.com/influencer-signin&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights"
    )
    return redirect(auth_url)

@get_access_token_bp.route('/get_access_token', methods=['GET'])
def get_access_token_and_insta_scoped_id():
    code = request.args.get('code')
    response = get_access_token(code)

    if response.status_code == 200:
        data = response.json()
        access_token = data.get('access_token')
        insta_scoped_id = data.get('user_id')

        long_live_token_response = get_long_live_token(access_token)
        if long_live_token_response.status_code == 200:
            long_live_token_data = long_live_token_response.json()
            long_live_token = long_live_token_data.get('access_token')
            return jsonify({'access_token': long_live_token, 'insta_scoped_id': insta_scoped_id})
        else:
            return jsonify({'error': long_live_token_response.status_code})
    else:
        return jsonify({'access_token': None, 'insta_scoped_id': None})