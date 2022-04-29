from contextlib import nullcontext
from email.policy import default
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from models.index import db


class Player(db.Model):
    __tablename__ = 'players'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False)
    host = Column(Boolean, nullable=False, default=False)
    role = Column(Integer, ForeignKey("roles.id"))

    def __repr__(self):
        return f"<Player {self.id}>"


class Role(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String(120))

    def __repr__(self):
        return f"<Role id={self.id} name={self.name}>"
