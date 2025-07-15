import requests
from flask import current_app, jsonify

def get_access_token(code):
    url = "https://api.instagram.com/oauth/access_token"
    payload = {
         "client_id": current_app.config.get('APP_ID'),
         "client_secret": current_app.config.get('SECRET_KEY'),
         "grant_type": "authorization_code",
         "redirect_uri": "https://micromatch.onrender.com/influencer-signin",
         "code": code
     }

    response = requests.post(url, data=payload)

    return response

def get_long_live_token(access_token):
    url = "https://graph.instagram.com/access_token"
    params = {
        "grant_type": "ig_exchange_token",
        "client_secret": current_app.config.get('SECRET_KEY'),
        "access_token": access_token
    }
    response = requests.get(url, params=params)

    if response.status_code == 200:
        return response
    else:
        return jsonify({'error': 'Failed to exchange token', 'details': response.json()}), response.status_code
