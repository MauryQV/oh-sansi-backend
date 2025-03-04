const supabase = require('../../config/supabaseClient');
const { generateToken } = require('../utils/jwt.util');

async function register(req, res) {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ message: 'Usuario registrado correctamente', user: data.user });
}

async function login(req, res) {
    const { email, password } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) return res.status(400).json({ error: authError.message });

    const token = generateToken({
        id: authData.user.id,
        email: authData.user.email,
    });

    return res.status(200).json({
        message: 'Login exitoso',
        token,
    });
}

module.exports = { register, login };
