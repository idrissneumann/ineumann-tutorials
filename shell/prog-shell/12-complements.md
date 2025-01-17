# Les compléments

Le chapitre précédent marquait la fin de l'apprentissage du Shell de base. Il reste néanmoins quelques manques dans le langage, comme « incrémenter une variable » (dans les shells anciens), « récupérer des informations dans un fichier »...

Tous ces manques ont été comblés par les nombreux programmeurs du monde Unix par la création de diverses commandes répondant aux besoins les plus courants.

Voici une description de quelques commandes utiles (liste non exhaustive). Attention, il est possible que les plus récentes ne soient pas encore présentes sur tous les Unix.

## Évaluer des expressions régulières avec la commande `expr`

Elle répond à beaucoup de besoins dans l'analyse des « _expressions régulières_ ». Avant d'examiner les possibilités de cette commande, on va d'abord parler de son statut d'exécution, car il reste indépendant du but de l'emploi de la commande.

__Statut de la commande__

* si l'expression est valide :
  * si la valeur que `expr` affiche n'est pas « 0 », le statut vaut « 0 »,
  * si la valeur que `expr` affiche est « 0 », le statut vaut « 1 » ;
* si l'expression est invalide, le statut vaut une autre valeur (en général il vaut « 2 »).

__Remarque__

Cette commande ne peut pas être utilisée comme booléen vrai/faux puisqu'elle ne respecte pas les conventions du Shell et qu'il la considérera comme « faux » lorsqu'elle aura renvoyé `1` (alors qu'elle s'est parfaitement bien déroulée). Mais rien n'empêche d'analyser en détail la valeur de son statut `$?`.

### Arithmétique

__Syntaxe__

```shell
expr opérande opérateur opérande [opérateur opérande]
```

La commande va réaliser l'opération mathématique demandée sur les opérateurs cités et afficher le résultat sur la sortie standard (l'écran). Les opérandes ne peuvent être que des __nombres entiers__ et le résultat de l'opération sera lui aussi sous la forme d'un nombre entier.

La priorité mathématique des opérateurs est respectée (multiplication, division et modulo prioritaires sur addition et soustraction). Voici leur symbolique :

