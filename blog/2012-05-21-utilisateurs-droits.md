---
title: Les utilisateurs et les droits
description: Les utilisateurs et les droits sous Linux
slug: utilisateurs-droits
authors: [ineumann]
tags: [linux]
hide_table_of_contents: false
---

Commençons par les commandes nécessaires à l'administration des utilisateurs. Vous vous douterez que les privilèges super utilisateurs sont requis pour exécuter la majorité de ce type de commandes.

* `adduser` ou `useradd` : ajouter un utilisateur. La première commande est plus conviviale mais la seconde reste plus appropriée pour un script.
* `userdel` ou `deluser` : supprimer un utilisateur.
* `addgroup` ou `groupadd` : ajouter un groupe.
* `groupdel` ou `delgroup` : suppression d'un groupe.
* `passwd` : changer le mot de passe de l'utilisateur courant.
* `passwd <username>` : changer le mot de passe d'un utilisateur (il peut s'agir de root). Le mot de passe administrateur est requis lorsque cette commande est effectuée sur une autre session que celle de l'utilisateur concerné.
* `who` : afficher les utilisateurs connectés.

Le fichier `/etc/passwd` donne la liste des utilisateurs et le fichier `/etc/shadow` la liste des mots de passe cryptés pour chaque utilisateur.

Il existe aussi un système de groupes sous les systèmes de type Unix, voici les commandes liées à l'administration des groupes (les privilèges root sont encore requis) :

* `addgroup` : ajouter un groupe.
* `usermod -G` : ajouter un utilisateur dans un groupe.
* `usermod -g` : définir un groupe comme groupe principal d'un utilisateur.

Le fichier `/etc/group` contient lui la liste des groupes.

Maintenant abordons les droits des utilisateurs sur des fichiers de toutes sortes (fichiers textes, répertoires, exécutables...). Le tableau ci-dessous résume les différents groupes d'utilisateurs et les différents droits que l'on peut leur attribuer grâce à la commande chmod (qui permet de changer ces droits) :

| Groupes       | u                        | g                   | o                   |
|---------------|–-------------------------|---------------------|---------------------|
| Désignation   | user                     | group               | other               |
| Signification | utilisateur propriétaire | groupe propriétaire | autres utilisateurs |

| Droits        | r       | w        | x         | r       | w        | x         | r       | w        | x         |
|---------------|---------|----------|-----------|---------|----------|-----------|---------|----------|-----------|
| Désignation   | read    | write    | execute   | read    | write    | execute   | read    | write    | execute   |
| Signification | lecture | écriture | exécution | lecture | écriture | exécution | lecture | écriture | exécution |
| Numéro        | 400     | 200      | 100       | 40      | 20       | 10        | 4       | 2        | 1         |

Il est possible que vous ne perceviez pas immédiatement le fonctionnement de cette commande chmod mais ne vous inquiétez pas, les exemples qui suivent vont éclaircir vos interrogations :

* `chmod +x` ou `chmod a+x` ou `chmod ugo+x` ou encore `chmod 111` : donner le droit d'exécution sur un fichier à tous les groupes.
* `chmod u+x` ou `chmod 100` : donner le droit d'exécution sur un fichier à l'utilisateur propriétaire (et retirer en même temps tous les autres droits pour le cas de la seconde commande).
* `chmod +rw` ou `chmod ugo +rw` ou encore `chmod 666 nom_du_fichier` : donner le droit de lecture et d'écriture sur un fichier (ou répertoire).
* `chmod 777` ou `chmod ugo+rwx` ou encore `chmod +rwx` : donner tous les droits à tous le monde sur un fichier (ou répertoire).
* `chmod -R 777` : donner tous les droits à tout le monde sur un répertoire et sur son contenu de manière récursive.
* `chmod go-rwx` : retirer tous les droits au groupe propriétaire et aux autres utilisateurs.

__Remarques :__

* Pour donner plusieurs droits de façon numérique il suffit d'additionner les numéros entre eux par dizaines. Par exemple :
  * `o+rx` = `005`
  * `u+rwx` = `700`
  * `ug+rw` = `600`
  * `ugo+rwx` = `777`
  * ...attention toutefois à la place des zéros qui signifient « aucuns droits ».
* Lorsque l'on change les droits avec les lettres qui leur correspondent, on utilise `+` pour ajouter les droits et `–` pour les enlever.
* L'option `-R` sert à indiquer que les droits s'appliquent récursivement aux fichiers contenus dans un répertoire sur lequel on applique la commande (y compris dans les sous-répertoires)
* Si vous n'êtes pas l'utilisateur propriétaire du fichier sur lequel vous lancez un chmod, vous aurez besoin des privilèges administrateur.

Pour terminer ce billet, voici les commandes qui permettent de changer les groupes et/ou utilisateurs propriétaires sur un fichier (il faut bien entendu être soit l'utilisateur propriétaire du fichier concerné, soit root pour pouvoir exécuter ces commandes) :

* `chown` : changer l'utilisateur propriétaire d'un fichier quelconque.
* `chgrp` : changer le groupe propriétaire d'un fichier.
* `chown` : changer l'utilisateur et le groupe propriétaire d'un fichier.
