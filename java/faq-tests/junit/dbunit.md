# L'extension DBUnit

## Qu'est-ce que DBUnit ?

DBUnit est une extension du framework JUnit permettant d'écrire des cas de tests en manipulant des bases de données.

Cette extension permet entre autres :
d'initialiser des jeux de données en base à l'aide de fichiers XML ;
d'extraire le contenu (partiel ou complet) d'une base et de faire des assertions dessus (à l'aide de comparaison de datasets par exemple).


DBUnit se base sur des connexions JDBC et requiert donc l'installation du driver associé à votre SGBDR (que vous devriez normalement avoir installé pour faire fonctionner votre application).

Des surcouches reposant sur DbUnit permettent de simplifier davantage les insertions et assertions de contenus de bases de données comme par exemple : [Testing toolbox core](http://testing-toolbox.github.io/testing-toolbox-core/)

---

* 🇬🇧 [Site de DBUnit](https://dbunit.sourceforge.net)
* 🇬🇧 [Site de Testing-toolbox-core](https://testing-toolbox.github.io/testing-toolbox-core/)
* 🇬🇧 [Tutoriel pour utiliser Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/wiki/Getting-started)

## Comment installer DBUnit ?

Pour l'installation de DBUnit :
* cliquez sur le lien de téléchargement du site de DBUnit
* téléchargez l'archive .jar
* ajoutez l'archive au classpath de votre projet.

Pour les projets maven, il suffit d'ajouter cette dépendance dans votre fichier pom.xml et re-builder votre projet :

```xml
<dependency> 
  <groupId>org.dbunit</groupId> 
  <artifactId>dbunit</artifactId> 
  <version>X.X.X</version> 
</dependency>
```

---

* 🇬🇧 [Site de DBUnit](https://dbunit.sourceforge.net)

## Qu'est-ce qu'un dataset ?

Un dataset est une couche d'abstraction sur ce que va contenir une base de données à un moment donné. À partir d'un dataset, il est possible :
* de purger et charger le contenu partiel ou total d'une base
* de compléter le contenu partiel ou total d'une base de données
* d'exporter le contenu partiel ou total d'une base

Il existe plusieurs types de dataset, les principaux sont :
* les `FlatXmlDataSet` : ils permettent de charger ou d'exporter le contenu partiel ou total d'une base au format XML
* les `ReplacementDataSet` : ils permettent de remplacer dynamiquement des valeurs au sein d'un dataset existant (un FlatXmlDataSet par exemple) avant de le charger en base

## Comment ouvrir une connexion DBUnit ?

Les connexions DBUnit se basent sur une connexion JDBC. Voici un exemple de connexion JDBC pour une base postgreSQL (en local) :

```java
import java.sql.Connection; 
  
Connection jdbcConnection = null; 
try { 
  jdbcConnection = DriverManager.getConnection("jdbc:postgresql://127.0.0.1:5432/nom_base", "nom_utilisateur",  "mot_de_passe"); 
catch (ClassNotFoundException e) { 
  // traitements en cas de driver non trouvé 
}
```

Il faudra bien entendu veiller à importer le bon driver dans votre projet au préalable. Pour plus de détails sur les connexions JDBC, nous vous renvoyons à la [FAQ JDBC](https://java.developpez.com/faq/jdbc/).

Parmi les nombreux moyens d'ouvrir une connexion DBUnit, il est possible d'instancier une connexion DBUnit à partir d'un objet `java.sql.Connection` préalablement créé de la façon suivante :

```java
import org.dbunit.database.DatabaseConnection; 
import org.dbunit.database.IDatabaseConnection; 
  
// l'objet jdbcConnection est une instance de java.sql.Connection 
IDatabaseConnection dbUnitConnection = new DatabaseConnection(jdbcConnection);
```

La classe DatabaseConnection va permettre d'adapter l'objet JDBC Connection en IDatabaseConnection.

En fin de traitement, n'oubliez pas de fermer la connexion :

```java
dbUnitConnection.close();
```

---

* 🇫🇷 [La FAQ JDBC](https://java.developpez.com/faq/jdbc/)

## Comment charger une base à partir d'un FlatXmlDataSet ?

Depuis la version 2.4.7, il est recommandé de construire son objet à partir d'un objet FlatXmlDataSetBuilder :

```java
import java.io.InputStream; 
import org.dbunit.dataset.IDataSet; 
import org.dbunit.dataset.xml.FlatXmlDataSet; 
import org.dbunit.dataset.xml.FlatXmlDataSetBuilder; 
import org.dbunit.operation.DatabaseOperation; 
  
FlatXmlDataSetBuilder xmlDSBuilder = new FlatXmlDataSetBuilder(); 
  
// on indique qu'on ne tiendra pas compte de la casse pour les noms de tables présents dans le XML 
xmlDSBuilder.setCaseSensitiveTableNames(false);  
  
// L'objet inputStreamXML est un objet de type java.io.InputStream contenant le XML du dataset 
// La méthode build va retourner un objet FlatXmlDataSet qui implémente l'interface IDataSet 
IDataSet dataSet = xmlDSBuilder.build(inputStreamXML); 
  
// L'objet dbUnitConnection est une connexion dbUnit de type IDatabaseConnection 
// Ici on indique qu'on exécutera une insertion en écrasant le contenu existant des tables présentes dans le dataset 
DatabaseOperation.CLEAN_INSERT.execute(dbUnitConnection, dataSet);
```

La source inputStreamXML peut provenir d'un fichier XML :

```java
import java.io.InputStream; 
import java.io.FileInputStream; 
  
InputStream inputStreamXML = new FileInputStream("chemin_vers_fichier.xml");
```

Ou bien même d'une chaîne de caractères contenant le dataset au format XML :

```java
import java.io.InputStream; 
import java.io.ByteArrayInputStream; 
  
String strXML = "<dataset><table colonne=\"valeur\" /></dataset>"; 
InputStream inputStreamXML = new ByteArrayInputStream(strXML.getBytes());
```
---

* 🇫🇷 [Comment ouvrir une connexion DBUnit ?](https://java.developpez.com/faq/tests?page=L-extension-DBUnit#Comment-ouvrir-une-connexion-DBUnit)
* 🇫🇷 [Quels sont les différents formats XML pour un FlatXmlDataSet ?](https://java.developpez.com/faq/tests?page=L-extension-DBUnit#Quels-sont-les-differents-formats-XML-pour-un-FlatXmlDataSet)
* 🇫🇷 [Quelles sont les différentes opérations pour un dataset ?](https://java.developpez.com/faq/tests?page=L-extension-DBUnit#Quelles-sont-les-differentes-operations-pour-un-dataset)
* 🇬🇧 [Avec Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/wiki/Getting-started#inserting-data-from-flat-xml-dataset)
