from werkzeug.security import generate_password_hash

password = '2424'  # Contraseña que deseas hashear
hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
print(f"Hash generado: {hashed_password}")
