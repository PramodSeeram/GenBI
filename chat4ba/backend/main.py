# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .database import get_db_connection

app = FastAPI()

# Define a Pydantic model for user input validation
class DBConnectionRequest(BaseModel):
    host: str
    user: str
    password: str
    db: str

@app.post("/connect-db")
def connect_to_db(connection_details: DBConnectionRequest):
    # Extract the user input
    host = connection_details.host
    user = connection_details.user
    password = connection_details.password
    db = connection_details.db
    
    # Try to establish a connection
    connection = get_db_connection(host, user, password, db)
    
    if connection:
        return {"message": f"Successfully connected to the database: {db}"}
    else:
        raise HTTPException(status_code=400, detail="Failed to connect to the database")
