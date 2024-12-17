---
title: Installation de Linux en dual boot avec Windows
description: Installation de Linux en dual boot avec Windows
slug: linux-windows-dualboot
authors: [ineumann]
tags: [linux]
hide_table_of_contents: false
---

# Introduction

Il existe aujourd'hui plusieurs façons de partitionner ses disques et d'installer Linux. En effet, il existe différents outils de partitionnement plus ou moins évolués et les CD d'installation intègrent de plus en plus leur propre outil de partitionnement. Mais ces manipulations peuvent toujours entraîner un risque de perte de données par l'écrasement de la partition Windows NTFS. Ainsi, cette méthode à été choisie parce qu'elle est assez sûre et simple. Il faut enfin savoir que l'installation de Linux avec tout ce que cela sous entend (téléchargement, gravure, défragmentation, partitionnement, etc) peut s'avérer assez longue, soyez patients.

# Choix d'une distribution

Bien que l'on puisse faire absolument tout à partir de n'importe quelle distribution de Linux, la configuration initiale de celle-ci doit répondre à des besoins précis. Voici les principales distributions au jour d'aujourd'hui classées par catégorie d'utilisation :

* __Débutants, multimédia et grand public :__ Ubuntu, Fedora, Mandriva et OpenSuSE ;
* __Postes d'entreprises :__ RHEL (Red Hat Enterprise Linux), CentOS et SuSE ;
* __Serveurs :__ Debian, RHEL et CentOS ;
* __Plateformes de développement :__ Fedora, RHEL et CentOS.

Bien sûr cette classification un peu généraliste et minimaliste ne tient pas compte des préférences de chacun et ne parle pas de certaines distributions un peu plus complexes comme Gentoo, Slackware, voire d'autres systèmes voisins tels que les BSD, Solaris, AIX...

Notons également que Fedora sert aussi de vitrine des dernières technologies qui ne sont pas toujours stables et contribue au développement de RHEL (Red Hat Enterprise sponsorisant le développement de Fedora en retour) et de CentOS (clone libre et gratuit de RHEL mais qui ne bénéficie ni du support, ni de la garantie de celle-ci). Une version de Fedora sort environ tous les 6 mois alors que CentOS et RHEL sortent une version basée sur Fedora tous les 4 à 5 ans, d'où une stabilité idéale pour les serveurs et postes d'entreprises.

Notons enfin qu'Ubuntu est une distribution dérivée de Debian réservée au grand public. C'est aujourd'hui une des distributions les plus utilisées au monde et est fortement recommandée aux débutants. Une version LTS (Long Term Support) sort environ tous les 3 ans (5 ans pour la version serveur) tandis que les versions habituelles sortent tous les 6 mois.

# Graver un live CD

Un live CD est un CD à partir duquel on peut booter (démarrer directement sans passer par le ou les OS stockés sur les disques durs). Pour graver un live CD, il faut d'abord télécharger une image ISO de la distribution afin de la graver. Il existe plusieurs modes de téléchargement : les plus répandus se font via FTP ou Torrent (conseillé lorsque les serveurs de téléchargement sont surchargés).

La plupart du temps, on peut trouver un lien vers le téléchargement d'une image ISO d'une distribution en consultant sa documentation.

Voici néanmoins quelques liens de téléchargement :

