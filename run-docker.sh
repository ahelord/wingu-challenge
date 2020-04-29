docker build -t wingu-challenge:dev .
docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm wingu-challenge:dev
