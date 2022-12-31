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

La structure `if...then...[else]...fi` évalue toutes les commandes placées après le « if », mais ne vérifie que le code de retour de la dernière commande de la liste. Dans le cas où le programmeur voudrait placer plusieurs commandes dans la « liste de commandes », il doit les séparer par le caractère « point?virgule » qui est un séparateur de commandes Shell. Dans la pratique, cette possibilité est très rarement utilisée, un script étant plus lisible si les commandes non vérifiées par le « if » sont placées avant celui-ci.

Si l'état de la dernière commande est « vrai », le Shell ira exécuter l'ensemble des instructions placées après dans le bloc « then », sinon, il ira exécuter l'ensemble des instructions placées dans le bloc « else » si celui-ci existe.

Dans tous les cas, le Shell ira exécuter les instructions éventuellement placées derrière le mot-clef « fi », car celui-ci termine le « if ».

Il est possible d'imbriquer plusieurs blocs « if...fi » à condition de placer un mot-clef « fi » pour chaque mot-clef « if ».

On peut se permettre de raccourcir une sous-condition « else if... » par le mot-clef « elif ». Dans ce cas, il n'y a plus qu'un seul « fi » correspondant au « if » initial.