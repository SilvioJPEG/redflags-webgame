from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from . import db


class Game(db.Model):
    __tablename__ = 'game_rooms'

    id = Column(Integer, primary_key=True)
    access_code = Column(String(7), nullable=False)
    game_status = Column(String(120), nullable=False)
    host_id = Column(UUID, ForeignKey('players.id'), nullable=False)
    host = relationship("Player", backref=backref(
        "game_rooms", uselist=False))

    current_turn_id = Column(UUID, ForeignKey('players.id'))
    current_turn = relationship("Player", backref=backref(
        "game_rooms", uselist=False))
    judge_id = Column(UUID, ForeignKey('players.id'))
    judge = relationship("Player", backref=backref(
        "game_rooms", uselist=False))

    def __repr__(self):
        return f'<Game room: id={self.id}>'
