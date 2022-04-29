from flask import Blueprint
from sqlalchemy import select


def getUserData(userId: int):
    ...


def update(userId):
    ...


def deleteUser(userId):
    ...


playerController = Blueprint('player_bp', __name__)
playerController.route('/<int:user_id>', methods=['GET'])(getUserData)
playerController.route('/<int:user_id>/edit', methods=['POST'])(update)
playerController.route('/<int:user_id>', methods=['DELETE'])(deleteUser)
