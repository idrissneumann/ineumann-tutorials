## Exemples divers

### Afficher une phrase sans que le curseur passe à la ligne suivante

La commande « echo » possède l'option « -n » qui permet de ne pas aller à la ligne en fin d'affichage. Malheureusement, cette option n'est pas présente sur tous les Unix. La commande « printf » quant à elle n'est pas non plus forcément présente sur tous les Unix.

Cet exemple simple et portable permet d'avoir une invite de saisie sans retour à la ligne en fin de phrase :

```shell
Prompt> echo "Phrase quelconque: " |awk '{printf("%s", $0)}'
```

### Vérifier l'existence d'un fichier, quel que soit son type

La commande `test` permet de tester l'existence de fichiers comportant certaines caractéristiques (fichier classique, répertoire, vide, non vide...). Mais l'option `-e` qui permet de tester la seule existence d'un fichier, quel que soit son type n'existe pas en Bourne Shell.

```shell
#!/bin/ksh 

# Programme qui affiche si le fichier demandé existe ou n'existe pas (en Korn Shell) 

# Usage: prog fichier 
test -e "$1" && echo "Le fichier $1 existe" || echo "Le fichier $1 n'existe pas"
```

Cependant il y a la commande `ls` qui, en plus de lister le fichier, renvoie un statut « vrai/faux » si le fichier demandé existe ou n'existe pas.

Il suffit de rediriger tout son affichage (normal et erreurs) vers le fichier poubelle `/dev/null` pour s'en servir comme simple contrôle pour vérifier l'existence du fichier listé.

```shell
#!/bin/sh 

# Programme qui affiche si le fichier demandé existe ou n'existe pas (en Bourne Shell) 
# Usage: prog fichier 

ls -d "$1" 1>/dev/null 2>&1 && echo "Le fichier $1 existe" || echo "Le fichier $1 n'existe pas"
```

## Vérifier la numéricité d'une variable en termes de « nombre entier »

En demandant à la commande `expr` de faire un calcul simple sur une variable, on peut vérifier, si le calcul réussit ou pas, si la variable en question est ou n'est pas numérique.

```shell
#!/bin/sh 

# Programme qui vérifie si son argument est ou n'est pas numérique entier 
# Usage: prog chaîne 

# Essai de calcul sur l'argument 1 et récupération du code de retour 
expr "$1" + 0 1>/dev/null 2>/dev/null; statut=$? 

# Vérification de la réussite du calcul 
test $statut -lt 2 && echo "L'argument $1 est un nombre" || echo "L'argument $1 n'est pas un nombre"
```

## Vérifier la numéricité d'une variable en termes de nombre « réel »

La commande `expr` ne travaille qu'en nombres entiers et ne peut donc pas vérifier si une variable est ou n'est pas un nombre réel.

Un des moyens proposés ici sera, pour vérifier qu'un argument est bien un nombre réel, de supprimer chacun de ses chiffres, le point éventuel et le premier `-` du signe négatif et de regarder s'il reste quelque chose.

```shell
#!/bin/sh 

# Programme qui vérifie si son argument est ou n'est pas numérique réel 
# Usage: prog chaîne 

# Suppression de chaque chiffre, du premier point et du signe "moins" s'il est en début de nombre 
verif=`echo $1 |sed -e "s/[0-9]//g" -e "s/\.//" -e "s/^-//"` 

# Si le résultat est vide, c'est que c'était un nombre correct 
test -z "$verif" && echo "L'argument $1 est un nombre" || echo "L'argument $1 n'est pas un nombre"
```

## Nom de base du répertoire courant

Ce script affiche le nom de base du répertoire dans lequel on est positionné :

```shell
#!/bin/sh 

# Programme qui affiche le dernier nom du répertoire courant (nom de base) 
# Usage: prog 

# Cas particulier : vérification si le répertoire courant est "/" 
if test `pwd` = "/" 
then 
    echo "/" 
    exit 0 
fi 

# Mémorisation variable IFS 
OLDIFS="$IFS" 

# Configuration variable IFS sur le séparateur "/" 
IFS=/ 
 
# Éclatement du répertoire courant dans les variables $1, $2, ... 
set `pwd` 

# Remise en place variable IFS et effacement variable OLDIFS inutile 
IFS="$OLDIFS"; unset $OLDIFS 

# Décalage du nb d'arguments - 1 et affichage paramètre 1 (qui est devenu le dernier nom) 
shift `expr $# - 1` 
echo $1 

# Remarque: tout ce script peut être avantageusement remplacé par "basename `pwd`"
```

## Vérification de l'autorisation d'accès d'un utilisateur quelconque

Ce script vérifie si les noms qu'on lui passe en paramètres sont autorisés à se connecter sur la machine ou non. Pour ceux qui sont autorisés, il donne les informations diverses sur l'utilisateur (uid, gid, commentaire, home) puis il affiche s'ils sont effectivement connectés :

```shell
#!/bin/sh 

