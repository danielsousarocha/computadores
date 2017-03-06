# Computadores

Projeto criado para testar diferentes frameworks no front com uma única API.

API feita com o [Laravel 5.3](https://laravel.com/docs/5.3), o front foi feito com [Angular 1.6.2](https://code.angularjs.org/1.6.2/docs/api) e o banco de dados com [SQLite](https://www.sqlite.org/docs.html).

> Por enquanto só o Angular foi implementado para o front, mas no futuro outros frameworks serão implementados para testar as suas diferenças na prática.

Para a API funcionar, instale o Laravel, entre no diretório `api` pelo terminal e digite `composer install`.
Após isso faça o seguinte:
- Duplique o arquivo `.env.example` e renomeie-o para `.env`
- Mude a linha `DB_CONNECTION=mysql` para `DB_CONNECTION=sqlite`
- Apague/Comente os outros campos referentes ao bando de dados
- Digite `php artisan key:generate`
- Crie um banco de dados SQLite chamado `database.sqlite` dentro do diretório `api/app/database`
- Crie as tabelas com o comando `php artisan migrate` e popule-as com o comando `php artisan db:seed`
- Sirva a API com o comando `php artisan serve`
- Mude para o diretório `view/angular` e digite `npm install && bower install` para instalar todas as dependências do front

Por fim, crie um vhost/link apontado para a pasta `view` e no browser digite `url-para-pasta-view/angular` para visualizar o sistema e começar a usar.