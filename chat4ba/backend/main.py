from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db_connection
from .langchain_handler import generate_prompt, query_llm
import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for data validation
class QueryRequest(BaseModel):
    query: str
    selected_tables: list
    relationships: list

# Route to execute user query
@app.post("/ask-query")
async def ask_query(request: QueryRequest):
    try:
        prompt = generate_prompt(request.selected_tables, request.relationships, request.query)
        response = query_llm(prompt)
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {e}")

# DB Connection class
class DBConnectionRequest(BaseModel):
    host: str
    user: str
    password: str
    db: str
    port: str = "3306"

# Route to connect to DB and fetch tables
@app.post("/connect-db")
def connect_to_db(connection_details: DBConnectionRequest):
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
            cursor.execute("SHOW TABLES")
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

# Route to define relationships between tables
class Relationship(BaseModel):
    tableFrom: str
    columnFrom: str
    tableTo: str
    columnTo: str

class RelationshipsRequest(BaseModel):
    relationships: list[Relationship]

@app.post("/define-relationships")
def define_relationships(request: RelationshipsRequest):
    try:
        # Here you would typically save these relationships to a database
        return {"message": "Relationships defined successfully", "relationships": request.relationships}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error defining relationships: {e}")
