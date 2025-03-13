from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.database import get_db_connection
import mysql.connector

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Chat4Ba!"}

class DBConnectionRequest(BaseModel):
    host: str
    user: str
    password: str
    db: str
    port: str = "3306"  # Added port with default value

@app.post("/connect-db")
def connect_to_db(connection_details: DBConnectionRequest):
    """
    Connect to MySQL database and fetch the tables.
    """
    host = connection_details.host
    user = connection_details.user
    password = connection_details.password
    db = connection_details.db
    port = connection_details.port
    
    # Attempt to connect to the database
    connection = get_db_connection(host, user, password, db, port)
    
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute("SHOW TABLES")  # Query to fetch tables
            tables = cursor.fetchall()
            cursor.close()
            connection.close()
            return {"message": f"Successfully connected to the database: {db}", "tables": [table[0] for table in tables]}
        except mysql.connector.Error as e:
            cursor.close()
            connection.close()
            raise HTTPException(status_code=400, detail=f"Error fetching tables: {e}")
    else:
        raise HTTPException(status_code=400, detail="Failed to connect to the database")

