from flask import Flask
from flask_migrate import Migrate
from models import db
from controllers.PlayerController import playerController
from controllers.GameController import gameController


app = Flask(__name__)
app.config.from_object("config")

db.init_app(app)
Migrate(app, db)

app.register_blueprint(playerController, url_prefix="/player")
app.register_blueprint(gameController, url_prefix="/game")


if __name__ == '__main__':
    app.run(debug=True)
