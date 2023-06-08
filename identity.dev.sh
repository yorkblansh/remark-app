docker compose -f ./docker/docker-compose.yaml -f ./docker/mount-app.yaml --env-file ./configs/.env.dev up --build -d
