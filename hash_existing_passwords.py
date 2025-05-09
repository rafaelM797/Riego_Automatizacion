import pymysql
from werkzeug.security import generate_password_hash
import secrets  # Para contraseñas aleatorias seguras

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = '123456'
DB_NAME = 'usuariosdb'

def conectar_db():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME)

def hash_password(password):
    return generate_password_hash(password)

def generar_contrasena_aleatoria(longitud=4):
    """Genera una contraseña aleatoria de la longitud especificada."""
    caracteres = "0123456789"  # Solo dígitos
    return ''.join(secrets.choice(caracteres) for _ in range(longitud))

conn = conectar_db()
cursor = conn.cursor()

# Diccionario de usuarios con contraseñas específicas
usuarios_especificos = {
    "raz": "2601",
    "raziel": "2601",
    "rafa": "6969",
    "cris": "0000",
    "fany": "1111",
    "ale": "2222",
    "blue": "2601"
}

cursor.execute("SELECT username FROM usuarios")  # Solo necesitamos los nombres de usuario
nombres_de_usuario = [row[0] for row in cursor.fetchall()]

for username in nombres_de_usuario:
    if username in usuarios_especificos:
        plaintext_password = usuarios_especificos[username]
    else:
        plaintext_password = generar_contrasena_aleatoria()

    hashed_password = hash_password(plaintext_password)
    update_sql = "UPDATE usuarios SET password = %s WHERE username = %s"
    cursor.execute(update_sql, (hashed_password, username))

conn.commit()
cursor.close()
conn.close()

print("¡Contraseñas iniciales establecidas y hasheadas en la base de datos!")