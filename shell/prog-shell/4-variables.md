# Les variables

Il n'est pas de langage sans variable. Une variable sert à mémoriser une information afin de la réutiliser ultérieurement. Elles sont créées par le programmeur au moment où il en a besoin. Il n'a pas besoin de les déclarer d'un type particulier et peut en créer quand il veut, où il veut.

Leur nom est représenté par une suite de caractères commençant impérativement par une lettre ou le caractère `_` (souligné ou underscore) et comportant ensuite des lettres, des chiffres ou le caractère souligné. Il ne doit pas correspondre à un des mots-clefs du Shell.

Leur contenu est interprété exclusivement comme du texte. Il n'existe donc pas, en Bourne Shell, d'instruction d'opération sur des variables ou sur du nombre (addition, soustraction…). Il n'est pas non plus possible d'avoir des variables dimensionnées (tableaux). Mais cela est possible en Korn Shell et Bourne Again Shell (et shells descendants).

Il est important de noter que le Shell reconnaît, pour toute variable, deux états :

* non définie (non-existence) : elle n'existe pas dans la mémoire
* définie (existence) : elle existe dans la mémoire ; même si elle est vide
