from flask import Blueprint
from sqlalchemy import select
from models import db


def getUserData(userId: int):
    player = db.session.query.get(userId)
    return player


def update(userId):
    ...


def deleteUser(userId):
    ...


playerController = Blueprint('player_bp', __name__)
playerController.route('/<int:user_id>', methods=['GET'])(getUserData)
playerController.route('/<int:user_id>/edit', methods=['POST'])(update)
playerController.route('/<int:user_id>', methods=['DELETE'])(deleteUser)
