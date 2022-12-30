# Le framework JUnit

## Qu'est-ce que JUnit ?

JUnit est un framework Java prévu pour la réalisation de tests unitaires et d'intégration.

JUnit est le framework le plus connu de la mouvance des frameworks xUnit implémentés dans de nombreuses technologies (nous pourrons également citer PHPUnit pour PHP ou encore xUnit.NET pour C# et .NET par exemple).

JUnit permet de réaliser :
* des TestCase qui sont des classes contenant des méthodes de tests
* des TestSuite qui permettent de lancer des suites de classes de type TestCase

Voici la structure globale d'un TestCase en Junit >= 4 :

```java
import org.junit.Before; 
import org.junit.After; 
import org.junit.BeforeClass; 
import org.junit.AfterClass;  
import org.junit.Test; 
  
public class MaClasseDeTest { 
  
  /** Pre et post conditions */ 
  
  @BeforeClass 
  public static void setUpBeforeClass() throws Exception { 
    // Le contenu de cette méthode ne sera exécuté qu'une fois avant toutes les autres méthodes avec annotations 
    // (y compris celles ayant une annotation @Before)    
  } 
  
  @AfterClass 
  public static void tearDownClass() throws Exception { 
    // Le contenu de cette méthode ne sera exécuté qu'une fois après toutes les autres méthodes avec annotations 
    // (y compris celles ayant une annotation @After)   
  } 
  
  @Before 
  public void setUp() throws Exception { 
    // Le contenu de cette méthode sera exécuté avant chaque test (méthode avec l'annotation @Test) 
  } 
  
  @After 
  public void tearDown() throws Exception { 
    // Le contenu de cette méthode sera exécuté après chaque test (méthode avec l'annotation @Test) 
  } 
  
  /** Cas de tests */ 
  
  @Test 
  public void testCas1() { 
    // Code contenant l'exécution du premier scénario avec les assertions associées 
  } 
  
  @Test 
  public void testCas2() { 
    // Code contenant l'exécution du second scénario avec les assertions associées 
  } 
}
```

En JUnit <= 3, il fallait en plus hériter de la méthode `junit.framework.TestCase` et ne pas mettre d'annotations `@Test` sur ses méthodes de tests (dont le nom devait obligatoirement commencer par « test », ce qui n'est plus le cas avec la version 4 de JUnit).

---

