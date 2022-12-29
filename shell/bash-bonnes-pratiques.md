# Quelques bonnes pratiques dans l'écriture de scripts en Bash

Ce cours recense un ensemble de rappels et bonnes pratiques à privilégier dans l'écriture de scripts shell généralement implémentés en Bash. Il a été rédigé à partir d'erreurs couramment rencontrées au travail ou encore sur différents forums.

Ce cours n'a pas pour vocation à reprendre les bases de la programmation de scripts shell et nécessite d'avoir quelques notions. Si ce n'est pas votre cas, nous vous recommandons fortement de lire [ce cours](https://frederic-lang.developpez.com/tutoriels/linux/prog-shell/) au préalable.

## Informations sur l'article

L'article a été originellement publié par Idriss Neumann sur developpez.com [ici](https://ineumann.developpez.com/tutoriels/linux/bash-bonnes-pratiques/).

* Publié le 28 août 2013
* Mis à jour le 21 juillet 2014 
* Niveau: **confirmé**
* Licence: [![cc-by-nc-sa](../img/cc-by-nc-sa.png)](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr)

## Rappels sur les conditions

On remarque régulièrement des confusions dans l'utilisation des opérateurs de la commande `test` ou programmes dérivés (crochets ou doubles-crochets), notamment dans la distinction des opérateurs de chaînes et des opérateurs de nombres entiers.

Nous allons donc commencer par rappeler les principaux opérateurs sur nombres entiers :

* `-eq` : égalité entre les deux opérandes (`g = d`)
* `-ne` : inégalité entre les deux opérandes (`g <> d`)
* `-ge` : supériorité de l'opérande de gauche sur l'opérande de droite (`g >= d`)
* `-gt` : supériorité stricte de l'opérande de gauche sur l'opérande de droite (`g > d`)
* `-le` : infériorité de l'opérande de gauche sur l'opérande de droite (`g <= d`)
* `-lt` : infériorité stricte de l'opérande de gauche sur l'opérande de droite (`g < d`)

Les opérateurs de comparaison de chaînes quant à eux sont les suivants :

* `=` ou `==` : égalité entre les deux opérandes
* `!=` : inégalité entre les deux opérandes
* `=~` : test sur expression régulière (l'opérande de droite doit vérifier l'expression régulière passée comme second opérande). Cet opérateur n'existe qu'en Bash à partir de la version 3 et ne s'utilise qu'avec la syntaxe des doubles-crochets (commande `test` étendue intégrée à KSH et Bash)

Exemple de confusion entre les deux types d'opérateurs :

```bash
[ ~/test]$ var="01" 
[ ~/test]$ [ "$var" = "1" ] && echo "OK" || echo "KO" 
KO 
[ ~/test]$ [ "$var" -eq "1" ] && echo "OK" || echo "KO" 
OK
```

Ici on voit qu'une égalité entre les opérandes `1` et `01` est vraie au sens mathématique du terme tandis qu'elle est fausse si l'on compare les deux opérandes en tant que chaînes de caractères. Il faut donc faire rigoureusement attention à ce que l'on souhaite vérifier afin d'éviter les comportements inattendus.

## Protéger ses opérandes

Il est important de prendre l'habitude de protéger ses opérandes, soit en privilégiant la syntaxe des doubles-crochets apparue dans KSH 88, soit en prenant l'habitude de systématiquement encadrer ses variables par des « doubles-quotes ».

Exemples de tests avec des opérandes non protégés provoquant ainsi des erreurs :

```bash
[ ~/test]$ var="string with spaces"
[ ~/test]$ [ $var = "string with spaces" ] && echo "OK" || echo "KO" 
bash: [: trop d\'arguments 
KO 
[ ~/test]$ [ "$var" = string with spaces ] && echo "OK" || echo "KO" 
bash: [: trop d\'arguments 
KO
```

Exemples de tests avec des opérandes protégés :

```bash
[ ~/test]$ var="string with spaces"
[ ~/test]$ [ "$var" = "string with spaces" ] && echo "OK" || echo "KO"
OK 
[ ~/test]$ [[ $var = "string with spaces" ]] && echo "OK" || echo "KO"
OK
```

## Boucler sur une sortie de commande

### Règles générales

Malgré une très forte présence de beaucoup de scripts, les syntaxes suivantes de boucles permettant de parcourir des sorties de commandes sont à éviter dans la plupart des cas :

