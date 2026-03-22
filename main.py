from webserver import run
from services.database import initialize_database


if __name__ == '__main__': 
    initialize_database()
    run()