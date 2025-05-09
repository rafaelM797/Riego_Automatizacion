import pymysql

DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = '123456'
DB_NAME = 'usuariosdb'

try:
    conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME)
    print("Conexión a la base de datos exitosa.")
    conn.close()
except pymysql.Error as e:
    print(f"Error al conectar a la base de datos: {e}")
