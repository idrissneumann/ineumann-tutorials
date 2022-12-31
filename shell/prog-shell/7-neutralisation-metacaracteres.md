# Neutralisation des métacaractères

Certains caractères alphanumériques du Shell ont une signification particulière.

__Exemple__

Essayer de faire afficher tel quel à l'écran le texte encadré ci-dessous :

```
* (une étoile) 
Il a crié "assez"; mais cela ne suffisait pas 
L'habit à $100 ne fait pas le moine 
A > 0 <=> A + B > B
```

Les problèmes rencontrés pour afficher ces quelques lignes proviennent des caractères __étoile__, __parenthèse ouvrante__, __parenthèse fermante__, __guillemet__, __point-virgule__, __dollar__, __apostrophe__, __backslash__, __inférieur__ et __supérieur__ qui ont une signification spéciale en Shell. On les appelle « _métacaractères_ » (méta en grec signifie « transformer ») parce que le Shell les transforme avant de les traiter. Afin de les utiliser tels quels par le langage, on est obligé d'y appliquer un « mécanisme de neutralisation de transformation ». C'est-à-dire qu'il faut demander au Shell de ne pas les transformer en autre chose que ce qu'ils sont.

## Rappel sur les métacaractères

Les métacaractères suivants sont utilisés lorsque l'on désire référencer un fichier sans connaître exactement son nom :

|métacaractère|Signification                                                         |
|-------------|----------------------------------------------------------------------|
|`*`          |Toute chaîne de caractère, même une chaîne vide                       |
|`?`          |Un caractère quelconque, mais présent                                 |
|`[xyz]`      |Tout caractère correspondant à l'un de ceux contenus dans les crochets|
|`[x-y]`      |Tout caractère compris entre `x` et `y`                               |
|`[!x-y]`     |Tout caractère qui n'est pas compris entre `x` et `y`                 |

Les métacaractères suivants sont utilisés dans le Shell :

|métacaractère|Signification                                                         |
|-------------|----------------------------------------------------------------------|
|`$`          |Contenu d'une variable                                                |
|`" "`        |Neutralisation de certains métacaractères placés à l'intérieur        |
|`' '`        |Neutralisation de tous les métacaractères placés à l'intérieur        |
|`\`          |Neutralisation de tout métacaractère placé après                      |
|`( )`        |Groupement de commandes                                               |
|`;`          |Séparateur de commande (permet d'en placer plusieurs sur une ligne)   |
|`<`          |Redirection en entrée à partir d'un fichier                           |
|`<<`         |Redirection en entrée à partir des lignes suivantes                   |
|`>`          |Redirection en sortie vers un fichier                                 |
|`>>`         |Redirection en sortie vers un fichier en mode « ajout »               |
|`\|`         |Redirection vers une commande (pipe mémoire)                          |

## Le « backslash »

Le métacaractère « __backslash__ » a pour effet de neutraliser tout métacaractère qui le suit, quel qu'il soit. Mais il n'en neutralise qu'un seul.

__Exemple__

Solution avec le métacaractère « _backslash_ » :

```shell
Prompt> echo \* \(une étoile\) 
Prompt> echo Il a crié \"assez\"\; mais cela ne suffisait pas 
Prompt> echo L\'habit à \$100 ne fait pas le moine 
Prompt> echo A et B \> 0 \<=\> A + B \> B
```

## L'apostrophe ou « quote simple »

Le métacaractère « __apostrophe__ » appelé aussi « __*quote* simple__ » a pour effet de neutraliser tous les métacaractères situés après, sauf lui-même. Cette exception permet ainsi d'avoir un début et une fin de zone de neutralisation.

Mais on ne peut pas, avec cette option, neutraliser le métacaractère « __apostrophe__ » puisqu'il marque la fin de la zone. Et le métacaractère « __backslash__ » qui pourrait résoudre cet inconvénient ne fonctionnera pas puisqu'il sera __lui-même__ neutralisé.

__Exemple__

Solution avec le métacaractère « _quote simple_ » :

```shell
Prompt> echo '* (une étoile)' 
Prompt> echo 'Il a crié "assez"; mais cela ne suffisait pas' 
Prompt> # Impossible d'afficher la troisième ligne avec la quote simple 
Prompt> echo 'A et B > 0 <=> A + B > B'
```

## Le double-guillemet ou « double-quote »

Le métacaractère « __double-guillemet__ » a pour effet de neutraliser tous les métacaractères situés après, sauf le métacaractère « __dollar__ » (qui permet d'accéder au contenu d'une variable), le métacaractère « __accent grave__ » (qui permet la sous-exécution), le métacaractère « __double-guillemet__ » (qui permet de marquer la fin de la zone de neutralisation), et le métacaractère « __backslash__ » s'il est suivi d'un métacaractère de la liste ci-dessus (ce qui permet donc de neutraliser ledit métacaractère). On peut donc, avec cette option, neutraliser le métacaractère « __double-guillemet__ » puisqu'il fait partie de la liste ; donc qu'il est neutralisable par le métacaractère « __backslash__ ».

__Exemple__

Solution avec le métacaractère « _double-guillemet_ » :

```shell
Prompt> echo "* (une étoile)" 
Prompt> echo "Il a crié \"assez\"; mais cela ne suffisait pas" 
Prompt> echo "L'habit à \$100 ne fait pas le moine" 
Prompt> echo "A et B > 0 <=> A + B > B"
```
