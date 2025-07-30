## Сборка проекта 

```bash
docker compose up --build
```

## 👤 Создание пользователя

Перед запуском убедитесь, что скопированы файлы примеров настроек окружения:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

В файле `backend/.env` укажите строку подключения `MONGO_URI` к вашей базе MongoDB и секрет `JWT_SECRET`.

После запуска сервисов можно создать администратора командой:

```bash
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin2", "password": "5678"}'
```

Затем войдите в приложение по адресу 
```bash
http://localhost:5173/login 
```
с этими данными:
username: admin
password: 1234

После запуска доступна страница документации API:
```bash
http://localhost:5001/api-docs/
```

## Остановка проекта 

```bash
docker compose down
```