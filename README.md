## 👤 Создание пользователя

Перед запуском убедитесь, что скопированы файлы примеров настроек окружения:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

В файле `backend/.env` укажите строку подключения `MONGO_URI` к вашей базе MongoDB и секрет `JWT_SECRET`.

После запуска сервисов можно создать администратора командой:

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "1234"}'
```

Затем войдите в приложение по адресу http://localhost:5173 с этими данными:

username: admin
password: 1234
