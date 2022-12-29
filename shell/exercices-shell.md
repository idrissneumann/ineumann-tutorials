# Exercices shell scripts

Entraînez-vous avec Bash (ou autres langages shell compatibles).

Cet article regroupe des exercices corrigés en shell scripts Bash et autres langages shell compatibles. Les exercices sont classés par niveaux et peuvent posséder plusieurs solutions.

## Informations sur l'article

L'article a été originellement publié par Idriss Neumann sur developpez.com [ici](https://ineumann.developpez.com/tutoriels/linux/exercices-shell/).

* Publié le 13 décembre 2009
* Mis à jour le 20 juillet 2014 
* Niveau: **débutant**
* Licence: [![cc-by-nc-sa](../img/cc-by-nc-sa.png)](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr)

## Niveau débutant

### Exercice 1 - Appréciation de note

#### Énoncé

Créer un script qui demande à l'utilisateur de saisir une note et qui affiche un message en fonction de cette note :

* « très bien » si la note est entre 16 et 20
* « bien » lorsqu'elle est entre 14 et 16
* « assez bien » si la note est entre 12 et 14
* « moyen » si la note est entre 10 et 12
* « insuffisant » si la note est inférieur à 10

#### Solution

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 
 
echo "Entrez votre note :" 
read -r note 
 
if [ "$note" -ge 16 ]; then 
    echo "très bien" 
elif [ "$note" -ge 14 ]; then 
    echo "bien" 
elif [ "$note" -ge 12 ]; then 
    echo "assez bien" 
elif [ "$note" -ge 10 ]; then 
    echo "moyen" 
else 
    echo "insuffisant" 
fi
```

### Exercice 2 - Appréciation de note (v2)

#### Énoncé

Reprenez l'exercice 1 et faites en sorte que le programme se répète tant que l'utilisateur n'a pas saisi une note négative ou `q` (pour quitter).

Le script doit calculer le nombre de notes de saisies et en faire la moyenne tout à la fin.

#### Solution

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 
 
note=0 
moyenne=0 
i=0 
 
until [ "$note" -lt 0 ]; do 
    echo "Entrez votre note (q pour quitter) :" 
    read -r note 
    if [ "$note" = "q" ]; then 
        note=-1 
        echo "au revoir !" 
    elif [ "$note" -ge 16 ]; then 
        echo "très bien" 
    elif [ "$note" -ge 14 ]; then 
        echo "bien" 
    elif [ "$note" -ge 12 ]; then 
        echo "assez bien" 
    elif [ "$note" -ge 10 ]; then 
        echo "moyen" 
    elif [ "$note" -ge 0 ]; then 
        echo "insuffisant" 
    else 
        echo "au revoir !" 
    fi 
 
    if [ "$note" -ge 0 ]; then 
        let moyenne=$moyenne+$note 
        let i=$i+1 
    fi 
done 
 
if [ "$i" -le 0 ]; then 
    let i=1 
fi 
 
let moyenne=$moyenne/$i 
echo "La moyenne est de $moyenne ($i notes)"
```

### Exercice 3 - Nombre élevé à sa propre puissance

#### Énoncé

Créer un script qui prend un nombre en saisie et l'élève à sa propre puissance. C'est un peu le même principe que la factorielle mais cette fois, **l'usage de la boucle `for` est imposé**.

Exemple d'exécution :

```shell
[ ~] ./NomDuScript.sh 
Saisir une valeur : 
2 
2^2 = 4
```

#### Solution 1

Solution proposée par Idriss Neumann :

```shell
#!/bin/bash 
echo "Saisir une valeur" 
read -r value 
result=1 
for (( i=0 ; i<$value ; i++ )); do 
    let result=$result*$value 
done 
echo "$value^$value = $result"
```

#### Solution 2

Solution proposée par Idriss Neumann :

```shell
#!/bin/bash 
 
operation () { 
    result=1 
    for (( i=0 ; i<$value ; i++ )) 
    do 
        let result=$result*$value 
    done 
    echo "$value^$value = $result" 
} 
 
if [ "$#" -eq 0 ]; then 
    echo "Saisir une valeur" 
    read -r value 
else 
    value=$1 
fi 
operation
```

## Niveau intermédiaire

### Exercice 1 - Appréciation de note (v3)

#### Énoncé

Reprenez uniquement la version 1 de l'exercice. La note devra être donnée en paramètre ou bien saisie en cas d'absences d'arguments. La comparaison de la note devra être faite dans une fonction `appreciation()`.

#### Solution

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash
 
appreciation () { 
    if [ "$note" -ge 16 ]; then 
        echo "très bien" 
    elif [ "$note" -ge 14 ]; then 
        echo "bien" 
    elif [ "$note" -ge 12 ]; then 
        echo "assez bien" 
    elif [ "$note" -ge 10 ]; then 
        echo "moyen" 
    else 
        echo "insuffisant" 
    fi 
} 
 
# programme principal 
clear 
if [ "$#" -ne 0 ]; then 
    note=$1 
else 
    echo "Saisir une note" 
    read -r note 