* 🇫🇷 [Tests unitaires automatisés avec JUnit4](https://rpouiller.developpez.com/tutoriels/java/tests-unitaires-junit4/) de Régis Pouiller

## Comment installer JUnit ?

Pour installer JUnit, il suffit de télécharger les archives .jar indiquées sur [cette page](https://github.com/junit-team/junit4/wiki/Download-and-Install). Ensuite, il suffit d'ajouter ces .jar à votre classpath.

Pour les projets maven, il suffit d'ajouter cette dépendance dans votre fichier pom.xml et re-builder votre projet :

```xml
<dependency> 
  <groupId>junit</groupId> 
  <artifactId>junit</artifactId> 
  <version>X.XX</version> 
</dependency>
```

---

* 🇬🇧 [JUnit.org](https://junit.org)
* 🇬🇧 [Télécharger JUnit](https://github.com/junit-team/junit4/wiki/Download-and-Install)

## Comment écrire un cas de test avec JUnit ?

Voici la structure globale d'un TestCase avec JUnit >= 4 :

```java
import org.junit.Before;  
import org.junit.Test;  
  
import static org.junit.Assert.*; 
  
public class MaClasseDeTest {  
  
  /** Pre et post conditions */  
  
  @BeforeClass  
  public static void setUpBeforeClass() throws Exception {  
    // Le contenu de cette méthode ne sera exécuté qu'une fois avant toutes les autres méthodes avec annotations  
    // (y compris celles ayant une annotation @Before)     
  }  
  
  @AfterClass  
  public static void tearDownClass() throws Exception {  
    // Le contenu de cette méthode ne sera exécuté qu'une fois après toutes les autres méthodes avec annotations  
    // (y compris celles ayant une annotation @After)    
  }  
  
  @Before  
  public void setUp() throws Exception {  
    // Le contenu de cette méthode sera exécuté avant chaque test (méthode avec l'annotation @Test)  
  }  
  
  @After  
  public void tearDown() throws Exception {  
    // Le contenu de cette méthode sera exécuté après chaque test (méthode avec l'annotation @Test)  
  }  
  
  /** Cas de tests */  
  
  @Test  
  public void testCas1() {  
    // Code contenant l'exécution du premier scénario avec les assertions associées  
  }  
  
  @Test  
  public void testCas2() {  
    // Code contenant l'exécution du second scénario avec les assertions associées  
  }  
}
```

Imaginons maintenant que l'on veut tester les méthodes de la classe suivante :

```java
public class Addition { 
  Integer nb1; 
  Integer nb2; 
  
  /** Constructeur */ 
  
  public Addition(Integer nb1, Integer nb2){ 
    this.nb1 = nb1; 
    this.nb2 = nb2; 
  } 
  
  public Integer somme(){ 
    return nb1 + nb2; 
  } 
  
  /** Getters */ 
  
  public Integer getNb1() { 
    return nb1; 
  } 
  public Integer getNb2() { 
    return nb2; 
  } 
}
```

Voici un exemple de cas de test :

```java
@Test  
public void testCasAdditionNominal() {  
  Addition add = new Addition(1, 2); 
  assertEquals(1, add.getNb1()); // vérification, on a bien valorisé l'attribut nb1 
  assertEquals(2, add.getNb2()); // vérification, on a bien valorisé l'attribut nb2 
  assertEquals(3, add.somme()); // vérification sur la méthode somme() 
}
```

---

* 🇫🇷 [Tests unitaires automatisés avec JUnit4](https://rpouiller.developpez.com/tutoriels/java/tests-unitaires-junit4/) de Régis Pouiller

## Qu'est-ce qu'une assertion ? Quels sont les différents types d'assertions avec JUnit ?

En informatique, une assertion est une expression qui doit être évaluée vrai ou faire échouer le programme ou le test en cas d’échec (en levant une exception ou en mettant fin au programme par exemple).

Dans le cas de JUnit et des tests d'une manière générale, on peut assimiler une assertion à une vérification et, en cas d’échec, une exception spécifique est levée (`java.lang.AssertionError` pour JUnit).

Voici une liste non exhaustive des fonctions d'assertions en JUnit :
* `assertEquals` : vérifier l'égalité de deux expressions
* `assertNotNull` : vérifier la non-nullité d'un objet
* `assertNull` : vérifier la nullité d'un objet
* `assertTrue` : vérifier qu'une expression booléenne est vraie
* `assertFalse` : vérifier qu'une expression booléenne est fausse
* `fail` : échouer le test si cette assertion est exécutée.


Ces méthodes sont surchargées pour de nombreux objets. Par exemple, la méthode assertEquals va être surchargée pour tous les types primitifs et pour les classes implémentant la méthode equals (String par exemple). Il est également possible de fournir un message d'erreur en cas d'échec d'une assertion (en premier paramètre).

Par exemple, si on exécute cette assertion :

```java
assertEquals(2, 1);
```

On aura comme résultat :

```
java.lang.AssertionError: expected:<2> but was:<1>
```

Si on exécute cette assertion :

```java
assertEquals("Erreur dans le test XXXX : ", 2, 1);
```

On aura comme résultat :

```
Erreur dans le test XXXX :  expected:<2> but was:<1>
```

D'autres frameworks qui s'interfacent avec JUnit permettent de faire des types d'assertions spécifiques, par exemple :
* XMLUnit qui permet, entre autres, de comparer des flux XML
* DBUnit qui permet, entre autres, de comparer des datasets
* Mockito qui permet, entre autres, de faire des assertions sur des appels de méthodes et leurs arguments sans pour autant exécuter ces méthodes (grâce au principe du Mock)

Pour plus de détails sur les fonctions d'assertions de base, consultez la Javadoc.

---

* 🇫🇷 [Section DBUnit de la FAQ](https://java.developpez.com/faq/tests?page=L-extension-DBUnit)
* 🇫🇷 [Section Mockito de la FAQ](https://java.developpez.com/faq/tests?page=Le-framework-Mockito)

## Comment écrire des assertions sur des exceptions ?

Il est possible de vérifier la levée d'une exception grâce à l'annotation `@Test(expected=<nom>.class)` :

```java
// Ce test va réussir 
@Test(expected = java.lang.NullPointerException.class) 
public final void testException(){ 
  Long variablePasInstanciee = null; 
  variablePasInstanciee.toString(); 
} 
  
// Ce test va échouer 
@Test(expected = java.lang.NullPointerException.class) 
public final void testException2(){ 
  Long variableInstanciee = 1L; 
  variableInstanciee.toString(); 
}
```

Message d'erreur dans le cas du second test :

```
java.lang.AssertionError: Expected exception: java.lang.NullPointerException
```

Pour les utilisateurs d'anciennes versions de JUnit et de Spring, Spring mettait à disposition l'annotation @ExpectedException (qui est aujourd'hui dépréciée). Ces tests peuvent aussi être réécrits de la façon suivante :

```java
@Test
public final void testException(){ 
  try{ 
    Long variablePasInstanciee = null; 
    variablePasInstanciee.toString(); 
    fail("On attendait une exception !"); 
  } catch (NullPointerException e){ 
    assertTrue(true); 
  } 
}
```

Cette façon de faire est à éviter au profit de l'utilisation de l'annotation prévue à cet effet, sauf dans le cas où l'on veut faire des tests plus poussés sur les propriétés de l'exception levée (`e.getMessage()` par exemple).

### Comment écrire des pré et post conditions avec JUnit ?

Grâce aux annotations suivantes :
* `@Before` : le contenu de la méthode va être exécuté avant chacune des méthodes de tests (avec l'annotation `@Test`)
* `@BeforeClass` : le contenu de la méthode va être exécuté avant l'ensemble des méthodes de la classe de tests (y compris celles ayant l'annotation `@Before`)
* `@After` : le contenu de la méthode va être exécuté après chacune des méthodes de tests (avec l'annotation `@Test`)
* `@AfterClass` : le contenu de la méthode va être exécuté après l'ensemble des méthodes de la classe de tests (y compris celles ayant l'annotation `@After`)

### Comment utiliser des beans instanciés au sein d'un contexte Spring dans une classe de test ?

À partir de JUnit 4.x, il est possible de récupérer les instances d'objets (ou « beans ») définis dans un fichier de contexte Spring via le runner `SpringJUnit4ClassRunner` à l'aide de l'annotation `@RunWith` de la façon suivante :

```java
@ContextConfiguration(locations = { "classpath*:**/applicationContext.xml" }) 
@RunWith(SpringJUnit4ClassRunner.class) 
public class MaClasseDeTest {
  // ... 
}
```

Les beans sont définis, dans cet exemple, dans le fichier `applicationContext.xml` situé dans le classpath du projet.

Il sera ensuite possible de récupérer les instances des beans de ce contexte à l'aide de l'annotation `@Autowired` (et `@Qualifier` si nécessaire) :

```java
@ContextConfiguration(locations = { "classpath*:**/applicationContext.xml" }) 
@RunWith(SpringJUnit4ClassRunner.class) 
public class MaClasseDeTest { 
  @Autowired 
  @Qualifier("id_du_bean") // pas obligatoire si une seule instance du bean est définie dans le contexte 
  MonBean instanceBean; 
}
```

Il est également possible de lancer le test avec plusieurs fichiers de contexte Spring :

```java
@ContextConfiguration(locations = { "classpath*:**/applicationContext1.xml",  "classpath*:**/applicationContext2.xml" }) 
@RunWith(SpringJUnit4ClassRunner.class) 
public class MaClasseDeTest { 
  // ... 
}
```
