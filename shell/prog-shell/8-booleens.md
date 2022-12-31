# Les contrôles booléens

## Introduction

Le Shell étant un langage, il permet l'utilisation de contrôles « _vrai/faux_ » appelés aussi « _booléens_ ».

Le principe est que chaque commande, chaque programme exécuté par Unix, donc par le Shell, lui retransmet en fin d'exécution un code de retour appelé aussi code de statut.

La convention qui a été établie veut que si la commande s'est bien exécutée, le code de statut ait pour valeur __zéro__. En revanche, si la commande a eu un problème dans son exécution (pas de droit d'accès, pas de fichier à éditer…), son code de statut aura une valeur __différente de zéro__. En effet, il existe toujours plusieurs raisons qui peuvent faire qu'un programme ne s'exécute pas ou mal ; en revanche il n'y a qu'une seule raison qui fait qu'il s'exécute correctement.

Cette convention ayant été établie, le Shell considérera alors un programme de statut « _`0`_ » comme étant « _vrai_ » ; et un programme de statut « _différent de `0`_ » comme étant « _faux_ ». Grâce à cette convention, l'utilisateur peut programmer de manière booléenne en vérifiant le statut du programme qui s'est exécuté.

__Remarque__

Une convention n'est jamais une obligation. Rien n'empêche donc un programmeur de faire renvoyer un statut quelconque par ses programmes. En retour, les autres utilisateurs ou les autres scripts ne pourront jamais se fier au statut du programme en question.

Le statut de la dernière commande exécutée se trouve dans la variable `$?` du processus ayant lancé la commande. On peut donc visualiser facilement un résultat « _vrai_ » ou « _faux_ » de la dernière commande avec la syntaxe `echo $?`. Bien évidemment, visualiser un statut de cette manière perd ledit statut puisque la variable `$?` prend la valeur de la __dernière__ commande exécutée (ici `echo`).

> /!\ Il ne faut pas confondre « affichage » (ce que la commande affiche à l'écran) et « statut » (état de son exécution). Une commande peut ne rien afficher, mais renvoie __toujours__ un statut.

__Exemple__

```shell
Prompt> cd /tmp # La commande n'affiche rien, mais elle réussit 
Prompt> echo $? 
0 
Prompt> rm /tmp # Si on efface un répertoire sans en avoir le droit? 
rm: 0653-603 Cannot remove directory /tmp 
Prompt> echo $? 
2 
Prompt> rm /tmp 2>/dev/null # Même si on redirige l'affichage des erreurs? 
Prompt> echo $? 
2 
Prompt> echo $? # L'affichage précédent s'étant bien exécuté? 
0
```

## La commande `test`

La commande `test` est une… commande. À ce titre, `test` renvoie donc un statut vrai ou faux. Mais cette commande n'affiche rien à l'écran. Il faut donc, pour connaître le résultat d'un test, vérifier le contenu de la variable `$?`.

La commande `test` a pour but de vérifier (tester) la validité de l'expression demandée, en fonction des options choisies. Elle permet ainsi de vérifier l'état des fichiers, comparer des variables…

La syntaxe générale d'une commande test est `test expression` ; mais elle peut aussi être `[ expression ]` (à condition de ne pas oublier les espaces séparant l'expression des crochets). Ici, les crochets ne signifient pas « élément optionnel », mais bien « crochets ».

### Test simple sur les fichiers

__Syntaxe__

```shell
test option "fichier"
```

__Options__

|Option  |Signification                                                     |
|--------|------------------------------------------------------------------|
|`-s`    |fichier « non vide »                                              |
|`-f`    |fichier « ordinaire »                                             |
|`-d`    |fichier « répertoire »                                            |
|`-b`    |fichier « spécial » mode « bloc »                                 |
|`-c`    |fichier « spécial » mode « caractère »                            |
|`-p`    |fichier « tube »                                                  |
|`-L`    |fichier « lien symbolique »                                       |
|`-h`    |fichier « lien symbolique » (identique à `-L`)                    |
|`-r`    |fichier a le droit en lecture                                     |
|`-w`    |fichier a le droit en écriture                                    |
|`-x`    |fichier a le droit en exécution                                   |
|`-u`    |fichier a le « setuid »                                           |
|`-g`    |fichier a le « setgid »                                           |
|`-k`    |fichier a le « sticky bit »                                       |
|`-t [n]`|fichier n°`n` est associé à un terminal (par défaut, `n` vaut `1`)|

### D'autres tests simples sur les fichiers (« Korn Shell » et « Bourne Again Shell » et shells descendants)

__Syntaxe__

```shell
test option "fichier"
```

__Options__

