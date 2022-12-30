# D'autres outils

## Qu'est-ce que Jenkins ? (et Hudson)

Jenkins est un outil d'intégration continue écrit en Java. Il s'agit d'un fork OpenSource de l'outil Hudson. Jenkins permet de mettre en place des « jobs » dont l'exécution peut être automatique, programmée (de la même manière qu'une tâche cron) ou encore manuelle.

Ces jobs peuvent être en charge :
* d'exécuter des commandes Shell
* d'exécuter des commandes de compilation ou de build (make, maven, ant, etc)
* d'exécuter des tests suites JUnit/PHPUnit ou autres et alerter les utilisateurs par email en cas d’échec
* d'analyser certaines métriques comme la couverture de code en se couplant avec d'autres outils comme Sonar
et de nombreuses autres fonctionnalités à l'aide d'un mécanisme de plugins

---

* 🇬🇧 [Site de Jenkins](https://www.jenkins.io)
* 🇫🇷 [Qu'est-ce qu'une PIC / CIP / CI ?](https://www.ineumann.fr/docs/java/faq-tests/generalites#quest-ce-quune-pic--cip--ci-)
* 🇫🇷 [L'intégration Continue avec Hudson](https://linsolas.developpez.com/articles/hudson/) de Romain Linsolas
* 🇫🇷 [Contrôler la qualité de ses projets avec Sonar](http://linsolas.developpez.com/articles/java/qualite/sonar/) de Romain Linsolas

## Qu'est-ce que Apache JMeter ?

Apache JMeter est un outil open source écrit en Java permettant de faire des tests de charge ou des tests fonctionnels sur des applications Web ou encore des applications réparties basées sur SOA (REST, SOAP, etc.).

Voici une liste non exhaustive des fonctions de Apache JMeter :

* lancer des requêtes HTTP/EJB/SOAP en effectuant un certain nombre de pré et postconditions (insertion de données en bases, assertion sur le retour d'une * requête HTTP à l'aide de requêtes XPath par exemple)
* tests de charge/performance sur des scripts SQL, des requêtes HTTP...
* réalisation de rapports statistiques avec des graphes ou textuels

---

* 🇬🇧 [Site de Apache JMeter](https://jmeter.apache.org)
* 🇫🇷 [Développer un plan de test avec JMeter](http://arodrigues.developpez.com/tutoriels/java/performance/developper-plan-test-avec-jmeter/) de Antonio Gomes Rodrigues
* 🇫🇷 [Introduction à Apache JMeter, un outil de test de montée en charge](https://arodrigues.developpez.com/tutoriels/java/presentation-apache-jmeter-partie1/) de Antonio Gomes Rodrigues

## Qu'est-ce que Selenium ?

Selenium est une technologie open source permettant d’automatiser des scénarios de tests sur des interfaces Web. Cette technologie se compose :

* d'une extension Firefox appelée « Selenium IDE » permettant d'enregistrer une suite de scénarios qui peuvent être rejoués à volonté
* d'un framework permettant d'écrire des scénarios de tests avec assertions, disponible pour plusieurs langages dont Java, C#, Groovy, Perl, PHP, Python et Ruby

---

* 🇬🇧 [Site de Selenium](http://docs.seleniumhq.org)
* 🇫🇷 [Tutoriel sur le test d'applications Web avec Selenium](https://atatorus.developpez.com/tutoriels/java/test-application-web-avec-selenium/) de Denis Thomas
