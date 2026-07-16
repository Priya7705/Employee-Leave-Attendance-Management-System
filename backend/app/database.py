from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
class Base(DeclarativeBase):
    pass
DATABASE_URL = "mysql+pymysql://root:info123@localhost/elams_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()