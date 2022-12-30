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