# Programme qui affiche si les utilisateurs existent ou pas et connectés ou pas 
# Usage: prog user1 [user2 ...] 

# Boucle sur chaque argument passé au programme 
for user in $* 
do 
    # Récupération de la ligne concernant l'utilisateur dans "/etc/passwd" 
    lig=`grep "^$user:" /etc/passwd`; statut=$? 

    # Vérification si le "grep" a trouvé 
    if test $statut -eq 0            # On peut aussi faire if test -n "$lig" 
    then 
        # Récupérations informations sur l'utilisateur 
        uid=`echo $lig |cut -f3 -d:` 
        gid=`echo $lig |cut -f4 -d:` 
        comment=`echo $lig |cut -f5 -d:` 
        home=`echo $lig |cut -f6 -d:` 

        # Recherche de la ligne concernant le gid dans "/etc/group" 
        lig=`grep ":$gid:" /etc/group`; statut=$? 

        # Vérification si le "grep" a trouvé 
        if test $statut -eq 0 
        then 
            # Récupérations informations sur le groupe utilisateur 
            groupe=`echo $lig |cut -f1 -d:` 
        else 
            # Le gid n'est pas dans "/etc/group" 
            groupe="inconnu" 
        fi 

        # Recherche si l'utilisateur est connecté 
        who |fgrep $user 1>/dev/null && connect="oui" || connect="non" 

        # Affichage des informations trouvées 
        echo "$user est autorisé à se connecter sur `uname -n`" 
        echo "Uid: $uid" 
        echo "Gid: $gid ($groupe)" 
        echo "Commentaire: $comment" 
        echo "Home: $home" 
        echo "Connecté en ce moment: $connect" 
    else 
        echo "$user n'est PAS autorisé sur `uname -n`" 
    fi 

    # Saut de ligne avant de passer à l'utilisateur suivant 
    echo 
done
```

## Membres d'un groupe

Ce script affiche les utilisateurs membres du groupe qu'on lui passe en argument et s'ils sont connectés ou non :

```shell
#!/bin/sh 

# Programme qui donne la liste des membres d'un groupe et les connectés 
# Usage: prog groupe1 [group2 ...] 
 
# Boucle sur chaque groupe passé au programme 
for groupe 
do 
    echo "Membres du groupe $groupe" 

    # Récupération ligne contenant le groupe demandé dans "/etc/group" 
    ligne=`grep "^$groupe:" /etc/group`; statut=$? 

    # Si recherche réussie (groupe existe) 
    if test $statut -eq 0 
    then 
        # Extraction du gid (3° champ) de la ligne 
        gid=`echo $ligne |cut -f3 -d:` 

        # Découpage de /etc/passwd sur les champs 1 et 4 (pour enlever les champs parasites) 

        # Extraction des lignes contenant le gid trouvé 
        # Découpage de cette extraction sur le premier champ 
        # Tri de cette extraction 
        # Boucle sur chaque nom de ce tri 
        cut -f1,4 -d: /etc/passwd |grep ":$gid$" |cut -f1 -d: |sort |while read user 
        do 
            # Si l'utilisateur est présent dans la commande "who" 
            who |fgrep "$user" 1>/dev/null && connect="connecté" || connect="non connecté' 

            # Affichage de l'utilisateur et de son état (connecté/non connecté) 
            echo "User: $user ($connect)" 
        done 
    fi 
    echo 
done
```

## Serveurs gérés par « inetd »

Ce script affiche les informations sur le serveur qu'on lui passe en argument si celui-ci est géré par le super serveur `inetd` :

```shell
#!/bin/sh 
# Programme qui donne des informations sur les serveurs gérés par "inetd" 
# Usage: prog serveur1 [serveur2 ...] 
# Remarque: Ce script ne fonctionne pas sous Linux qui utilise "xinetd" très différent de "inetd" 

# Programme 
# Pour chaque serveur demandé 
for serveur in $* 
do 
    # Vérification serveur présent dans "/etc/inetd.conf" 
    if grep "^$serveur" /etc/inetd.conf 1>/dev/null 
    then 
        # Traitement lignes contenant serveur dans "/etc/services" et non en commentaire 
        grep -v "^#" /etc/services | grep "$serveur" | while read lig 
        do 
            # Déconcaténation de la ligne 
            set $lig 

            # Récupération et élimination deux premières infos. 
            nom=$1 
            port=`echo $2 |cut -f1 -d/` 
            proto=`echo $2 |cut -f2 -d/` 
            shift 2 

            # Vérification serveur est dans nom ou alias 
            unset trouve 

            for rech in $nom $* 
            do 
                if test "$rech" = "$serveur" 
                then 
                    trouve="non vide" 
                    break 
                fi 
            done 

            # Si serveur présent 
            if test -n "$trouve" 
            then 
                echo "Serveur: $nom" 
                echo "Port: $port" 
                echo "Protocole: $proto" 
                test -n "$*" && echo "Alias: $*" 
                echo 
            fi 
        done 
    else 
        echo "Serveur $serveur non géré par inetd" 
        echo 
    fi 
