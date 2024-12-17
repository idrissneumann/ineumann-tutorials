---
title: Monter votre smartphone Samsung sur Ubuntu
description: Monter votre smartphone Samsung sur Ubuntu
slug: smartphone-samsung-ubuntu
authors: [ineumann]
tags: [smartphone, samsung, linux, ubuntu]
hide_table_of_contents: false
---

Cette manipulation a été testée sous Ubuntu 12.04 pour un smartphone Samsung Galaxy Note. Cette manipulation devrait également s'appliquer à d'autres modèles de smartphones ou de tablettes avec lesquels le système de fichiers est masqué de l'OS sur lequel on cherche à les monter en tant que périphérique de stockage et dont les échanges de données se font via le protocole MTP (Media Transfer Protocol). C'est le cas notamment du Samsung Galaxy SIII et de tant d'autres appareils (de marques différentes).

Attention pour les libristes : MTP est un protocole de Microsoft soumis à une licence propriétaire bien que les spécifications aient été publiées dans le cadre du protocole USB. Bien entendu, les opérations qui vont suivre n'entraîneront aucun coût mais il est préférable de savoir ce que vous faites.

# Installation des packages

Tout d'abord, mettre à jour la liste des dépôts si ceci n'a pas été effectué récemment :

```shell
sudo apt-get update
```

Puis installer les packages `mtp-tool` et `mtpfs` :

```shell
sudo apt-get install mtp-tools mtpfs
```

Les packages nécessaires pour pouvoir monter correctement votre appareil.

# Création du point de montage

Créer ensuite un répertoire quelconque qui devra rester vide et servir de point de montage. Par exemple :

```shell
mkdir ~/samsung
```

# Montage de l'appareil

Branchez votre appareil en USB puis exécutez la commande suivante :

```shell
sudo mtpfs -o allow_other ~/samsung
```

Il ne reste plus qu'à échanger vos données entre le répertoire samsung dans votre répertoire personnel et votre OS. Vous pouvez automatiser cette tâche via un alias ou via un script que vous ajouterez dans votre variable PATH.

Exemple de script :

```shell
#!/bin/bash
[ ! -d ~/samsung ] && mkdir ~/samsung # créer le répertoire s'il n'existe pas (permet de se prémunir des suppressions involontaires)
sudo mtpfs -o allow_other ~/samsung
```

# Démontage du périphérique

Une fois que vous souhaitez débrancher votre périphérique, fermez tous les programmes qui lisent ou écrivent sur le point de montage (shell, navigateur de fichier, etc) et exécutez la commande suivante en étant placé en dehors du point de montage :

```shell
sudo umount ~/samsung
```

Vous pourrez ensuite débrancher votre périphérique sans risques.
