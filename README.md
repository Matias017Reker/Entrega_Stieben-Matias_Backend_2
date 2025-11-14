# Entrega_Stieben-Matias_Backend_2

Este proyecto forma parte de la primera entrega del curso de Backend 2.

El proyecto está desarrollado con Node.js, Express y MongoDB, y se enfoca en demostrar el uso de:

Rutas y controladores organizados.

Conexión a una base de datos MongoDB con Mongoose.

Registro (sign up) y login de usuarios.

Generación y validación de tokens JWT para proteger rutas.

Manejo de sesiones mediante Passport.

Estructura de proyecto escalable.

# Tecnologías utilizadas

Node.js – entorno de ejecución

Express – framework para servidor

MongoDB + Mongoose – base de datos NoSQL

Passport + passport-jwt – middleware de autenticación

dotenv – manejo de variables de entorno

bcrypt – encriptación de contraseñas

Nodemon – modo desarrollo (auto recarga)

JWT (JSON Web Tokens) – manejo de sesiones seguras

# Endpoints principales
POST /api/sessions/register

Registra un nuevo usuario.

POST /api/sessions/login

Devuelve un token JWT válido.

GET /api/sessions/current

Requiere token.
Devuelve los datos del usuario autenticado.