* `+` (addition)
* `-` (soustraction)
* `\*` (multiplication ; attention l'étoile est un métacaractère Shell donc il doit être neutralisé)
* `/` (division euclidienne ou entière)
* `%` (modulo, qui correspond au reste d'une division entière)

__Exemple__

Incrémenter une variable pouvant jouer le rôle d'un compteur :

```shell
Prompt> i=5 # Affectation initiale 
Prompt> i=`expr $i + 1` # Utilisation du résultat de la commande 
Prompt> echo $i # Affichage final
```

### Comparaison

__Syntaxe__

```shell
expr opérande comparaison opérande
```

La commande `expr` va réaliser la comparaison mathématique demandée sur les opérateurs cités et afficher le résultat sur la sortie standard (l'écran). Les opérateurs ne peuvent être que des nombres entiers et le résultat de la comparaison sera `0` si la comparaison est « _faux_ », `1` si elle est « _vrai_ ».

Les comparaisons possibles sont :

* `=` (égal)
* `!=` (différent)
* `\<` (strictement inférieur à, attention le signe « inférieur » doit est un métacaractère et doit être protégé)
* `\<=` (inférieur ou égal à; attention le signe « inférieur » est un métacaractère et doit être protégé)
* `\>` (strictement supérieur à; attention le signe « supérieur » est un métacaractère et doit être protégé)
* `\>=` (supérieur ou égal à; attention le signe « supérieur » est un métacaractère et doit être protégé)

### Travail sur les chaînes de caractères

__Syntaxe__

```shell
expr chaîne : argument
```

La commande `expr` va indiquer si la chaîne demandée débute par l'argument indiqué. Si c'est le cas ; la commande affichera soit :

* le nombre de caractères de la chaîne qui correspondent à la totalité de l'argument
* la partie de l'argument demandé s'il a été mis entre parenthèses

__Exemples__

```shel
Prompt> expr "abcd" : "f" # affiche "0" ("abcd" ne commence pas par "f") 
Prompt> expr "abcd" : "a" # affiche "1" ("abcd" commence par "a") 
Prompt> expr "abcd" : "ab" # affiche "2" ("abcd" commence par "ab") 
Prompt> expr "abcd" : "a\(bc\)" # affiche "bc" ("abcd" commence par "abc" et "bc" est entre parenthèses) 
Prompt> expr "abcd" : "abcde" # affiche "0" ("abcd" ne commence pas par "abcde") 
Prompt> expr "abcd" : ".*" # affiche "4" (métacaractère "*" permettant d'avoir la longueur de la chaîne)
```

## Rechercher des chaînes avec la commande `grep`

__Syntaxe__

```shell
grep [option] expression [fichier1 ...]
```

La commande `grep` (Global Regular Expression Printer) permet d'extraire et d'afficher toutes les lignes contenant l'expression demandée. Les lignes sont prises dans l'entrée standard (clavier), mais peuvent être cherchées dans un ou plusieurs fichiers.

L'expression à chercher peut être une simple chaîne de caractères ou bien composée de métacaractères spécifiques à la commande `grep` qui sont :

* accent circonflexe (`^`) : placé en début d'expression, il indique à `grep` de ne chercher l'expression qu'en début de chaque ligne
* dollar (`$`) : placé en fin d'expression, il indique à `grep` de ne chercher l'expression qu'en fin de ligne
* point (`.`) : il permet de représenter un caractère quelconque, mais non nul dans l'expression
* étoile (`*`) : il indique que le caractère précédent peut se trouver entre zéro et un nombre infini de fois
* accolades(`{x,y}`) : elles permettent de spécifier que le caractère précédent doit être présent entre x et y fois
* crochets (`[]`) : ils permettent de spécifier des ensembles de caractères recherchés

Les options modifient le fonctionnement de la commande (ne pas tenir compte des majuscules, n'afficher que le nom des fichiers contenant l'expression, n'afficher que le nombre de lignes contenant l'expression, etc.).

D'autres commandes similaires existent :

* `fgrep` (fast grep) : plus rapide en exécution, mais ne permettant pas l'utilisation de métacaractères dans l'expression à chercher
* `egrep` (ehanced grep) : élargit les possibilités de recherche en donnant accès à d'autres métacaractères pour spécifier l'expression. Cette commande revient à utiliser l'option `-E` de la commande `grep`
* `awk` : utilise un script de programmation dans son propre langage (ressemblant beaucoup au langage « C ») pour traiter les données entrantes selon l'algorithme programmé par l'utilisateur

__Statut de la commande__

* si la commande trouve l'expression demandée (elle affiche au moins une ligne), le statut est `0`
* si la commande ne trouve pas l'expression demandée (rien n'est affiché), le statut est différent de `0` (en général, il vaut `1`)

__Exemple__

```shell
Prompt> cat /etc/passwd |grep "root" # Extraction à partir de l'entrée standard

Prompt> grep "root" /etc/passwd # Extraction à partir d'un fichier
```

## Découper des lignes avec la commande `cut`

__Syntaxe__

```shell
cut  fn [ dc] [ s] [fichier1 ...]
cut  cn [fichier1 ...]
```

La commande `cut` (couper) est un filtre vertical qui sélectionne le énième champ (option `-f` comme field) ou le énième caractère (option `-c`) de chaque ligne. Les lignes sont prises dans l'entrée standard (clavier), mais peuvent être cherchées dans un ou plusieurs fichiers.

Les champs de l'option `-f` sont découpés suivant le caractère tabulation. Ce réglage par défaut peut être changé en mettant l'option `-d` pour spécifier le caractère de séparation de champs (délimiteur). Il peut alors être demandé d'ignorer les lignes ne contenant pas le délimiteur spécifié avec l'option `-s`.

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> cat /etc/passwd |cut -f3-6 -d: # Extraction des champs 3 à 6 de chaque ligne

Prompt> cut -f1,6 -d: /etc/passwd # Extraction des champs 1 et 6 de chaque ligne
```

## Trier les informations avec la commande `sort`

__Syntaxe__

```shell
sort [ n] [ r] [ o output] [ k pos] [ tc] [fichier1 ...]
```

La commande `sort` va trier les lignes de façon alphabétiquement croissante pour les afficher à l'écran. Les lignes sont prises dans l'entrée standard (clavier), mais peuvent être cherchées dans un ou plusieurs fichiers.

Le tri peut être inversé (option « -r »), les lignes triées sur plusieurs champs (option `-k`), le délimiteur de champs peut être spécifié (option `-t`) et le contenu des champs peut être considéré comme étant des nombres (option `-n`).

Enfin, il est possible de spécifier le fichier dans lequel sera écrit le résultat du tri (option `-o`) ce qui permet de demander à trier un fichier et le réécrire sur lui-même (ce qui n'est pas possible avec un pipe).

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> cat /etc/passwd |sort -k3 -n -t:     # Tri numérique sur le 3e champ

Prompt> sort -r -k4 -t: /etc/passwd -o /etc/passwd # Tri inversé et réécriture
```

## Filtrer les informations avec la commande `sed`

__Syntaxe__

```shell
sed [ e script] [ e script] ... [ f fichier_script] [fichier1 ...]
```

La commande `sed` (Stream Editor) est un éditeur de flux. Elle permet de filtrer un flux de données au travers d'un ou plusieurs scripts basés sur l'éditeur `ed` (ex. : `s/x/y/g` remplace chaque `x` par un `y` pour chaque ligne) pour avoir en sortie un flux de données modifiées. Le script peut être pris dans la ligne de commande (option `-e`) ou dans un fichier externe (option `-f`).

L'éditeur `ed` a été l'éditeur de base qui a donné naissance à l'éditeur `v`.

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> cat /etc/passwd |sed -e "/root/d" # Suppression de ligne

Prompt> sed -e "s/root/toro/g" -e "s/home/hm/g" /etc/passwd # Double substitution
```

## Transformer les informations avec la commande `tr`

La commande `tr` va transposer l'entrée standard où chaque caractère correspondant à un de ceux de la chaîne 1 sera transformé en caractère pris dans la chaîne 2.

Il est possible de demander la suppression de chaque caractère de la chaîne 1 (option `-d`) ; d'éliminer les caractères répétés (option `-s`) et de complétion (option `-c`).

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> cat /etc/passwd |tr "[a-z]" "[A-Z]" # Transposition minuscules en majuscules
```

## Compter les octets avec la commande `wc`

__Syntaxe__

```shell
wc [ c] [ l] [ w] [fichier1 ...]
```

La commande `wc` (Word Count) va compter le nombre de lignes, de mots et de caractères de l'entrée standard ou du fichier passé en paramètre. Il est possible de ne demander que le nombre de lignes (option `-l`), le nombre de mots (option `-w`) ou le nombre de caractères (option `-c`).

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> `echo "$LOGNAME" |wc -c # Affichera le nombre de caractères de la variable
```

## Afficher une séquence de nombres avec la commande `seq`

__Syntaxe__

```shell
seq [option] dernier
seq [option] premier dernier
seq [option] premier incrément dernier
```

La commande `seq` (séquence) permet d'afficher les nombres entiers situés entre deux intervalles de façon croissante ou décroissante avec possibilité d'avoir un incrément particulier.

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

## Afficher des données formatées avec la commande `printf`

__Syntaxe__

```shell
printf format [arguments]
```

La commande `printf` (reprise à partir de la fonction `printf()` du C) permet d'afficher les arguments au format demandé.

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

## Découper les noms avec les commandes `basename` et `dirname`

__Syntaxe__

```shell
basename argument [.extension]

dirname argument
```

Les commandes `basename` et `dirname` ont pour but d'afficher respectivement le nom de base de l'argument demandé (le nom qui suit le dernier « / » de l'argument) ou le nom du répertoire (toute l'arborescence précédent le dernier `/`) de l'argument.

Dans le cas de `basename`, si l'argument possède une extension (`.gif`, `.c`...), il est possible de demander à la commande d'enlever cette extension en indiquant l'extension à enlever.

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt>rep=`pwd` # Récupère le répertoire courant dans la variable "rep"

Prompt> basename $rep # Donnera le nom de base de la variable "rep"

Prompt> dirname $rep # Donnera le nom du répertoire père de la variable "rep"
```

## Filtrer les arguments avec la commande `xargs`

__Syntaxe__

```shell
xargs [ dc] [commande [arguments commande] ]
```

La commande `xargs` est un filtre qui sert à passer un grand nombre d'arguments à une commande qui ne peut en accepter qu'un petit nombre. Il constitue une bonne alternative aux guillemets inversés dans les situations où cette écriture échoue avec une erreur `too many arguments`.

Cette commande va recevoir en entrée les arguments à traiter et les découpera en morceaux suffisamment petits pour que la commande citée puisse les traiter.

Les arguments sont découpés suivant le caractère _espace_ ou _tabulation_. Ce réglage par défaut peut être changé en mettant l'option `-d` pour spécifier le caractère de séparation des arguments (délimiteur).

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt>grep -l toto `ls` # Recherche "toto" dans les fichiers donnés par "ls"

sh: /bin/grep: Too many arguments # "grep" ne peut pas traiter autant de fichiers

Prompt>ls |xargs grep -l toto # "xargs" découpera le "ls" pour le "grep"
```

## Mathématiques en virgule flottante avec la commande `bc`

__Syntaxe__

```shell
bc [-l]
```

La commande `bc` (Basic Calculator) permet d'effectuer des calculs mathématiques (comme la commande `expr`), mais la commande connaît quelques fonctions mathématiques (comme « racine carrée », « _logarithme »...). Les calculs se font depuis l'entrée standard et se font en valeurs entières sauf si on demande le calcul au format « long » (option `-l`).

__Statut de la commande__

toujours `0` sauf en cas d'erreur de syntaxe

__Exemple__

```shell
Prompt> `echo "20 / 3" |bc -l # Affichera le résultat de l'opération
```

## Gérer les options avec la commande `getopt`

__Syntaxe__

```shell
getopt [:]liste de caractères[:] arguments ...
```

La commande `getopt` correspond en externe à l'instruction interne `getopts` et permet la gestion et la réorganisation des paramètres.

L'utilisation de la commande `getopt` est similaire à l'instruction `getopts`. Le programmeur doit lui indiquer les caractères correspondant aux options attendues et les arguments où se trouvent les options à traiter. Dans le cas où une option aurait besoin d'une valeur associée, il fait suivre le caractère correspondant à ladite option du caractère `:` (deux-points).

Cependant, contrairement à l'instruction `getopts`, la commande `getopt` se contente de reformater proprement les options trouvées (une option après l'autre) et renvoie cette suite à l'écran. Donc, afin de pouvoir traiter les options dans un script, il est nécessaire de récupérer le résultat de `getopt` en utilisant une sous-exécution.

Dans le cas où une option a besoin d'être associée à une valeur, cette valeur est placée en argument suivant l'option à laquelle elle est associée.

Dès que l'ensemble des options est traité, c'est-à-dire dès que la commande `getopt` trouve une option qui ne correspond pas à une option attendue ou dès qu'elle ne trouve plus d'option, la commande affiche deux tirets (`-`) et affiche le reste des arguments non traités.

En cas d'option non prévue dans la liste, la commande `getopt` affiche un message d'erreur à l'écran. Cet affichage peut être inhibé en faisant précéder la liste des options possibles du caractère « : » (deux-points).

Et enfin la commande `getopt` arrête son traitement dès qu'elle rencontre deux `-` (tirets) accolés ce qui permet à l'utilisateur de faire traiter comme argument et non comme option une valeur avec un tiret (un nombre négatif par exemple).

__Statut de la commande__

* Si la commande ne trouve pas d'option invalide dans les paramètres du script, le statut est `0`
* Si la commande trouve une option invalide dans les paramètres du script, le statut est différent de `0` (en général, il vaut `1`)

__Exemple__

Écriture d'un script pouvant recevoir les options `-a` et `-b` sans valeur associée, une fois `-c` avec valeur associée et plusieurs fois `-d` avec valeurs associées.

```shell
#!/bin/sh 

# Script qui traite plusieurs options et qui affiche ce qu'il a analysé 
# Options possibles: -a -b -c val -d val [-d val] ... 

# Réorganisation des options du script dans la variable "opt" 
opt=`getopt :abc:d: $*`; statut=$? 

# Si une option invalide a été trouvée 
if test $statut -ne 0 
then 
    `echo "Usage: `basename $0` [-a] [-b] [-c val] [-d val1] [-d val2] [fic1 ...]" 
    exit $statut 
fi 

# Traitement de chaque option du script 
set -- $opt # Remarquez la protection des options via le double tiret "--" 

while true 
do 
    # Analyse de l'option reçue - Chaque option sera effacée ensuite via un "shift" 
    case "$1" in 
        -a) # Mémorisation option "a" trouvée 
            opt_A="true"; shift;; 
        -b) # Mémorisation option "b" trouvée 
            opt_B="true"; shift;; 
        -c) # Mémorisation option "c" trouvée et mémorisation de sa valeur 
            opt_C="true"; shift; val_C="$1"; shift;; 
        -d) # Mémorisation option "d" trouvée et concaténation de sa valeur 
            opt_D="true"; shift; val_D="$val_D $1"; shift;; 
        --) # Fin des options - Sortie de boucle 
            shift; break;; 
    esac 
done 

# Affichage du résultat de l'analyse 
test -n "$opt_A" && `echo "L'option A a été demandée" 
test -n "$opt_B" && `echo "L'option B a été demandée" 
test -n "$opt_C && `echo "L'option C a été demandée avec la valeur [$val_C]" 
test -n "$opt_D && `echo "L'option D a été demandée avec les valeurs [$val_D]" 

# Affichage du reste des paramètres s'il y en a 
test $# -ne 0 && `echo "Il reste encore $# paramètres qui sont $*" || `echo "Il n'y a plus de paramètre"
```

## Gérer son affichage à l'écran avec les codes « Escape »

__Syntaxe__

```shell
echo code particulier 

tput argument_tput
```

L'utilisation de certains codes appelés « codes Escape » permet d'influer sur l'affichage de l'écran. Ces codes portent ce nom, car ils sont tous précédés du caractère `Esc` (`033` en octal).

Bien souvent, ces codes varient en fonction de l'écran que l'on veut gérer, c'est pourquoi, il vaut mieux utiliser la commande « tput » qui envoie elle-même les codes appropriés en fonction de l'écran utilisé.

Il vous est proposé ici une liste non exhaustive de certains codes avec leur signification:

|Codes échappements                                          |Commande TPUT|Signification                                                                       |
|------------------------------------------------------------|-------------|------------------------------------------------------------------------------------|
|`echo "\033[2J"`                                            |tput clear   |efface l'écran                                                                      |
|`echo "\033[0m"`                                            |tput smso    |aucun attribut (blanc sur noir)                                                     |
|`echo "\033[1m"`                                            |             |gras                                                                                |
|`echo "\033[4m"`                                            |             |souligné                                                                            |
|`echo "\033[5m"`                                            |tput blink   |clignote                                                                            |
|`echo "\033[7m"`                                            |tput rmso    |vidéo inverse                                                                       |
|`echo "\033[8m"`                                            |             |invisible                                                                           |
|`echo "\033[30m"`                                           |             |noir (avant-plan)                                                                   |
|`echo "\033[31m"`                                           |             |rouge                                                                               |
|`echo "\033[32m"`                                           |             |vert                                                                                |
|`echo "\033[33m"`                                           |             |jaune                                                                               |
|`echo "\033[34m"`                                           |             |bleu                                                                                |
|`echo "\033[35m"`                                           |             |magenta                                                                             |
|`echo "\033[36m"`                                           |             |cyan                                                                                |
|`echo "\033[37m"`                                           |             |blanc                                                                               |
|`echo "\033[40m"`                                           |             |noir (arrière-plan)                                                                 |
|`echo "\033[41m"`                                           |             |rouge                                                                               |
|`echo "\033[42m"`                                           |             |vert                                                                                |
|`echo "\033[43m"`                                           |             |jaune                                                                               |
|`echo "\033[44m"`                                           |             |bleu                                                                                |
|`echo "\033[45m"`                                           |             |magenta                                                                             |
|`echo "\033[46m"`                                           |             |cyan                                                                                |
|`echo "\033[47m"`                                           |             |blanc                                                                               |
|`echo "\033[#A"`                                            |             |déplace le curseur de # ligne(s) en haut                                            |
|`echo "\033[#B"`                                            |             |déplace le curseur de # ligne(s) en bas                                             |
|`echo "\033[#C"`                                            |             |déplace le curseur de # colonne(s) à droite                                         |
|`echo "\033[#D"`                                            |             |déplace le curseur de # colonne(s) à gauche                                         |
|`echo "\033[s"`                                             |             |sauvegarde la position du curseur                                                   |
|`echo "\033[u"`                                             |             |restaure la position du curseur                                                     |
|`echo "\033[K"`                                             |             |efface la ligne courante                                                            |
|`echo "\033[lig;colH\c"`                                    |             |positionne le curseur en lig - col                                                  |
|`echo "\033[r"`		 `echo "\033[12;19'r'"`		 `echo "\033[?6h"`|             |réinitialise les attributs  		 définit une fenêtre lig 12 à 19  		 active la fenêtre|
|`echo "\033[r"`                                             |             |désactive la fenêtre                                                                |
|`echo "\033(B"`                                             |             |mode texte                                                                          |
|`echo "\033(0"`                                             |             |mode graphique                                                                      |