```bash
for i in $(commande); do 
    #... 
done 
 
for i in `commande`; do 
    #...; 
done
```

De manière générale, il est préférable de privilégier les syntaxes suivantes :

```bash
commande|while read -r; do 
    #... 
done

while read -r; do 
    #... 
done < <(command)

while read -r; do 
    #... 
done <<< "$(command)"
```

### Exemples d'erreurs courantes

Pour illustrer ce que nous venons d'expliquer dans la partie précédente, nous allons essayer de créer un script qui parcourt un répertoire `test` et qui, pour chaque fichier de ce répertoire, affiche le nom du fichier et ses droits.

Voici le contenu du répertoire `test` :

```bash
[ ~/test]$ ls -l 
total 0 
-rw-rw-r-- 1 idriss idriss 0 août  09 12:44 file1 
-rw-rw-r-- 1 idriss idriss 0 août  09 12:44 file2 
-rw-rw-r-- 1 idriss idriss 0 août  09 12:44 file with spaces 
-rwxrwxr-x 1 idriss idriss 177 août  09 12:54 script.sh
```

On notera donc que ce répertoire comporte un fichier dont le nom contient des espaces. Voici une première version du script utilisant une des syntaxes à éviter :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

for file in $(ls $DIR); do 
    # Affichage du nom du fichier et de ses droits 
    echo "Fichier : "$file" a pour droits : "$(stat -c "%A" "$file") 
done
```

À l'exécution de ce script, on obtient le résultat suivant :

```bash
[ ~/test]$ ./script.sh 
Fichier : file1 a pour droits : -rw-rw-r-- 
Fichier : file2 a pour droits : -rw-rw-r-- 
stat: impossible d'évaluer «file»: Aucun fichier ou dossier de ce type 
Fichier : file a pour droits : 
stat: impossible d'évaluer «with»: Aucun fichier ou dossier de ce type 
Fichier : with a pour droits : 
stat: impossible d'évaluer «spaces»: Aucun fichier ou dossier de ce type 
Fichier : space a pour droits : 
Fichier : script.sh a pour droits : -rwxrwxr-x
```

Au vu du résultat, on peut en déduire que la boucle `for` ne parcourt non pas un ensemble de fichiers, mais un ensemble de valeurs ou de mots renvoyés par la commande `ls`, ce qui peut s'avérer problématique.

Voici une version fonctionnelle du script :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

ls $DIR|while read -r; do 
    # Affichage du nom du fichier et de ses droits 
    echo "Fichier : $REPLY a pour droits : "$(stat -c "%A" "$REPLY") 
done
```

Et à l'exécution de cette version, on obtient un comportement normal :

```bash
[ ~/test]$ ./script.sh 
Fichier : file1 a pour droits : -rw-rw-r-- 
Fichier : file2 a pour droits : -rw-rw-r-- 
Fichier : file with spaces a pour droits : -rw-rw-r-- 
Fichier : script.sh a pour droits : -rwxrwxr-x
```

On notera que la boucle « while » parcourt ici le résultat de la commande `ls` ligne par ligne ce qui nous permet de prendre en compte le fichier dont le nom est composé d'espaces comme une ligne et donc comme un élément parcouru.

Il faut également noter qu'avec la syntaxe du « pipe » (caractère `|`), la boucle while est exécutée dans un sous-shell. Par conséquent toute variable valorisée dans cette boucle perdrait sa valeur à la fin de la boucle (qui correspond ici à la fin de l'exécution du sous-shell).

Prenons par exemple ce script qui tente d'afficher le nom, du dernier fichier, qui comporte des espaces :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

nomFichierAvecEspace="" 
ls $DIR|while read -r; do 
    [[ $REPLY =~ .*\ .* ]] && nomFichierAvecEspace="$REPLY" 
done 

echo "Nom du fichier avec des espaces : $nomFichierAvecEspace"
```

À l'exécution de celui-ci :

```bash
[ ~/test]$ ./script.sh 
Nom du fichier avec des espaces : 
[ ~/test]$
```

Une correction possible consiste à déléguer une partie du script au sous-shell :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

nomFichierAvecEspace="" 
ls $DIR| 
( 
    while read -r; do 
        [[ $REPLY =~ .*\ .* ]] && nomFichierAvecEspace="$REPLY" 
    done 

    echo "Nom du fichier avec des espaces : $nomFichierAvecEspace" 
)
```

