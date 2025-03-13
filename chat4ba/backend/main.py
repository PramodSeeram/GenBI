# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend.database import get_db_connection  # Ensure the correct import for the connection function

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to Chat4Ba !"}

# Define a Pydantic model for user input validation
class DBConnectionRequest(BaseModel):
    host: str
    user: str
    password: str
    db: str

@app.post("/connect-db")
def connect_to_db(connection_details: DBConnectionRequest):
    # Extract user input
    host = connection_details.host
    user = connection_details.user
    password = connection_details.password
    db = connection_details.db
    
    # Try to establish a connection
    connection = get_db_connection(host, user, password, db)
    
    if connection:
        # Fetch the list of tables after the connection is successful
        cursor = connection.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        cursor.close()
        connection.close()
        
        # Return the list of tables in the response
        return {"message": f"Successfully connected to the database: {db}", "tables": [table[0] for table in tables]}
    else:
        raise HTTPException(status_code=400, detail="Failed to connect to the database")

