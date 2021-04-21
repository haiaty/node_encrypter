first install node > 10 then:

npm install
node encrypt.js source dest

or if you want to use docker (first install docker and docker compose):

docker-compose up -d
docker ps
[winpty] docker exec -it <id> bash
install node:  apt-get update && apt -y install node
install php: apt -y install php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath
cd /src && run java or node or php