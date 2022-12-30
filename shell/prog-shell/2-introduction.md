# Introduction

Le Shell est un interpréteur de commande. Il ne fait pas partie du système d'exploitation UNIX et c'est la raison pour laquelle il porte ce nom « coquille », qui indique son état détaché du « noyau » Unix. Son rôle est d'analyser la commande tapée afin de faire réagir le système pour qu'il réponde aux besoins de l'utilisateur. C'est le premier langage de commandes développé sur Unix par Steve Bourne.

Une comparaison rapide pourrait l'apparenter au DOS (Disc Operating System) développé par Microsoft, mais cette comparaison n'est là que pour illustrer le rôle du Shell par rapport à Unix.

De par sa qualité de « programme externe », il n'est pas unique. En effet, rien n'empêche n'importe quel programmeur de programmer une boucle qui attend une chaîne au clavier, analyse cette chaîne et appelle ensuite le système pour exécuter l'ordre demandé. C'est la raison pour laquelle il existe plusieurs shells. Nous trouvons entre autres (liste non exhaustive) :

* le Bourne Shell (« /bin/sh »)
* le Korn Shell (« /bin/ksh ») pour lequel deux versions majeures sont aujourd'hui couramment utilisées (ksh 88 et ksh 93)
* le cShell (« /bin/csh ») pour les utilisateurs préférant un langage apparenté au « C »
* le Job Shell (« /bin/jsh »)
* le Shell réseau (« /bin/rsh »)
* le Bourne Again Shell (« /bin/bash ») qui a repris le Bourne Shell, mais qui l'a agrémenté de nouvelles fonctionnalités (rappel de commandes, complétion automatique...) ;
* le c Shell amélioré (« /bin/tcsh ») améliorant le cShell tout en lui restant compatible
* l'Almquist Shell (« /bin/ash ») améliorant le Bourne Shell tout en étant plus compact que le Bourne Again Shell
* le Debian Almquist Shell (« /bin/dash ») descendant directement de l'Admquist Shell et présent sur les distributions basées Debian
le zShell (« /bin/zsh »)
* et d'autres, encore à venir...
  
C'est un langage de commandes, mais aussi un langage de programmation. Il permet donc :

* l'utilisation de variables
* la mise en séquence de commandes
* l'exécution conditionnelle de commandes
* la répétition de commandes

Un programme shell appelé aussi « script » est un outil facile à utiliser pour construire des applications en regroupant des appels système, outils, utilitaires et programmes compilés. Concrètement, le répertoire entier des commandes Unix, des utilitaires et des outils est disponible à partir d'un script shell. Les scripts shell conviennent parfaitement pour des tâches d'administration du système et pour d'autres routines répétitives ne réclamant pas les particularités d'un langage de programmation structuré.

## Pourquoi programmer en shell ?

> Aucun langage de programmation n'est parfait. Il n'existe même pas un langage meilleur que d'autres ; il n'y a que des langages en adéquation ou peu conseillés pour des buts particuliers. (Herbert Mayer).

Une connaissance fonctionnelle de la programmation shell est essentielle à quiconque souhaite devenir efficace en administration système, car toute l'administration dans Unix est écrite en shell. Une compréhension détaillée des scripts d'administration est importante pour analyser le comportement du système, voire le modifier. De plus, la seule façon pour vraiment apprendre la programmation des scripts est d'écrire des scripts.

Quand ne pas programmer en shell ?

