from flask import Flask, request, jsonify, render_template, redirect, url_for, session, send_from_directory
#import mysql.connector
import pymysql
import hashlib
import secrets
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import mimetypes

app = Flask(__name__,static_folder='dist')

# Secret Key (Make sure this is strong and secret!)
app.secret_key = '260101'

# Database Configuration
DB_HOST = 'localhost'  # Dirección del servidor de la base de datos
DB_USER = 'root'       # Usuario de la base de datos
DB_PASSWORD = '123456' # Contraseña del usuario
DB_NAME = 'usuariosdb' # Nombre de la base de datos
charset = 'utf8mb4'    # Codificación de caracteres

def conectar_db():
    try:
        conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME)
        print("Conexión a la base de datos exitosa.")
        return conn
    except pymysql.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

def hash_password(password):
    return generate_password_hash(password)

def verify_password(password, hashed_password):
    return check_password_hash(hashed_password, password)

def obtener_usuarios_de_la_base_de_datos():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, email, role FROM usuarios") # Ajusta la consulta según tus campos
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

def login_required(f):
    @wraps(f)  # ¡Esta línea es crucial!
    def decorated_function(*args, **kwargs):
        print(f"login_required: Verificando sesión...")  # Depuración
        if 'user_id' not in session:
            print(f"login_required: Sesión no encontrada, redirigiendo...")
            return redirect(url_for('login'))
        print(f"login_required: Sesión encontrada, permitiendo acceso a {f.__name__}")
        return f(*args, **kwargs)
    return decorated_function

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if session.get('role') == role:
                return f(*args, **kwargs)
            else:
                return "Acceso denegado", 403
        return decorated_function
    return decorator

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'admin_logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('index'))
    return decorated_function

# Registrar el tipo MIME para archivos .jsx
mimetypes.add_type('application/javascript', '.jsx')

@app.route('/create_account', methods=['GET'])
def create_account_page():
    """Renders the create account form."""
    return render_template('create_account.html')

@app.route('/register', methods=['POST'])
def register():
    """Handles the account creation form submission."""
    new_username = request.form['new_username']
    new_email = request.form['new_email']
    new_password = request.form['new_password']

    # Validar que el nombre de usuario y el correo electrónico no existan ya
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM usuarios WHERE username = %s", (new_username,))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'El nombre de usuario ya existe'})

        cursor.execute("SELECT id FROM usuarios WHERE email = %s", (new_email,))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'El correo electrónico ya existe'})

        # Hashear la contraseña
        hashed_password = hash_password(new_password)

        # Insertar el nuevo usuario en la base de datos
        cursor.execute(
            "INSERT INTO usuarios (username, email, password, role) VALUES (%s, %s, %s, 'user')",
            (new_username, new_email, hashed_password)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'success': True, 'message': 'Cuenta creada exitosamente. Por favor, inicia sesión.'})
    else:
        return jsonify({'success': False, 'message': 'Error al conectar con la base de datos.'})

