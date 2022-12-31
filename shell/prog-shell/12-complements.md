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
