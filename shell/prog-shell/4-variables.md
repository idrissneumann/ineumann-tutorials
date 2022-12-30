# Les variables

Il n'est pas de langage sans variable. Une variable sert à mémoriser une information afin de la réutiliser ultérieurement. Elles sont créées par le programmeur au moment où il en a besoin. Il n'a pas besoin de les déclarer d'un type particulier et peut en créer quand il veut, où il veut.

Leur nom est représenté par une suite de caractères commençant impérativement par une lettre ou le caractère `_` (souligné ou underscore) et comportant ensuite des lettres, des chiffres ou le caractère souligné. Il ne doit pas correspondre à un des mots-clefs du Shell.

Leur contenu est interprété exclusivement comme du texte. Il n'existe donc pas, en Bourne Shell, d'instruction d'opération sur des variables ou sur du nombre (addition, soustraction...). Il n'est pas non plus possible d'avoir des variables dimensionnées (tableaux). Mais cela est possible en Korn Shell et Bourne Again Shell (et shells descendants).

Il est important de noter que le Shell reconnaît, pour toute variable, deux états :

* non définie (non-existence) : elle n'existe pas dans la mémoire
* définie (existence) : elle existe dans la mémoire ; même si elle est vide

## L'affectation - L'accès

### Les variables simples

__Syntaxe__

```shell
variable=chaîne
```

L'affectation d'une variable simple (il n'y a pas de possibilité de créer de tableau en Bourne Shell ) se fait par la syntaxe `variable=chaîne`.

> /!\ C'est la seule syntaxe du Shell qui ne veuille pas d'espace dans sa structure sous peine d'avoir une erreur lors de l'exécution.

Dans le cas où on voudrait entrer une chaîne avec des espaces dans la variable, il faut alors encadrer la chaîne par des guillemets simples ou doubles (la différence entre les deux sera vue plus tard). À partir du moment où elle a été affectée, une variable se met à exister dans la mémoire, même si elle a été affectée avec « rien ».

L'accès au contenu de la variable s'obtient en faisant précéder le nom de la variable du caractère `$`.

__Exemples__

```shell
Prompt> nom="Pierre" # Affectation de "Pierre" dans la variable "nom" 
Prompt> objet="voiture" # Affectation de "voiture" dans la variable "objet" 
Prompt> coul=bleue     # Affectation de "bleu" dans la variable "coul" 
Prompt> echo "Il se nomme $nom" # Affichage d'un texte et d'une variable 
Prompt> txt="$nom a une $objet $coul" # Mélange de variables et texte dans une variable 
Prompt> echo txt # Attention à ne pas oublier le caractère "$" 
Prompt>echo $txt # Affichage de la variable "txt"
```

### Les tableaux (shells évolués)

__Syntaxe__

```shell
variable[n]=chaîne 
variable=(chaîne1 chaîne2 ?)
```

Le Korn Shell, Bourne Again Shell (et shells descendants) permettent de créer des tableaux à une seule dimension. L'affectation d'un élément d'un tableau se fait par la syntaxe `variable[n]=chaîne`. Dans ce cas précis, les crochets ne signifient pas « élément facultatif », mais bien « crochets » et le programmeur doit les mettre dans sa syntaxe.

L'indice « n » que l'on spécifie entre les crochets doit être impérativement positif ou nul, mais il n'a pas de limite maximale. De plus, rien n'oblige le programmeur à remplir le ne élément avant d'aller remplir le (n + 1)e.

Il est possible de remplir en une seule instruction les « n » premiers éléments du tableau en utilisant la syntaxe `variable=(chaîne1 chaîne2 ...)`. Dans cette syntaxe où l'utilisation de parenthèses `( )` est obligatoire, le texte « chaîne1 » ira dans la variable `variable[0]`, le texte `chaîne2` ira dans la variable `variable[1]`, ... Cette syntaxe remplace tout le tableau par les seules chaînes situées entre parenthèses. L'ancien contenu éventuel disparaît alors pour être remplacé par le nouveau.

L'accès au contenu de la variable d'indice « n » s'obtient en encadrant le nom de la variable indicée par des accolades `{ }` et en faisant précéder le tout du caractère `$`.

Si on remplace la valeur de l'indice par le caractère `*`, le Shell concaténera tous les éléments du tableau en une chaîne unique et renverra cette dernière. Et si on remplace la valeur de l'indice par le caractère `@`, le Shell transformera chaque élément du tableau en chaîne et renverra ensuite l'ensemble de toutes ces chaînes concaténées. Visuellement, il n'y a aucune différence dans le résultat entre l'utilisation des caractères `*` ou `@`.

Dans des environnements de shells acceptant les tableaux, toute variable simple est automatiquement transformée en tableau à un seul élément d'indice `[0]`.

__Exemple__

```shell
Prompt> nom[1]="Pierre" # Affectation de "Pierre" dans la variable "nom[1]" 
Prompt> nom[5]="Paul" # Affectation de "Paul" dans la variable "nom[5]" 
Prompt> nom="Jacques" # Affectation de "Jacques" dans la variable "nom[0]" 
Prompt> i=5    # Affectation de "5" à la variable "i" (ou "i[0]") 
Prompt>prenom=(Pim Pam Poum) # Affectation de 3 prénoms dans un tableau 
Prompt> echo "Voici mes 3 noms: ${nom[0]}, ${nom[1]} et ${nom[$i]}" 
Prompt> echo "Mon tableau de noms contient ${nom[*]}" 
Prompt> echo "Mon tableau de prénoms contient ${prenom[@]}"
```

### Remarque

Même si cela est possible de façon limitée (cf. _commande eval_), il est difficile et déconseillé de vouloir manipuler des « variables de variable » (connues dans d'autres langages sous le nom « pointeurs »). Autrement dit, la syntaxe `$$var` qui pourrait vouloir dire « contenu du contenu de la variable var » signifie en réalité « _contenu de la variable `$$`_ » (sera vue ultérieurement) suivi de la chaîne `var`.

## La substitution

On peut utiliser des séquenceurs spéciaux pour modifier la manière dont le Shell va renvoyer le contenu de ou des variables demandées.

### Tous types de Shell

* `${var}` : renvoie le contenu de `$var`. Il sert à isoler le nom de la variable par rapport au contexte de son utilisation. Ceci évite les confusions entre ce que l'utilisateur désire `${prix}F` (variable `prix` suivie du caractère `F`) et ce que le Shell comprendrait si on écrivait simplement `$prixF` (variable `prixF`)
* `${var-texte}` : renvoie le contenu de la variable `var` si celle-ci est définie (existe en mémoire) ; sinon renvoie le texte `texte`
* `${var:-texte}` : renvoie le contenu de la variable `var` si celle-ci est définie et non vide ; sinon renvoie le texte `texte`
* `${var+texte}` : renvoie le texte `texte` si la variable `var` est définie ; sinon ne renvoie rien
* `${var:+texte}` : renvoie le texte `texte` si la variable `var` est définie et non vide ; sinon ne renvoie rien
* `${var?texte}` : renvoie le contenu de la variable `var` si celle-ci est définie ; sinon affiche le texte `texte` comme message d'erreur (implique donc l'arrêt du script)
* `${var:?texte}` : renvoie le contenu de la variable `var` si celle-ci est définie et non vide ; sinon affiche le texte `texte` (comme `${var:-texte}`) comme message d'erreur (implique donc l'arrêt du script)
* `${var=texte}` : renvoie le contenu de la variable `var` si celle-ci est définie, sinon affecte le texte `texte` à la variable `var` avant de renvoyer son contenu
* `${var:=texte}` : renvoie le contenu de la variable `var` si celle-ci est définie et non vide, sinon affecte le texte `texte` à la variable `var` avant de renvoyer son contenu

