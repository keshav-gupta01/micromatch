import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

class Config:
    APP_ID = os.getenv('APP_ID', "xyz")
    SECRET_KEY = os.getenv("APP_SECRET_KEY", "123456789")
    DEBUG = os.getenv("DEBUG", "False") == "True"