done
```

## Recherche d'une commande

Ce script permet de trouver l'endroit exact de toute commande Unix connue de celui qui le lance. Il découpe le PATH de l'utilisateur et vérifie si la commande demandée se trouve dans un des répertoires de recherche.

```shell
#!/bin/sh 
# Programme qui recherche un fichier par rapport au PATH 
# Usage: prog file1 [file2 ...] 

# Récupération des arguments passés au programme, car ils vont être écrasés 
arg=$* 

# Décomposition du PATH par rapport au séparateur ":" 
OLDIFS="$IFS" 
IFS=: 
set $PATH # Ici on écrase les arguments passés au programme 
IFS="$OLDIFS" 
unset OLDIFS 

# Boucle sur chaque argument 
for file in $arg 
do 
    # On indique par défaut que le fichier n'est pas trouvé 
    unset trouve 

    # Boucle sur chaque répertoire du PATH 
    for rep in $* 
    do 
        # Vérification si rep contient fichier non vide et exécutable 
        if test -f "$rep/$file" -a -s "$rep/$file" -a -x "$rep/$file" 
        then 
            # On a trouvé 
            ls -l "$rep/$file" 
            trouve="non vide" 

            # Plus la peine de tester les autres répertoires 
            break # Facultatif 
        fi 
    done 

    # S'il n'a rien trouvé 
    test -z "$trouve" && echo "no $file in $*" 
done
```

## Arborescence d'un répertoire

Ce script affiche le contenu des répertoires qu'on lui passe en argument sous la forme d'arborescence (correspond à la commande « tree » du DOS).

```shell
#!/bin/sh 
# Programme qui affiche les répertoires sous la forme d'arborescence (tree DOS) 
# Usage: prog fic1 [fic2 ...] 
 
# Fonction d'affichage d'un texte précédé de "n" tabulations 
# Paramètres entrée : 
# - nb de tabulations 
# - texte à afficher (...) 
# Valeur sortie : aucune 
affiche_tabul() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Récupération du nb de tabulations - On supprime $1 
        tab=$1; shift 

        # Affichage du texte précédé des tabulations en utilisant "awk" 
        echo $* |awk -vtab=$tab '{for (i=0; i<tab; i++) printf("\t"); printf("%s\n", $0)}' 
    ) 
} 

# Fonction arborescence (fonction récursive) 
# Paramètres entrée : 
# - nom de fichier 
# - profondeur (facultatif) 
# Valeur sortie : aucune 
tree_r() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Récupération profondeur si elle existe 
        prof=${2:-0} 

        # Affichage de l'argument 1 avec autant de tabulations que profondeur 
        affiche_tabul $prof $1 

        # Si argument 1 répertoire et pas lien symbolique 
        if test -d "$1" -a ! -L "$1" 
    then 
        # De nouveau création d'un sous-shell pour isoler de nouveau le contexte 
            ( 
                # Déplacement dans ce répertoire (seul ce contexte se déplace) 
                cd "$1" 

                # Pour chaque fichier de ce répertoire 
                ls -1 |while read file 
                do 
                    # Fonction récursive sur ce fichier avec profondeur incrémentée 
                    tree_r "$file" `expr $prof + 1` 
        done 
            ) 
            # Fin du sous-shell - Le contexte actuel n'a pas changé de répertoire 
        fi 
    ) 
} 

# Programme principal 
# Boucle sur chaque fichier passé au programme 
for fic in $* 
do 
    echo "Arborescence de '$fic'" 
    tree_r $fic 
    echo 
done
```

## Factorielle d'un nombre

Ce script donne la factorielle des nombres qu'on lui passe en argument. Il montre le calcul par une fonction récursive et le calcul par une fonction itérative.

```shell
#!/bin/sh 
# Programme qui calcule la factorielle d'un nombre 
# Usage: prog nb1 [nb2 ...] 

# Fonction de vérification d'argument factorisable (entier et positif) 
# Paramètres entrée : argument à vérifier 
# Valeur sortie : 
# - argument correct (0) 
# - argument non correct (not 0) 
factorisable() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Essai de calcul sur l'argument 
        expr "$1" + 0 1>/dev/null 2>/dev/null; statut=$? 

        # Si calcul échoué alors argument non entier 
        test $statut -ge 2 && return 1 
 
        # Si nombre négatif alors argument non factorisable 
        test $1 -lt 0 && return 2 

        # Argument numérique et positif 
        return 0 
    ) 
} 



# Fonction factorielle itérative 
# Paramètre entrée : nombre à calculer 
# Valeur sortie : aucune 
fact_i() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Initialisation des variables 
        res=1 
        val=$1 

        # Tant que nombre supérieur ou égal à 2 
        while test $val -ge 2 
        do 
            # Calcul du résultat intermédiaire 
            res=`expr $res \* $val` 

            # Décrément de la valeur 
            val=`expr $val - 1` 
        done 

        # Affichage du résultat - Permet de simuler le renvoi d'une valeur 
        echo $res 
    ) 
} 

