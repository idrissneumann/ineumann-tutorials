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
* 🇬🇧 [Tutoriel pour utiliser Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/blob/master/docs/getting-started.md)

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

* 🇫🇷 [Comment ouvrir une connexion DBUnit ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#comment-ouvrir-une-connexion-dbunit-)
* 🇫🇷 [Quels sont les différents formats XML pour un FlatXmlDataSet ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#quels-sont-les-diff%C3%A9rents-formats-xml-pour-un-flatxmldataset-)
* 🇫🇷 [Quelles sont les différentes opérations pour un dataset ?](https://java.developpez.com/faq/tests?page=L-extension-DBUnit#Quelles-sont-les-differentes-operations-pour-un-dataset)
* 🇬🇧 [Avec Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/blob/master/docs/getting-started.md#inserting-data-from-flat-xml-dataset)

## Quels sont les différents formats XML pour un FlatXmlDataSet ?

Les deux formats XML possibles pour un FlatXmlDataSet sont les suivants :

__Format 1__

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<dataset> 
  <nomTable1 nomColonne1Table1="valeur1" nomColonne2Table1="valeur2" /> 
  <nomTable2 nomColonne1Table2="valeur3" nomColonne2Table2="valeur4" /> 
</dataset>
```

Ce format est le plus simple et sans doute le plus répandu.

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<dataset> 
  <table name="nomTable1"> 
    <column>nomColonne1Table1</column> 
    <column>nomColonne2Table1</column> 
    <row> 
      <value>valeur1</value> 
      <value>valeur2</value> 
    </row> 
  </table> 
  <table name="nomTable2"> 
    <column>nomColonne1Table2</column> 
    <column>nomColonne2Table2</column> 
    <row> 
      <value>valeur3</value> 
      <value>valeur4</value> 
    </row> 
  </table> 
</dataset>
```

Ces XML reviendraient à écrire les requêtes SQL suivantes :

```sql
INSERT INTO nomTable1 (nomColonne1Table1, nomColonne2Table1) VALUES ('valeur1', 'valeur2'); 
INSERT INTO nomTable2 (nomColonne1Table2, nomColonne2Table2) VALUES ('valeur3', 'valeur4');
```

Autre avantage : ces datasets au format XML sont compatibles avec d'autres technologies et frameworks comme PHPUnit/DBUnit, par exemple.

## Comment charger une base à partir d'un ReplacementDataSet ?

Prenons le dataset XML suivant :

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<dataset>  
  <nomTable nomColonne1="VALEUR_PARAMETRABLE" nomColonne2="VALEUR_2_PARAMETRABLE" />  
  <nomTable nomColonne1="VALEUR_PARAMETRABLE" nomColonne2="valeur fixe" />  
</dataset>
```

Admettons que le dataset soit chargé dans un objet `FlatXmlDataSet` (voir les liens en bas de la question pour plus de détails).

L'objet `ReplacementDataSet` va permettre de remplacer dynamiquement des valeurs à partir d'un dataset existant (notre objet `FlatXmlDataSet`, par exemple) et donc de pouvoir réutiliser un dataset pour des valeurs différentes :

```java
import org.dbunit.dataset.ReplacementDataSet; 
import org.dbunit.operation.DatabaseOperation; 
  
// dataSetXML est notre instance d'objet FlatXmlDataSet chargée à partir du XML ci-dessus 
ReplacementDataSet replacementDataSet = new ReplacementDataSet(dataSetXML); 
replacementDataSet.addReplacementObject("VALEUR_PARAMETRABLE", "valeur 1"); 
replacementDataSet.addReplacementObject("VALEUR_2_PARAMETRABLE", "valeur 2"); 
  
// L'objet dbUnitConnection est une connexion dbUnit de type IDatabaseConnection  
// Ici, on indique qu'on exécutera une insertion en écrasant le contenu existant des tables présentes dans le dataset  
DatabaseOperation.CLEAN_INSERT.execute(dbUnitConnection, replacementDataSet);
```

L'exécution de ce dataset reviendra à écrire les requêtes SQL suivantes :

```sql
INSERT INTO nomTable (nomColonne1, nomColonne2) VALUES ('valeur 1', 'valeur 2'); 
INSERT INTO nomTable (nomColonne1, nomColonne2) VALUES ('valeur 2', 'valeur fixe');
```

---

* 🇫🇷 [Comment ouvrir une connexion DBUnit ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#comment-ouvrir-une-connexion-dbunit-)
* 🇫🇷 [Quels sont les différents formats XML pour un FlatXmlDataSet ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#quels-sont-les-diff%C3%A9rents-formats-xml-pour-un-flatxmldataset-)
* 🇫🇷 [Comment charger une base à partir d'un FlatXmlDataSet ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#comment-charger-une-base-%C3%A0-partir-dun-flatxmldataset-)
* 🇫🇷 [Quelles sont les différentes opérations pour un dataset ?](http://java.developpez.com/faq/tests?page=L-extension-DBUnit#Quelles-sont-les-differentes-operations-pour-un-dataset)
* 🇬🇧 [Avec Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/blob/master/docs/getting-started.md#inserting-data-from-replacement-xml-dataset)

## Quelles sont les différentes opérations pour un dataset ?

Voici une liste non exhaustive des opérations de la classe statique DatabaseOperation :

1. Insertion avec purge au préalable :

```java
import org.dbunit.operation.DatabaseOperation; 
  
// dataSet est une instance de IDataSet 
// dbUnitConnection est une instance de IDataBaseConnection 
DatabaseOperation.CLEAN_INSERT.execute(dbUnitConnection, dataSet);
```

2. Insertion sans purge :
  
```java
import org.dbunit.operation.DatabaseOperation; 
  
// dataSet est une instance de IDataSet 
// dbUnitConnection est une instance de IDataBaseConnection 
DatabaseOperation.INSERT.execute(dbUnitConnection, dataSet);
```

3. Opérations de suppression et purge :
  
```java
import org.dbunit.operation.DatabaseOperation; 

// dataSet est une instance de IDataSet 
// dbUnitConnection est une instance de IDataBaseConnection 
DatabaseOperation.DELETE.execute(dbUnitConnection, dataSet); 
DatabaseOperation.DELETE_ALL.execute(dbUnitConnection, dataSet); 
DatabaseOperation.DELETE_ALL.execute(dbUnitConnection, dataSet); 
DatabaseOperation.TRUNCATE_TABLE.execute(dbUnitConnection, dataSet);
```

## Comment exporter le contenu partiel d'une base dans un fichier XML ?

Pour cela, il suffit d'utiliser une instance de la classe QueryDataSet :

```java
import java.io.OutputStream; 
import org.dbunit.database.QueryDataSet; 
import org.dbunit.dataset.xml.FlatXmlDataSet; 
import org.dbunit.database.IDatabaseConnection; 
  
// dbUnitConnection est une instance de IDataBaseConnection 
QueryDataSet partialDataSet = new QueryDataSet(dbUnitConnection); 
partialDataSet.addTable("nomTable1"); 
partialDataSet.addTable("nomTable2"); 
  
OutputStream out = new FileOutputStream("chemin_vers_fichier.xml"); 
FlatXmlDataSet.write(partialDataSet, out);
```

Ici, le contenu complet des tables `nomTable1` et `nomTable2` va être exporté au format XML DBUnit dans un fichier `chemin_vers_fichier.xml`.

Il est également possible d'extraire le retour d'une requête :

```java
partialDataSet.addTable("nomTable1", "SELECT * FROM nomTable1 WHERE colonne = '...'");
```

---

* 🇫🇷 [Quels sont les différents formats XML pour un FlatXmlDataSet ?](https://www.ineumann.fr/docs/java/faq-tests/junit/dbunit#quels-sont-les-diff%C3%A9rents-formats-xml-pour-un-flatxmldataset-)
* 🇬🇧 [Avec Testing-toolbox-core](https://github.com/testing-toolbox/testing-toolbox-core/blob/master/docs/getting-started.md#asserting-that-a-row-exists-on-database)
