# Les structures de contrôles

## Introduction

Comme tout langage évolué, le Shell permet des structures de contrôles. Ces structures sont :

* l'alternative simple (`&&...`, `||...`)
* l'alternative complexe (`if...`)
* le branchement sur cas multiples (`case...`)
* la boucle (`while...`, `until...`, `for...`)

## L'alternative simple

__Syntaxe__

```shell
cde1 && cde2 
cde1 || cde2
```

La première syntaxe correspond à un « commande1 __ET__ commande2 » et se traduit par « exécuter la commande n° 1 __ET__ (sous-entendu « si celle-ci est « __vrai__ » donc s'est exécutée entièrement ») exécuter la commande n° 2 ».

La seconde syntaxe correspond à un « commande1 __OU__ commande2 » et se traduit par « exécuter la commande n° 1 __OU__ (sous-entendu « si celle-ci est « __faux__ » donc ne s'est pas exécutée entièrement ») exécuter la commande n° 2 ».

__Exemple__

Écrire un script affichant si on lui a passé zéro, un ou plusieurs paramètres. Ensuite il devra afficher les paramètres reçus.

```shell
#!/bin/sh 
# Script affichant si on lui passe zéro, un ou plusieurs paramètres 
# Ensuite il affiche ces paramètres 

# Test sur aucun paramètre 
test $# -eq 0 && echo "$0 n'a reçu aucun paramètre" 

# Test sur un paramètre 
test $# -eq 1 && echo "$0 a reçu un paramètre qui est $1" 

# Test sur plusieurs paramètres 
test $# -gt 1 && echo "$0 a reçu $# paramètres qui sont $*"
```

__Remarque__

Il est possible d'enchaîner les alternatives par la syntaxe `cde1 && cde2 || cde3`. L'inconvénient de cette syntaxe est qu'on ne peut placer qu'une commande en exécution de l'alternative, ou alors, si on désire placer plusieurs commandes, on est obligé de les grouper avec des parenthèses.

## L'alternative complexe

__Syntaxe__

```shell
if liste de commandes 
then 
    commande1 
    [ commande2 ?] 
[ else 
    commande3 
    [ commande4 ?] ] 
fi
```

La structure `if...then...[else]...fi` évalue toutes les commandes placées après le `if`, mais ne vérifie que le code de retour de la __dernière commande__ de la liste. Dans le cas où le programmeur voudrait placer plusieurs commandes dans la « liste de commandes », il doit les séparer par le caractère « _point-virgule_ » qui est un séparateur de commandes Shell. Dans la pratique, cette possibilité est très rarement utilisée, un script étant plus lisible si les commandes non vérifiées par le `if` sont placées avant celui-ci.

Si l'état de la dernière commande est « _vrai_ », le Shell ira exécuter l'ensemble des instructions placées après dans le bloc `then`, sinon, il ira exécuter l'ensemble des instructions placées dans le bloc `else` si celui-ci existe.

Dans tous les cas, le Shell ira exécuter les instructions éventuellement placées derrière le mot-clef `fi`, car celui-ci termine le `if`.

Il est possible d'imbriquer plusieurs blocs `if...fi` à condition de placer un mot-clef `fi` pour chaque mot-clef `if`.

On peut se permettre de raccourcir une sous-condition `else if...` par le mot-clef `elif`. Dans ce cas, il n'y a plus qu'un seul `fi` correspondant au `if` initial.

__Exemple avec des « `if` imbriqués »__

```shell
#!/bin/sh 
echo "Entrez un nombre" 
read nb 
if test $nb -eq 0 # if n°1 
then 
    echo "C'était zéro" 
else 
    if test $nb -eq 1 # if n°2 
    then 
        echo "C'était un" 
    else 
        echo "Autre chose" 
    fi # fi n°2 
fi # fi n°1
```

__Exemple avec des « elif »__

```shell
#!/bin/sh 
echo "Entrez un nombre" 
read nb 
if test $nb -eq 0 # if n°1 
then 
    echo "C'était zéro" 
elif test $nb -eq 1 # Sinon si 
then 
    echo "C'était un" 
else 
    echo "Autre chose" 
fi # fi n°1
```

## Le branchement à choix multiples

__Syntaxe__

```shell
case chaine in 
    val1) 
        commande1 
        [ commande2 ?] 
        ;; 
    [val2) 
        commande3 
        [ commande4 ?] 
        ;;] 
esac
```

La structure `case...esac` évalue la chaîne en fonction des différents choix proposés. À la première valeur trouvée, les instructions correspondantes sont exécutées.

Le double « _point-virgule_ » indique que le bloc correspondant à la valeur testée se termine. Il est donc obligatoire... sauf si ce bloc est le dernier à être évalué.

La chaîne et/ou les valeurs de choix peuvent être construites à partir de variables ou de sous-exécutions de commandes. De plus, les valeurs de choix peuvent utiliser les constructions suivantes :

|Construction |Signification                                                                |
|-------------|-----------------------------------------------------------------------------|
|`[x-y]`      |La valeur correspond à tout caractère compris entre `x` et `y` .             |
|[xy]         |La valeur testée correspond à `x` ou `y`                                     |
|`xx&#124;yy` |La valeur correspond à deux caractères `xx` ou `yy`                          |
|`?`          |La valeur testée correspond à un caractère quelconque                        |
|`*`          |La valeur testée correspond à toute chaîne de caractères (cas « autres cas »)|

__Exemple__

Script qui fait saisir un nombre et qui évalue ensuite s'il est pair, impair, compris entre 10 et 100 ou autre chose.

```shell
#!/bin/sh 
# Script de saisie et d'évaluation simple du nombre saisi 

# Saisie du nombre 
echo "Entrez un nombre" 
read nb 

# Évaluation du nombre 
case $nb in 
    0) echo "$nb vaut zéro";; 
    1|3|5|7|9) echo "$nb est impair";; 
    2|4|6|8) echo "$nb est pair";; 
    [1-9][0-9]) echo "$nb est supérieur ou égal à 10 et inférieur à 100";; 
    *) echo "$nb est un nombre trop grand pour être évalué" 
esac
```

## La boucle sur conditions

__Syntaxe__

```shell
while liste de commandes 
do 
    commande1 
    [ commande2 ?] 
done 
until liste de commandes 
do 
    commande1 
    [ commande2 ?] 
done
```

La boucle `while do...done` exécute une séquence de commandes tant que la dernière commande de la « liste de commandes » est « _vrai_ » (statut égal à zéro).

La boucle `until do...done` exécute une séquence de commandes tant que la dernière commande de la « liste de commandes » est « _faux_ » (statut différent de zéro).

__Exemple__

Script qui affiche tous les fichiers du répertoire courant et qui, pour chaque fichier, indique si c'est un fichier de type « répertoire », de type « ordinaire » ou d'un autre type.

```shell
#!/bin/sh 
# Script d'affichage d'informations sur les fichiers du répertoire courant 

# La commande "read" lit l'entrée standard. Mais cette entrée peut être redirigée d'un pipe 
# De plus, "read" renvoie "vrai" quand elle a lu et "faux" quand il n'y a plus rien à lire 
# On peut donc programmer une boucle de lecture pour traiter un flot d'informations 
ls | while read fic # Tant que le "read" peut lire des infos provenant du "ls" 
do 
    # Évaluation du fichier traité 
    if test -d "$fic" 
    then 
        echo "$fic est un répertoire" 
    elif test -f "$fic" 
    then 
        echo "$fic est un fichier ordinaire" 
    else 
        echo "$fic est un fichier spécial ou lien symbolique ou pipe ou socket" 
    fi 
done
```
