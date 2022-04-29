from sqlalchemy import Column, Integer, String, ForeignKey
from models.index import db


class Game(db.Model):
    __tablename__ = 'game_rooms'

    id = Column(Integer, primary_key=True)
    access_code = Column(String(7), nullable=False)
    game_status = Column(String(120), nullable=False)
    host = Column(Integer, ForeignKey('players.id'), nullable=False)
    current_turn = Column(Integer, ForeignKey('players.id'))
    judge = Column(Integer, ForeignKey('players.id'))

    def __repr__(self):
        return f'<Game room id={self.id}>'
