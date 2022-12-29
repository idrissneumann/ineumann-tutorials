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

Reprenez l'exercice 1 et faites en sorte que le programme se répète tant que l'utilisateur n'a pas saisi une note négative ou 'q' (pour quitter).

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

Créer un script qui prend un nombre en saisie et l'élève à sa propre puissance. C'est un peu le même principe que la factorielle mais cette fois, **l'usage de la boucle for est imposé**.

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
