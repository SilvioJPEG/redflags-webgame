from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref
from . import db


class Game(db.Model):
    __tablename__ = 'game_rooms'

    id = Column(Integer, primary_key=True)
    access_code = Column(String(7), nullable=False)
    game_status = Column(String(120), nullable=False)

    players = relationship('Player', back_populates='game')

    def __repr__(self):
        return f'<Game room: id={self.id}>'
