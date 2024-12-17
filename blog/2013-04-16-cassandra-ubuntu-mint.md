---
title: Installation de Cassandra sous Ubuntu/Mint
description: Installation de Cassandra sous Ubuntu/Mint
slug: cassandra-ubuntu-mint
authors: [ineumann]
tags: [cassandra, nosql]
hide_table_of_contents: false
---

Vous souhaitez vous mettre au NoSQL ? Vous avez le choix entre une multitude de SGBD NoSQL orientés clefs/valeurs ou orientés colonnes.

Parmi l’un des plus en vogue, se trouve Cassandra maintenu par la fondation Apache. Il est possible de télécharger une archive .tar.gz et de suivre les directives dans le fichier README mais nous verrons ici comment installer proprement Cassandra depuis les dépôts.

L’avantage ici est que le serveur Cassandra sera automatiquement configuré correctement. Ces manipulations ont été effectuées sous Ubuntu 12.04 LTS.

# Installation

__1/__ Ajouter les lignes suivantes au fichier /etc/apt/sources.list (en root)

```
deb http://www.apache.org/dist/cassandra/debian 11x main
deb-src http://www.apache.org/dist/cassandra/debian 11x main
```

__2/__ Exécuter les commandes suivantes :

```
gpg --keyserver pgp.mit.edu --recv-keys F758CE318D77295D
gpg --export --armor F758CE318D77295D | sudo apt-key add -
gpg --keyserver pgp.mit.edu --recv-keys 2B5C1B00
gpg --export --armor 2B5C1B00 | sudo apt-key add -
```

__3/__ Mettre à jour la liste des dépôts :

```shell
sudo apt-get update
```

__4/__  Installer le serveur :

```shell
sudo apt-get install cassandra
```

__5/__ Démarrer le service :

```shell
sudo service cassandra start
```

# Utilisation

__1/__ Lancer le client cassandra :

```shell
cassandra-cli --host
# ou en local
cassandra-cli
```

__2/__ Créer un keyspace et s’y connecter :

```shell
[default@unknown] create keyspace test;
[default@unknown] use test;
Authenticated to keyspace: test
```

__3/__ Créer une colonne :

```shell
[default@test] create column family Users with comparator=UTF8Type and default_validation_class=UTF8Type and key_validation_class=UTF8Type;
```

__4__ Ajouter des entrées :

```shell
[default@test] set Users[jsmith][first] = 'John';
Value inserted.
[default@test] set Users[jsmith][last] = 'Smith';
Value inserted.
[default@test] set Users[jsmith][age] = long(42);
Value inserted.
```

__5/__ Récupérer des entrées :

```shell
[default@test] get Users[jsmith];
=> (column=last, value=Smith, timestamp=1287604215498000)
=> (column=first, value=John, timestamp=1287604214111000)
=> (column=age, value=42, timestamp=1287604216661000)
Returned 3 results.
```

# Impossible de lancer Cassandra

Vous avez une erreur similaire à celle ci-dessous ?

```
cassandra -f xss = -ea -javaagent:/usr/share/cassandra/lib/jamm-0.2.5.jar -XX:+UseThreadPriorities -XX:ThreadPriorityPolicy=42 -Xms1493M -Xmx1493M -Xmn373M -Xss160k Segmentation fault (core dumped)
```

Ajouter la ligne suivante au fichier `/etc/cassandra/cassandra-env.sh` (en root) :

```shell
[[ $(uname) =~ "Linux" ]] && JVM_OPTS="$JVM_OPTS -Xss280k"
```

Puis redémarrer le serveur :

```shell
sudo service cassandra restart
```
