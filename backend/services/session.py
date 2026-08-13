import uuid

from datetime import datetime, timedelta

from db import get_connection

def create_session(user_id):
    conn = get_connection()
    cur = conn.cursor();
    session_id = str(uuid.uuid4())
    expires = datetime.now() + timedelta(days=30)
    cur.execute(
            """
            INSERT INTO sessions
            (
                id,
                user_id,
                expires_at
            )

            VALUES
            (
                %s,
                %s,
                %s
            )
            """,
            (session_id,
             user_id,
             expires
            )
    )

    conn.commit()
    cur.close()
    conn.close()

    return session_id
    
def get_user_from_session(session_id):
    
    conn = get_connection()

    cur = conn.cursor()

    cur.execute("""

        SELECT
            users.id,
            users.username,
            users.email
        FROM sessions
        JOIN users
        ON sessions.user_id = users.id
        WHERE sessions.id = %s
        AND sessions.expires_at > NOW()
    """, (session_id,))

    row = cur.fetchone()

    cur.close()

    conn.close()

    return row

