# Éléments de base du langage

## L'affichage

L'affichage est la première commande qu'un programmeur débutant pourra être tenté de faire. Cela lui permet en effet de visualiser directement à l'écran le résultat de ses actions.

L'affichage en Shell se fait avec la commande `echo`.

__Exemple__

```
Prompt> echo Hello World
```

## Les commentaires

Un commentaire sert à améliorer la lisibilité du script. Il est placé en le faisant précéder du caractère __croisillon__ (`#`). Tout ce qui suit ce croisillon est ignoré jusqu'à la fin de la ligne ; ce qui permet de mettre un commentaire sur une ligne d'instructions. Il ne faut pas oublier alors l'espace séparant la fin de l'instruction et le début du commentaire.

__Exemple__

```shell
#!/bin/sh 
# Ce programme affiche la date 
date # Cette ligne est la ligne qui affiche la date
```

## Le débogueur

Une procédure longue et difficile peut ne pas réussir du premier coup. Afin de détecter l'erreur, le Shell offre un outil de débogage. Il s'agit de l'instruction `set` agrémentée d'une ou plusieurs options suivantes :

* `v` : affichage de chaque instruction avant analyse => il affiche le nom des variables
* `x` : affichage de chaque instruction après analyse => il affiche le contenu des variables
* `e` : sortie immédiate sur erreur
  
Chaque instruction `set -...` active l'outil demandé qui sera désactivé par l'instruction `set +...`. On peut ainsi activer le « traqueur » sur une portion précise du programme source.

__Exemple__

```shell
#!/bin/sh 
set -x # Activation du débogage à partir de maintenant 
date # Cette ligne est la ligne qui affiche la date 
set +x # Désactivation du débogage à partir de maintenant
```

__Remarque__

Compte tenu du flot important d'informations produit par ces outils, il peut être avantageux de lui préférer un affichage des variables pouvant causer l'erreur (commande `echo`).

## Qui exécute ?

Rappelons qu'il existe plusieurs shells et que chacun d'eux possède des caractéristiques différentes. De plus, chaque utilisateur Unix peut demander à travailler dans le Shell de sa convenance. Il s'ensuit qu'un script écrit par un utilisateur travaillant en Bourne Shell ne fonctionnera pas forcément s'il est exécuté par un utilisateur travaillant en C-Shell.

L'utilisateur peut visualiser le Shell dans lequel il travaille en tapant la commande suivante :

```
Prompt> echo $0
```

Cependant, Unix cherche à assurer la portabilité de ses programmes. Il est donc nécessaire qu'un script écrit par un utilisateur travaillant en Bourne Shell puisse être exécuté par tous les utilisateurs, quels que soient leurs shells de travail.

Pour cela, il convient d'indiquer dans le script quel interpréteur utiliser pour exécuter ledit script. Si cette indication n'existe pas, le système utilisera l'interpréteur de travail affecté à l'utilisateur pour analyser et exécuter le script en question, interpréteur pas forcément compatible avec la syntaxe du script.

Cette indication se porte en début de script avec la ligne `#!interpréteur`.

__Exemple en Bourne Shell__

```shell
#!/bin/sh # Ce script sera traité par le programme "/bin/sh" (Bourne Shell) 
date # Demande à l'interpréteur "/bin/sh" de lancer le programme "date"
```

__Exemple en Korn Shell__

```shell
#!/bin/ksh # Ce script sera traité par le programme "/bin/ksh" (Korn Shell) 
date # Demande à l'interpréteur "/bin/ksh" de lancer le programme "date"
```

Ici, cas particulier, le caractère `#` (croisillon) de la première ligne combiné au caractère `!` (point d'exclamation) n'est plus pris comme un commentaire, mais comme une instruction indiquant quel programme a la charge d'analyser le script.

__Autre exemple__

Cet exemple ne fonctionnera qu'une seule fois :

```shell
#!/bin/rm # Ce script sera traité par le programme "/bin/rm" (effacement) 
# Le script s'efface donc lui-même - Ici le script est déjà effacé 
# Quoi que l'on mette ici, cela ne sera pas exécuté, cela n'existe déjà plus?
```