# Fonction factorielle récursive 
# Paramètre entrée : nombre à calculer 
# Valeur sortie : aucune 
fact_r() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Si nombre à calculer inférieur à 2 
        if test $1 -lt 2 
        then 
            # Affichage factorielle du nombre (forcément 0 ou 1) qui est 1 et sortie de fonction 
            echo 1 
            return 0 
        fi 

        # Calcul du nouvel argument à passer à la factorielle 
        decrement=`expr $1 - 1` 
 
        # Affichage de l'argument * factorielle (argument - 1) 
        expr $1 \* `fact_r $decrement` 
    ) 
} 

# Programme principal 
# Boucle sur chaque argument 
for nb 
do 
    # Test argument 
    factorisable $nb; statut=$? 

    # Évaluation argument 
    case $statut in 
            0) # Argument correct 
                # Factorielle du nombre - Utilisation des deux fonctions (récursives et itératives) 
                echo "Factorielle $nb=`fact_i $nb` (itératif)=`fact_r $nb` (récursif)" 
                ;; 
            1) # Argument pas numérique 
                echo "On ne peut pas mettre en factorielle $nb car ce n'est pas un nombre" 
                ;; y 
            2) # Argument pas positif 
                echo "On ne peut pas mettre en factorielle $nb car c'est un nombre négatif" 
                ;; 
        esac 
done
```

D'autres exemples sur la factorielle sont disponibles [ici](https://www.ineumann.fr/docs/shell/exercices-shell#exercice-4---la-factorielle).

## PGCD de deux nombres

Ce script donne le PGCD de chaque couple de deux nombres qu'on lui passe en paramètre. La fonction `pgcd` est développée en itérative et en récursive. Si on veut en plus le PPCM, il suffit de multiplier les deux nombres et de diviser le résultat par le PGCD.

```shell
#!/bin/sh 
# Programme qui calcule le pgcd de deux nombres 
# Usage: prog x y [x y ...] 

# Fonction de vérification de tous ses arguments entiers et positifs 
# Paramètres entrée : arguments à vérifier (...) 
# Valeur sortie : 
# - tous arguments corrects (0) 
# - au moins un argument non correct (not 0) 
numeric() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Essai de calcul sur chaque argument 
        for nb in $* 
        do 
            # Si nombre négatif alors argument sans PGCD 
            test $nb -lt 0 && return 2 

            # Opération permettant de vérifier si l'argument est un nombre 
            expr "$nb" + 0 1>/dev/null 2>/dev/null; statut=$? 

            # Si calcul échoué alors argument non numérique 
            test $statut -gt 1 && return 1 
        done 

        # Renvoi OK 
        return 0 
    ) 
} 

# Fonction pgcd itérative 

# Paramètres entrée : 
# - nombre1 
# - nombre2 
# Valeur sortie : aucune 
pgcd_i() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Tq $2 différent de 0 
        while test $2 -ne 0 
        do 
            # pgcd(x, y)=pgcd(y, x mod y) 
            set $2 `expr $1 % $2` 
    done 

        # Résultat 
        echo $1 
        return 0 
    ) 
} 

# Fonction pgcd récursive 
# Paramètres entrée : 
# - nombre1 
# - nombre2 
# Valeur sortie : aucune 
pgcd_r() 
{ 
    # Création d'un sous-shell pour isoler le contexte 

    ( 

        # Si nb2 égal 0 alors pgcd égal nb1 
        if test $2 -eq 0 
        then 
            echo $1 
            return 0 
        fi 

        # pgcd(x, y)=pgcd(x mod y, y) 
        pgcd_r $1 `expr $1 % $2` 
    ) 
} 

# Programme 
# Tant qu'il y a au moins deux paramètres 
while test $# -ge 2 
do 
    # Test argument 
    numeric $1 $2; statut=$? 

    # Évaluation argument 
    case $statut in 
        0) # Argument correct 
            # Positionnement des deux nombres, le 1er supérieur au 2° 
            if test $1 -ge $2 
            then 
                nb1=$1 
                nb2=$2 
            else 
                nb1=$2 
                nb2=$1 
            fi 

            # PGCD des nombres - Utilisation des deux fonctions (récursives et itératives) 
            echo "Pgcd ($1 $2)==`pgcd_r $nb1 $nb2` (récursif)=`pgcd_i $nb1 $nb2` (itératif)" 
            ;; 
        1) # Argument pas numérique 
            echo "L'un des deux paramètres '$1 $2' n'est pas un nombre" 
            ;; 
        2) # Argument pas positif 
            echo "L'un des deux paramètres '$1 $2' est un nombre négatif" 
            ;; 
    esac 
    # Passage aux deux paramètres suivants 
    shift 2 
