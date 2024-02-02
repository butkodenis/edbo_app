
установка 
 предварительные требования установлен Docker, git
 перейти в /home 
 скачать из репозитерия код 
 https://github.com/butkodenis/edbo_app.git
 перейти в дерикторию 
 cd /home/edbo_app
 заменить : 
 - на ваш ip  HOST, POSTGRES_HOST в .env.
 - на ваш ip  VITE_BASE_URL в ./client/.env

собрать контейнеры
   docker-compose build
запустить 
  docker-compose up -d
дождаться когда в логе контейнера edbo-api появится 
сервер запущен
Соединение с базой данных установлено успешно.
Запланировано : 0 импортов

docker exec -it edbo-postgres sh
pg_dump -U admin edbo > backup.sql
docker cp edbo-postgres:/backup.sql ./backup.sql
 