|Option|Signification                                                                                              |
|------|-----------------------------------------------------------------------------------------------------------|
|`-S`  |fichier « socket » (« Korn Shell » et « Bourne Again Shell » et shells descendants)                        |
|`-e`  |fichier existe quel que soit son type (« Bourne Again Shell » et shells descendants)                       |
|`-O`  |fichier m'appartient (« Korn Shell » et « Bourne Again Shell » et shells descendants)                      |
|`-G`  |fichier appartient à mon groupe (« Korn Shell » et « Bourne Again Shell » et shells descendants)           |
|`-N`  |fichier modifié depuis sa dernière lecture (« Korn Shell » et « Bourne Again Shell » et shells descendants)|

### Test complexe sur les fichiers (« Korn Shell » et en « Bourne Again Shell » et shells descendants)

__Syntaxe__

```shell
test "fichier1" option "fichier2"
```

__Options__

|Option|Signification                                                               |
|------|----------------------------------------------------------------------------|
|`-nt` |fichier1 plus récent que `fichier2` (date de modification)                  |
|`-ot` |fichier1 plus vieux que `fichier2` (date de modification)                   |
|`-ef` |fichier1 lié à `fichier2` (même numéro d'inode sur même système de fichiers)|

### Test sur les longueurs de chaînes de caractères

__Syntaxe__

```shell
test option "chaîne"
```

__Options__

|Option    |Signification                                                         |
|----------|----------------------------------------------------------------------|
|`-z`      |chaîne de longueur nulle                                              |
|`-n`      |chaîne de longueur non nulle                                          |

### Test sur les chaînes de caractères

__Syntaxe__

```shell
test "chaîne1" opérateur "chaîne2"
```

__Opérateurs__

|Opérateur|Signification                                                         |
|---------|----------------------------------------------------------------------|
|`=`      |chaîne1 identique à chaîne2                                           |
|`!=`     |chaîne1 différente de chaîne2                                         |

> /!\ L'emploi des doubles-guillemets dans les syntaxes faisant intervenir des chaînes est important surtout lorsque ces chaînes sont prises à partir de __variables__. En effet, il est possible d'écrire l'expression sans double-guillemet, mais si la variable est vide ou inexistante, l'expression reçue par le Shell sera bancale et ne correspondra pas au schéma attendu dans la commande `test`.

__Exemple__

```shell
test $a = bonjour # Si a est vide, le shell voit test = bonjour (incorrect) 
test "$a" = "bonjour" # Si a est vide, le shell voit test "" = "bonjour" (correct)
```

__Remarques__

ksh 88 et bash proposent aussi la syntaxe des « doubles-crochets » qui est une version étendue de la commande test. Cette syntaxe permet une plus grande souplesse au niveau de la manipulation de chaînes de caractères. Par exemple, il n'est plus nécessaire d'encadrer ses variables avec des doubles-guillemets lorsque l'on souhaite faire une comparaison de chaînes.

En outre, les versions 3 et supérieures de bash proposent l'opérateur `=~` qui permet de faire des tests sur expressions régulières, en utilisant non pas la commande test, mais les doubles-crochets.

__Exemple__

```shell
prompt> var="1A" 
prompt> [[ $var =~ ^[0-9]*$ ]] # renvoie faux
prompt> [[ $var =~ ^[0-9] ]] # renvoie vrai
prompt> [[ $var =~ [A-Z]{1} ]] # renvoie vrai
prompt> [[ $var =~ ^[0-1]{1}[A-Z]{1}$ ]] # renvoie vrai
```

Dans les versions plus anciennes de bash, ou pour les autres Shells, il est possible d'utiliser la commande `grep` pour vérifier ces mêmes expressions.

### Tests sur les valeurs numériques

__Syntaxe__

```shell
test nb1 option nb2
```

__Options__

|Option|Signification                                                         |
|------|----------------------------------------------------------------------|
|`-eq` |`nb1` égal à `nb2` (equal)                                            |
|`-ne` |`nb1` différent de `nb2` (non equal)                                  |
|`-lt` |`nb1` inférieur à `nb2` (less than)                                   |
|`-le` |`nb1` inférieur ou égal à `nb2` (less or equal)                       |
|`-gt` |`nb1` supérieur à `nb2` (greater than)                                |
|`-ge` |`nb1` supérieur ou égal à `nb2` (greater or equal)                    |

> /!\ Utiliser `=` ou `!=` à la place de `-eq` ou `-ne` peut produire des résultats erronés. Pour en savoir plus, consulter [ce cours](https://www.ineumann.fr/docs/shell/bash-bonnes-pratiques#rappels-sur-les-conditions)

__Exemple__

```shell
test "5" = "05" # Renvoie "faux" (ce qui est mathématiquement incorrect) 
test "5" -eq "05" # Renvoie "vrai" (correct)
```