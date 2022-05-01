from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref
from . import db


class Hand(db.Model):
    __tablename__ = 'hands'

    id = Column(Integer, primary_key=True)
    owner_id = Column(UUID, ForeignKey("players.id"))
    owner = relationship("Player", backref=backref("hands", uselist=False))

    def __repr__(self):
        return f'<Hand: owner_id={self.owner_id}>'
