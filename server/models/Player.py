from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, ForeignKey
from . import db


class Player(db.Model):
    __tablename__ = 'players'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(200), nullable=False)

    game_id = Column(Integer, ForeignKey('game_rooms.id'))
    game = relationship("Game", back_populates="players")

    picked_cards = relationship(
        "PickedCards", back_populates="owner", uselist=False)


    def __repr__(self):
        return f"<Player {self.id}>"


