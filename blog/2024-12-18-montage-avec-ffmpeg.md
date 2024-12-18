---
title: Faire du montage en console avec ffmpeg
description: Faire du montage en console avec ffmpeg 
slug: montage-ffmpeg
authors: [ineumann]
tags: [ffmpeg, linux]
hide_table_of_contents: false
---

Dans le cadre de la chaîne [YouTube de comwork](https://www.youtube.com/channel/UCC2MNPcLGd_yrfwdEFvnByg) je suis parfois amener à faire du montage vidéo bien que je déteste cela.

Vous me connaissez, il me faut un outil en ligne de commande et quoi de mieux que [ffmpeg](https://ffmpeg.org) disponible sur Linux et MacOS ?

Dans ce billet je vais énumérer quelques commandes utiles pour faire les opérations dont j'ai le plus souvent besoin.

---

# Compression d'une vidéo en mp4

```shell
ffmpeg -i input.mkv -vcodec libx265 -crf 28 output.mp4
```

Vous pouvez avoir envie de compression la taille davantage et pour cela il y a différente méthodes :

## Bitrate

```shell
ffmpeg -i input.mp4 -b <bitrate> output.mp4
```

Calculez le bitrate[^1] dont vous avez besoin en divisant la taille de votre cible (en bits) par la longueur de la vidéo (en secondes).

Par exemple, pour une taille cible de 1Gb[^2] et 10 000[^3] secondes de vidéo, utilisez un débit binaire de 800 000 bit/s (800 kbit/s) :

```shell
ffmpeg -i input.mp4 -b 800k output.mp4
```

[^1]: débit binaire d'écriture
[^2]: un gigaoctet, soit 8 gigabits
[^3]: 2h46 minutes et 40 secondes

## Constant rate factor

Une autre option est le réglage du _constant rate factor[^4]_, qui réduit le débit binaire, mais conserve une meilleure qualité. Faites varier le CRF entre `18` et `24` environ: plus il est bas, plus le débit binaire est élevé.

```shell
ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4
```

__Note :__ depuis 2013, un meilleur format d'encodage de vidéo que le `H.264` est disponible : le `H.265`. Il compresse davantage pour la même qualité et offre une qualité supérieure pour la même taille.

Pour l'utiliser, remplacez le codec `libx264` par `libx265`. Vous pouvez aussi pousser le levier de compression plus loin avec le format H.265 avec un résultat acceptable de `24` à `30`. Notez que des valeurs CRF inférieures correspondent à des débits binaires plus élevés et produisent donc des vidéos de meilleure qualité mais plus volumineuses.

```shell
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
```

[^4]: facteur de débit constant (levier de compression)

# Couper la ou les premières secondes

```shell
ffmpeg -i input.mov -ss 1 -vcodec copy -acodec copy output.mp4
```

Vous pouvez bien sûr remplacer la valeur `1` par une autre pour couper plus de secondes.

# Couper un segment

```shell
ffmpeg -i input.mp4 -to 00:07:41 -c copy part1.mp4
ffmpeg -i input.mp4 -ss 00:08:10 -c copy part2.mp4
for i in {1..2}; do echo "file 'part${i}.mp4'"; done > files.txt
ffmpeg -f concat -safe 0 -i files.txt -c copy output.mp4
rm -rf files.txt part1.mp4 part2.mp4 
```

Ici on prend toute la première partie de la vidéo jusquà la minute 07:41 dans un premier fichier `part1.mp4`, puis de la minute 08:10 à la fin dans un autre fichier `part2.mp4`.

Ensuite on fusionne les deux parties et supprime ces deux fichiers temporaires. Le résultat sera la même vidéo avec ce qui s'est passé entre les minutes 07:41 et 08:10 coupé au montage.

# Insérer une image

```shell
ffmpeg -i input.mp4 -i image.jpg -filter_complex \
"[0:v]trim=0:106,setpts=PTS-STARTPTS[v1]; \
 [0:v]trim=124:548,setpts=PTS-STARTPTS[v2]; \
 [1:v]loop=-1:1,scale=1920:1080,trim=0:18,setpts=PTS-STARTPTS[v3]; \
 [v1][v3][v2]concat=n=3:v=1:a=0[outv]; \
 [0:a]atrim=0:548,asetpts=PTS-STARTPTS[outa]" \
-map "[outv]" -map "[outa]" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k output.mp4
```

Ici on fait durer l'image 18 secondes entre la 296ème seconde et la 124ème (548 correspond à la fin de la vidéo).

Résolution 1920x1080 (il faut que l'image fit cette résolution).

# Changer la résolution de la vidéo

```shell
ffmpeg -i input.mp4 -vf "scale=iw/2:ih/2" output.mp4
```

Ici on divise la résolution par 2.

# Conclusion

Et voilà, ce sont les trois opérations que j'utilise presque systématiquement pour monter ces magnifiques vidéos sur CWCloud :)
