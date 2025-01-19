// ==================================================
// ||                 Импорты                      ||
// ==================================================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes.js';
import cookieParser from 'cookie-parser';

// ==================================================
// ||                 Константы                    ||
// ==================================================
const app = express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', 
  }));
app.use(express.json());
app.use(cookieParser());
dotenv.config();
const port = process.env.PORT || 3500

// Роуты
app.use('/api', routes);


// Запуск сервера
const startServer = async () => {
    try {
        app.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`Сервер работает 🏎️  по адресу: 127.0.0.1:${port}`);
        });
    } catch (error) {
        console.error('Ошибочка: ', error);
    }
}

startServer();