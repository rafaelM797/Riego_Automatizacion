from werkzeug.security import generate_password_hash
import pymysql

def actualizar_contrasena(username, nueva_contrasena_plana):
    try:
        hashed_password = generate_password_hash(nueva_contrasena_plana)
        print(f"Nuevo hash generado: {hashed_password}")  # Depuración

        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="123456",  # ¡Asegúrate de que esta contraseña es correcta!
            database="usuariosdb"
        )
        print("Conexión a la base de datos exitosa.")  # Depuración

        cursor = conn.cursor()
        update_query = "UPDATE usuarios SET password = %s WHERE username = %s"
        cursor.execute(update_query, (hashed_password, username))
        conn.commit()
        print(f"Contraseña para el usuario '{username}' actualizada con éxito.")  # Depuración

        cursor.close()
        conn.close()
    except pymysql.Error as e:
        print(f"Error al actualizar la contraseña: {e}")
    except Exception as e:
        print(f"Error inesperado: {e}")

if __name__ == '__main__':
    username_a_actualizar = 'ale'  # Cambia esto al nombre de usuario que quieres actualizar
    nueva_contrasena = '2424'  # Cambia esto a la nueva contraseña
    actualizar_contrasena(username_a_actualizar, nueva_contrasena)