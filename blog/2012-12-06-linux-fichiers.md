---
title: Liste des répertoires principaux et fichiers courants
description: Liste des répertoires principaux et fichiers courants sous Linux
slug: linux-fichiers
authors: [ineumann]
tags: [linux]
hide_table_of_contents: false
---

# Les répertoires principaux

Voici une liste non exhaustive des répertoires principaux composant l'arborescence sur les différentes distributions Linux :

* `/` : répertoire « racine » ;
* `/boot` : contient les éléments liés au démarrage du système (kernel, grub...) ;
* `/bin` : contient toutes les commandes (ou exécutables binaires) utilisateurs ;
* `/sbin` : contient toutes les commandes (ou exécutables binaires) administrateur ;
* `/home` : contient tous les répertoires personnels des utilisateurs ;
* `/dev` : contient les périphériques réels et virtuels (par exemple les partitions /dev/sda...) ;
* `/mnt` : point de montage de volumes aux différents systèmes de fichiers (partitions ext, NTFS...) ;
* `/media` : point de montage des périphériques amovibles ;
* `/lib` : répertoire des bibliothèques ;
* `/tmp` : contient des fichiers temporaires ;
* `/usr` : répertoire des installations et configurations communes aux utilisateurs, composé des répertoires suivants (entre autres) :
  * `/usr/bin` : contient des commandes et autres binaires utilisateurs ;
  * `/usr/sbin` : contient des commandes et autres binaires administrateur ;
  * `/usr/share` : contient les données statiques (ne nécessitant aucune modification) des différents programmes ou paquetages ;
  * `/usr/local` : répertoire des applications locales ;
  * `/usr/include` : contient les fichiers header (en tête ayant l'extension .h) liés à la compilation d'applications développées en C ou C++.
* `/opt` : contient des applications supplémentaires ;
* `/var` : composé des répertoires suivants (entre autres) :
  * `/var/log` : contient des fichiers de logs ;
  * `/var/spool` : répertoire des mails et files d'impression ;
  * `/var/tmp` : contient des fichiers temporaires ;
  * `/var/www` : répertoire par défaut du serveur HTTP apache (DocumentRoot).
* `/etc` : répertoires des configurations systèmes, composé des répertoires suivants (entre autres) :
  * `/etc/init.d` : contient les deamons (scripts ou processus qui s'exécutent en arrière plan au démarrage et à l'arrêt du système). Ces scripts sont activés via des liens qui se trouvent dans les répertoires /etc/rc?.d/ ;
  * `/etc/X11` : contient les fichiers de configuration du serveur X (interface graphique) ;
  * `/etc/opt` : contient des fichiers de configurations d'applications intallées dans /opt.

__Remarque :__ cette arborescence peut varier sur d'autres systèmes de type Unix comme FreeBSD par exemple.

# Quelques fichiers courants

Voici une liste non exhaustive des fichiers courants sur les différentes distributions Linux :

* `/boot/grub/menu.lst` ou `/boot/grub/grub.cfg` : fichier de configuration du chargeur GRUB ;
* `~/.bashrc` ou `~/.bash_profile` : script exécuté au début de chaque session utilisateur ;
* `/etc/contrab` : fichier contenant les tâches cron/etc/fstab : liste des volumes à monter au démarrage du système ainsi que l'espace swap à activer ;
* `/etc/hosts` : table de correspondance entre un nom de machine (hostname) et une adresse IP ;
* `/etc/inittab` : liste les applications lancées par init (remplacé sur Ubuntu par le système upstart) ;
* `/etc/group` : liste descriptive des groupes d'utilisateurs ;
* `/etc/passwd` : liste descriptive des utilisateurs ;
* `/etc/shadow` : liste des mots de passe cryptés des utilisateurs ;
* `/etc/sudoers` : fichier de configuration de la commande sudo ;
* `/etc/X11/xorg.conf` : fichier de configuration du serveur graphique X ;
* `/etc/init.d/rc.local` : dernier script de `/etc/init.d` à s'exécuter au démarrage. Ce script est prévu pour contenir les tâches que l'on souhaite exécuter en plus des autres deamons au démarrage du système. Sous Fedora, il s'agit d'un lien symbolique vers `/etc/rc.d/rc.local` ;
* `/proc/cpuinfo` : contient des informations sur le processeur.

__Attention :__ le nom et la place de ces fichiers peuvent varier selon les différentes distributions. Certains de ces fichiers ne sont pas toujours présents d'une distribution à l'autre.
