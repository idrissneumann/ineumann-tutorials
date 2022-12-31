# Les structures de contrôles

## Introduction

Comme tout langage évolué, le Shell permet des structures de contrôles. Ces structures sont :

* l'alternative simple (`&&...`, `||...`)
* l'alternative complexe (`if...`)
* le branchement sur cas multiples (`case...`)
* la boucle (`while...`, `until...`, `for...`)

## L'alternative simple

__Syntaxe__

```shell
cde1 && cde2 
cde1 || cde2
```

La première syntaxe correspond à un « commande1 __ET__ commande2 » et se traduit par « exécuter la commande n° 1 __ET__ (sous-entendu « si celle-ci est « __vrai__ » donc s'est exécutée entièrement ») exécuter la commande n° 2 ».

La seconde syntaxe correspond à un « commande1 __OU__ commande2 » et se traduit par « exécuter la commande n° 1 __OU__ (sous-entendu « si celle-ci est « __faux__ » donc ne s'est pas exécutée entièrement ») exécuter la commande n° 2 ».

__Exemple__

Écrire un script affichant si on lui a passé zéro, un ou plusieurs paramètres. Ensuite il devra afficher les paramètres reçus.

```shell
#!/bin/sh 
# Script affichant si on lui passe zéro, un ou plusieurs paramètres 
# Ensuite il affiche ces paramètres 

# Test sur aucun paramètre 
test $# -eq 0 && echo "$0 n'a reçu aucun paramètre" 

# Test sur un paramètre 
test $# -eq 1 && echo "$0 a reçu un paramètre qui est $1" 

# Test sur plusieurs paramètres 
test $# -gt 1 && echo "$0 a reçu $# paramètres qui sont $*"
```

__Remarque__

Il est possible d'enchaîner les alternatives par la syntaxe `cde1 && cde2 || cde3`. L'inconvénient de cette syntaxe est qu'on ne peut placer qu'une commande en exécution de l'alternative, ou alors, si on désire placer plusieurs commandes, on est obligé de les grouper avec des parenthèses.

## L'alternative complexe

__Syntaxe__

```shell
if liste de commandes 
then 
    commande1 
    [ commande2 ?] 
[ else 
    commande3 
    [ commande4 ?] ] 
fi
```

La structure `if...then...[else]...fi` évalue toutes les commandes placées après le `if`, mais ne vérifie que le code de retour de la __dernière commande__ de la liste. Dans le cas où le programmeur voudrait placer plusieurs commandes dans la « liste de commandes », il doit les séparer par le caractère « _point-virgule_ » qui est un séparateur de commandes Shell. Dans la pratique, cette possibilité est très rarement utilisée, un script étant plus lisible si les commandes non vérifiées par le `if` sont placées avant celui-ci.

Si l'état de la dernière commande est « _vrai_ », le Shell ira exécuter l'ensemble des instructions placées après dans le bloc `then`, sinon, il ira exécuter l'ensemble des instructions placées dans le bloc `else` si celui-ci existe.

Dans tous les cas, le Shell ira exécuter les instructions éventuellement placées derrière le mot-clef `fi`, car celui-ci termine le `if`.

Il est possible d'imbriquer plusieurs blocs `if...fi` à condition de placer un mot-clef `fi` pour chaque mot-clef `if`.

On peut se permettre de raccourcir une sous-condition `else if...` par le mot-clef `elif`. Dans ce cas, il n'y a plus qu'un seul `fi` correspondant au `if` initial.

__Exemple avec des « `if` imbriqués »__

```shell
#!/bin/sh 
echo "Entrez un nombre" 
read nb 
if test $nb -eq 0 # if n°1 
then 
    echo "C'était zéro" 
else 
    if test $nb -eq 1 # if n°2 
    then 
        echo "C'était un" 
    else 
        echo "Autre chose" 
    fi # fi n°2 
fi # fi n°1
```

__Exemple avec des « elif »__

```shell
#!/bin/sh 
echo "Entrez un nombre" 
read nb 
if test $nb -eq 0 # if n°1 
then 
    echo "C'était zéro" 
elif test $nb -eq 1 # Sinon si 
then 
    echo "C'était un" 
else 
    echo "Autre chose" 
fi # fi n°1
```

## Le branchement à choix multiples

__Syntaxe__

```shell
case chaine in 
    val1) 
        commande1 
        [ commande2 ?] 
        ;; 
    [val2) 
        commande3 
        [ commande4 ?] 
        ;;] 
esac
```

La structure `case...esac` évalue la chaîne en fonction des différents choix proposés. À la première valeur trouvée, les instructions correspondantes sont exécutées.

Le double « _point-virgule_ » indique que le bloc correspondant à la valeur testée se termine. Il est donc obligatoire... sauf si ce bloc est le dernier à être évalué.

La chaîne et/ou les valeurs de choix peuvent être construites à partir de variables ou de sous-exécutions de commandes. De plus, les valeurs de choix peuvent utiliser les constructions suivantes :

|Construction |Signification                                                                |
|-------------|-----------------------------------------------------------------------------|
|`[x-y]`      |La valeur correspond à tout caractère compris entre `x` et `y` .             |
|[xy]         |La valeur testée correspond à `x` ou `y`                                     |
|`xx&#124;yy` |La valeur correspond à deux caractères `xx` ou `yy`                          |
|`?`          |La valeur testée correspond à un caractère quelconque                        |
|`*`          |La valeur testée correspond à toute chaîne de caractères (cas « autres cas »)|

__Exemple__

Script qui fait saisir un nombre et qui évalue ensuite s'il est pair, impair, compris entre 10 et 100 ou autre chose.

```shell
#!/bin/sh 
# Script de saisie et d'évaluation simple du nombre saisi 

# Saisie du nombre 
echo "Entrez un nombre" 
read nb 

# Évaluation du nombre 
case $nb in 
    0) echo "$nb vaut zéro";; 
    1|3|5|7|9) echo "$nb est impair";; 
    2|4|6|8) echo "$nb est pair";; 
    [1-9][0-9]) echo "$nb est supérieur ou égal à 10 et inférieur à 100";; 
    *) echo "$nb est un nombre trop grand pour être évalué" 
esac
```

## La boucle sur conditions

__Syntaxe__

```shell
while liste de commandes 
do 
    commande1 
    [ commande2 ?] 
done 
until liste de commandes 
do 
    commande1 
    [ commande2 ?] 
done
```

La boucle `while do...done` exécute une séquence de commandes tant que la dernière commande de la « liste de commandes » est « _vrai_ » (statut égal à zéro).

La boucle `until do...done` exécute une séquence de commandes tant que la dernière commande de la « liste de commandes » est « _faux_ » (statut différent de zéro).

__Exemple__

Script qui affiche tous les fichiers du répertoire courant et qui, pour chaque fichier, indique si c'est un fichier de type « répertoire », de type « ordinaire » ou d'un autre type.

```shell
#!/bin/sh 
# Script d'affichage d'informations sur les fichiers du répertoire courant 

# La commande "read" lit l'entrée standard. Mais cette entrée peut être redirigée d'un pipe 
# De plus, "read" renvoie "vrai" quand elle a lu et "faux" quand il n'y a plus rien à lire 
# On peut donc programmer une boucle de lecture pour traiter un flot d'informations 
ls | while read fic # Tant que le "read" peut lire des infos provenant du "ls" 
do 
    # Évaluation du fichier traité 
    if test -d "$fic" 
    then 
        echo "$fic est un répertoire" 
    elif test -f "$fic" 
    then 
        echo "$fic est un fichier ordinaire" 
    else 
        echo "$fic est un fichier spécial ou lien symbolique ou pipe ou socket" 
    fi 
done
```

## La boucle sur liste de valeurs

__Syntaxe__

```shell
for var in valeur1 [valeur2 ?] 
do 
    commande1 
    [ commande2 ?] 
done
```

La boucle `for... do...done` va boucler autant de fois qu'il existe de valeurs dans la liste. À chaque tour, la variable `$var` prendra séquentiellement comme contenu la valeur suivante de la liste.

Les valeurs de la liste peuvent être obtenues de différentes façons (variables, sous-exécutions...). La syntaxe `in valeur1 ...` est optionnelle. Dans le cas où elle est omise, les valeurs sont prises dans la variable `$*` contenant les arguments passés au programme.

Dans le cas où une valeur contient un métacaractère de génération de nom de fichier (« _étoile_ », « _point d'interrogation_ »...), le Shell examinera alors les fichiers présents dans le répertoire demandé au moment de l'exécution du script et remplacera le métacaractère par le ou les fichiers dont le nom correspond au métacaractère.

__Exemple__

Même script que dans l'exemple précédent, qui affiche tous les fichiers du répertoire courant et qui, pour chaque fichier, indique si c'est un fichier de type « répertoire », de type « ordinaire » ou d'un autre type, mais en utilisant une boucle `for`.

```shell
#!/bin/sh 
# Script d'affichage d'informations sur les fichiers du répertoire courant 
for fic in `ls` # Boucle sur chaque fichier affiché par la commande "ls" 
do 
    # Évaluation du fichier traité 
    if test -d "$fic" 
    then 
        echo "$fic est un répertoire" 
    elif test -f "$fic" 
    then 
        echo "$fic est un fichier ordinaire" 
    else 
        echo "$fic est un fichier spécial ou lien symbolique ou pipe ou socket" 
    fi 
done
```

__Remarques__

Ce script présente un léger « bogue » dû à l'emploi de la boucle `for`. En effet, le `for` utilise l'espace pour séparer ses éléments les uns des autres. Il s'ensuit que si un fichier possède un espace dans son nom, le `for` séparera ce nom en deux parties qu'il traitera dans deux itérations distinctes et la variable « fic » prendra alors comme valeurs successives les deux parties du nom.

Ce bogue n'existe pas avec l'emploi de la structure `ls | while read fic...`, car le `read` lit la valeur jusqu'à la « fin de ligne ».

Par ailleurs, dans le cas de la commande `ls` ou encore du parcours de fichiers dans un script, il est préférable de privilégier l'utilisation le métacaractère `*` (encore appelé « _wildcard_ »).

Voir [ce cours](https://www.ineumann.fr/docs/shell/bash-bonnes-pratiques#boucler-sur-une-sortie-de-commande) pour plus de détails.

__Exemple__

Reprenons l'exemple précédent :

```shell
#!/bin/sh 
# Script d'affichage d'informations sur les fichiers du répertoire courant 
for fic in *
do 
    # Évaluation du fichier traité 
    if [ -d "$fic" ]
    then 
        echo "$fic est un répertoire" 
    elif [ -f "$fic" ]
    then 
        echo "$fic est un fichier ordinaire" 
    else 
        echo "$fic est un fichier spécial ou lien symbolique ou pipe ou socket" 
    fi 
done
```

Il est aussi possible de parcourir des valeurs itératives comme dans la plupart des langages de programmation à l'aide de la boucle for. Pour cela, on peut utiliser la commande seq comme suit :

```shell
# parcours et affichage des valeurs allant de 0 à 10
for i in `seq 0 10`
do 
    echo $i 
done
```

Dans les langages shell dits « évolués », il est également permis d'utiliser ces types de syntaxe dont on retrouve des équivalences dans d'autres langages de programmation courants :

```shell
# parcours et affichage des valeurs allant de 0 à 10
for (( i=0 ; i <= 10 ; i++ ))
do 
    echo $i 
done

# Autre syntaxe possible
for i in {0..10}
do
    echo $i
done
```

## Interruption d'une ou plusieurs boucles

__Syntaxe__

```shell
break [n] 
continue [n]
```

L'instruction `break [n]` va faire sortir le programme de la boucle numéro `n` (`1` par défaut). L'instruction passera directement après le `done` correspondant à cette boucle.

L'instruction `continue [n]` va faire repasser le programme à l'itération suivante de la boucle numéro `n` (`1` par défaut). Dans le cas d'une boucle « while » ou « until », le programme repassera à l'évaluation de la condition. Dans le cas d'une boucle « for », le programme passera à la valeur suivante.

La numérotation des boucles s'effectue à partir de la boucle la plus proche de l'instruction `break` ou `continue`, qu'on numérote `1`. Chaque boucle englobant la précédente se voit affecter un numéro incrémental (2, 3...). Le programmeur peut choisir de sauter directement sur la boucle numérotée `n` en mettant la valeur `n` derrière l'instruction `break` ou `continue`.

__Remarques__

L'utilisation de ces instructions est contraire à la philosophie de la « programmation structurée ». Il incombe donc à chaque programmeur de toujours réfléchir au bien-fondé de leurs mises en application.

Contrairement aux croyances populaires, la structure `if... fi` n'est pas une boucle.

__Exemple__

Script qui fait saisir un nom et un âge. Mais il contrôle que l'âge soit celui d'un majeur et soit valide (entre 18 et 200 ans). Ensuite, il inscrit ces informations dans un fichier. La saisie s'arrête sur un nom vide où un âge à `0`.

```shell
#!/bin/sh 
# Script de saisie; de contrôle et d'enregistrement d'un nom et d'un âge 

while true # Boucle infinie 
do 
    # Saisie du nom et sortie sur nom vide 
    echo "Entrez un nom : "; read nom 
    test -z "$nom" && break # Sortie de la boucle infinie si nom vide 

    # Saisie et contrôle de l'âge 
    while true # Saisie en boucle infinie 
    do 
        echo "Entrez un âge : "; read age 
        test $age -eq 0 && break 2 # Sortie de la boucle infinie si age = 0 
        test $age -ge 18 -a $age -lt 200 && break # Sortie de la boucle de saisie si age correct 
    done 

    # Enregistrement des informations dans un fichier "infos.dat" 
    echo "Nom: $nom; Age: $age" >>infos.dat 
done
```

## Interruption d'un programme

__Syntaxe__

```shell
exit [n]
```

L'instruction `exit [n]` met immédiatement fin au Shell dans lequel cette instruction est exécutée.

Le paramètre `n` facultatif (qui vaut `0` par défaut) ne peut pas dépasser `255`. Ce paramètre sera récupéré dans la variable `$?` du processus ayant appelé ce script (processus père). Cette instruction `exit` peut donc rendre un script « _vrai_ » ou « _faux_ » selon les conventions du Shell.

__Remarque__

Même sans instruction `exit`, un script Shell renvoie toujours au processus père un état qui est la valeur de la variable `$?` lorsque le script se termine (état de la dernière commande du script).

## Le générateur de menus en boucle (Korn Shell et Bourne Again Shell et shells descendants)

__Syntaxe__

```shell
select var in chaîne1 [chaîne2 ?] 
do 
    commande1 
    [ commande2 ?] 
done
```

La structure `select... do... done` proposera à l'utilisateur un menu prénuméroté commençant à `1`. À chaque numéro sera associé une chaîne prise séquentiellement dans les chaînes de la liste. Il lui sera aussi proposé de saisir un des numéros du menu (le prompt de saisie provenant de la variable `$PS3`).

Après la saisie, la chaîne correspondant au numéro choisi sera stockée dans la variable « $var » pendant que la valeur du numéro choisi sera stocké dans la variable interne `$REPLY`. Il appartient alors au programmeur d'évaluer correctement l'une de ces deux variables (`if...fi` ou `case...esac`) pour la suite de son programme. Dans le cas où l'utilisateur choisit un numéro qui n'est pas dans la liste, la variable `$var` recevra alors une chaîne vide, mais le numéro choisi sera quand même stocké dans la variable `$REPLY`. Cependant, la variable de statut `$?` n'est pas modifiée par ce choix erroné.

Comme pour la boucle `for`, les valeurs de la liste peuvent être obtenues de différentes façons (variables, sous-exécutions...). La syntaxe `in chaîne1 ...` est optionnelle. Dans le cas où elle est omise, les valeurs sont prises dans la variable `$*` contenant les arguments passés au programme ou à la fonction. Dans le cas où une valeur contient un métacaractère de génération de nom de fichier (« _étoile_ », « _point d'interrogation_ »...), le Shell examinera alors les fichiers présents dans le répertoire de travail au moment de l'exécution du script et remplacera le métacaractère par le ou les fichiers dont le nom correspond au métacaractère.

__Remarque__

La phase « menu + choix » se déroule en boucle infinie. Il est donc __nécessaire__ de programmer l'interruption de la boucle sur une valeur particulière de la variable `$var` ou de la variable `$REPLY` en utilisant une des instructions `break`, `return` ou `exit`.
