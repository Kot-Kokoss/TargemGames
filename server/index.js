require('dotenv').config(); // Загружаем переменные окружения
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const sequelize = require('./db'); // Подключение к базе данных
const loadCSVToPostgres = require('./loadCsv'); // Импортируем функцию загрузки CSV

const PORT = process.env.PORT; // Получаем порт из переменных окружения

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    // Загрузка данных из CSV файла
    await loadCSVToPostgres('./data/data.csv');
    console.log('CSV data has been loaded into PostgreSQL.');

    // Запуск сервера
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error('Error starting the server:', e);
  }
};

start();
