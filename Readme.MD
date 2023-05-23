# Les Saveurs De Savoie   

## version en ligne

https://lessaveursdesavoie.fr.nf/

Application de gestion d'un restaurant qui permet de publier la carte, les menus, ainsi qu'un système de réservation en ligne par méthode asynchrone. L'administration du site est gérée par un back-office.

Le site est développé avec la stack ReactJS, Symfony 5, et MySQL. ReactJS est intégré à Symfony via Webpack Encore et les web-components dans les pages twig. Les reqûetes front-end sont effectuées par méthodes asynchrones via Axios. Les réponses back-end sont retournées par les controleurs symfony en mode API. Le système d'authentification est géré par symfony.


## Prérequis


* PHP 8.1.0 ou plus;

* Symfony 5.4 LTS ou plus;

* PDO-SQLite PHP activé;


## Installation


* git clone https://github.com/Christophe-THEVENET/lessaveursdesavoie.fr.nf.git

* cd lessaveursdesavoie.fr.nf/

* composer install

* npm install

* php bin/console c:c 

* npm run build

* php bin/console doctrine:database:create

* php bin/console doctrine:migrations:migrate



!!!Attention si vous rencontrez une erreur mémoire lors du build :  npm uninstall webpack et ensuite npm install webpack@5.60 - --fund=false --audit=false



## Utilisation


* start MySQL

* cd lessaveursdesavoie.fr.nf/

* symfony server:start

* npm run watch

* http://localhost:8000/


## Ajouter un administrateur


* désactiver la protection 

* ajouter un utilisateur avec role admin via easyadmin

* réactiver la protection