done
```

## Division en nombres réels

Ce script affiche le résultat de la division de deux nombres réels. Le principe de la division est de partir du reste, le multiplier par 10 et continuer à diviser ainsi (comme au CM2). Dans le cas d'une division infinie, il s'arrête par défaut au bout de n décimales mais l'utilisateur a la possibilité de lui indiquer la précision qu'il désire.

```shell
#!/bin/sh 
# Programme de division en nombres réels 
# Usage: prog [-h] [-p précision] [-v] [--] dividende diviseur 
# - Option "-h": Pour avoir l'aide sur l'utilisation de ce programme 
# - Option "-p précision": Pour paramétrer la précision décimale du calcul 
# - Option "-v": Affichage des détails 

# Fonction affichant la façon d'utiliser ce programme 
# Paramètres entrée : texte à afficher (facultatif) 
# Valeur sortie : aucune 
usage() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Affichage des messages particuliers 
        test -n "$*" && echo "`basename $0`: $*" 

        # Affichage du message d'aide 
        echo "Usage: `basename $0` [-h] [-p précision] [-v] [--] dividende diviseur" 
    ) 
} 

# Fonction affichant un texte sans retour à la ligne 
# Paramètres entrée : texte à afficher (...) 
# Valeur sortie : aucune 
puts() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Filtre d'affichage 
        echo $* |awk '{printf("%s", $0)}' 
    ) 
} 

# Fonction de vérification de tous ses arguments numériques 
# Paramètres entrée : arguments à vérifier (...) 
# Valeur sortie : 
# - tous arguments corrects (0) 
# - au moins un argument non correct (not 0) 
numeric() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Boucle sur chaque argument 
        for nb in $* 
        do 
            # Suppression de chaque chiffre et du "." et du signe 
            nb=`echo $nb |sed -e "s/[0-9]//g" |sed -e "s/\.//" |sed -e "s/^-//"` 
 
            # Vérification => nb non vide => pas un nombre 
            test -n "$nb" && return 1 
        done 

        # Renvoi OK 
        return 0 
    ) 
} 

# Fonction multipliant un nombre par 10 "n" fois (10 exposant "n") 
# Paramètres entrée : 
# - nombre à multiplier 
# - exposant 
# Valeur sortie : aucune 
mult10() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Affichage du résultat 
        echo "$1 * 10^$2" |bc -l 
    ) 
} 

# Fonction enlevant les zéros de droite ou de gauche d'un nombre 
# Paramètres entrée : 
# - nombre à réduire 
# - côté à traiter (g|d) 
# Valeur sortie : aucune 
enleve0() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Évaluation enlève gauche ou droite 
        case $2 in 
            d) # Droite 
                string="0\{1,\}$";; 
            g) # Gauche 
                string="^0\{1,\}";; 
            esac 

            # Suppression des zéros 
            nb=`echo $1 |sed -e "s/$string//g"` 

            # Affichage du résultat 
            echo ${nb:-0} 
    ) 
} 

# Fonction transformation négatif en positif 
# Paramètres entrée : nombre à transformer 
# Valeur sortie : 
# - le nombre a été modifié (0) 
# - le nombre n'a pas été modifié (1) 
neg2pos() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Si le nombre ne commence pas par "-" 
        if test `echo $1 |cut -c1` != "-" 
        then 
            # Le nombre est positif 
            nb=$1 

            # Le nombre n'a pas changé 
            flag=1 
        else 
            # Le nombre est négatif => suppression premier caractère (le "-") 
            nb=`echo $1 |cut -c2-` 

            # Le nombre a changé 
            flag=0 
        fi 

        # Affichage nombre - Renvoi flag 
        echo $nb 
        return $flag 
    ) 
} 

# Fonction décomposant un nombre en partie entière et décimale 
# Paramètres entrée : nombre à décomposer 
# Valeur sortie : aucune 
decomp() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Vérification si nombre décimal 
        if echo "$1" |fgrep "." 1>/dev/null 
        then 
            # Récupération partie entière et fractionnelle 
            ent=`echo $1 |cut -f1 -d.` 
            frc=`echo $1 |cut -f2 -d.` 

            # Élimination zéro non significatif de la partie entière et fractionnelle 
            ent=`enleve0 "$ent" g` 
            frc=`enleve0 "$frc" d` 

            # Récupération longueur partie fraction si celle-ci existe 
            test $frc -ne 0 && lgF=`expr "$frc" : ".*"` || lgF=0 
        else 
            ent=`enleve0 "$1" g` 
            frc=0 
            lgF=0 
        fi 

        # Récupération longueur partie entière 
        lgE=`expr "$ent" : ".*"` 

        # Affichage des éléments (partie entière, partie fractionnelle et lg) 
        echo "$ent $frc $lgE $lgF" 
    ) 
} 

# Programme principal 

