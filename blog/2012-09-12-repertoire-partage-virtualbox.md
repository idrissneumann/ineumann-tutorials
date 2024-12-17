---
title: Création d’un répertoire de partage avec VirtualBox
description: Création d’un répertoire de partage avec VirtualBox
slug: repertoire-partage-virtualbox
authors: [ineumann]
tags: [virtualbox, linux]
hide_table_of_contents: false
---

# Introduction

VirtualBox est un gestionnaire de machines virtuelles, sur les hôtes Windows, GNU/Linux 32 et 64 bits et Mac OS X supportant de nombreux systèmes dont Windows (dont Vista), Linux, OpenSolaris, FreeBSD comme systèmes invités. Elle a été créée par InnoTek (ancienne compagnie allemande de logiciels qui a ensuite été rachetée par Sun elle-même rachetée par Oracle).

# Création du dossier de partage

Cette manipulation a été testée pour 4 distributions distinctes  (Fedora 6 et 7, Mandriva spring 2008 et Ubuntu 7.10) comme systèmes invités, avec la version 1.6.2 de VirtualBox sous Windows Vista basic. Depuis, il est possible que cela ait évolué …

Pour commencer, après avoir créé le dossier qui servira de répertoire de partage (nous l’appellerons « partage ») , entrez le chemin `C:\Users\VotreNom\Documents` dans l’onglet « répertoires partagés » des préférences de votre machine virtuelle sous VBox (sous Windows). Faites ensuite les étapes suivantes sur votre console (sous Linux) :

```shell
[ ~]$ cd /mnt/
[ /mnt]$ sudo mkdir partage
```

Puis exécutez la commande suivante :

```shell
sudo mount -t vboxsf partage /mnt/partage -o rw,uid=y,gid=y
```

Enfin créez un nouveau répertoire dans « Mes documents » sous Windows, vous y aurez des droits d’écriture et il pourra servir de répertoire de transfert.

__Remarques :__

* Pour connaître les valeurs `uid` et `gid` (notées pour l’instant y), faites id en console.
* Il vous est possible d’écrire un script ou un alias pour automatiser cette tâche.
* Cette méthode fonctionne uniquement sur un système virtuel de type GNU/Linux (elle ne fonctionne pas sous OpenSolaris par exemple).
* Sur le système hôte (dans notre cas Windows), vous ne pourrez pas explorer, depuis le système virtuel, les dossiers systèmes comme « Mes documents. Vous pourrez néanmoins ouvrir le répertoire de transfert (qui ne sera pas en lecture seule) à partir du dossier « Documents » (qui lui sera en lecture seule).
