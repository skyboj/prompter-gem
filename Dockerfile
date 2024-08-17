# Используем Node.js образ
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем остальные файлы в контейнер
COPY . .

# Указываем порт, который будет использоваться приложением
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
