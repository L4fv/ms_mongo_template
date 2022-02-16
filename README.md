# bx_template_node

# DEPLOY PROD
    COMAND:
     git pull && docker-compose down && docker build . -t bx_template_node:PROD1.016 && docker-compose up -d --remove-orphans

# DEPLOY RELEASE
    git pull && docker-compose down && docker build . -t bx_template_node:TEST1.1005  && docker-compose -f docker-compose.release.yml  up -d --remove-orphans

# DEPLOY LOCAL
    npm run dev

