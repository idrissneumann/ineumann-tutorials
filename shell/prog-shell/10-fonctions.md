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

## Portée des variables

Il n'y a pas recopie de variable pour une fonction. Autrement dit, modifier une variable dans une fonction répercute la modification dans tout le script. En effet, comme il n'y a pas de notion de « pointeur » en Shell, c'est le seul moyen de pouvoir faire modifier une variable par une fonction. Malheureusement cela peut produire des effets de bord difficilement décelables si le programmeur ne fait pas attention.

Cependant, l'instruction `local` employée lors de la création de la variable a pour effet d'isoler les modifications apportées à la variable à la fonction dans laquelle la variable est modifiée. Cet effet est définitif pour la variable dans toute la fonction.

__Exemple__

Une fonction qui modifie deux variables : une « globale » et une « locale ».

```shell
#!/bin/sh 
# Fonction qui modifie deux variables, une dans le shell et l'autre dans un sous-shell 
modif() 
{ 
    i=5 # Modification de "i" dans le shell principal
    ( # Création d'un sous-shell 
        j=8 # Modification de "j" dans le sous-shell 
        echo "Fonction: i=$i; j=$j" # Affichage de "i" et "j" dans le sous-shell 
    ) # Fin du sous-shell => La modif de "j" est perdue 
} 

# Programme principal 
i=0; j=0 # Initialisation de "i" et "j" 
echo "i=$i; j=$j" # Affichage de "i" et "j" avant l'appel 
modif # Appel de la fonction 
echo "i=$i; j=$j" # Affichage de "i" et de "j" après l'appel => "j" n'a pas changé
```

Dans le cas où toutes les variables doivent être locales, et que rajouter l'instruction `local` semble fastidieux (sans compter qu'un oubli est toujours possible), une astuce simple pour transformer d'un coup toutes les variables en `local` consiste à isoler le corps de la fonction avec des parenthèses, ce qui a pour effet de faire créer un sous-shell dans lequel la fonction pourra travailler, mais dans lequel les variables modifiées ne seront pas répercutées au niveau du shell parent.

__Exemple__

Une fonction qui modifie deux variables... mais la seconde est modifiée dans un sous-shell.

```shell
#!/bin/sh 
# Fonction qui modifie deux variables, une dans le shell et l'autre dans un sous-shell 
modif() 
{ 
    i=5 # Modification de "i" dans le shell principal 
    ( # Création d'un sous-shell 
        j=8 # Modification de "j" dans le sous-shell 
        echo "Fonction: i=$i; j=$j" # Affichage de "i" et "j" dans le sous-shell 
    ) # Fin du sous-shell => La modif de "j" est perdue 
} 

# Programme principal 
i=0; j=0 # Initialisation de "i" et "j" 
echo "i=$i; j=$j" # Affichage de "i" et "j" avant l'appel 
modif # Appel de la fonction 
echo "i=$i; j=$j" # Affichage de "i" et de "j" après l'appel => "j" n'a pas changé
```

__Remarque__

