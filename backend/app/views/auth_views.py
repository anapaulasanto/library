from app import mongo
from flask import Flask, request, Blueprint
from flask_login import (login_user, login_required, logout_user, current_user)
from app import bcrypt
auth_bp = Blueprint('auth', __name__)
from app.models.auth_models import User

#Rota de registro
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return {"erro": "Usuario e senha são obrigatorios"}, 400
    
    elif mongo.db.users.find_one({'username': username}):
        return ({'message': 'Username already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_data = {
        "username": username,
        "password": hashed_password
    }

    mongo.db.users.insert_one(user_data)
    return {"msg": "Registrado com sucesso!"}, 201


#Rota de login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return {"erro": "Usuario e senha são obrigatorios"}, 400
    
    user_data = mongo.db.users.find_one({'username': username})
    if user_data and bcrypt.check_password_hash(user_data['password'], password):
        user = User(
                str(user_data['_id']),
                user_data['username'],
                user_data['password']
            )
        login_user(user)
        return {"msg": "Logado com sucesso"}, 200
    else:
        return {"erro": "Usuario inválido"}, 401
    
    
@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {"msg": "Logout com sucesso"}, 200


@auth_bp.route('/protected', methods=['GET'])
@login_required
def protected():
    return {"msg": f"Logado como: {current_user.username}"}, 200