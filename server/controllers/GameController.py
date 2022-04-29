import random
import string
from flask import Blueprint
from models.index import db
from models.Game import Game
from models.Player import Player


def update(userId):
    ...


def delete(userId):
    ...


def joinRoom(room_code: int, username: string):
    game = db.session.query(Game, Player).join(
        Player, Game.host == Player.id).where(Game.access_code == room_code).first()
    if (game is None):
        return None
    else:
        player = Player(username=username, role="waiting")
        # TODO: add player to the room


def create(username: string):
    try:
        # creating host instance
        host = Player(username=username, role="waiting", host=True)
        db.session.add(host)
        # creating game room instance
        random_ac = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))
        game = Game(access_code=random_ac, game_status='ready', host=host.id)
        db.session.add(game)
        db.session.commit()
        return game
    except Exception as exc:
        print(exc)


def getRoomData(room_code: int, user_id: int):
    game = db.session.query(Game, Player).join(
        Player, Game.host == Player.id, Game.current_turn == Player.id, Game.judge == Player.id).first()
    print(game)


gameController = Blueprint('game_bp', __name__)
gameController.route('/', methods=['GET'])(getRoomData)
gameController.route('/game/join/<int:room_code>', methods=['POST'])(joinRoom)
gameController.route('game/<int:room_code>', methods=['POST'])(getRoomData)
gameController.route('/<int:userId>/edit', methods=['POST'])(update)
gameController.route('/<int:userId>', methods=['DELETE'])(delete)
