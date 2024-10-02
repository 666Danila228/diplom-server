// Middleware для проверки csrf токена

// ==================================================
// ||                 Импорты                      ||
// ==================================================

import csurf from "csurf";



// ==================================================
// ||                 Константы                    ||
// ==================================================
const csrfProtection = scrf({cookie: true});

export default (req, res, next) => {
    csrfProtection(req, res, (err) => {
        if (err) {
            return res.status(403).json({
                message: 'CSRF токен не валиден',
            });
        }
        next();
    });
};
