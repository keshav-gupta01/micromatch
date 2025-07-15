from .is_fake_influencer import is_fake_influencer_bp
from .is_valid_campaign import is_valid_campaign_bp
from .get_access_token import get_access_token_bp
from .provide_campaign_analytics import provide_campaign_analytics_bp
from .recommend_influencers import recommend_influencers_bp

def register_routes(app):
    app.register_blueprint(is_fake_influencer_bp)
    app.register_blueprint(is_valid_campaign_bp)
    app.register_blueprint(get_access_token_bp)
    app.register_blueprint(provide_campaign_analytics_bp)
    app.register_blueprint(recommend_influencers_bp)