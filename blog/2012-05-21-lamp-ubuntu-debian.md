---
title: Installation et configuration minimale d'un serveur web Apache/PHP local sous Ubuntu/Debian
description: Installation et configuration minimale d'un serveur web Apache/PHP local sous Ubuntu/Debian
slug: lamp-ubuntu-debian
authors: [ineumann]
tags: [php, lamp, linux, ubuntu, debian]
hide_table_of_contents: false
---

Ce billet a pour but de permettre l'installation et l'utilisation d'un serveur HTTP et d'un SGBD en local sur Debian ou Ubuntu. Il évite ainsi de passer par des outils du type easyPHP, LAMP/WAMP/MAMP, … Par ailleurs nous ne nous limiterons pas à la simple installation de MySQL comme SGBDR.

Parmi toutes les distributions existantes, nous avons ici choisi Debian et Ubuntu pour plusieurs raisons :
* Elles sont aujourd'hui parmi les distributions les plus répandues.
* Parler de toutes les distributions surchargerait l'article.
* Si vous êtes utilisateurs d'une autre distribution, la démarche sera exactement la même et il faudra simplement adapter les commandes de gestion des paquets.

# Mise à jour de la liste des dépôts

Tout d'abord, il faut mettre la liste des dépôts à jour, pour cela faites en console sudo `aptitude update` ou encore sudo `apt-get update` afin de mettre à jour les informations sur les paquets.

# Le serveur HTTP apache

Les versions récentes d'Ubuntu et dérivées embarquent automatiquement une version du serveur HTTP apache avec comme répertoire par défaut `/var/www`. Ainsi pour vérifier si le serveur apache est présent et est lancé, il suffit d'exécuter la commande `/etc/init.d/apache2 status` ou `/etc/init.d/httd status` selon les versions.

En cas de besoin, vous pouvez lancer le deamon à l'aide de la directive `start` ou le relancer avec `restart` de la même façon que `status`. Pour stopper le serveur apache, vous pouvez enfin utiliser la directive `stop`.

Si le deamon apache2 ou httpd n'est pas présent, lancez l'installation à l'aide de la commande `sudo aptitude install apache` ou encore `sudo apt-get install apache`.

Pour une configuration minimale, le répertoire par défaut d'apache est `/var/www`. C'est donc dans ce répertoire que devront être placés vos scripts PHP. Ainsi, pour une utilisation plus aisée :

* Vous pouvez rendre accessible ce répertoire aux autres comptes utilisateurs comme ceci `chmod 777 /var/www` sinon vous serez obligés de coder et tester vos scripts via le compte root ou le compte d'apache (totalement déconseillé).
* Vous pouvez créer un lien symbolique de `/var/www` vers votre répertoire personnel de cette façon : `ln -s /var/www ~/www`.

Pour exécuter vos scripts PHP à partir de votre navigateur, il faut le faire à partir de ce type d'URL : `http://localhost/mon_fichier.php` ou encore `http://127.0.0.1/mon_fichier.php`.

# MySQL et PHPMyAdmin

MySQL est un SGBDR (système de gestion de bases de données relationnelles) libre et gratuit qui est aujourd'hui le plus utilisé dans le domaine du web. Pour l'installer, il faut lancer ces deux commandes `sudo aptitude install mysql-client` (ou `sudo apt-get install mysql-client`) et `sudo aptitude install mysql-server` (ou `sudo apt-get install mysql-server`).

Pour éviter de vous connecter via un client graphique vous pouvez utiliser cette commande :
`mysql -u root -p` (si vous possédez un utilisateur root), puis `create database nom_base` pour créer une base de données et enfin `use nom_base` pour travailler sur la bdd « nom_base ».

Pour une utilisation plus simple, vous pouvez installer un client graphique tel que PHPMyAdmin, un client léger sous une interface PHP qui est aujourd'hui l'un des plus connus voire le plus connus. Pour l'installer, exécutez la commande `sudo aptitude install phpmyadmin` ou encore `sudo apt-get install phpmyadmin`. Il faudra ensuite créer un lien symbolique de `/usr/share/phpmyadmin` vers `/var/www` de cette manière : `ln -s /usr/share/phpmyadmin /var/www/phpmyadmin`. Ainsi, vous pourrez accéder à PHPMyAdmin à partir du navigateur via ces URLs : http://localhost/phpmyadmin ou encore http://127.0.0.1/phpmyadmin.

# PostgreSQL et PHPPgAdmin

PostgreSQL est un autre SGBDR libre et gratuit. En effet, il est assez apprécié en entreprise pour sa fiabilité, sa sécurité (notamment dû au respect des contraintes d'intégrités référentielles, à la puissance de son langage de procédure stockée et de triggers proche de celui d'Oracle...) et sa stabilité. Il est souvent perçu comme une alternative à Oracle (autre SGBD très puissant, très utilisé en entreprise mais payant avec un ensemble de services qui vont autour). Pour l'installer, il faut effectuer cette commande : `sudo aptitude install postgresql` ou encore `sudo apt-get install postgresql`.

De même que pour MySQL, vous pouvez vous connecter à PostgreSQL en console ou via un client graphique. Or, il existe un client léger sous une interface Web appelée PHPPgAdmin équivalent à PHPMyAdmin. Pour l'installation, il s'agit de la même procédure que pour PHPMyAdmin : lancez en console la commande `sudo aptitude install phppgadmin` ou encore `sudo apt-get install phppgadmin`. Créez ensuite un lien symbolique de `/usr/share/phppgadmin` vers `/var/www` de cette façon : `ln -s /usr/share/phppgadmin /var/www/phppgadmin`. Ainsi, vous pourrez enfin accéder à PHPPgAdmin à partir du navigateur via ces URLs : http://localhost/phppgadmin ou encore http://127.0.0.1/phppgadmin.

# Conclusion

Vous disposez maintenant de tout ce qu'il vous faut pour développer en PHP et SQL localement sur votre machine. Vous pouvez également aller plus loin en apprenant à administrer votre serveur HTTP (par exemple via le fichier httpd.conf ou apache2.conf pour apache2 sous Ubuntu).
