import bcrypt

from db import get_connection

def hash_password(password: str):

        return bcrypt.hashpw(

                        password.encode(),

                                bcrypt.gensalt()

                                    ).decode()

def register_user(username, email, password):
    conn = get_connection()

    cur = conn.cursor()

    hashed = hash_password(password)

    cur.execute(
            """
            INSERT INTO users
            (
                username,
                email,
                password_hash
            )

            VALUES (%s, %s, %s)
            """,
            (   
                username,
                email,
                hashed
            )
        )

    conn.commit()
      
    cur.close()

    conn.close()



def find_user(username):

    conn = get_connection()

    cur = conn.cursor()

    cur.execute("""
        
        SELECT 
            id,
            username,
            email,
            password_hash
        FROM users

        WHERE username = %s
    """, (username,))

    row = cur.fetchone()

    cur.close()

    conn.close()

    return row


def authenticate(username, password):
    
    user = find_user(username)
    
    if user is None:
        
        return None

    stored_hash = user[3]

    if bcrypt.checkpw(
            password.encode(),
            stored_hash
    ):
        return {
                "id": user[0],
                "username": user[1],
                "email": user[2]
            }

        return None