* [Télécharger Fedora via Torrent](https://torrent.fedoraproject.org) (évitez les versions alpha et bêta pour débuter) ;
* [Télécharger Fedora via HTTP/FTP](https://fedoraproject.org) ;
* Télécharger Ubuntu : [ici](https://ubuntu.com/download) ou [là](https://www.ubuntu-fr.org/download).

Assurez-vous également que la version de la distribution souhaitée correspond à l'architecture processeur de votre machine (32 bits, 64 bits...).

Le téléchargement de l'image peut s'avérer très long mais évitez les interruptions qui facilitent la corruption de cette dernière. Ainsi il vous est recommandé de vérifier son intégrité après téléchargement. Vous devez ensuite graver cette image sur un ou plusieurs CD (ou DVD) avec un logiciel de gravure en choisissant l'option « graver une image » (ou équivalent). La vitesse de gravure doit être au plus bas pour éviter à nouveau la corruption du fichier ISO sur le futur live-CD. Testez ensuite le live-CD en redémarrant votre PC.

Si le PC démarre immédiatement sur le disque dur, allez dans le setup du bios (voir la touche correspondante au démarrage, il s'agit souvent de la touche __F2__ ou d'une touche similaire, appuyez à plusieurs reprises dessus). Une fois dans le setup, allez dans la liste de démarrage (ou d'amorçage) des périphériques et placez le lecteur CD en premier (ou tout au moins avant le ou les disques durs).

Après avoir testé le livre-CD (sans installer Linux), retournez sous Windows. Une option du live-CD permet généralement de booter sur le disque dur, sinon rebootez le PC en retirant rapidement le CD avant l'amorçage.

Vous pouvez également, avant de retourner sous Windows, tester Linux à partir du live-CD si il vous propose une options du type « essayer sans rien installer » (ce qui est généralement le cas). Cependant le démarrage de l'OS en live peut s'avérer très long et ceci n'est pas indispensable lors de l'installation de Linux.

# Création d'un espace libre

Avant de partitionner une première fois, il faut impérativement défragmenter ses volumes. Cela est possible à partir du poste de travail ou avec d'autres outils et cela peut prendre aussi un certain temps.

Une fois la défragmentation achevée, vous pouvez commencer le partitionnement à l'aide de différents outils :

* __Norton Partition Magic :__ c'est un des outils de partitionnement les plus évolués aujourd'hui. Cependant, il est payant et assez cher. Avec cet outil, il n'est pas forcément utile de défragmenter ses disques car il vous indique s'il y a besoin de défragmenter ou pas.
* __L'outil de gestion des disques de Windows :__ Les versions récentes de Windows embarquent un outil de gestion des volumes qui permet de partitionner et qui fonctionne assez bien sur les partitions NTFS et FAT32.
* __GParted :__ C'est un outil libre et gratuit de partitionnement auquel vous aurez accès à partir d'un live CD Linux.
* __fdisk et cfdisk :__ Ce sont des outils disponibles en console depuis un live CD de Linux. Il sont de plus bas niveau que les outils précédemment cités et sont déconseillés aux débutants.

Vous devez réduire, à l'aide de l'un de ces outils, la partition NTFS en faisant bien attention à ne pas empiéter sur l'espace occupé. Pour une utilisation suffisamment aisée des dernières versions de Linux, prenez une partition d'au moins 15 GO (plus si vous pouvez). Un espace libre sera ensuite créé avec comme taille, l'espace retiré lors du redimensionnement de la partition NTFS. Redémarrez ensuite Windows pour vous assurer qu'il n'y a pas eu de problèmes...

# Installation de Linux

Insérez maintenant le live CD que vous venez de graver et tester et choisissez le mode « Installation » (ou équivalent). La mise en place de la procédure d'installation peut elle aussi prendre un certain temps, attendez qu'elle se mette en place et poursuivez-la jusqu'à l'étape de partitionnement (jusque-là, c'est assez simple).

Une fois à l'étape de partitionnement, n'utilisez pas les option du type « partitionnement automatique », « écraser les partions Linux », « Prendre tout l'espace disque »... mais l'option « partitionnement personnalisé » ou « partitionnement manuel » (ou équivalent).

Vous devez d'abord créer, à partir de l'espace libre (ne touchez pas à la partition NTFS !), une partition swap qui doit avoir, en théorie, comme espace disque, le double de la capacité de votre PC en mémoire vive. Cette règle était vraie à l'époque, mais il est désormais généralement inutile d'aller au delà d'1 GO de swap.

Prenez ensuite le reste de l'espace libre pour créer une partition racine / et éventuellement une partition /home (créer une partition /home est une solution avantageuse pour vos données personnelles qui seront disponibles depuis une autre partition Linux si vous installez plusieurs systèmes, et qu'elles pourront être conservées lors d'une nouvelle installation de Linux), avec comme système de fichier de l'ext3, de l'ext4 ou du Brtfs (ce dernier n'étant pas encore supporté par Grub, vous serez obligé de créer une partition /boot en ext3 ou ext4). Notez qu'un disque dur ne peut pas supporter plus de quatre partitions primaires mais peut supporter un nombre indéterminé de partitions étendues.

Poursuivez ensuite l'installation (cela reste encore simple mais peut prendre un certain temps) et redémarrez votre PC sous Linux pour le tester. Si vous êtes sous Ubuntu, il est préférable d'activer le compte root qui est par défaut inactif (pour cela faites `sudo passwd` root via un terminal). Testez ensuite Windows au cas où. Si tout fonctionne bien, il ne vous reste plus qu'à configurer votre OS (réseau, logiciels...), bonne chance.
