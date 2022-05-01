from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from . import db
from .Hand import association_table

class Card(db.Model):
    __tablename__ = 'cards'

    id = Column(Integer, primary_key=True)
    # should be either 'flag' or 'perk'
    type = Column(String(4), nullable=False)
    description = Column(String(300), nullable=False)

    hands = relationship(
        "Hand", secondary=association_table, back_populates="cards")
    first_perks = relationship(
        'PickedCards', foreign_keys='PickedCards.first_perk_id', backref="first_perk")
    second_perks = relationship(
        'PickedCards', foreign_keys='PickedCards.second_perk_id', backref="second_perk")
    flags = relationship(
        'PickedCards', foreign_keys='PickedCards.flag_id', backref="flag")

    def __repr__(self):
        return f'<Card id={self.id} type={self.id} description={self.description}>'
