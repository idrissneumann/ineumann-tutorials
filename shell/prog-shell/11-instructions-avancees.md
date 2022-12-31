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
trap [-l] [-p] [commande | -] [no_signal | nom_signal ...]
```

L'instruction `trap` permet de protéger un script contre un signal (cf : _Gestion des processus_).

Par défaut, tout script en exécution recevant un signal quelconque (depuis le clavier par « CTRL-C » ou depuis l'extérieur par « kill ») s'arrête. L'instruction `trap` permet de remplacer ce comportement en demandant le lancement d'une commande particulière dès réception d'un signal « sig1 » (ou éventuellement d'un signal `sig2` ...). Le signal à intercepter peut être représenté par son n° ou par son nom.

Ce genre d'instruction permet à un script de programmer le nettoyage de ses fichiers de travail temporaires en cas d'arrêt brutal.

Quelques détails :

* mettre une chaîne vide `""` comme commande inhibe totalement le signal concerné
* mettre un tiret `-` ou ne rien mettre du tout comme commande restaure le comportement par défaut (interruption du script)
* l'option `-l` liste les signaux disponibles avec leurs noms (tout comme la commande `kill` avec l'option `-l`)
* l'option `-p` liste les signaux qui ont été inhibés avec la commande qui leur est associée
* le signal `9` (`SIGKILL`) ne peut pas être détourné ni inhibé

__Exemple__

Un script qui est protégé contre l'interruption « _CTRL-C_ » :

```shell
#!/bin/sh 

# Fonction qui sera appelée lors d'un "CTRL-C" 
protect() 
{ 
    echo "Il est interdit d'arrêter ce script avant sa fin naturelle" 
} 

# Corps du programme principal 

# Mise en place de la protection contre le "CTRL-C" 
trap protect SIGINT # On peut écrire aussi "trap protect 2" 

# Mise en place d'un compteur 
limite=100 
cpt=0 

# Tant que le compteur n'a pas atteint sa limite 
while test $cpt -lt $limite 
do 
    # Incrément et affichage du compteur 
    cpt=`expr $cpt + 1` 
    echo "cpt=$cpt" 

    # Petite tempo pour laisser le temps de taper "CTRL-C" 
    sleep 1 
done
```

## Transformer une expression en ordre « Shell »

__Syntaxe__

```shell
eval arguments
```

L'instruction `eval` va interpréter les arguments et faire exécuter le résultat comme « commande » par le Shell. Le premier mot des arguments doit donc être une commande valide.

L'utilisation de l'instruction `eval` sert surtout à créer une indirection de variable et simuler ainsi un pointeur puisqu'il y a deux fois interprétation ; une fois par la commande `eval` et une fois par le Shell.

## Arithmétique sur les variables (« Korn Shell » et « Bourne Again Shell » et shells descendants)

__Syntaxe__

```shell
let expression
```

L'instruction `let` (qui n'est disponible que dans les shells récents) permet de réaliser des opérations arithmétiques sur des variables.

__Exemple__

```shell
Prompt> let a=5 # Identique à l'instruction "a=5" 
Prompt> let a=a+1 # Fait passer "a" à "6" 
Prompt> let a+=1 # Équivalent à l'instruction "let a=a+1"
```

__Remarque__

Les shells récents proposent aussi la syntaxe `$(( ))` pour les opérations arithmétiques.

__Exemple__

```shell
Prompt> a=5 
Prompt> a=$(( a+1 )) # Fait passer "a" à "6"
```

## Créer de nouveaux canaux d'entrées/sorties

__Syntaxe__

```shell
exec x <fichier 
exec y>fichier 
# ... 
# commande quelconque de lecture 0<&x 
# commande quelconque d'écriture 1>&y
```

L'instruction `exec` va modifier un canal existant ou créer un nouveau canal numéroté associé à un fichier. Ce canal pourra être en entrée ou en sortie selon le signe utilisé. Le numéro est au choix du programmeur, mais doit impérativement être supérieur à `2` s'il ne désire pas perdre ses canaux standards.

Ensuite, il sera possible de rediriger le canal d'entrée standard `0` à partir du canal entrant nouvellement créé. Les informations demandées par le programme seront alors directement lues depuis le fichier correspondant.

De même, il sera possible de rediriger le canal de sortie standard `1` ou de sorties d'erreurs `2` vers le canal sortant nouvellement créé. Les informations affichées par le programme seront alors directement enregistrées dans le fichier correspondant.

__Exemple__

Écriture d'un script lisant en parallèle les fichiers `/etc/passwd` et `/etc/group` :

```shell
#!/bin/sh 
# Script qui lit en parallèle les fichiers "/etc/passwd" et "/etc/group" 

# Chargement des fichiers dans les tampons numérotés "3" et "4" 
exec 3</etc/passwd 
exec 4</etc/group 

# Boucle infinie 
while true 
do 
    # Lecture des deux fichiers à partir des tampons numérotés 
    read passwd 0<&3 
    read group 0<&4 

    # Si les deux variables sont vides, sortie de boucle 
    test -z "$passwd" -a -z "$group" && break 

    # Affichage de chaque variable non vide 
    test -n "$passwd" && echo "passwd: $passwd" 
    test -n "$group" && echo "group: $group" 
