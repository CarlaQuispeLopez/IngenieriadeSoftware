from flask_restful import Api, Resource
from user_repository import UserRepository, ExternalUserService

def create_api(app):
    api = Api(app)

    class UserResource(Resource):
        def get(self):
            users = UserRepository.get_all_users()
            return [{
                "id": user.id, 
                "name": user.name,
                "username": user.username, 
                "email": user.email,
                "updateAt": user.updateAt.isoformat() if user.updateAt else None,
                "image": user.image,
                "rol": user.rol
            } for user in users]

        def post(self):
            data = app.request.get_json()
            if not all(key in data for key in ('username', 'email', 'password')):
                return {"message": "Missing required fields"}, 400
            
            new_user = UserRepository.create_user(
                name=data.get('name', ''),
                username=data['username'],
                email=data['email'],
                password=data['password'],
                image=data.get('image'),
                rol=data.get('rol', 'user')
            )
            return {
                "id": new_user.id, 
                "name": new_user.name,
                "username": new_user.username,
                "email": new_user.email,
                "updateAt": new_user.updateAt.isoformat() if new_user.updateAt else None,
                "image": new_user.image,
                "rol": new_user.rol
            }, 201

    class SingleUserResource(Resource):
        def get(self, user_id):
            user = UserRepository.get_user_by_id(user_id)
            if user is None:
                return {"message": "User not found"}, 404
            return {
                "id": user.id, 
                "name": user.name,
                "username": user.username,
                "email": user.email,
                "updateAt": user.updateAt.isoformat() if user.updateAt else None,
                "image": user.image,
                "rol": user.rol
            }

        def put(self, user_id):
            data = app.request.get_json()
            user = UserRepository.update_user(user_id, data)
            if user is None:
                return {"message": "User not found"}, 404
            return {
                "id": user.id, 
                "name": user.name,
                "username": user.username,
                "email": user.email,
                "updateAt": user.updateAt.isoformat() if user.updateAt else None,
                "image": user.image,
                "rol": user.rol
            }

        def delete(self, user_id):
            user = UserRepository.delete_user(user_id)
            if user is None:
                return {"message": "User not found"}, 404
            return {"message": "User deleted successfully"}

    class AuthResource(Resource):
        def post(self):
            data = app.request.get_json()
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                return {"message": "Username and password are required"}, 400
            
            user = UserRepository.authenticate(username, password)
            
            if user:
                return {
                    "id": user.id, 
                    "name": user.name,
                    "username": user.username,
                    "email": user.email,
                    "updateAt": user.updateAt.isoformat() if user.updateAt else None,
                    "image": user.image,
                    "rol": user.rol
                }
            else:
                return {"message": "Invalid username or password"}, 401

    class ExternalUsersResource(Resource):
        def get(self):
            success = ExternalUserService.fetch_and_save_users()
            if success:
                return {"message": "Users loaded successfully from external API"}
            return {"message": "Failed to load users from external API"}, 500

    api.add_resource(UserResource, '/users')
    api.add_resource(SingleUserResource, '/users/<int:user_id>')
    api.add_resource(AuthResource, '/login')
    api.add_resource(ExternalUsersResource, '/load-external-users')

    return api