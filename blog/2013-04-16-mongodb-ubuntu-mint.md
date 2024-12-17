---
title: Installation de MongoDB sous Ubuntu/Mint
description: Installation de MongoDB sous Ubuntu/Mint
slug: mongodb-ubuntu-mint
authors: [ineumann]
tags: [mongodb, nosql, linux, ubuntu, mint]
hide_table_of_contents: false
---

Cet article traite de l'installation de MongoDB via les dépôts sous Ubuntu. MongoDB est un SGBD assez répandu qui fait partie, au même titre que Cassandra, de la mouvance des SGBD NoSQL.

Ces manipulations ont été effectuées sous Ubuntu 12.04 LTS.

# Installation

__1/__ Exécuter les commandes suivantes :

```shell
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
sudo touch /etc/apt/sources.list.d/10gen.list
```

__2/__ Ajouter la ligne suivante au fichier `/etc/apt/source.list` (en root) :

```
deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
```

__3/__ Mettre à jour la liste des dépôts :

```shell
sudo apt-get update
```

__4/__  Installation :

```shell
apt-get install mongodb-10gen=2.2.3
echo "mongodb-10gen hold" | dpkg --set-selections
sudo apt-get install mongodb-10gen
```

__5/__ Lancer le service :

```shell
sudo service mongodb start
```

# Utilisation

Lancer le client MongoDB :

```shell
mongo
```

Insérer une donnée :

```shell
db.test.save( { key: "value" } )
```

Récupérer les valeurs :

```shell
db.test.find()
```
