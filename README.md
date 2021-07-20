# trabalhoDelivery

## Membros
  - André Vitor Kuduavski GRR20184595
  - Carlos Felipe Godinho Silva GRR20184630
  - Rafael Henrique Karam GRR20184601

# Instruções de uso

  ### Configuração do projeto:
  - Criar um arquivo .env na raiz do projeto baseado no arquivo .env.example
  - Preencher com os dados de seu servidor banco de dados MySQL
  
  ### Criação e inserção no banco:
   #### Instalar as dependências necessárias:
    npm install
   #### Criação de tabelas:
    npx sequelize db:migrate
   #### População de tabelas:
    npx sequelize db:seed:all
 
 ### Endpoints:
 
 #### Rotas de Associados:
   ##### Login
      http://localhost:3000/associados/login
   ##### Cadastro clientes
      http://localhost:3000/associados/cliente/create
   ##### Busca por CNPJ
      http://localhost:3000/associados/cliente/:cnpj
   ##### Remover cliente
      http://localhost:3000/associados/cliente-remove/:id
   ##### Cadastro de Motoboy
      http://localhost:3000/associados/motoboys/create      
   ##### Cadastro de entregas
      http://localhost:3000/associados/entregas/create      
   ##### Editar Motoboy
      http://localhost:3000/associados/motoboys/edit      
   ##### Relatorio Administrativo
      http://localhost:3000/associados/relatorio/administrativo
   ##### Relatorio Financeiro
      http://localhost:3000/associados/relatorio/financeiro
   ##### Relatorio Entregas Completas Associados
      http://localhost:3000/associados/entregas/find-completed
      
    
  #### Rotas de Motoboys:
      
   ##### Login Motoboy
      http://localhost:3000/motoboys/login
   ##### Editar Entrega
      http://localhost:3000/motoboys/edit
   ##### Relatorio Motoboy
      http://localhost:3000/motoboys/relatorio
