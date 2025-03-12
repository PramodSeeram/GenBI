# app/database.py
import mysql.connector
from mysql.connector import Error

def get_db_connection(host: str, user: str, password: str, db: str):
    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=db
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None
