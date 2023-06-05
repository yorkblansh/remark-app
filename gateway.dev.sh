docker compose -f ./microservices/gateway/docker/docker-compose.yaml -f ./microservices/gateway/docker/mount-app.yaml --env-file ./microservices/gateway/configs/.env.dev up --build -d
