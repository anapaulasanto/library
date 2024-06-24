from flask_login import (LoginManager)
from bson.objectid import ObjectId
from app import mongo
from app.models.auth_models import User

@LoginManager.user_loader
def load_user(user_id):
    user_data = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if user_data:
        return User(
            str(user_data['_id']),
            user_data['username'],
            user_data['password']
        )
    return None