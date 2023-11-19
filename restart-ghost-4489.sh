chmod 400 ubuntu.pem

# Comando a ejecutar en el servidor remoto
DOCKER-DOWN="docker-compose down --rmi all"
DOCKER-UP="docker-compose up -d"

ssh -i ubuntu.pem ubuntu@ec2-44-216-57-54.compute-1.amazonaws.com "$DOCKER-DOWN" "$DOCKER-UP"
