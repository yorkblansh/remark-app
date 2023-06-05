docker compose -f ./microservices/auth/docker/docker-compose.yaml -f ./microservices/auth/docker/mount-app.yaml --env-file ./microservices/auth/configs/.env.dev up --build -d
