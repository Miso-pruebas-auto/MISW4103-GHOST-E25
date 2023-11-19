chmod 400 ubuntu.pem

# Define los comandos en el servidor remoto
DOCKER_DOWN="docker compose down --rmi all"
CD_REPO="cd MISW4103-GHOST-E25"
DOCKER_UP="docker compose up -d"
TIMEOUT="sleep 30"

# Ejecuta los comandos en el servidor remoto a través de SSH
ssh -i ubuntu.pem ubuntu@ec2-44-216-57-54.compute-1.amazonaws.com "$CD_REPO && $DOCKER_DOWN && $DOCKER_UP && $TIMEOUT"