# Gestion des options (on utilise l'instruction "getopts" plus souple que la commande "getopt") 
while getopts hp:v opt 
do 
    case $opt in 
        h) # Aide demandée 
            usage 
            exit 0 
            ;; 
        p) # Demande de précision 
            opt_prec="$OPTARG" 
 
            # Précision négative ??? 
            if test $opt_prec -lt 0 
            then 
                usage "La précision ne peut pas être négative" 
                exit 1 
            fi 
            ;; 
        v) # Demande volubilité 
            opt_verb="true" 
            ;; 
        *) # Autre option 
            usage 
            exit 1 
    esac 
done 
shift `expr $OPTIND - 1` 

# Vérification assez d'arguments 
test $# -lt 2 && usage "Pas assez d'arguments" && exit 1 

# Vérifications arguments 1 et 2 sont des nombres 
numeric $1 $2; statut=$? 

test $statut -ne 0 && echo "Une de ces valeurs '$1' ou '$2' n'est pas un nombre" && exit 2 

# Initialisation variables par défaut 
opt_prec=${opt_prec:-5} # Par défaut si "opt_prec" vide 

# Récupération diviseur et dividende avec gestion des négatifs 
dividende=`neg2pos $1` && fl_neg=1 || fl_neg=0 # Diviseur + gestion négatif 
diviseur=`neg2pos $2` && fl_neg=`expr 1 - $fl_neg` # Dividende + gestion négatif 
test -n "$opt_verb" && echo "$1 / $2 => $dividende / $diviseur (flag négatif=$fl_neg)" 

# Décomposition dividende 
decomp=`decomp $dividende` 
ent1=`echo $decomp |cut -f1 -d" "` 
frc1=`echo $decomp |cut -f2 -d" "` 
lgF1=`echo $decomp |cut -f4 -d" "` 
test -n "$opt_verb" && echo "Décomposition $dividende => $ent1 (ent) + $frc1 (frac)" 

# Décomposition diviseur 
decomp=`decomp $diviseur` 
ent2=`echo $decomp |cut -f1 -d" "` 
frc2=`echo $decomp |cut -f2 -d" "` 

lgF2=`echo $decomp |cut -f4 -d" "` 
test -n "$opt_verb" && echo "Décomposition $diviseur => $ent2 (ent) + $frc2 (frac)" 

# Suppression parties fractionnelles des nombres en les multipliant par "10" 
dividende=$ent1 
diviseur=$ent2 
test $lgF1 -gt $lgF2 && lgF=$lgF1 || lgF=$lgF2 
dividende=`mult10 $dividende $lgF` 
diviseur=`mult10 $diviseur $lgF` 

# Si fraction dividende plus petit fraction diviseur 
if test $lgF1 -lt $lgF2 
then 
    lgF=`expr $lgF2 - $lgF1` 
    frc1=`mult10 $frc1 $lgF` 
fi 

# Si fraction diviseur plus petit fraction dividende 
if test $lgF2 -lt $lgF1 
then 
    lgF=`expr $lgF1 - $lgF2` 
    frc2=`mult10 $frc2 $lgF` 
fi 

dividende=`expr $dividende + $frc1` 
diviseur=`expr $diviseur + $frc2` 

test -n "$opt_verb" && echo "Calcul réel: $dividende / $diviseur" 

# Division par zéro => Interdit sauf si dividende vaut 0 
if test $diviseur -eq 0 
then 
    if test $dividende -eq 0 
    then 
        # Le résultat vaut "1" par convention 
        test -n "$opt_verb" && echo "0 / 0 = 1 par convention" 
        echo 1 
        exit 0 
    fi 
    # Division par 0 !!! 
    echo "Division par zéro ???" 
    exit 3 
fi 

# Cas particulier 
test $dividende -eq 0 && echo 0 && exit 0    # Le "exit" est facultatif 

# Gestion du négatif 
test $fl_neg -ne 0 && puts "-" 

# Boucle de division 
while test $dividende -ne 0 -a \( $opt_prec -ne 0 -o -z "$virg" \) 
do 
    # Calcul quotient et reste 
    quot=`expr $dividende / $diviseur` 
    rest=`expr $dividende % $diviseur` 

    # Affichage quotient calculé 
    puts "$quot" 

    # Remplacement dividende par reste * 10 
    dividende=`expr $rest \* 10` 

    # Si reste non nul 
    if test $rest -ne 0 
    then 
        # Si la virgule a été mise 
        if test -n "$virg" 
        then 
            # Décrément précision 
            opt_prec=`expr $opt_prec - 1` 
        else 
            # Affichage virgule si nb décimales demandé non nul 
            test $opt_prec -ne 0 && puts "." 
            virg="true" 
        fi 
    fi 
done 


# Affichage EOL 
echo
```

## Résolution de polynôme du second degré : Ax^2 + Bx + C = 0

Ce script résout les équations polynomiales de second degré : `Ax^2 + Bx + C = 0` (de façon classique) :

```shell
#!/bin/sh 

