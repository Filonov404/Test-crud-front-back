## 👤 Создание пользователя

После запуска:

```bash
curl -X POST http://localhost:5050/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "1234"}'

После этого войдите на http://localhost:5173 с этими данными:

username: admin
password: 1234