fi 
appreciation
```

### Exercice 2 - TestUser

#### Énoncé

Créer un script qui vous propose le menu suivant :

```
1 - Vérifier l'existence d'un utilisateur
2 - Connaître l'UID d'un utilisateur
q - Quitter
```

L'utilisateur devra être saisi, à l'aide d'une fonction. Son existence devra être vérifiée à l'aide d'une autre fonction.

#### Solution

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 
 
function pause { 
    echo "Appuyez sur ENTER pour continuer" 
    read
} 
 
function saisirUser { 
    echo "Saisir l'utilisateur" 
    read -r util 
} 
 
function verifyUser { 
    if grep "^$util:" /etc/passwd > /dev/null; then 
        echo "L'utilisateur existe" 
    else 
        echo "L'utilisateur n'existe pas" 
    fi 
    pause    
} 
 
rep=1 
while [ "$rep" -eq 1 ]; do 
    clear 
    printf "menu :\n\n" 
    echo "1. Vérifier l'existence d'un utilisateur" 
    echo "2. Connaître l'UID d'un utilisateur" 
    echo -e "3. Quitter\n" 
    read -r choix 
    case "$choix" in 
        1) 
            saisirUser 
            verifyUser ;; 
 
        2)     
            saisirUser 
            id $util 
            pause ;; 
 
        q) 
            echo "Au revoir" 
            pause 
            rep=0 ;; 
        *) 
            echo "Erreur de saisie" 
            pause ;; 
    esac 
done
```

### Exercice 3 - Calculatrice

#### Énoncé

Créer un script dans lequel deux nombres opérandes et un signe opérateur (+-*/) devront être donnés en paramètres, ou saisis. Le script doit réaliser l'opération souhaitée.

Exemple :

```shell
[ ~] ./calculette.sh 7 + 4 
Le résultat est : 11
```

Le calcul devra être fait à l'aide d'une fonction `calcul ()`.

#### Solution 1

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 
 
saisir () { 
    printf "Saisir le premier nombre, puis le signe de l'opération puis le deuxième nombre :\n\n" 
    read -r nb1 
    read -r s 
    read -r nb2 
} 
 
calcul () { 
    case "$s" in 
        "+") let result=$nb1+$nb2 ;; 
        "-") let result=$nb1-$nb2 ;; 
        "*") let result=$nb1*$nb2 ;; 
        "/") let result=$nb1/$nb2 ;; 
        *) 
            let result=0 
            echo -e "Erreur de saisie !\nLe résultat est faux.";; 
    esac 
} 
 
calcul2 () { 
    let result=$nb1$s$nb2 
} 
  
if [ "$#" -eq 3 ]; then 
    nb1=$1 ; s=$2 ; nb2=$3 
else 
    saisir 
fi 
calcul 
echo "Le résultat est $result" 
calcul2 
echo "Calculé d'une autre façon : $result"
```

#### Solution 2

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 

if [ "$#" -lt 3 ]; then 
    echo "Erreur : Il manque des paramètres !" 
elif  [[ "$1" =~ ^[0-9]+$ ]] && [[ "$3" =~ ^[0-9]+$ ]]; then 
    if [[ "$2" =~ ^(\+|\-|\/|\*){1}$ ]]; then 
        if [ $3 -ne 0 ] || [ "$2" != "/" ]; then 
            echo "Le résultat est : "$(( $1 $2 $3 )) 
        else 
            echo "Erreur : division par 0 !" 
        fi 
    else 
        echo "Erreur : opérateur invalide !" 
    fi 
else 
    echo "Erreur : opérandes invalides !" 
fi
```

#### Solution 3

Solution proposée par Idriss Neumann :

```shell
#!/bin/sh 

if [ "$#" -lt 3 ]; then 
    echo "Erreur : Il manque des paramètres !" 
elif echo "$1$3" | grep -E "^[0-9]{2,}$" > /dev/null; then 
    if echo "$2" | grep -E "^(\+|\-|\/|\*){1}$" > /dev/null; then 
        if [ $3 -ne 0 ] || [ "$2" != "/" ]; then 
            echo "Le résultat est : "$(( $1 $2 $3 )) 
        else 
            echo "Erreur : division par 0 !" 
        fi 
    else 
        echo "Erreur : opérateur invalide !" 
    fi 
else 
    echo "Erreur : opérandes invalides !" 
fi
```

### Exercice 4 - La factorielle

#### Énoncé

Créer un script qui permet de calculer et d'afficher la factorielle d'un nombre donné en paramètre (ou saisi en cas d'absence de paramètres).

#### Solution 1

Solution proposée par Idriss Neumann :

```bash
#!/bin/bash 
 
if [ "$#" -eq 0 ]; then 
    echo "Saisir une valeur : " 
    read -r val 
else 
    val=$1 
fi 
 
# Dans le cas où c'est négatif, on rend la valeur positive 
if [ "$val" -lt 0 ]; then 
    let val=-1*$val 
fi 
 
result=1 
val2="$val"
 
while [ "$val" -ne 0 ]; do 
    printf "$val " 
    let result=$result*$val 
    let val=$val-1 
    if [ "$val" -ne 0 ]; then 
        printf "* " 
    fi 
done 
 
echo "= $result"
```

#### Solution 2

Solution proposée par [Sve@r](https://www.developpez.net/forums/u85865/sve-r/) :

```shell
#!/bin/sh 
 
if test "$#" -eq 0; then 
    echo "Saisissez une valeur correcte" 
    read -r val 
    set -- $val 
fi 
 
nb=${nb:-$1} 
res=${res:-1} 
if test "$nb" -eq 0; then 
    echo $res 
    exit 
fi 
 
res=`expr $res \* $nb` 
nb=`expr $nb - 1` 
. $0
```
