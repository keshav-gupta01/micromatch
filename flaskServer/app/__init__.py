from flask import Flask
from dotenv import load_dotenv
from app.routes import register_routes
from app.config import Config

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    register_routes(app)

    return app