# Programme de résolution de polynôme du second degré (Ax2 + Bx + C = 0) 
# Usage: prog [-h] [-v] [--] A B C 
# Option "-h": Pour avoir l'aide sur l'utilisation de ce programme 
# Option "-v": Affichage des étapes 

# Fonction affichant la façon d'utiliser ce programme 
# Paramètres entrée : texte à afficher (facultatif) 
# Valeur sortie : aucune 
usage() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Affichage des messages particuliers 
        test -n "$*" && echo "`basename $0`: $*" 

        # Affichage du message d'aide 
        echo "Usage: `basename $0` [-h] [-v] [--] A B C" 
    ) 
} 
 
# Fonction de vérification de tous ses arguments numériques 
# Paramètres entrée : arguments à vérifier (...) 
# Valeur sortie : 
# tous arguments corrects (0) 
# au moins un argument non correct (not 0) 
numeric() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Boucle sur chaque argument 
        for nb in $* 
        do 
            # Suppression de chaque chiffre et du "." et du signe 
            nb=`echo $nb |sed -e "s/[0-9]//g" |sed -e "s/\.//" |sed -e "s/^-//"` 

            # Vérification => nb non vide => pas un nombre 
            test -n "$nb" && return 1 
        done 

        # Renvoi OK 
        return 0 
    ) 
} 

# Fonction réduisant un nombre à son écriture la plus courte 
# Paramètres entrée : nombre à réduire (facultatif) 
# Valeur sortie : aucune 
reduce() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Le nombre est pris dans l'argument s'il existe ou dans stdin 
        test -n "$1" && nb="$1" || nb="`cat`" 

        # Si le nombre commence par "-" 
        if test "`echo $nb |cut -c1`" = "-" 
        then 
            # On gère le négatif 
            nb=`echo $nb |cut -c2-` 
            fl_neg="true" 
        fi 


        # Suppression des zéros non significatifs à gauche 
        nb=`echo $nb |sed -e "s/^0\{1,\}//g"` 

        # Si le nombre est vide ou réduit à "." il vaut 0 
        test -z "$nb" -o "$nb" = "." && echo 0 && return 

        # Si le nombre est décimal 
        if echo $nb |fgrep "." 1>/dev/null 
        then 
            # Décomposition du nombre en parties entières et fractionnelles 
            ent=`echo $nb |cut -f1 -d.` 
            frc=`echo $nb |cut -f2 -d.` 
 
            # Suppression des zéros non significatifs à droite de la fraction 
            frc=`echo $frc |sed -e "s/0\{1,\}$//g"` 

            # Réécriture du nombre 
            nb=${ent:-0}${frc:+".$frc"} 
        fi 

        echo ${fl_neg:+"-"}$nb 
    ) 
} 

# Fonction recherchant la racine carrée d'un nombre 
# Paramètres entrée : nombre dont on veut la racine 
# Valeur sortie : aucune 

racine() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Cas particulier (mais ça marche même sans ça) 
        if test `expr "$1" = 0` -eq 1 -o `expr "$1" = 1` -eq 1 
        then 
            echo $1 
            return 0 
        fi 

        # Calcul 
        echo "sqrt($1)" |bc -l 
    ) 
} 

# Programme principal 

# Gestion des options (on utilise l'instruction "getopts" plus souple que la commande "getopt") 

while getopts hv opt 
do 
    case $opt in 
    h) # Aide demandée 
        usage; exit 0 ;; 
    v) # Demande volubilité 
        opt_verb="true" ;; 
    *) # Autre option 
        usage; exit 1 ;; 
    esac 
done 

shift `expr $OPTIND - 1` 

# Vérification assez d'arguments 
test $# -lt 3 && usage "Pas assez d'arguments" && exit 1 

# Vérifications arguments 1, 2 et 3 sont des nombres 
numeric $1 $2 $3 
test $? -ne 0 && echo "Une de ces valeurs '$1', '$2' ou '$3' n'est pas un nombre" && exit 2 

# Récupération coefficients 
A=`reduce $1` 
B=`reduce $2` 
C=`reduce $3` 
test -n "$opt_verb" && echo "Coeff: $A $B $C" 

# A nul => Solution = -C/B 
if test $A -eq 0 
then 
    test -n "$opt_verb" && echo "Solution=-$C / $B" 
    sol=`echo "-$C / $B" |bc -l |reduce` 
    echo "A nul - Une solution classique pour $A $B $C: $sol" 
    exit 0 
fi 

# Calcul du déterminant B2 - 4AC 
delta=`echo "$B * $B - 4 * $A * $C" |bc -l |reduce` 
test -n "$opt_verb" && echo "Delta = $B * $B - 4 * $A * $C = $delta" 

# Delta négatif => Pas de solution réelle 
if test `expr $delta \< 0` -eq 1 
then 
    echo "Delta négatif - Pas de solution réelle pour $A $B $C" 
    exit 0 
fi 