Toute fonction ayant donc toujours connaissance de toute variable créée par l'appelant, le choix est laissé au programmeur, soit de transmettre une variable à une fonction comme il lui transmettrait n'importe quelle valeur (qu'elle récupérera dans `$1`, `$2`...), soit de laisser la fonction utiliser naturellement les variables du script par leurs noms. Les deux solutions ont chacune leurs avantages et leurs inconvénients.

## Imbrication de fonctions

Il est tout à fait possible d'intégrer la création d'une fonction en plein milieu du code principal du programme. Mais pour qu'une fonction soit « exécutable », son identificateur doit d'abord être connu (avoir été « lu ») par le Shell. La lecture d'un script se faisant séquentiellement, il s'ensuit qu'une fonction ne sera exécutable que lorsque l'interpréteur du Shell sera passé par le nom de la fonction et seulement s'il passe par la partie du code contenant le nom.

__Exemple__

Une fonction intégrée au milieu d'un script :

```shell
#!/bin/sh 

# Début du script - La fonction n'est pas encore connue 
echo "Début du script" 

# Écriture de la fonction - En passant ici, le shell prend connaissance de l'existence de la fonction 
fonction() 
{ 
    echo "Fonction" 
} 

# Suite du script - La fonction est maintenant connue et utilisable 
echo "Suite du script" 
fonction
```

__Exemple__

Une fonction qui ne sera connue que si une condition est vérifiée :

```shell
#!/bin/sh 

# Si la condition est vérifiée 
if test "$1" = "go" 
then 
    # Écriture de la fonction - S'il passe ici, le Shell prendra connaissance de son existence 
    fonction() 
    { 
        echo "Fonction" 
    } 
fi 

# Suite du script 

# Si la condition n'a pas été vérifiée, la fonction ne sera pas connue et son appel provoquera une erreur 
fonction
```

__Exemple__

Une fonction « interne » qui ne sera connue que si une autre fonction « externe » est appelée :

```shell
#!/bin/sh 

# Écriture de la fonction externe 
externe() 
{ 
    echo "Fonction externe" 

    # Écriture de la fonction interne qui ne sera connue que si la fonction "externe" est appelée 
    interne() 
    { 
        echo "Fonction interne" 
    } 
} 

# Suite du script 

# Ici, la fonction "interne" n'est pas connue - Son appel provoquera une erreur 
# Cependant la fonction "externe" est connue et son appel rendra fonction "interne" connue 
externe 

# Maintenant, la fonction "interne" est connue et peut être appelée 
interne
```

__Exemple__

Une fonction « interne » qui ne sera connue que dans une autre fonction « externe » :

```shell
#!/bin/sh 

# Écriture de la fonction externe 
externe() 
{ 
    echo "Fonction externe" 
    ( # Création d'un sous-shell 

        # Écriture de la fonction interne qui ne sera connue que du sous-shell 
        interne() 
        { 
            echo "Fonction interne" 
        } 

        # Ici, la fonction "interne" est connue et peut être appelée 
        interne 
    ) # Fin du sous-shell 

    # Ici, la fonction "interne" n'est pas connue - Son appel provoquera une erreur 
} 

# Suite du script 

# Ici, la fonction "interne" n'est pas connue - Son appel provoquera une erreur 
# Appel de la fonction externe 
externe 

# Ici, la fonction "interne" n'est toujours pas connue - Son appel provoquera toujours une erreur
```

À partir de là, il est possible de décomposer un problème en une multitude d'opérations élémentaires ; chacune d'elles exécutée par une fonction qui lui est dévolue ce qui est d'ailleurs le principe d'une fonction. Les fonctions pourront s'appeler mutuellement, et même de façon imbriquée (A appelle B qui appelle A), pour peu que chacune d'elles soit connue du Shell au moment de son appel.

Il est cependant recommandé, pour une bonne maintenance et une bonne lisibilité, de commencer un script par l'écriture de toutes les fonctions qu'il sera amené à utiliser sans complication inutile telle que ces exemples ont montré.

## La trace de l'appelant

__Syntaxe__

```shell
caller [num]
```

L'instruction `caller`, qui doit obligatoirement être placée dans une fonction, donne des informations sur l'appelant de la fonction (nom du script, fonction appelante, n° de ligne de l'appel).

Le numéro indique l'incrément à apporter au niveau que l'on veut remonter (`0` pour remonter un niveau, `1` pour remonter deux niveaux, `2` pour remonter trois niveaux...).

__Exemple__

Une fonction de troisième niveau qui indique la hiérarchie de ses appelants :

```shell
#!/bin/sh 

# Fonction de niveau 1 
fct1() 
{ 
    # Appel fonction de niveau 2 
    fct2 
} 

# Fonction de niveau 2 
fct2() 
{ 
    # Appel fonction de niveau 3 
    fct3 
} 

# Fonction de niveau 3 
fct3() 
{ 
    # Informations sur les différents appelants 
    caller 0 # Appelant immédiat (fct2) 
    caller 1 # Appelant 1 niveau au-dessus de l'appelant immédiat (fct1) 
    caller 2 # Appelant 2 niveaux au-dessus de l'appelant immédiat (programme) 
    caller 3 # Appelant 3 niveaux au-dessus de l'appelant immédiat (il n'y en a pas) 
} 

# Corps du programme principal 

# Appel de la fonction de base 
fct1 

# Informations sur les différents appelants 
caller 0 # Appelant immédiat (il n'y en a pas, car on est dans le programme principal)
```
