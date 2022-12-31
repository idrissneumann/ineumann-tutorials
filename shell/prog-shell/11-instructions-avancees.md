# Les instructions avancées

## L'inclusion de script dans un script

__Syntaxe__

```shell
source fic 
. fic
```

L'instruction `source` permet d'importer un fichier à l'endroit où la commande est exécutée, le fichier importé venant remplacer la ligne contenant la commande. Les habitués du langage C reconnaîtront l'effet provoqué par la directive de préprocesseur `#include`.

Ceci est utile dans les situations où de multiples scripts utilisent un fichier de données communes ou une bibliothèque de fonctions.

L'instruction `.` (point) est un synonyme de l'instruction `source`.

__Exemple__

Un script qui se charge lui-même `n` fois :

```shell
#!/bin/sh 

# Nb limite de chargements pris dans $1 s'il existe sinon pris par défaut à 100 
limite=${1:-100} 

# Initialisation compteur s'il n'existe pas 
cpt=${cpt:-0} 

# Incrément et affichage du compteur 
cpt=`expr $cpt + 1` 
echo "cpt=$cpt" 

# Si le compteur n'a pas atteint la limite on importe le script ici 
test $cpt -lt $limite && source $0 # Tout le script est intégralement recopié sous la ligne courante 

# Et tout recommence à l'identique (la partie du code qui suit est une illustration du comportement) 
#!/bin/sh (traité ici comme un commentaire, car il ne se trouve pas en 1re ligne) 

# Nb limite de chargements pris dans $1 s'il existe sinon pris par défaut à 100 
limite=${1:-100} # La variable est réinitialisée avec $1 qui n'a pas changé 

# Initialisation compteur s'il n'existe pas 
cpt=${cpt:-0} # Le compteur est réinitialisé avec sa valeur précédente 

# Incrément et affichage du compteur 
cpt=`expr $cpt + 1` 
echo "cpt=$cpt" 

# Si le compteur n'a pas atteint la limite on importe le script ici 
test $cpt -lt $limite && source $0 # Tout le script est intégralement recopié sous la ligne courante 

# Et tout recommence à l'identique (encore et encore?)
```

## La protection contre les signaux

__Syntaxe__

```shell
trap [-l] [-p] [commande | -] [no_signal | nom_signal …]
```
