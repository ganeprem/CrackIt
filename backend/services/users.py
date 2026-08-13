from db import get_connection

def get_users():

    conn = get_connection()

    cur = conn.cursor()

    cur.execute("""
        
        SELECT
            id,
            username,
            email
        FROM users
    """)

    rows = cur.fetchall()

    users = []

    for row in rows:
        users.append({
            "id": row[0],
            "username": row[1],
            "email": row[2]
        })

    cur.close()
    conn.close()

    return users