* Pour des tâches demandant beaucoup de ressources ou beaucoup de rapidité
* Pour une application complexe où une programmation structurée est nécessaire (typage des variables, prototypage de fonctions, tableaux multidimensionnels, listes chaînées, arbres...)
* Pour des situations où la sécurité est importante (protection contre l'intrusion, le vandalisme)
* Pour des applications qui accèdent directement au matériel
* Pour des applications qui devront générer ou utiliser une interface graphique utilisateur (G.U.I.)
* Pour des applications propriétaires (un script est forcément lisible par celui qui l'utilise)
* Pour toutes ces situations, Unix offre une gamme de langages de scripts plus puissants comme le Perl, Tcl, Python, Ruby ; voire des langages compilés de haut niveau comme le C et le C++

## Présentation

Il existe deux moyens de « programmer » en Shell.

Le premier est dit en « direct ». L'utilisateur tape « directement » la ou les commandes qu'il veut lancer. Si cette commande a une syntaxe qui l'oblige à être découpée en plusieurs lignes, le Shell indiquera par l'affichage d'un « prompt secondaire » que la commande attend une suite et n'exécutera réellement la commande qu'à la fin de la dernière ligne.

__Exemple__

```
Prompt> date 
Tue Jan 16 17:26:50 NFT 2001 
Prompt> pwd 
/tmp 
Prompt > if test 5 = 5 
Prompt secondaire> then 
Prompt secondaire> echo vrai 
Prompt secondaire> fi 
vrai
```

Le second est dit en « script », appelé aussi « batch » ou « source Shell ». L'utilisateur crée un fichier texte par l'éditeur de son choix (par exemple : « vi »). Il met dans ce script toutes les commandes qu'il voudra lui faire exécuter ; en respectant la règle de base de ne mettre __qu'une seule commande par ligne__.

Une fois ce script fini et sauvegardé, il le rend exécutable par l'adjonction du droit « x » (cf. _Gestion des fichiers_). Il peut ensuite lancer l'exécution de ce fichier comme n'importe quelle autre commande Unix (attention donc au contenu de la variable « PATH » qui indique où aller chercher une commande lorsqu'on la lance sans préciser où elle se trouve).

Toutes les commandes inscrites dans le fichier texte seront exécutées __séquentiellement__.

__Exemple__

```
Lancement de l'éditeur 
Prompt> vi prog 
Mise à jour du droit d'exécution 
Prompt> chmod a+x prog 
Exécution du script pris dans le répertoire courant 
Prompt> ./prog 
Tue Jan 16 17:26:50 NFT 2001 
/tmp 
oui
```

__Contenu du fichier « prog »__

```shell
date 
pwd 
if test 5 = 5 
then 
    echo "vrai" 
fi
```

__Remarque__

L'adjonction du droit « x » n'est pas obligatoire, mais l'utilisateur devra alors demander spécifiquement à un Shell quelconque d'interpréter le « script ».

__Exemples__

L'utilisateur demande d'interpréter le script par l'intermédiaire du « _Bourne Shell_ » :

```
Prompt> sh prog 
Tue Jan 16 17:26:50 NFT 2001 
/tmp 
oui
```

L'utilisateur demande d'interpréter le script par l'intermédiaire du « _Korn Shell_ » :

```
Prompt> ksh prog 
Tue Jan 16 17:26:50 NFT 2001 
/tmp 
oui
```

## Impératifs

Comme il l'a été dit, le Shell est un « interpréteur ». C'est-à-dire que chaque ligne est analysée, vérifiée et exécutée. Afin de ne pas trop limiter la rapidité d'exécution, il y a très peu de règles d'analyse. Cela implique une grande __rigidité d'écriture__ de la part du programmeur. Une majuscule n'est pas une minuscule ; et surtout, __deux éléments distincts sont toujours séparés par un espace__... à une exception près qui sera vue plus tard.

Enfin, le premier mot de chaque ligne, si la ligne n'est pas mise en commentaire, doit être une instruction Shell « correcte ». On appelle « instruction » soit

* l'appel d'une commande « Unix » (ex. : date)
* l'appel d'un autre script « Shell » (ex. : ./prog)
* une commande interne du langage (ex. : cd...)

__Exemple__

```
Prompt> echoBonjour 
sh: echoBonjour: not found 
Prompt> echo Bonjour 
Bonjour
```

## Conventions du support de cours

Il est difficile d'écrire un support de cours en essayant de faire ressortir des points importants par l'utilisation de caractères spécifiques (guillemets, parenthèses...) sur un langage utilisant certains caractères comme instructions spécifiques (guillemets, parenthèses...). De plus, le lecteur ne sait pas forcément distinguer les éléments provenant de l'ordinateur des éléments qu'il doit taper au clavier. C'est pourquoi il est nécessaire de définir des conventions

* La chaîne `Prompt>` ou `Prompt2>` présente dans les exemples de ce cours est une « invite » ; appelée aussi « prompt ». C'est une chaîne affichée par l'interpréteur dans lequel travaille l'utilisateur afin de lui indiquer qu'il attend une instruction. Cette chaîne n'est pas forcément la même pour des utilisateurs différents. Dans ce support, sa présence signifie que l'exemple proposé peut être tapé directement en ligne, sans obligatoirement passer par un fichier script
* La chaîne `#!/bin/sh` présente dans les exemples de ce cours est expliquée plus tard. Dans ce support, sa présence signifie qu'il vaut mieux écrire l'exemple proposé dans un fichier « script » afin de pouvoir exécuter l'exemple plusieurs fois pour mieux analyser son fonctionnement.
Les syntaxes présentes en début de paragraphe donnent la syntaxe exacte d'une commande. Elles sont donc présentées sans prompt ni ligne « #!/bin/sh ».
* Des éléments mis entre crochets `[elem]` signifient qu'ils sont facultatifs. L'utilisateur peut les utiliser ou pas, mais ne doit en aucun cas mettre de crochets dans sa frappe ou son programme
* Le caractère `n` employé dans la syntaxe signifie « nombre entier quelconque positif ou, parfois, nul ».
* Le caractère `|` employé dans la syntaxe signifie « choix entre l'élément situé à gauche ou à droite du `|` »
* Les points de suspension `...` signifient que l'élément placé juste avant eux peut être répété autant de fois que l'on désire
