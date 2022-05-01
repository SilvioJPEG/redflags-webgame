from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from . import db


association_table = Table('cards_in_hand', db.Model.metadata,
                          Column('card_id', Integer, ForeignKey('cards.id'), primary_key=True),
                          Column('hand_id', Integer, ForeignKey('hands.id'), primary_key=True)
                          )


class Hand(db.Model):
    __tablename__ = 'hands'

    id = Column(Integer, primary_key=True)
    owner_id = Column(UUID, ForeignKey("players.id"))
    owner = relationship("Player", backref=backref("hand", uselist=False))

    cards = relationship(
        "Card", secondary=association_table, back_populates="hands")

    def __repr__(self):
        return f'<Hand: owner_id={self.owner_id}>'
