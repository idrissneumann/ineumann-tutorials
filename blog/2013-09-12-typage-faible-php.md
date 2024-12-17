---
title: Les dangers du typage faible en PHP
description: Les dangers du typage faible en PHP
slug: typage-faible-php
authors: [ineumann]
tags: [php]
hide_table_of_contents: false
---

Il faut avouer que le langage PHP rend bien service et est un langage assez complet. Toutefois, le typage faible de ce langage peut parfois nous amener à écrire des erreurs surprenantes sans que l'on s'en rende compte.

Dernière en date :

```shell
[idriss@hp-dv6:~]$ cat script.php
#!/usr/bin/php
<?php
    // Bien entendu on désactive les warnings pour la prod :D
    error_reporting("E_ALL & ~E_NOTICE");    

    $var1 = 'TOTO';
    $var2 = array('TATA');

    // Quelqu'un a décidé d'écrire son test en utilisant strcmp, pourquoi pas...
    if (strcmp($var1, $var2) == 0){ // tient s'est trompé et compare $var1 à $var2 au lieu de $var2[0], ça arrive...
        echo "OK\n";
    } else {
        echo "KO\n";
    }
?>
[idriss@hp-dv6:~]$ chmod +x script.php
[idriss@hp-dv6:~]$ ./script.php
OK
[idriss@hp-dv6:~]$
```

Ici `strcmp`, au lieu de lever une exception ou une erreur renvoie un simple warning (que l'on ne voit pas forcément en fonction de la conf PHP) et accepte la comparaison en renvoyant `null`.

`null` est ensuite implicitement casté en `false`, l'opérande `0` également et on se retrouve avec une condition qui vaut `true`. Génial non :D ?

Alors oui, on peut effectivement faire des efforts de rigueur, tenir compte du warning par exemple. Il n'empêche qu'avec un langage compilé au typage fort, le codeur n'aurait jamais eu à attendre de voir une exécution erronée pour se rendre compte du problème`

Conclusion : faites attention aux casts implicites de vos if en PHP et à la fonction strcmp qui lorsqu'elle plante renvoie null alors que 0 signifie "chaînes égales". Utilisez toujours les opérateurs `===`,`!==` dans le cadre de l'utilisation de cette fonction !