À l'exécution de cette version :

```bash
[ ~/test]$ ./script.sh 
Nom du fichier avec des espaces : file with spaces 
[ ~/test]$
```

Il est également possible d'affecter la sortie d'un sous-shell à une variable de la même façon que pour la sous-exécution d'une commande :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 
fileWithSpaces="" 

fileWithSpaces=$(ls $DIR| ( 
    while read -r; do 
        [[ $REPLY =~ .*\ .* ]] && nomFichierAvecEspace="$REPLY" 
    done 
    echo $nomFichierAvecEspace # sortie du sous-shell 
)) 
echo "Nom du fichier avec des espaces : $fileWithSpaces"
```

D'autres alternatives sont possibles :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 
fileWithSpaces=""
 
while read -r; do
    [[ $REPLY =~ .*\ .* ]] && fileWithSpaces="$REPLY" 
done < <(ls)

echo "Nom du fichier avec des espaces : $fileWithSpaces"
```

Ou encore :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 
fileWithSpaces=""
 
while read -r; do
    [[ $REPLY =~ .*\ .* ]] && fileWithSpaces="$REPLY" 
done <<< "$(ls)"

echo "Nom du fichier avec des espaces : $fileWithSpaces"
```

Enfin, voici un dernier exemple d'erreur déjà rencontrée dans des scripts :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 
lstFile="$(ls $DIR)" 

# traitements entre temps qui créent des fichiers dans $DIR 
# et qui en suppriment d'autres (ou qui en renomment d'autres...) 
touch $DIR"/file3" 
rm -rf $DIR"/file with space" 

for file in $lstFile; do 
    # Affichage du nom du fichier et de ses droits 
    echo "Fichier : "$file" a pour droits : "$(stat -c "%A" "$file") 
done
```

À l'exécution de celui-ci :

```bash
[ ~/test]$ ./script.sh 
Fichier : file1 a pour droits : -rw-rw-r-- 
Fichier : file2 a pour droits : -rw-rw-r-- 
stat: impossible d'évaluer «file»: Aucun fichier ou dossier de ce type 
Fichier : file a pour droits : 
stat: impossible d'évaluer «with»: Aucun fichier ou dossier de ce type 
Fichier : with a pour droits : 
stat: impossible d'évaluer «spaces»: Aucun fichier ou dossier de ce type 
Fichier : space a pour droits : 
Fichier : script.sh a pour droits : -rwxrwxr-x 
[ ~/test]$ ls 
file1 file2 file3 script.sh
```

À l'exécution de celui-ci :

```bash
[ ~/test]$ ./script.sh 
Fichier : file1 a pour droits : -rw-rw-r-- 
Fichier : file2 a pour droits : -rw-rw-r-- 
stat: impossible d'évaluer «file»: Aucun fichier ou dossier de ce type 
Fichier : file a pour droits : 
stat: impossible d'évaluer «with»: Aucun fichier ou dossier de ce type 
Fichier : with a pour droits : 
stat: impossible d'évaluer «spaces»: Aucun fichier ou dossier de ce type 
Fichier : space a pour droits : 
Fichier : script.sh a pour droits : -rwxrwxr-x 
[ ~/test]$ ls 
file1 file2 file3 script.sh
```

On peut en déduire la conclusion suivante : ce n'est pas l'instruction « exécuter `ls` » qui est affectée à la variable, mais le résultat de la sous-exécution de cette commande. Cette commande ne sera donc exécutée qu'au moment de l'affectation et non au moment du parcours par la boucle for. Par conséquent, si le contenu du répertoire change entre temps, la boucle for n'en tiendra pas compte.

### Boucles avec incréments

La boucle for sur le retour de la commande `seq` est elle aussi couramment employée dans l'utilisation de boucles incrémentales :

```bash
[ ~/test]$ for i in $(seq 1 3); do echo $i; done 
1 
2 
3
```

Bien que cette syntaxe ne pose pas de problèmes à l'exécution, d'autres solutions sont possibles :

```bash
[ ~/test]$ for i in {1..3}; do echo $i; done 
1 
2 
3 
[ ~/test]$ for (( i=1 ; i<=3 ; i++ )); do echo $i; done 
1 
2 
3
```

## Éviter les processus inutiles

### Éviter la commande `ls` dans les scripts

