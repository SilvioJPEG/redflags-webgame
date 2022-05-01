from ast import For
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, ForeignKey
from . import db


class PickedCards(db.Model):
    __tablename__ = 'picked_cards'

    id = Column(Integer, primary_key=True)

    owner_id = Column(UUID, ForeignKey("players.id"))
    owner = relationship("Player", back_populates="picked_cards")

    first_perk_id = Column(Integer, ForeignKey("cards.id"))
    second_perk_id = Column(Integer, ForeignKey("cards.id"))
    flag_id = Column(Integer,  ForeignKey("cards.id"))

    def __repr__(self):
        return f'<Picked Cards id={self.id}>'