@app.route('/reset_password_request', methods=['POST'])
def reset_password_request():
    email = request.form['email']
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, username FROM usuarios WHERE email = %s", (email,))
        user = cursor.fetchone()
        if user:
            token = secrets.token_urlsafe(16)
            expires = datetime.utcnow() + timedelta(hours=1)
            cursor.execute(
                "INSERT INTO password_reset_tokens (user_id, token, expires) VALUES (%s, %s, %s)",
                (user[0], token, expires)
            )
            conn.commit()
            cursor.close()
            conn.close()

            # Aquí iría el código para enviar el correo electrónico con el token
            print(f"Enlace de restablecimiento de contraseña: http://127.0.0.1:5000/reset_password?token={token}")

            return jsonify({'success': True, 'message': 'Se ha enviado un enlace a tu correo electrónico para restablecer tu contraseña.'})
        else:
            cursor.close()
            conn.close()
            return jsonify({'success': False, 'message': 'No se encontró ninguna cuenta con ese correo electrónico.'})
    else:
        return jsonify({'success': False, 'message': 'Error al conectar con la base de datos.'})

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    token = request.args.get('token')
    if not token:
        return "Token inválido."  # Podrías renderizar una plantilla de error

    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT user_id, expires FROM password_reset_tokens WHERE token = %s", (token,))
        reset_token_data = cursor.fetchone()

        if reset_token_data:
            if reset_token_data[1] > datetime.utcnow():
                if request.method == 'POST':
                    new_password = request.form['new_password']
                    hashed_password = hash_password(new_password)
                    cursor.execute("UPDATE usuarios SET password = %s WHERE id = %s", (hashed_password, reset_token_data[0]))
                    conn.commit()
                    cursor.execute("DELETE FROM password_reset_tokens WHERE token = %s", (token,))
                    conn.commit()
                    cursor.close()
                    conn.close()
                    return "Contraseña restablecida con éxito.  Puedes iniciar sesión" #mensaje de éxito
                else:
                    return render_template('reset_password.html', token=token)
            else:
                cursor.execute("DELETE FROM password_reset_tokens WHERE token = %s", (token,))
                conn.commit()
                cursor.close()
                conn.close()
                return "El token ha expirado. Por favor, solicita un nuevo restablecimiento de contraseña." #mensaje de error
        else:
            cursor.close()
            conn.close()
            return "Token inválido."  # Podrías renderizar una plantilla de error
    else:
        return "Error al conectar con la base de datos."


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Handles user login."""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = conectar_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, username, password, role FROM usuarios WHERE username = %s", (username,))
            user_data = cursor.fetchone()
            cursor.close()
            conn.close()

            if user_data:
                if verify_password(password, user_data[2]):
                    session['user_id'] = user_data[0]
                    session['username'] = user_data[1]
                    session['role'] = user_data[3]
                    print(f"Inicio de sesión exitoso. Rol: {session['role']}")
                    if user_data[3] == 'admin':
                        session['admin_logged_in'] = True
                        session['admin_username'] = user_data[1]
                        return jsonify({'success': True, 'redirect': '/admin/dashboard', 'role': 'admin', 'username': user_data[1]})
                    else:
                        return jsonify({'success': True, 'redirect': '/dashboard', 'role': 'user', 'username': user_data[1]})
                else:
                    return jsonify({'success': False, 'message': 'Credenciales incorrectas'})
            else:
                return jsonify({'success': False, 'message': 'Usuario no encontrado'})
        else:
            return jsonify({'success': False, 'message': 'Error al conectar con la base de datos.'})
    return render_template('frontend.html')

@app.route('/logout')
@login_required
def logout():
    """Handles user logout."""
    session.pop('user_id', None)
    session.pop('username', None)
    session.pop('role', None)
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    """Renders the user dashboard."""
    bar_data = [
        {"name": "Humedad", "value": 65},
        {"name": "Temperatura", "value": 25},
        {"name": "Agua", "value": 80},
    ]
    pie_data = [
        {"name": "Seco", "value": 20},
        {"name": "Húmedo", "value": 80},
    ]
    return render_template('dashboard.html', username=session['username'], bar_data=bar_data, pie_data=pie_data)

@app.route('/api/dashboard-data')
def dashboard_data():
    bar_data = [
        {"name": "Humedad", "value": 65},
        {"name": "Temperatura", "value": 25},
        {"name": "Agua", "value": 80},
    ]
    pie_data = [
        {"name": "Seco", "value": 20},
        {"name": "Húmedo", "value": 80},
    ]
    return jsonify({"barData": bar_data, "pieData": pie_data})

@app.route('/plantas')
def plantas_page():
    if 'user_id' in session:
        flores = [
            {'nombre': 'Cempoalxóchitl', 'sol': 'Sol pleno', 'humedad': 'Moderada', 'temperatura': '15–25°C'},
            {'nombre': 'Dalia', 'sol': 'Sol parcial', 'humedad': 'Alta', 'temperatura': '18–27°C'},
            {'nombre': 'Gladiola', 'sol': 'Sol pleno', 'humedad': 'Regular', 'temperatura': '16–24°C'},
        ]
        return render_template('plantas.html', flores=flores)
    else:
        return redirect(url_for('index'))

@app.route('/services')
def services_page():
    if 'user_id' in session:
        return render_template('services.html')
    else:
        return redirect(url_for('index'))
    
@app.route('/noticias')
def noticias_page():
    if 'user_id' in session:
        return render_template('noticias.html')
    else:
        return redirect(url_for('index'))

@app.route('/soporte')
def soporte_page():
    if 'user_id' in session:
        return render_template('soporte.html')
    else:
        return redirect(url_for('index'))

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    """Handles admin login."""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        print(f"Intentando iniciar sesión con usuario: {username}")  # Depuración
        conn = conectar_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, username, password, role FROM usuarios WHERE username = %s AND role = 'admin'", (username,))
            admin_data = cursor.fetchone()
            print(f"Datos obtenidos de la base de datos: {admin_data}")  # Depuración
            cursor.close()
            conn.close()

            if admin_data:
                if verify_password(password, admin_data[2]):
                    print("Contraseña verificada correctamente.")  # Depuración
                    session['admin_logged_in'] = True
                    session['admin_username'] = admin_data[1]
                    return jsonify({'success': True, 'redirect': '/admin/dashboard'})
                else:
                    print("Contraseña incorrecta.")  # Depuración
                    return jsonify({'success': False, 'message': 'Credenciales de administrador incorrectas'})
            else:
                print("Usuario administrador no encontrado.")  # Depuración
                return jsonify({'success': False, 'message': 'Usuario administrador no encontrado'})
        else:
            print("Error al conectar con la base de datos.")  # Depuración
            return jsonify({'success': False, 'message': 'Error al conectar con la base de datos.'})
    return render_template('admin_login.html')

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    if session.get('admin_logged_in'):
        return render_template('admin_dashboard.html', admin_username=session['admin_username'])
    else:
        return redirect(url_for('index'))
    
@app.route('/admin/users')
@admin_required
def admin_users():
    users = obtener_usuarios_de_la_base_de_datos()  # Función que debes implementar
    return render_template('admin_users.html', users=users)

def obtener_usuarios_de_la_base_de_datos():
    """
    Obtiene todos los usuarios de la base de datos.
    """
    conn = conectar_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, email, role FROM usuarios")  # Selecciona los campos que necesitas
        users = cursor.fetchall()
        cursor.close()
        conn.close()
        return users
    else:
        return [] 

@app.route('/src/<path:filename>')
def serve_src(filename):
    return send_from_directory('static/src', filename)

if __name__ == '__main__':
    app.run(debug=True)