### Uniquement en Korn Shell et Bourne Again Shell (et shells descendants)

* `${var[n]}` : renvoie le contenu du nie élément du tableau `var`
* `${var[*]}` : concatène tous les éléments présents dans le tableau `var` en une chaîne unique et renvoie cette dernière
* `${var[@]}` : transforme individuellement chaque élément présent dans le tableau `var` en une chaîne et renvoie la concaténation de toutes les chaînes
* `${var#texte}` : si `texte` contient un métacaractère, alors il sera étendu jusqu'à la plus petite correspondance avec le contenu de `var` pris à partir du début. Si cette correspondance est trouvée, elle est alors supprimée du début de `var`
* `${var##texte}` : si `texte` contient un métacaractère, alors il sera étendu jusqu'à sa plus grande correspondance avec le contenu de `var` pris à partir du début. Si cette correspondance est trouvée, elle est alors supprimée du début de `var`
* `${var%texte}` : si `texte` contient un métacaractère, alors il sera étendu jusqu'à sa plus petite correspondance avec le contenu de `var` pris à partir de la fin. Si cette correspondance est trouvée, elle est alors supprimée de la fin de `var`
* `${var%%texte}` : si `texte` contient un métacaractère, alors il sera étendu jusqu'à sa plus grande correspondance avec le contenu de `var` pris à partir de la fin. Si cette correspondance est trouvée, elle est alors supprimée de la fin de `var`
* `${#var}` : renvoie le nombre de caractères contenus dans la variable `var`. Si la variable est un tableau, renvoie alors le nombre d'éléments du tableau
* `$((expression))` : renvoie la valeur numérique de l'expression demandée

### Uniquement en Bourne Again Shell (et shells descendants)

* `${!var}` : utilise le contenu de la variable `var` comme un nom de variable et renvoie le contenu de cette dernière (permet donc de simuler un pointeur)
* `${var:x:y}` : renvoie les « y » caractères de la variable « var » à partir du caractère n° « x » (attention, le premier caractère d'une variable porte le n°`0`). Si la variable est un tableau, renvoie alors les `y` éléments du tableau `var` à partir de l'élément n°`x`
* `${var:x}` : renvoie la fin de la variable `var` à partir du caractère n°`x` (attention, le premier caractère d'une variable porte le n°`0`). Si la variable est un tableau, renvoie alors les derniers éléments du tableau « var » à partir de l'élément n°`x`
* `${var/texte1/texte2}` : renvoie le contenu de `var`, mais en lui remplaçant la première occurrence de la chaîne `texte1` par la chaîne `texte2`
* `${var//texte1/texte2}` : renvoie le contenu de `var`, mais en lui remplaçant chaque occurrence de la chaîne `texte1` par la chaîne `texte2`
