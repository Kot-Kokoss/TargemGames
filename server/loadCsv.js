const fs = require('fs');
const csv = require('csv-parser');
const { Player } = require('./models/models');

const loadCSVToPostgres = async (filePath) => {
  try {
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(
          csv({
            separator: ';',
            headers: ['nickName', 'email', 'registration', 'status'],
            skipEmptyLines: true,
          }),
        )
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(new Error('Ошибка чтения файла: ' + error.message));
        });
    });

    // Пропускаем первую строку (заголовок), если у вас есть заголовки
    if (results.length > 0) {
      results.shift();
    }

    for (const row of results) {
      console.log('Обрабатываем строку:', row);

      // Обработка даты
      try {
        const [datePart, timePart] = row.registration.split(' ');
        const [day, month, year] = datePart.split('.');
        const [hours, minutes] = timePart.split(':');

        // Создаем объект даты
        const date = new Date(year, month - 1, day, hours, minutes);
        console.log(date);

        const registrationDate = Math.floor(date.getTime() / 1000); // Задаем дату в Unix time
        console.log(
          `Вставляем данные: nickName=${row.nickName}, email=${row.email}, registrationDate=${registrationDate}, status=${row.status}`,
        );

        // Вставка данных с проверкой уникальности
        try {
          const player = await Player.create({
            nickName: row.nickName,
            email: row.email,
            registrationDate: registrationDate,
            status: row.status,
          });
          console.log(`Запись добавлена: ${JSON.stringify(player)}`);
        } catch (insertError) {
          console.error(
            `Ошибка вставки данных: ${insertError.message}. Пропуск строки: ${JSON.stringify(row)}`,
          );
        }
      } catch (innerError) {
        console.error(
          `Ошибка обработки даты в строке: ${JSON.stringify(row)}. Ошибка: ${innerError.message}`,
        );
      }
    }

    console.log('CSV файл успешно загружен в PostgreSQL.');
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};

module.exports = loadCSVToPostgres;