Dans la plupart des cas, les `ls` présents dans les scripts sont superflus aussi bien pour parcourir une liste de fichiers que pour récupérer des informations sur des fichiers.

En effet, il est possible de s'abstraire de cette commande en privilégiant l'utilisation du métacaractère `*` (wildcard) lorsqu'il s'agit de parcourir une liste de fichiers et de la commande « stat » lorsqu'il s'agit de récupérer des informations sur un fichier comme les droits, la taille en mémoire, l'utilisateur propriétaire…

Exemple pour récupérer les droits sur un fichier `file` :

```bash
stat -c "%A" file # bonne façon de faire
ls -l file|cut -d" " -f1 # mauvaise façon de faire
```

Autre exemple, reprenons notre script précédent dans sa version corrigée :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

ls $DIR|while read -r; do 
    # Affichage du nom du fichier et de ses droits 
    echo "Fichier : "$REPLY" a pour droits : "$(stat -c "%A" "$REPLY") 
done
```

Il existe une optimisation possible en utilisant le métacaractère `*` (wildcard) :

```bash
#!/bin/bash 

DIR="/home/idriss/test" 

for file in $DIR"/"*; do 
    # Affichage du nom du fichier et de ses droits 
    echo "Fichier : "$file" a pour droits : "$(stat -c "%A" "$file") 
done
```

### Éviter la commande `cat` dans les scripts

La commande `cat` ou d'autres commandes telles que `more` ou `less` sont bien souvent employées de manière superflue pour parcourir le contenu d'un fichier. Essayons par exemple de parcourir le fichier `/etc/passwd` afin d'afficher une liste des noms des utilisateurs de l'OS :

```bash
#!/bin/bash 

# Affichage du nom des utilisateurs dans /etc/passwd 
cat /etc/passwd|while read -r; do 
    name=$(echo $REPLY|awk -F ":" '{print $1}') 
    echo "Nom : "$name 
done
```

Une optimisation possible :

```bash
#!/bin/bash 

# Affichage du nom des utilisateurs dans /etc/passwd 
while read -r; do 
    name=$(echo $REPLY|cut -d ":" -f1) # vous remarquerez qu'ici nous évitons d'utiliser un tank pour tuer une mouche 
    echo "Nom : "$name 
done < /etc/passwd
```

Bien entendu, ceci aurait suffi pour le même résultat :

```shell
awk -F ":" '{print "Nom : "$1}' /etc/passwd
```

### Profiter de la puissance de Bash

Pour les utilisateurs de Bash dans ses récentes versions, il est possible d'éviter les tests sur expressions régulières nécessitant de passer par des commandes telles que `grep`, `expr`...

Exemple pour une fonction qui teste si une valeur passée en argument est un entier ou pas :

```bash
#!/bin/bash 

isInt(){ 
    if echo $1|grep -E "^[0-9]+$" >/dev/null; then 
        echo "OK" 
    else 
        echo "KO" 
    fi 
} 

isInt "12345" # écrira "OK" 
isInt "chaine" # écrira "KO"
```

Version du script optimisée avec Bash :

```bash
#!/bin/bash 

isInt(){ 
    if [[ $1 =~ ^[0-9]+$ ]]; then 
        echo "OK" 
    else 
        echo "KO" 
    fi 
} 

isInt "12345" # écrira "OK" 
isInt "chaine" # écrira "KO
```

Bien entendu, à ne pas faire si le script doit être portable et également tourner sur d'autres plateformes Unix non GNU (AIX, Solaris, BSD…).

Par ailleurs, cet exemple aurait également pu être écrit de la façon suivante :

```bash
#!/bin/bash 

isInt(){ 
    if let $1; then 
        echo "OK" 
    else 
        echo "KO" 
    fi 
} 

