from werkzeug.security import check_password_hash

hashed_password = '<nuevo_hash>'  # Reemplaza con el nuevo hash generado
password_ingresada = 'admin123'  # Contraseña que estás probando

if check_password_hash(hashed_password, password_ingresada):
    print("La contraseña es correcta.")
else:
    print("La contraseña es incorrecta.")
