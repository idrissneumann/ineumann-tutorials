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

## Passage de valeurs

__Syntaxe__

```shell
nom_de_fonction() 
{ 
    echo $0 $1 $2 $3 $4 $5 $6 $7 $8 $9 $* $# 
} 
# ? 
nom_de_fonction paramètre1 [paramètre2 ?]
```

Comme pour un script Shell, une fonction peut avoir besoin de valeurs non connues à l'avance. De la même manière, ces valeurs lui seront passées comme « _argument_ » ou « _paramètre_ » lors de l'appel de la fonction, qui les récupérera dans les variables bien connues `$1` (premier paramètre), `$2` (second paramètre)...

Il faut bien comprendre que, même si leur rôle est analogue, il y a différenciation complète entre le contenu des variables `$1`, `$2`... du corps de la fonction et le contenu des variables `$1`, `$2`... du programme principal. Dans le programme principal, ces variables font référence aux valeurs passées depuis l'extérieur du script vers le script ; dans le corps de la fonction, ces variables font référence aux valeurs passées depuis l'extérieur de la fonction vers la fonction.

Seule exception : `$0` reste invariante en conservant toujours le nom du script.

__Exemple__

Une fonction qui affiche si la valeur qu'elle reçoit est paire ou impaire :

```shell
#!/bin/sh 
# Fonction qui affiche la parité d'une valeur 
pair_impair() 
{ 
    test `expr $1 % 2` -eq 0 && echo "$1 est pair" || echo "$1 est impair" 
} 

# Pour chaque nombre passé au programme 
for nb in $* 
do 
    # Vérification de la parité de ce nombre 
    pair_impair $nb 
done
```

## Retour de fonction

__Syntaxe__

```shell
nom_de_fonction() 
{ 
    return [n] 
} 
# ? 
nom_de_fonction 
echo $?
```

L'instruction `return [n]` met immédiatement fin à l'exécution de la fonction.

Le paramètre `n` facultatif vaut `0` par défaut, mais ne peut pas dépasser `255`. Il correspond au « _statut_ » de la fonction et est, de ce fait, retransmis à la variable `$?` du programme ayant appelé cette fonction. Cette instruction peut donc rendre une fonction « _vrai_ » ou « _faux_ » selon les conventions du Shell.

On peut faire un parallèle entre l'instruction `return`, qui sert à interrompre l'exécution d'une fonction en faisant remonter une valeur de l'intérieur vers l'extérieur de la fonction, et l'instruction « exit » qui sert à interrompre l'exécution d'un script en faisant remonter une valeur de l'intérieur vers l'extérieur d'un script.

__Exemple__

Une fonction qui renvoie « _vrai_ » ou « _faux_ » si la valeur qu'elle reçoit est paire ou impaire :

```shell
#!/bin/sh 
# Fonction qui teste la parité d'une valeur 
pair_impair() 
{ 
    test `expr $1 % 2` -eq 0 && return 0 || return 1 
} 

# Pour chaque nombre passé au programme 
for nb in $* 
do 
    # Vérification de la parité de ce nombre 
    if pair_impair $nb 
    then 
        echo "$nb est pair" 
    else 
        echo "$nb est impair" 
    fi 
done
```

## Renvoi d'une valeur par une fonction

__Syntaxe__

```shell
nom_de_fonction() 
{ 
    echo [valeur] 
} 
# ? 
var=`nom_de_fonction` 
echo $var
```

Il ne faut pas confondre la notion de « _retour de fonction_ » en Shell et la notion de « _valeur renvoyée par une fonction_ » telle qu'on l'entend dans d'autres langages, comme le C ou le PASCAL. En effet, en Shell, cette notion de « valeur renvoyée » ne peut être que simulée par l'utilisation d'un « _affichage **unique et final**_ » dans la fonction ; ce qui permet au programmeur de récupérer dans une variable ce que la fonction affiche en utilisant les « _backquotes_ » bien connus du mécanisme de la sous-exécution.

__Exemple__

Une fonction qui renvoie le carré du nombre qu'elle reçoit :

```shell
Sélectionnez
#!/bin/sh 
# Fonction qui renvoie le carré du nombre qu'elle reçoit 
carre() 
{ 
    # Affichage du carré du nombre reçu 
    expr $1 \* $1 
} 

# Pour chaque nombre passé au programme 
for nb in $* 
do 
    # Récupération du carré de ce nombre 
    result=`carre $nb` 

    # Affichage (ou autre traitement quel qu'il soit) de ce résultat 
    echo "Le carré de $nb vaut $result" 
done
```