isInt "12345" # écrira "OK" 
isInt "chaine" # écrira "KO
```

### Autres exemples

Filtrer les doublons :

```bash
sort fichier|uniq # mauvaise façon de faire
sort -u fichier # bonne façon de faire
```

Mélange de `sed`/`grep`/`awk`... quand une seule commande peut suffire :

```bash
[ ~]$ cat fichier 
ligne1 chaine value3 
ligne2 100 value4 
[ ~]$ awk -F " " '{print $2}' fichier|grep -E "^[0-9]+$" # mauvaise façon de faire
100 
[ ~]$ awk -F " " '{if($2 ~ /^[0-9]+$/){print $2}}' fichier # bonne façon de faire 
100
```

## Standardiser l'exécution de vos scripts

Il est important de documenter l'utilisation de ses scripts à l'aide d'options standards telles que `-h` ou encore `--help`. Nous allons dans cette partie décrire comment utiliser des options du type `-?` ou `--quelque_chose` à l'aide de l'instruction shell `getopts` ou encore de la commande `getopt`.

Réalisons le script devant fonctionner de la manière suivante :

```bash
[ ~]$ ./script.sh 
ERREUR : parametres invalides ! 
utilisez l'option -h pour en savoir plus 
[ ~]$ ./script.sh -h 
Usage: ./script.sh [options] 
-h : afficher l'aide 
-b <prenom> : saluer <prenom> 
[ ~]$ ./script.sh -b 
ERREUR : parametres invalides ! 
utilisez l'option -h pour en savoir plus 
[ ~]$ ./script.sh -bJean 
Bonjour Jean 
[ ~]$
```

Implémentation du script avec `getopt` :

```bash
#!/bin/bash 

error(){ 
    echo "ERREUR : parametres invalides !" >&2 
    echo "utilisez l'option -h pour en savoir plus" >&2 
    exit 1 
} 

usage(){ 
    echo "Usage: ./script.sh [options]" 
    echo "-h : afficher l'aide" 
    echo "-b <prenom> : saluer <prenom>" 
} 

traitement(){ 
    echo "Bonjour "$1 
} 

# Pas de paramètre 
[[ $# -lt 1 ]] && error 

while getopts ":b:h" option; do 
    case "$option" in 
        b) traitement $OPTARG ;; 
        :) error ;; # il manque une valeur ($option = 'b' ici) 
        h) usage ;; 
        *) error ;; 
    esac 
done
```

On souhaite maintenant ajouter l'option `-help`. Il n'est pas possible d'utiliser des options longues avec « getopts », d'où l'utilité de la commande externe `getopt` :

```bash
#!/bin/bash 

error(){ 
    echo "ERREUR : parametres invalides !" >&2 
    echo "utilisez l'option -h pour en savoir plus" >&2 
    exit 1 
} 

usage(){ 
    echo "Usage: ./script.sh [options]" 
    echo "--help ou -h : afficher l'aide" 
    echo "-b <prenom> : saluer <prenom>" 
} 

traitement(){ 
    echo "Bonjour "$1 
} 

# Pas de paramètre 
[[ $# -lt 1 ]] && error 

# -o : options courtes 
# -l : options longues 
options=$(getopt -o h,b: -l help -- "$@") 

# éclatement de $options en $1, $2... 
set -- $options 

while true; do 
    case "$1" in 
        -b) traitement $2 
            shift 2;; # on décale la liste des options de 2 ($1 et $2 sont remplacés par $3 et $4 s'ils existent) 
        -h|--help) usage 
            shift;; # on décale la liste des options de 1 
        --) # fin des options 
            shift # on décale la liste des options de 1 
            break;; 
        *) error 
            shift;; # on décale la liste des options de 1 
    esac 
done
```

## Liens utiles

Voici quelques liens qui vous permettront d'approfondir vos connaissances dans la programmation Shell ou encore de vous entraîner :

* [Advanced Bash-Scripting Guide](http://tldp.org/LDP/abs/html/) ([traduction](http://abs.traduc.org/abs-fr/))
* [Un cours complet sur la programmation Shell](https://frederic-lang.developpez.com/tutoriels/linux/prog-shell/)
* [Une liste d'exercices corrigés pour débuter](./exercices-shell.md)
* [Présentation et cours Korn Shell (compatible avec le Bash)](https://marcg.developpez.com/ksh/)
* [La section « Le Shell » de la FAQ Linux](https://linux.developpez.com/faq/?page=Le-Shell)

## Remerciements

Je tiens tout d'abord à remercier les contributeurs des forums Shell Unix/Linux qui corrigent régulièrement le type d'erreurs évoquées dans ce cours sur les forums et qui m'ont donné l'idée de rédiger ce cours.

Je tiens également à remercier [sve@r](https://www.developpez.net/forums/u85865/sve-r/) pour sa relecture technique et ses conseils.

Je tiens enfin à remercier [ClaudeLELOUP](https://www.developpez.net/forums/u124512/claudeleloup/) pour son travail de relecture orthographique.
