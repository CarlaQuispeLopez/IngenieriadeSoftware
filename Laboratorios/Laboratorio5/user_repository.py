from user import db, User
import requests

class UserRepository:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)
    
    @staticmethod
    def get_user_by_username(username):
        return User.query.filter_by(username=username).first()

    @staticmethod
    def authenticate(username, password):
        user = UserRepository.get_user_by_username(username)
        if user and user.passwordValid(password):
            return user
        return None

    @staticmethod
    def create_user(name, username, email, password, image=None, rol='user'):
        new_user = User(
            name=name,
            username=username,
            email=email,
            password=password,
            image=image,
            rol=rol
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user_id, data):
        user = User.query.get(user_id)
        if user:
            user.updateProfile(data)
            if 'password' in data:
                user.password = data['password']
            db.session.commit()
        return user

    @staticmethod
    def delete_user(user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
        return user

class ExternalUserService:
    API_URL = "https://jsonplaceholder.typicode.com/users"

    @staticmethod
    def fetch_and_save_users():
        response = requests.get(ExternalUserService.API_URL)
        if response.status_code == 200:
            users_data = response.json()
            for user_data in users_data:
                existing_user = User.query.filter_by(email=user_data['email']).first()
                if not existing_user:
                    user = User(
                        name=user_data['name'],
                        username=user_data['username'],
                        email=user_data['email'],
                        password=user_data['email'],  # Usamos email como contraseña
                        phone=user_data['phone'],
                        website=user_data['website'],
                        address_street=user_data['address']['street'],
                        address_suite=user_data['address']['suite'],
                        address_city=user_data['address']['city'],
                        address_zipcode=user_data['address']['zipcode'],
                        company_name=user_data['company']['name'],
                        company_catchPhrase=user_data['company']['catchPhrase'],
                        company_bs=user_data['company']['bs'],
                        rol='user'
                    )
                    db.session.add(user)
            db.session.commit()
            return True
        return False