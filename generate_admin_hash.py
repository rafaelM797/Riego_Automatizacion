from werkzeug.security import generate_password_hash

password = 'pbkdf2:sha256:260000$sPMxUEtqMCYCgDim$b2d520b01aed8b0c86b8aa92a7a9dbb551d07d30f9b00bcf69489dcdb19e74bd'  # Contraseña que deseas hashear
hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
print(f"Hash generado: {hashed_password}")
