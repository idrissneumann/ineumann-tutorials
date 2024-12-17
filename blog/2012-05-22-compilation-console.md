---
title: Initiation à la compilation en console avec gcc, g++, javac et make
description: Initiation à la compilation en console avec gcc, g++, javac et make
slug: compilation-console
authors: [ineumann]
tags: [c, c++, java, linux, shell, gcc, make, ubuntu, fedora, centos, rhel]
hide_table_of_contents: false
---

# Introduction

GCC signifie « _Gnu Compiler Collection_ », il s'agit d'un compilateur libre créé par le projet GNU. Il rassemble une panoplie de logiciels libres intégrés capables de compiler pour divers langages de programmation, dont le C, C++, Objective-C... GCC est à l'origine de la plupart des logiciels libres et est étroitement lié au noyau Linux. Il a été aussi porté sur quelques plateformes pour Windows comme MinGW qui est utilisé sur certains IDE comme Code::Blocks ou Dev C++.

# Installer `gcc`, `g++`, et `make`

Pour Ubuntu/Debian :

```shell
sudo apt-get install build-essential
```

ou encore :

```shell
sudo aptitude install build-essential
```

Pour Fedora, RHEL et CentOS :

```shell
[ ~] su -
root\'s password :
[ $] yum install gcc
[ $] yum install gcc-c++
```

Pour les autres distributions, renseignez-vous sur les différents paquets à installer et sur l'utilisation de votre gestionnaire des paquets.

# Compiler en C avec `gcc`

Pour compiler un seul fichier .c :

```shell
gcc nom_du_fichier.c -o nom_du_programme
```

ou encore :

```shell
cc nom_du_fichier.c -o nom_du_programme
```

`cc` étant désormais un alias de la commande `gcc` (à l'origine c'était le compilateur C sur Unix dont GCC est le clone GNU).

Pour exécuter le programme, faites `./nom_du_programme` en console (attention au chemin relatif).

Remarque : si vous faites uniquement `gcc nom_du_fichier` ou `cc nom_du_fichier`, vous aurez l'apparition d'un exécutable `a.out`.

Pour compiler un projet composé des fichiers : `main.c`, `fonctions.c` et `header.h` :

```shell
gcc main.c fonctions.c -o nom_du_programme
```

Il faut suivre l'ordre : `cible ; dépendance`.

Remarques :

* Il faut parfois inclure l'option `-lm` dans la commande de compilation pour inclure certaines bibliothèques ou fichiers d'entêtes comme math.h.
* Pour afficher les warnings, il faut utiliser certaines options comme `-Wall`, `-Wextra`... voir la documentation de GCC ou la manpage de ce dernier.
* L'option `-c` indique à GCC de ne pas linker, vous n'aurez pas de fichier.o, exemple : `gcc -c main.c -o nom_du_programme`.

# Compiler en C++ avec `g++` et en java avec `javac`

Pour compiler en C++, il s'agit exactement du même processus sauf qu'il faut remplacer la commande `gcc` par `g++` dans les commandes de compilation.

Exemples :

```shell
g++ nom_du_fichier.cpp -o nom_du_programme
g++ main.cpp fonctions.cpp -o nom_du_programme
```

Pour le cas de Java, les commandes sont légèrement plus simples :

```shell
javac nom_du_fichier.java
java NomProgramme
```

# Compiler ses projet avec make

Vous devez créer un fichier nommé `Makefile` dans le répertoire des sources afin de pouvoir utiliser la commande `make`. Il s'agit du fichier d'instruction dans lequel vous écrirez les commandes qui doivent être exécutée par la commande `make`.

Les commandes doivent respecter cet ordre :

```makefile
cible: dépendances
commandes
# ...
```

__Attention__ : vous devez impérativement respecter les tabulations devant les commandes.

Voici un exemple de Makefile pour un projet en C composé d'un fichier `main.c`, `fonction.c` et `header.h` :

```makefile
# Ceci est un commentaire
# création de l'exécutable 'NomDuProgramme'

NomDuProgramme: main.o fonctions.o
gcc main.o fonctions.o -o NomDuProgramme

main.o: main.c
gcc -c main.c -o main.`

fonctions.o: fonctions.c
gcc -c fonctions.c -o fonctions.o

# suppression des fichiers.o
clean:
rm -rf *.o
```

Les commandes à exécuter ensuite sont :

* `make` ou `make NomDuProgramme` : compiler votre projet
* `make clean` : supprimera tout les fichiers ayant l'extension `.o`

Mais pour l'utilisation des warnings, l'écriture deviendrait très laborieuse. C'est pourquoi, il est préférable d'utiliser une variable qui contient toutes les options de gcc souhaitées.

Exemple :

```makefile
# Déclaration de la variable "warnings"

warnings = -Wall -Wextra - pedentic -ansi -Wwrite-strings
-Wstrict-prototypes -Wuninitialized -Wunreachable-code

#création de l'exécutable 'NomDuProgramme'

NomDuProgramme: main.o fonctions.o
gcc main.o fonctions.o -o NomDuProgramme

main.o: main.c
gcc -c main.c $(warnings) -o main.o
# attention, les parenthèses sont importantes ici

fonctions.o: fonctions.c
gcc -c fonctions.c $(warnings) -o fonctions.o

#suppression des fichiers.o
clean:
rm -rf *o
```