# Delta nul => Une solution -B/2A 
if test `expr $delta = 0` -eq 1 
then 
    test -n "$opt_verb" && echo "Solution=$B / (2 * $A)" 
    sol=`echo "$B / ($A * 2)" |bc -l |reduce` 
    echo "Une solution réelle pour $A $B $C: $sol" 
    exit 0 
fi 

# Delta positif => deux solutions 
racdelta=`racine $delta |reduce` 
test -n "$opt_verb" && echo "Racine delta=$racdelta" 

# Solution 1 
test -n "$opt_verb" && echo "Solution1=(-($B) - $racdelta) / (2 * $A)" 
sol=`echo "(-($B) - $racdelta) / ($A * 2)" |bc -l |reduce` 
echo "Solution 1: $sol" 

# Solution 2 
test -n "$opt_verb" && echo "Solution2=(-($B) + $racdelta) / (2 * $A)" 
sol=`echo "(-($B) + $racdelta) / ($A * 2)" |bc -l |reduce` 
echo "Solution 2: $sol"
```

## Tour de Hanoï

Ce script résout le puzzle mathématique des tours de Hanoï :

```shell
#!/bin/sh 
# Programme de tours de Hanoï 
# Usage: prog [-?] nb_pions 
# Option "-?": Pour avoir l'aide sur l'utilisation de ce programme 

# Fonction affichant la façon d'utiliser ce programme 
# Paramètres entrée : texte à afficher (facultatif) 
# Valeur sortie : aucune 
usage() 
{ 
    # Création d'un sous-shell pour isoler le contexte 
    ( 
        # Affichage des messages particuliers 
        test -n "$*" && echo "`basename $0`: $*" 

        # Affichage du message d'aide 
        echo "Usage: `basename $0` [-?] nb_pions" 
    ) 
} 

# Fonction qui modifie le nb de pions d'une tour +|- 
# Paramètres entrée : 
# - tour à modifier 
# - opération (+|-) 
# Valeur sortie : aucune 
modif() 
{ 
    # Pas de sous-shell - La fonction doit modifier les variables principales 

    # Évaluation de la tour 
    case $1 in 
        1) # La tour 1 change son nb de pions 
            t1=`expr $t1 $2 1` 
            ;; 
        2) # La tour 2 change son nb de pions 
            t2=`expr $t2 $2 1` 
            ;; 
        3) # La tour 3 change son nb de pions 
            t3=`expr $t3 $2 1` 
            ;; 
    esac 
} 

# Fonction récursive qui déplace les pions d'une tour x vers une tour y 
# Paramètres entrée : 
# - nb de pions à déplacer 
# - tour de départ 
# - tour d'arrivée 
# - tour intermédiaire (facultatif) 
# Valeur sortie : aucune 
deplace() 
{ 
    # Pas de sous-shell - La fonction doit modifier les variables principales 

    if test $1 -eq 1 
    then 
        # Ici on est en fin de récursivité - Il ne reste plus qu'un seul pion à déplacer 
        modif $2 - # La tour de départ perd un pion 
        modif $3 + # La tour d'arrivée gagne un pion 
        mvt=`expr $mvt + 1` # Le nb de mouvements augmente 

        # On affiche le mouvement et on quitte la fonction 
        echo "Mvt: $mvt - $2 $3: Etat: $t1 $t2 $t3" 
        return 
    fi 

    # Ici, on est dans la partie intermédiaire du jeu - Il y a encore des pions qui gênent 

    # Calcul en local (important sinon bogue) du nombre de pions restant à bouger 
    local nb=`expr $1 - 1` 

    # Déplacement récursif des pions restants de la tour de départ vers la tour intermédiaire 
    # La tour d'arrivée servira de tour de rangement provisoire 
    deplace $nb $2 $4 $3 

    # Déplacement du dernier pion de la tour de départ vers la tour d'arrivée 
    deplace 1 $2 $3 

    # Déplacement récursif des pions restants de la tour intermédiaire vers la tour d'arrivée 
    # La tour de départ servira de tour de rangement provisoire 
    deplace $nb $4 $3 $2 
} 

# Programme principal 

# Gestion des options (on utilise l'instruction "getopts" plus souple que la commande "getopt") 
while getopts ? opt 
do 
    case $opt in 
    \?) # Demande d'aide 
        usage; exit 0 
        ;; 
    *) # Option incorrecte 
        usage; exit 1 
        ;; 
    esac 
done 
 
shift `expr $OPTIND - 1` 

# Vérification assez d'arguments 
if test $# -lt 1 
then 
    usage "Pas assez d'arguments"; exit 1 
fi 

# Initialisation tours et compteur de mouvements 
t1=$1 
t2=0 
t3=0 
mvt=0 

# Affichage position de départ 
echo "Départ: $t1 $t2 $t3" 

# Lancement mouvement de la tour 1 vers la tour 3 en utilisant la tour 2 comme intermédiaire 
deplace $1 1 3 2
```
