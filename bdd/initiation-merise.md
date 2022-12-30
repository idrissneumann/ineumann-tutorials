# Initiation à la conception de bases de données relationnelles avec MERISE

Ce cours est conçu pour ceux qui souhaitent s'initier rapidement à la conception d'une base de données relationnelle à l'aide de la méthode d'analyse MERISE. Il est en rapport direct avec le programme de certaines formations d'études supérieures comme le BTS Informatique de Gestion ou encore le DUT informatique.

## Informations sur l'article

L'article a été originellement publié par Idriss Neumann sur developpez.com [ici](https://ineumann.developpez.com/tutoriels/linux/bash-bonnes-pratiques/).

* Publié le 28 février 2012
* Mis à jour le 15 juin 2019
* Niveau: **tout public**
* Licence: [![cc-by-nc-sa](../img/cc-by-nc-sa.png)](https://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr)

## MERISE au service des systèmes d'information

### Le système d'information

Le __système d'information__ ou SI, peut être défini comme étant l'ensemble des moyens humains, matériels et immatériels mis en œuvre afin de gérer l'information au sein d'une unité, une entreprise par exemple.

Il ne faut toutefois pas confondre un __système d'information__ avec un __système informatique__. En effet, les systèmes d'information ne sont pas toujours totalement informatisés et existaient déjà avant l'arrivée des nouvelles technologies de l'information et des communications dont l'informatique fait partie intégrante.

Le SI possède quatre fonctions essentielles :

* la __saisie__ ou __collecte__ de l'information
* la __mémorisation__ de l'information à l'aide de fichier ou de base de données
* le __traitement__ de l'information afin de mieux l'exploiter (consultation, organisation, mise à jour, calculs pour obtenir de nouvelles données…)
* la __diffusion__ de l'information

Autrefois, l'information était stockée sur papier à l'aide de formulaires, de dossiers… et il existait des procédures manuelles pour la traiter. Aujourd'hui, les systèmes informatisés, comme les systèmes de gestion de bases de données relationnelles (SGBDR), sont mis au service du système d'information.

### MERISE

MERISE est une méthode française née dans les années 70, développée initialement par __Hubert Tardieu__. Elle fut ensuite mise en avant dans les années 80, à la demande du ministère de l'Industrie qui souhaitait une méthode de conception des SI.

MERISE est donc une méthode d'analyse et de conception des SI basée sur le principe de la séparation des données et des traitements. Elle possède un certain nombre de __modèles__ (ou __schémas__) qui sont répartis sur trois niveaux :

* le niveau conceptuel
* le niveau logique ou organisationnel
* le niveau physique

Dans ce cours, nous ne nous intéresserons qu'à certains schémas permettant la conception d'une base de données relationnelle puis sa réalisation sur un SGBDR.

## Modélisation d'une base de données au niveau conceptuel

Il s'agit de l'élaboration du __modèle conceptuel des données__ (MCD) qui est une représentation graphique et structurée des informations mémorisées par un SI. Le MCD est basé sur deux notions principales : les __entités__ et les __associations__, d'où sa seconde appellation : le __schéma Entité/Association__.

L'élaboration du MCD passe par les étapes suivantes :

* la mise en place de __règles de gestion__ (si celles-ci ne vous sont pas données)
* l'élaboration du __dictionnaire des données__
* la recherche des __dépendances fonctionnelles__ entre ces données
* l'élaboration du MCD (création des __entités__ puis des __associations__ puis ajout des __cardinalités__)

### Les règles de gestion métier

Avant de vous lancer dans la création de vos tables (ou même de vos entités et associations pour rester dans un vocabulaire conceptuel), il vous faut recueillir les besoins des futurs utilisateurs de votre application. Et à partir de ces besoins, vous devez être en mesure d'établir les règles de gestion des données à conserver.

Prenons l'exemple d'un développeur qui doit informatiser le SI d'une bibliothèque. On lui fixe les règles de gestion suivantes :

* pour chaque livre, on doit connaître le titre, l'année de parution, un résumé et le type (roman, poésie, science-fiction…)
* un livre peut être rédigé par aucun (dans le cas d'une œuvre anonyme), un ou plusieurs auteurs dont on connaît le nom, le prénom, la date de naissance et le pays d'origine
* chaque exemplaire d'un livre est identifié par une référence composée de lettres et de chiffres et ne peut être paru que dans une et une seule édition
* un(e) inscrit(e) est identifié par un numéro et on doit mémoriser son nom, prénom, adresse, téléphone et adresse e-mail
* un(e) inscrit(e) peut faire zéro, un ou plusieurs emprunts qui concernent chacun un et un seul exemplaire. Pour chaque emprunt, on connaît la date et le délai accordé (en nombre de jours)
  
Ces règles vous sont parfois données, mais vous pouvez être amené à les établir vous-même dans deux cas :

* vous êtes à la fois maîtrise d'œuvre (MOE) et maîtrise d'ouvrage (MOA), et vous développez une application pour votre compte et/ou selon vos propres directives
* __ce qui arrive le plus souvent__ : les futurs utilisateurs de votre projet n'ont pas été en mesure de vous fournir ces règles avec suffisamment de précision ; c'est pourquoi vous devrez les interroger afin d'établir vous-même ces règles. N'oubliez jamais qu'en tant que développeur, vous avez un devoir d'assistance à maîtrise d'ouvrage si cela s'avère nécessaire.

_Rédaction en cours_
