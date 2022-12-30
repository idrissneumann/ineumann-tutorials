# La « sous-exécution »

La « sous-exécution » de commande est un des mécanismes les plus importants en Shell. Il permet de remplacer, lors de l'exécution du programme, une partie du script par le __texte qu'une commande affiche normalement à l'écran__.

Ce mécanisme s'obtient en encadrant la commande à remplacer par des « _backquotes_ » ou encore « _accents graves_ » (caractère « ` » obtenu en pressant la touche « 7 » sur un clavier « Azerty » français tout en maintenant la touche « _Alt Gr_ » enfoncée).

Ce mécanisme peut être utilisé en coordination avec beaucoup d'autres qui seront vus ultérieurement. Mais l'utilisation la plus courante est l'affectation de variables.

__Exemple utile__

```shell
Prompt> var1=`echo Salut` # Ce qu'affiche la commande "echo Salut" ira dans "var1" 
Prompt> var2=`date` # Ce qu'affiche la commande "date" ira dans "var2" 
Prompt> var3=`ls -l` # Ce qu'affiche la commande "ls -l" ira dans "var3" 
Prompt> var4=`pwd` # Ce qu'affiche la commande "pwd" ira dans "var4"
```

__Exemple inutile__

```shell
Prompt> var5=`cd /` # Ce qu'affiche la commande "cd /" (donc rien) ira dans "var5" 
Prompt> var6=pwd # La chaîne "pwd" ira dans "var6" (oubli des backquotes)
```

Bien entendu, lorsque le programmeur veut exécuter « normalement » une commande (sans avoir besoin de récupérer ce que la commande affiche), il ne met pas d'accent grave.

__Exemple__

```shell
Prompt> date
```

Résultat : exécution normale de la commande `date` (comme avant, depuis le début du cours).

```shell
Prompt> `date`
```

Résultat : erreur de syntaxe. La commande « date » est sous-exécutée et son résultat est alors interprété par le Shell dans le contexte où la sous-exécution s'est produite. Or le premier mot d'une ligne en Shell doit être une commande Unix et il est peu probable que le premier mot affiché par la commande `date` soit une commande Unix.

```shell
Prompt> `echo date`
```

Résultat : inutile. La commande `echo date` est sous-exécutée et son résultat (en l'occurrence le mot `date`) est alors interprété par le Shell dans le contexte ou la sous-exécution s'est produite. Ici, la chaîne `date` produite par la sous-exécution du `echo` correspond à une commande Unix valide et comme son contexte la place en début de ligne, le Shell interprétera cette chaîne comme une instruction et exécutera cette dernière. On aura donc comme résultat final l'exécution de la commande `date`. Cette remarque sera valable chaque fois que le programmeur sera tenté de sous-exécuter la commande `echo`.

__Remarques__

__1/__ Il est tout à fait possible d'imbriquer des « niveaux » de sous-exécution. Mais chaque niveau doit être protégé du supérieur par l'emploi de backslashes (« `\` »). Et ces backslashes doivent eux-mêmes être protégés du niveau supérieur par des backslashes. Ainsi, une affectation avec trois niveaux de sous-exécution (par exemple) s'écrira : 

```shell
var=`cmd1 \`cmd2 \\\`cmd3\\\`\``
```

Ce mécanisme de protection sera vu ultérieurement plus en détail (cf. _Neutralisation des métacaractères_), mais il conduit rapidement à une écriture assez lourde qui devient vite illisible si on commence à empiler les sous-niveaux (le plus bas niveau d'une commande à `n` imbrications s'écrira avec `2n - 1 - 1` backslashes). Il vaut mieux dans ce cas décomposer les sous-exécutions en plusieurs étapes utilisant des variables.

__2/__ La sous-exécution peut être aussi obtenue en « Korn Shell » et en « Bourne Again Shell » (et shells descendants) par la syntaxe `$(commande)`. Cette syntaxe permet une écriture plus simple et plus lisible des sous-niveaux `$($(commande))`, mais n'est pas compatible avec le « Bourne Shell ».

Ce mécanisme permet au Shell de déléguer à d'autres programmes tout ce qu'il ne sait pas faire par lui-même (calculs, travail sur chaînes, recherches dans fichier...) et de récupérer le résultat dudit programme. Si le programme n'existe pas, il suffit de l'écrire (en n'importe quel langage) et lui faire sortir ses valeurs sur l'écran pour pouvoir récupérer ensuite lesdites valeurs dans le script. Il permet donc une imbrication totale de tout programme Unix, quel qu'il soit, dans un script shell.

> /!\ L'excellente compréhension de ce mécanisme est __primordiale__ dans la compréhension de la programmation en Shell.
