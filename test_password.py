from werkzeug.security import check_password_hash

hashed_password = 'pbkdf2:sha256:260000$sPMxUEtqMCYCgDim$b2d520b01aed8b0c86b8aa92a7a9dbb551d07d30f9b00bcf69489dcdb19e74bd'  # Reemplaza con el nuevo hash generado
password_ingresada = '2424'  # Contraseña que estás probando

if check_password_hash(hashed_password, password_ingresada):
    print("La contraseña es correcta.")
else:
    print("La contraseña es incorrecta.")
