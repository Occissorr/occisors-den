from webserver import keep_alive
from services.database import initialize_database


if __name__ == '__main__': 
    keep_alive()    
    # start_mcp()
    initialize_database()
