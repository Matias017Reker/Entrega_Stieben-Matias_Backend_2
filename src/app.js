import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import "./config/passport.config.js";

// Cargar variables del .env
dotenv.config();

// Importar router de sesiones
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use("/api/sessions", sessionsRouter);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado a MongoDB");

        // SERVIDOR EXPRESS
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    })
    .catch((error) => console.error("Error al conectar a MongoDB:", error));

export default app;
