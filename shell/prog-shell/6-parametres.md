# Les paramètres

Un paramètre, appelé aussi « argument », est un élément (chaîne de caractères) situé entre le nom du programme et la touche « Entrée » qui active le programme. Il s'agit en général d'éléments que le programme ne connaît pas à l'avance et dont il a évidemment besoin pour travailler. Ces éléments peuvent être nécessaires au programme pour son bon fonctionnement (`cp fic1 fic2`), ou facultatifs pour lui demander une variation dans son travail, c'est-à-dire un travail « optionnel » (`ls -l`).

Ils constituent généralement un substitut plus avantageux qu'une saisie en « interactif », car le programme n'a alors pas besoin, durant son traitement, de la présence d'un utilisateur qui répondra à ses questions. Celles-ci sont déjà prévues par les « arguments » que le programme connaît, et qu'il utilisera au moment opportun.

__Exemple__

```shell
Prompt> cp fic1 fic2 # Commande "cp", argument1 "fic1", argument2 "fic2" 
Prompt> ls -l # Commande "ls", argument1 "-l" 
Prompt> cd # Commande "cd" sans argument
```

## Récupération des paramètres

Dans un script, les paramètres ou arguments, positionnés par l'utilisateur exécutant le script, sont __automatiquement et toujours stockés__ dans des « variables automatiques » (remplies automatiquement par le Shell). Ces variables sont :

* `$0` : nom du script. Le contenu de cette variable est invariable. Il peut être considéré comme étant « à part » du reste des arguments
* `$1`, `$2`, `$3`... `$9` : argument placé en première, seconde, troisième... neuvième position derrière le nom du script...
* `$#` : nombre d'arguments passés au script
* `$*` : liste de tous les arguments (sauf `$0`) concaténés en une chaîne unique
* `$@` : liste de tous les arguments (sauf `$0`) transformés individuellement en chaîne. Visuellement, il n'y a pas de différence entre `$*` et `$@`

__Exemple d'un script `prog`__

```shell
#!/bin/sh 
echo $0 # Affichage nom du script 
echo $1 # Affichage argument n° 1 
echo $2 # Affichage argument n° 2 
echo $5 # Affichage argument n° 5 
echo $# # Affichage du nombre d'arguments 
echo $* # Affichage de tous les arguments
```

__Résultat de l'exécution__

```
Prompt> ./prog 
./prog 
0 
Prompt> ./prog a b c d e f g h i j k l m 
./prog 
a 
b 
e 
13 
a b c d e f g h i j k l m
```
