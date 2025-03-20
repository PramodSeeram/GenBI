import mysql.connector
from mysql.connector import Error

def get_db_connection(host: str, user: str, password: str, db: str, port: str = "3306"):
    """
    Connect to MySQL database and return the connection object.
    """
    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=db,
            port=int(port)
        )
        if connection.is_connected():
            print(f"Connected to the database {db}")
            return connection
        else:
            print("Connection failed")
            return None
    except Error as e:
        print(f"Error: {e}")
        return None
