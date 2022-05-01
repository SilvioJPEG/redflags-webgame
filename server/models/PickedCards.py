from ast import For
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, ForeignKey
from . import db


class PickedCards(db.Model):
    __tablename__ = 'picked_cards'

    id = Column(Integer, primary_key=True)
    owner = Column(UUID, ForeignKey("players.id"))

    first_perk_id = Column(Integer, ForeignKey("cards.id"))
    first_perk = relationship(
        "Card", backref=backref("picked_cards", uselist=False))

    second_perk_id = Column(Integer, ForeignKey("cards.id"))
    second_perk = relationship(
        "Card", backref=backref("picked_cards", uselist=False))

    flag_id = Column(Integer,  ForeignKey("cards.id"))
    flag = relationship("Card", backref=backref(
        "picked_cards", uselist=False))

    def __repr__(self):
        return f'<Picked Cards id={self.id}>'
