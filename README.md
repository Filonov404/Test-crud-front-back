## Сборка проекта 

```bash
docker compose up --build
```

## 👤 Создание пользователя


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