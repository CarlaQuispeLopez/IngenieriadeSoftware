from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    website = db.Column(db.String(100))
    address_street = db.Column(db.String(100))
    address_suite = db.Column(db.String(100))
    address_city = db.Column(db.String(100))
    address_zipcode = db.Column(db.String(20))
    company_name = db.Column(db.String(100))
    company_catchPhrase = db.Column(db.String(200))
    company_bs = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updateAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    image = db.Column(db.String(200), nullable=True)
    rol = db.Column(db.String(50), default='user')

    def updateProfile(self, data):
        if 'name' in data:
            self.name = data['name']
        if 'email' in data:
            self.email = data['email']
        if 'image' in data:
            self.image = data['image']
        if 'rol' in data:
            self.rol = data['rol']
        self.updateAt = datetime.utcnow()
        return self

    def passwordValid(self, password):
        return self.password == password