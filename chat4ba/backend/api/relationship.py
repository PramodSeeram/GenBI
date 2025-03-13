from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from backend.database import get_db_connection

router = APIRouter()


class Relationship(BaseModel):
    table_from: str
    column_from: str
    table_to: str
    column_to: str

@router.post("/define-relationships")
async def define_relationships(relationships: list[Relationship]):
    """
    Define relationships between selected tables in the database.
    For each relationship, we will attempt to add a foreign key constraint.
    """
    connection = get_db_connection("localhost", "root", "password", "test_db")  # Use your actual DB credentials
    
    if connection:
        cursor = connection.cursor()
        for relationship in relationships:
            try:
                # Constructing the SQL query to add the foreign key
                query = f"""
                    ALTER TABLE {relationship.table_from}
                    ADD CONSTRAINT fk_{relationship.table_from}_{relationship.column_from}
                    FOREIGN KEY ({relationship.column_from}) REFERENCES {relationship.table_to} ({relationship.column_to})
                """
                cursor.execute(query)
            except Exception as e:
                cursor.close()
                connection.close()
                raise HTTPException(status_code=400, detail=f"Error creating relationship: {e}")
        
        connection.commit()  
        cursor.close()
        connection.close()

        return {"message": "Relationships successfully created!"}
    else:
        raise HTTPException(status_code=400, detail="Failed to connect to the database")
