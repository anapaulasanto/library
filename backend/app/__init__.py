from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_login import LoginManager
from flask_bcrypt import Bcrypt

mongo = PyMongo()
login_manager = LoginManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    mongo.init_app(app)
    CORS(app, resources={r"/*": {"origins": "https://library-hazel-nine.vercel.app"}})
    login_manager.init_app(app)
    bcrypt.init_app(app)

    from app.views.book_views import book_bp
    app.register_blueprint(book_bp)

    from app.views.auth_views import auth_bp
    app.register_blueprint(auth_bp)

    return app