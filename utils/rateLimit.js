import rateLimit from "express-rate-limit";

export const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Превышено максимальное количество попыток авторизации",
    statusCode: 429,
    header: true,
});