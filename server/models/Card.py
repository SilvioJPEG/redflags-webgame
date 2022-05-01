from sqlalchemy import Column, Integer, String, ForeignKey
from . import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = Column(Integer, primary_key=True)
    type = Column(String(4), nullable=False) # should be either 'flag' or 'perk'
    description = Column(String(300), nullable=False)

    def __repr__(self):
        return f'<Card id={self.id} type={self.id} description={self.description}>'
