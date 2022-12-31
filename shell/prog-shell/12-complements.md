# Les compléments

Le chapitre précédent marquait la fin de l'apprentissage du Shell de base. Il reste néanmoins quelques manques dans le langage, comme « incrémenter une variable » (dans les shells anciens), « récupérer des informations dans un fichier »…

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
grep [option] expression [fichier1 …]
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
