import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import * as jwtService from "../services/jwt.service.js";
import passport from "passport";

const router = Router();

// Registro
router.post("/register", async (req, res) => {
    try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await User.findOne({ email });
    if (existing)
        return res.status(409).json({ message: "Email ya registrado" });

    const hashed = bcrypt.hashSync(password, 10);

    const user = new User({
        first_name,
        last_name,
        email,
        age,
        password: hashed,
    });

    await user.save();

    res.status(201).json({
        message: "Usuario creado",
        user: user.toJSON(),
    });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en servidor" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({ message: "Credenciales inválidas" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
        return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwtService.generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
    });

    res.json({ message: "Login exitoso", token });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en servidor" });
    }
});

// Current
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    res.json({ user: req.user.toJSON() });
    }
);

export default router;