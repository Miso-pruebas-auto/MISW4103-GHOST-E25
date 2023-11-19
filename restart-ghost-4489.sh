chmod 400 ubuntu.pem

ssh -i ubuntu.pem ubuntu@ec2-44-216-57-54.compute-1.amazonaws.com

docker compose down --rmi all