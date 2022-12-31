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

## Décalage des paramètres

__Syntaxe__

```shell
shift [n]
```

Comme on peut le remarquer, le programmeur n'a accès de façon individuelle qu'aux variables `$1` à `$9`. Si le nombre de paramètres dépasse neuf, ils sont pris en compte par le script Shell, mais le programmeur n'y a pas accès de manière individuelle. Bien entendu, il peut y accéder en passant par la variable `$*`, mais il devra alors se livrer à des manipulations difficiles d'extraction de chaîne. Ainsi, la commande `echo $10` produira l'affichage de la variable `$1` suivi du caractère `0`.

__Remarque__

La syntaxe `echo ${10}` fonctionne en « Korn Shell » et « Bourne Again Shell » (et shells descendants), mais pas en « Bourne Shell ».

Il existe néanmoins en « Bourne Shell » un moyen d'accéder aux arguments supérieurs à neuf : il s'agit de l'instruction `shift [n]`, `n` étant facultativement positionné à `1` s'il n'est pas renseigné. Cette instruction produit un décalage des paramètres vers la gauche de `n` positions. Dans le cas de `shift` ou `shift 1`, le contenu de `$1` disparaît pour être remplacé par celui de `$2`; celui de `$2` fait de même pour recevoir le contenu de `$3`... jusqu'à `$9` qui reçoit le contenu du dixième argument. Ainsi un décalage de `n` paramètres fait disparaître les `n` premiers, mais récupère les `n` suivants `$9`.

De plus, les variables `$#`, `$*` et `$@` sont aussi modifiées pour correspondre à la nouvelle réalité. Seule la variable `$0` reste invariante. Ainsi, une simple boucle testant la valeur décroissante de `$#` en utilisant l'instruction `shift` permet d'accéder individuellement à tous les arguments.

__Remarque__

L'instruction `shift 0` ne décale pas les paramètres, mais elle est autorisée afin de ne pas générer d'erreur dans un programme (si par exemple la valeur qui suit le `shift` est issue d'un calcul, il sera inutile d'aller vérifier que ce calcul ne vaut pas `0`).

__Exemple__

Script qui récupère et affiche le 1er, 2e, 12e et 14e paramètres :

```shell
#!/bin/sh 
# Ce script récupère et affiche le 1er, 2e, 12e et 14e paramètre 

# Récupération des deux premiers paramètres qui seront perdus après le "shift" 
prem=$1 
sec=$2 

# Décalage de 11 positions pour pouvoir accéder aux 12e et 14e paramètres 
shift 11 

# Affichage des paramètres demandés (le 12e et le 14e ont été amenés en position 1 et 3 par le "shift") 
echo "Les paramètres sont $prem, $sec, $1, $3"
```

## Réaffectation volontaire des paramètres

__Syntaxe__

```shell
set [--] valeur1 [valeur2 ?]
```

L'instruction `set [--] valeur1 [valeur2 ...]` (qui sert à activer des options du Shell comme le debug) permet aussi de remplir les variables `$1`, `$2`..., `$9`, au mépris de leur ancien éventuel contenu, avec les valeurs indiquées. Il y a d'abord effacement de toutes les variables puis remplissage avec les valeurs provenant du `set`.

Bien évidemment les variables `$#`, `$*` et `$@` sont aussi modifiées pour correspondre à la nouvelle réalité. Comme toujours, la variable `$0` n'est pas modifiée.

Dans le cas où il serait nécessaire d'affecter la valeur `-x` (ou toute autre valeur avec « tiret »), il est alors nécessaire de faire suivre le `set` d'un double tiret `--` pour éviter que le Shell interprète ce `-x` comme une option d'activation.

__Remarque__

Rien n'oblige les valeurs placées après `set` d'être des chaînes figées. Il est donc possible d'y inclure des variables ou des sous-exécutions de commandes. En revanche, l'instruction `set` est la seule permettant de modifier les variables `$1`, `$2`… Autrement dit, on ne peut pas modifier ces variables par une instruction du style `1=valeur` ou `${1:=valeur}`.

## Le séparateur de champs internes

__Syntaxe__

```shell
IFS=chaîne
```

Lorsque l'instruction `set valeur1 [valeur2 …]` est exécutée, le Shell arrive à isoler et déconcaténer les différentes valeurs dans les différentes variables `$1`, `$2`… grâce à la variable d'environnement `IFS` (_Internal Field Separator_) en majuscules, qui contient le ou les caractères devant être utilisés pour séparer les différentes valeurs (« espace » par défaut).

Une modification du contenu de cette variable permet d'utiliser un (ou plusieurs) autres caractères pour séparer des valeurs avec la commande `set`.

__Remarque__

La variable `IFS` étant très importante pour l'analyseur syntaxique du Shell, il est conseillé de la sauvegarder avant de la modifier pour pouvoir la restaurer dans son état original après l'avoir utilisée.

__Exemple__

```shell
#!/bin/sh 
chaine="toto:titi/tata" # Préparation de la chaîne à affecter 
old=$IFS # Sauvegarde de la variable IFS 
IFS=:/ # L'IFS devient ":/" => le shell utilisera ":" ou "/" comme séparateur 
set $chaine # Déconcaténation de la chaîne suivant l'IFS 
IFS=$old # Récupération de l'ancien IFS 
echo $3 # Affichage du troisième argument ("tata")
```
