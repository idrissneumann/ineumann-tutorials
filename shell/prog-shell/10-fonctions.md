# Les fonctions

## Introduction

__Syntaxe__

```shell
nom_de_fonction() 
{ 
    commande1 
    [ commande2 ?] 
} 
# ? 
nom_de_fonction
```

Une fonction permet de regrouper des instructions fréquemment employées dans un ensemble identifié par un nom.

Ce nom, utilisé ensuite dans le script comme toute autre commande Unix, exécutera l'ensemble des instructions contenues dans la fonction. Une fois le corps de la fonction créé, il n'y a aucune différence entre « appeler une fonction » et « appeler une commande Unix ».

Leur nom est soumis aux mêmes impératifs que les noms de variables : une suite de caractères commençant impérativement par une lettre ou le caractère `_` (souligné ou « _underscore_ ») et comportant ensuite des lettres, des chiffres ou le caractère souligné.

__Exemple__

Une fonction qui affiche la date puis un `ls` :

```shell
#!/bin/sh 
# Fonction qui affiche la date puis fait un "ls" 
newls() 
{ 
    date # Affichage de la date 
    ls -l # Affichage du ls 
} 

# Utilisation de la fonction 
newls # Appel de la fonction 
var1=`newls` # Récupération de ce que la fonction affiche 

# Utilisation d'une commande Unix 
ls -l # Appel de la commande classique "ls -l" 
var2=`ls -l`# Récupération de ce que la commande "ls -l" affiche 

# Il n'y a aucune différence syntaxique entre l'utilisation d'une fonction ou d'une commande?
```

__Remarque__

Il existe une autre syntaxe issue du Korn Shell pour définir des fonctions, cette syntaxe étant également compatible en Bourne Again Shell. Reprenons l'exemple de la fonction `newls` avec cette syntaxe :

```shell
function newls 
{ 
    date # Affichage de la date 
    ls -l # Affichage du ls 
}
```
