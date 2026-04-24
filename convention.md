# fichier de conventions
1. [commentaire](#commentaire)
2. [code](#code)
3. [fichier](#fichier)
4. [branch](#branch)
5. [commit](#commit)

## commentaire
### description
- Cartouche d'en-tête du code doivent reprendre ces conventions.
- les commentaires du code doivent être en anglais.
- les commentaires doivent décrire la fonction / le code.
- Cartouche de fonction obligatoire.
### exemple
```vue
/***********************************************************************************************************************
 * Program name :           value
 * Description :            value
 * Author :                 value
 * Creation date :          value
 * Modified by :
 * Modification date :
 * Version :                0.0.0
 **********************************************************************************************************************/
```

```js
/**
 * Adds money to the player's balance
 * @param {number} amount
 */
addMoney(amount){
    this.money += amount;
}
```
---

## code
### description
- le nom des fonctions et des variables doivent être en anglais.
- le nom des fonctions et des variables doivent signifier quelque chose.
- les fonctions et les variables sont en camelCase.

### exemple
```js
// pas acceptable
let a = 0;

```

```js
let globalVariableNameExample = 0;

function nameOfExample (){
    let local_variable_name_example = 0;
}

export default class nameExample {
    
}
```
---

## fichier
### description
- les noms des fichiers doivent être en anglais.
- les noms des fichiers doivent signifier quelque chose.
- les fichier .vue sont en camelCase
- les fichiers sont en snake_case.

---
## git
- on utilise ces convention pour git
1. git flow
2. [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### branch
#### description
- le nom des branches doivent être en anglais.
- le nom des branches doivent signifier quelque chose.
- les branches sont en camelCase.
- il faut que les branches utilise les conventions cité plus haut.

---
## vue
https://v2.fr.vuejs.org/v2/style-guide/