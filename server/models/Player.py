from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from . import db


class Player(db.Model):
    __tablename__ = 'players'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(200), nullable=False)
    host = Column(Boolean, nullable=False, default=False)
    role = Column(Integer, ForeignKey("roles.id"))

    def __repr__(self):
        return f"<Player {self.id}>"


class Role(db.Model):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String(120))
    # one role to many players
    player = relationship("Player")


    def __repr__(self):
        return f"<Role id={self.id} name={self.name}>"