done
```

__Remarque__

Il est tout à fait possible d'utiliser les n°`0`, `1` et `2` en paramètre de `exec`. Dans ce cas, le n° utilisé perd son association initiale (clavier ou écran) pour être remplacé par la nouvelle association (fichier).

## Gérer les options

__Syntaxe__

```shell
getopts [:]liste de caractères[:] variable
```

L'instruction `getopts` permet de programmer un script Shell pouvant recevoir des options.

__Exemple__

Essayons de créer un script `essai.sh` pouvant être appelé de plusieurs façons :

```shell
Prompt> ./essai.sh toto # Pas d'option et un paramètre 
Prompt>./essai.sh -a -b toto # Deux options distinctes et un paramètre 
Prompt>./essai.sh -ab toto # Deux options écrites en raccourci et un paramètre 
Prompt> ./essai.sh -g 5 toto # Une option avec valeur associée et un paramètre
```

On s'aperçoit rapidement que si on veut programmer « essai.sh » de façon à gérer tous les cas possibles, cela va conduire à une programmation lourde et difficile avec des extractions et manipulations de chaînes et de paramètres.

L'instruction `getopts` simplifie grandement le travail, car elle gère elle?même toutes les façons possibles de demander une option avec ou sans valeur associée. Il faut simplement se rappeler que les options se demandent toujours avant les paramètres du script.

L'instruction n'a besoin que de connaître les caractères indiquant les options attendues et d'une variable où stocker l'option effectivement trouvée.

Dans le cas où une option aurait besoin d'une valeur associée, on fait suivre le caractère correspondant à ladite option du caractère `:` (deux-points). Si l'option est effectivement demandée avec la valeur qui lui est associée, cette valeur sera alors stockée dans la variable interne `OPTARG` qui est spécifique à `getopts`.

L'instruction `getopts` ne récupérant que la première option demandée par l'utilisateur, il est nécessaire de l'inclure dans une boucle « while do... done » pour lui faire traiter toutes les options du script ; `getopts` renvoyant un statut différent de `0` (faux) quand il n'y a plus d'option à traiter. À chaque option trouvée, il suffit de positionner une ou plusieurs variables personnelles qu'on pourra utiliser par la suite.

De plus, la variable spécifique `OPTIND` étant incrémentée à chaque fois que `getopts` est invoquée (y compris la dernière invocation où `getopts` renvoie « faux »). Il est possible de décaler les paramètres du script avec un `shift` de `OPTIND - 1` pour éliminer les options et placer le premier paramètre utile en variable `$1`. Plus tard dans le script, on pourra réutiliser les variables positionnées lors de la boucle d'analyse des options pour traiter le fait qu'une option a été ou pas demandée.

En cas d'option non prévue dans la liste, l'instruction `getopts` affiche un message d'erreur à l'écran. Cet affichage peut être inhibé en faisant précéder la liste des options possibles du caractère `:` (deux-points).

Et enfin l'instruction `getopts` arrête son traitement dès qu'elle rencontre deux `-` (tirets) accolés ce qui permet à l'utilisateur de faire traiter comme argument et non comme option une valeur avec un tiret (un nombre négatif par exemple).

__Exemple__

Écriture d'un script pouvant recevoir les options `-a` et « -b » sans valeur associée, une fois `-c` avec valeur associée et plusieurs fois `-d` avec valeurs associées :

```shell
#!/bin/sh 
# Script qui traite plusieurs options et qui affiche ce qu'il a analysé 
# Options possibles: -a -b -c val -d val [-d val] ... 

# Récupération de chaque option du script 
while getopts :abc:d: opt 
do 
    # Analyse de l'option reçue 
    case $opt in 
        a) # Mémorisation option "a" trouvée 
            opt_A="true" ;; 
        b) # Mémorisation option "b" trouvée 
            opt_B="true" ;; 
        c) # Mémorisation option "c" trouvée et mémorisation de sa valeur 
            opt_C="true" 
            val_C="$OPTARG" ;; 
        d) # Mémorisation option "d" trouvée et concaténation de sa valeur 
            opt_D="true" 
            val_D="$val_D $OPTARG" ;; 
        *) 
            echo "Usage: `basename $0` [-a] [-b] [-c val] [-d val1] [-d val2] [fic1 ...]" 
            exit 1 
        esac 
done 

# Décalage des paramètres pour placer le premier argument non optionnel en "$1" 
shift `expr $OPTIND - 1` 

# Affichage du résultat de l'analyse 
test -n "$opt_A" && echo "L'option A a été demandée" 
test -n "$opt_B" && echo "L'option B a été demandée" 
test -n "$opt_C && echo "L'option C a été demandée avec la valeur [$val_C]" 
test -n "$opt_D && echo "L'option D a été demandée avec les valeurs [$val_D]" 

# Affichage du reste des paramètres s'il y en a 
test $# -ne 0 && echo "Il reste encore $# paramètres qui sont $*" || echo "Il n'y a plus de paramètre"
```
