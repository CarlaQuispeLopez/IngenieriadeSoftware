from flask import Flask
from user import db
from user_controller import create_api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

api = create_api(app)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)