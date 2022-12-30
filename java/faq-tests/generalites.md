
# Généralités

## Pourquoi écrire des tests ?

Écrire des scénarios de tests automatisés (tant des tests unitaires que des tests d'intégration) constitue une étape incontournable du cycle de développement logiciel dans un cadre professionnel.

Bien que cette tâche puisse parfois sembler rébarbative, elle est indispensable pour produire des développements de bonne qualité, notamment parce que cela permet entre autres de :
s'assurer que l'on maîtrise les aspects fonctionnels de l'application (les besoins métier à satisfaire) ;
détecter au plus tôt les anomalies éventuelles avant la livraison d'un projet aux utilisateurs ;
détecter d'éventuelles régressions, suite à l'implémentation de nouvelles fonctionnalités, en automatisant l'exécution de l'ensemble de tous les scénarios de tests implémentés sous forme de tests unitaires ou tests d'intégration, de façon à ce qu'ils soient exécutés régulièrement (à minima une fois par jour par exemple).

Plus l'ensemble de vos codes sera couvert par les tests, plus vous serez à même de détecter les régressions, de maîtriser l'ensemble des fonctionnalités de votre application et ainsi de la rendre plus maintenable.

## Quelle est la différence entre tests unitaires et tests d'intégration ?

Beaucoup de développeurs ne font pas la différence entre tests unitaires et tests d'intégration. Aussi, plusieurs définitions peuvent être données à ces concepts.

De manière générale, le test unitaire a pour but de tester une partie précise d'un logiciel (d'où le nom "unitaire") voire une fonction précise, en essayant de couvrir au maximum la combinatoire des cas fonctionnels possibles sur cette portion de code. Cependant, cela ne suffit pas à différencier un test unitaire d'un test d'intégration qui, lui aussi, peut se contenter de tester une portion précise du code.

La différence fondamentale est que le test unitaire doit __uniquement__ tester le code et ne doit donc pas avoir d'interactions avec des dépendances externes du module testé telles que des bases de données, des Web services, des appels à des procédures distantes, la lecture ou écriture de fichiers ou encore d'autres fonctions. Les dépendances devront être simulées à l'aide de mécanismes tels que les bouchons ou encore les mocks.

Concernant les tests d'intégration, ceux-ci permettent, de manière générale, de vérifier la bonne intégration de la portion de code testée dans l'ensemble du logiciel et de ses dépendances. Il peut s'agir tout aussi bien de vérifier la bonne insertion de données dans un SGBDR sur une petite portion de code que de scénarios complets du logiciel, correspondant à des enchaînements d'appels de fonctions, de Web services... (c'est ce que l'on appelle aussi des tests « bout en bout »).

## Qu'est-ce que la couverture de code ?

Le « coverage » ou le taux de couverture du code fait partie des métriques permettant d'évaluer la qualité d'un logiciel, au même titre que le nombre cyclomatique, le nombre de fonctions, de constantes, de variables inutilisées ou d'autres indicateurs.

Concrètement, cette métrique permet de décrire le taux de code testé et ainsi d'évaluer la qualité de nos tests. Il existe plusieurs outils permettant d'évaluer précisément le taux de couverture ainsi que les portions de codes couvertes ou non.

Il existe plusieurs outils en Java pour mesurer la couverture de code tels que JaCoCo (Java Code Coverage) permettant d'établir des rapports pouvant ensuite être parsés à l'aide d'outils comme Jenkins, SonarQube ou même à l'aide de plugins Eclipse tels que EclEmma ou CodePro Analytix.

---

* 🇬🇧 [Plugin EclEmma pour Eclipse](https://www.eclemma.org)

## Qu'est-ce qu'une PIC / CIP / CI ?

PIC est un acronyme pour « Plateforme d'intégration continue » (ou CIP « Continuous Integration Platform » en anglais, souvent abrégé en CI pour « Continuous Integration »). Il s'agit, comme son nom l'indique, d'une plateforme destinée à faire de l'intégration continue. L'intégration continue sert en partie à surveiller la qualité d'un projet et ses régressions potentielles.

Il s'agit donc d'une plateforme qui sert à exécuter régulièrement (au moins une fois par jour, voire idéalement après chaque « commit » de modification sur un projet) un certain nombre de tâches comme :
* exécuter l'ensemble des tests unitaires et tests d'intégration dans des tests suite
* exécuter l'ensemble des scénarios de tests bout en bout
* lancer des compilations complètes du projet selon les technologies utilisées
* générer des comptes rendus sur les tests en échec et en succès avec des courbes sur l'historique des tests en échec
* générer des comptes rendus sur certaines métriques comme la couverture de code, les fonctions, variables, constantes inutilisées, le nombre cyclomatique, la taille des fonctions implémentées...
* lancer des alertes par e-mail en cas d'échec avec les dernières modifications impactant le bon fonctionnement de l'application

Il existe de nombreux outils permettant d'administrer une PIC, tels que Hudson ou encore son fork libre et gratuit, Jenkins.

---

* 🇫🇷 [Qu'est-ce que Jenkins ? (et Hudson)](https://java.developpez.com/faq/tests?page=Autres-outils#Qu-est-ce-que-Jenkins-et-Hudson)
* 🇫🇷 [L'intégration Continue avec Hudson](https://linsolas.developpez.com/articles/hudson/) de Romain Linsolas
* 🇬🇧 [Site de Jenkins](https://www.jenkins.io)

## En quoi consiste la démarche du TDD ?

TDD est un acronyme pour « Test Driven Development » ou encore le développement dirigé par les tests en français. Il s'agit d'une démarche qui recommande au développeur de rédiger l'ensemble des tests unitaires avant de développer un logiciel ou les portions dont il a la charge.

Cette démarche permet de s'assurer que le développeur ne sera pas influencé par son développement lors de l'écriture des cas de tests afin que ceux-ci soient davantage exhaustifs et conformes aux spécifications. Ainsi, cette démarche permet aussi de s'assurer que le développeur maîtrise les spécifications dont il a la charge avant de commencer à coder.

L'approche TDD préconise le cycle court de développement en cinq étapes :
* écrire les cas de tests d'une fonction
* vérifier que les tests échouent (car le code n'existe pas encore)
* développer le code fonctionnel suffisant pour valider tous les cas de tests
* vérifier que les tests passent
* refactoriser et optimiser en s'assurant que les tests continuent de passer

---

* 🇫🇷 [Tutoriel : Développement Dirigé par les Tests](https://bruno-orsier.developpez.com/tutoriels/TDD/pentaminos/) de Bruno Orsier
* 🇫🇷 [Développement Dirigé par les Tests : mise en pratique](https://dboissier.developpez.com/tutoriels/test-driven-development/) de David Boissier
