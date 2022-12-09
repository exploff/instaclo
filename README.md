# Pour installer les dépendances, il y a un conflit avec ngx-scanner-qrcode et angular 14, il faut utiliser le --f : 
`npm i --f `

Si il y a des problèmes, vérifier également la version dans le package.json 
On doit utiliser obligatoirement : "ngx-scanner-qrcode": "1.0.25"

# Version
- Node : 16.17.1
- NPM : 8.15.0
- Angular : 14

# Instaclo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Boostrap

npm i bootstrap
npm i jquery

add this line in your styless.scss if not exist => @import "~bootstrap/dist/css/bootstrap.css"
