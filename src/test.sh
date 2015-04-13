
# cria uma nova sessao
curl -X POST http://localhost:8081/session/acme/new | json_pp

# executa login no site
curl -X POST http://localhost:8081/session/acme/login | json_pp

# navega até a pagina de doacao
curl -X POST http://localhost:8081/session/acme/donate/start | json_pp

# retorna um print da tela para ajudar com debug
curl http://localhost:8081/session/acme/print | json_pp
