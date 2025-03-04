const { verifyToken } = require('../utils/jwt.util');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Aquí tienes id, email y role
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

// Middleware para validar roles
function authorize(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'No tienes permisos suficientes' });
        }
        next();
    };
}

module.exports = { authenticate, authorize };
