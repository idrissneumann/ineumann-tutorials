# Le framework Mockito

## Comment installer Mockito ?

Pour installer Mockito, il suffit de [télécharger](https://github.com/mockito/mockito/releases) la dernière archive .jar (ou .zip si vous voulez également la Javadoc qui va avec) et d'inclure ce .jar dans votre classpath.

Pour les projets maven, il suffit d'ajouter cette dépendance dans votre fichier pom.xml et re-builder votre projet :

```xml
<dependency> 
  <groupId>org.mockito</groupId> 
  <artifactId>mockito-all</artifactId> 
  <version>X.X.X</version> 
</dependency>
```

---

* 🇬🇧 [Téléchargement de Mockito](https://github.com/mockito/mockito/releases)
* 🇬🇧 [Mockito](https://github.com/mockito/mockito)

## Comment créer un mock avec Mockito ?

__Syntaxe générale :__

```java
import static org.mockito.Mockito.*; 
ClasseAMocker objetMock = mock(ClasseAMocker.class)
```

__Exemple :__

Dans les questions qui vont suivre, nous allons montrer des exemples de mocks qui serviront à tester unitairement les méthodes de la classe suivante, sans pour autant dépendre du comportement de ses dépendances :

```java
/** 
 * Class programmeVoiture 
 * La classe à tester unitairement 
 * @author ok.Idriss 
 */ 
public class ProgrammeVoiture(){ 
  // Objet persistance qui sera lié par le principe d'injection de dépendances 
  private IPersistanceModeleVoiture persistance; 
  
  /** Méthodes à tester */ 
  
  /** 
   * Rechercher une liste de modèles en fonction de la marque 
   * @param String marque 
   * @return List<ModeleVoiture> tous les modèles en base appartenant à cette marque 
   */ 
  public List<ModeleVoiture> rechercherVoitureParMarque(String marque){ 
    CritereRerchercheModeleVoiture citere = new CritereRerchercheModeleVoiture(); 
    critere.setMarqueModele(marque); 
    return persistance.searchModeleVoiture(critere); 
  } 
  
  /** 
   * Rechercher un modèle de voiture via son id en base 
   * @param Long id 
   * @return ModeleVoiture résultat correspondant à la recherche 
   */ 
  public ModeleVoiture rechercherVoitureParId(Long id){ 
    try { 
      return persistance.searchModeleVoitureById(id); 
    } catch (TooMuchResultException e){ 
      System.out.println(« Trop de résultats avec le même id, revoyez la structure de votre table ! »); 
      return null; 
    } 
  } 
  
  /** 
   * Enregistrer un modèle valorisé à partir d'un formulaire de création/modification 
   * Doit mettre à jour en base le modèle ou l'ajouter dans le cas ou il n'existe pas 
   * @param ModeleVoiture modele 
   */ 
  public boolean enregisterModeleVoiture(ModeleVoiture modele){ 
    try{ 
      if (null != modele.getId()){ 
        persistance.updateModeleVoiture(modele); 
      } else { 
        persistance.addModeleVoiture(modele); 
      } 
    } catch (ErreurPersistance e){ 
      System.out.println ("Erreur : " + e.getMessage); 
    } 
  } 
  
  /** Getters et setters */ 
  public IPersistanceModeleVoiture getPersistance() { 
    return persistance; 
  } 
  
  public void setPersistance(IPersistanceModeleVoiture persistance) { 
    this.persistance = persistance; 
  } 
}
```

Les méthodes à tester unitairement sont donc :
* `rechercherVoitureParId()`
* `rechercherVoitureParMarque()`
* `enregisterModeleVoiture()`

Pour aider à la compréhension de ce qui va suivre, voici :

1. Le contenu de la classe `ModeleVoiture` :

```java
/** 
 * Objet persistant 
 * @author ok.Idriss 
 */ 
public class ModeleVoiture{ 
  private Long id; 
  private String libelle; 
  private String marque; 
  private Long nbKilometres; 
  private Long age; 
  
  /** Getters et setters */ 
  
  public Long getId() { 
    return id; 
  } 
  public void setId(Long id) { 
    this.id = id; 
  } 
  public String getLibelle() { 
    return libelle; 
  } 
  public void setLibelle(String libelle) { 
    this.libelle = libelle; 
  } 
  public String getMarque() { 
    return marque; 
  } 
  public void setMarque(String marque) { 
    this.marque = marque; 
  } 
  public Long getNbKilometres() { 
    return nbKilometres; 
  } 
  public void setNbKilometres(Long nbKilometres) { 
    this.nbKilometres = nbKilometres; 
  } 
  public Long getAge() { 
    return age; 
  } 
  public void setAge(Long age) { 
    this.age = age; 
  } 
}
```

2. Le contenu de l'interface `IPersistanceModeleVoiture` (celle dont on va mocker le comportement pour s'abstraire de son implémentation) :

```java
/** 
 * Interface IPersistanceModeleVoiture 
 * Signatures des méthodes permettant l'interaction des objets à persister et la base de données 
 * @author ok.Idriss 
 */ 
public interface IPersistanceModeleVoiture { 
  /** 
   * Rechercher une liste de modèles de voiture en base de données à partir de critères 
   * @param CritereRerchercheModeleVoiture critere de recherche 
   * @return List<ModeleVoiture> liste de résultats correspondant à la recherche 
   */ 
  public List<ModeleVoiture> searchModeleVoiture(CritereRerchercheModeleVoiture critere); 
  
  /** 
   * Rechercher un modèle de voiture via son id en base 
   * @param Long id 
   * @return ModeleVoiture résultat correspondant à la recherche 
   * @throws TooMuchResultException lorsque la recherche correspond à plusieurs résultats 
   */ 
  public ModeleVoiture searchModeleVoitureById(Long id) throws TooMuchResultException; 
  
  /** 
   * Persister une instance de ModeleVoiture en base de données 
   * @param ModeleVoiture modele instance à persister en base 
   * @return boolean true si l'insertion s'est bien passée sinon false 
   * @throws ErreurPersistance en cas d'erreur 
   */ 
  public boolean addModeleVoiture(ModeleVoiture modele) throws ErreurPersistance; 
  
  /** 
   * Mettre à jour une instance de ModeleVoiture en base de données 
   * @param ModeleVoiture modele instance à modifier en base 
   * @return boolean true si la mise à jour s'est bien passée sinon false 
   * @throws ErreurPersistance en cas d'erreur 
   */ 
  public boolean updateModeleVoiture(ModeleVoiture modele) throws ErreurPersistance; 
  
  /** 
   * Supprimer une instance de ModeleVoiture en base de données 
   * @param ModeleVoiture modele instance à supprimer en base 
   * @return boolean true si la suppression s'est bien passée sinon false 
   * @throws ErreurPersistance en cas d'erreur 
   */ 
  public boolean deleteModeleVoiture(ModeleVoiture modele) throws ErreurPersistance; 
}
```

3. Et enfin la classe `CritereRerchercheModeleVoiture` :

```java
/** 
 * Class CritereRerchercheModeleVoiture 
 * Critères de recherche d'un modèle de voiture 
 * @author ok.Idriss 
 */ 
public class CritereRerchercheModeleVoiture{ 
  private String libelleModele; 
  private String marqueModele; 
  
  /** Getters et setters */ 
  
  public String getLibelleModele() { 
    return libelleModele; 
  } 
  
  public void setLibelleModele(String libelleModele) { 
    this.libelleModele = libelleModele; 
  } 
  
  public String getMarqueModele() { 
    return marqueModele; 
  } 
  
  public void setMarqueModele(String marqueModele) { 
    this.marqueModele = marqueModele; 
  } 
}
```

Et donc, pour commencer, voici comment déclarer le mock de la persistance au sein de notre TestCase :

```java
import org.junit.Before;  
import static org.mockito.Mockito.*; 
  
/** 
 * Class ProgrammeVoitureTest 
 * Tests unitaires de la classe ProgrammeVoiture 
 * @author ok.Idriss 
 */ 
public class ProgrammeVoitureTest(){ 
  private ProgrammeVoiture programme; 
  private IPersistanceModeleVoiture persistanceMock; 
  
  /** 
   * Création du mock de la persistance et injection dans l'instance de la classe à tester 
   * @throws Exception 
   */ 
  @Before  
  public void setUp() throws Exception {  
    programme = new ProgrammeVoiture(); 
  
    // Création du mock 
    persistanceMock = mock(IPersistanceModeleVoiture.class); 
  
    // Injection du mock en lieu et place d'une réelle implémentation de IPersistanceModeleVoiture 
    programme.setPersistance(persistanceMock); 
  } 
}
```

---

* 🇫🇷 [Comment écrire un cas de test avec JUnit ?](https://www.ineumann.fr/docs/java/faq-tests/junit/fmk-junit#comment-%C3%A9crire-un-cas-de-test-avec-junit-)

## Comment prédire le résultat d'une méthode via Mockito ?

__Syntaxe générale :__

```java
import static org.mockito.Mockito.*;  
import static org.mockito.Matchers.*; 
  
when(objetMock.methode(any(ClassArgument.class))).thenReturn(objetResultat); 
when(objetMock.methode(eq(valeurArgument))).thenReturn(objetResultat); 
when(objetMock.methode(valeurArgument)).thenReturn(objetResultat);
```

__Exemple :__

Reprenons la classe de test `ProgrammeVoitureTest` de [cette question](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-cr%C3%A9er-un-mock-avec-mockito-) et complétons-le :

```java
import org.junit.Before;   
import org.junit.Test;   
  
import static org.junit.Assert.*; 
import static org.mockito.Mockito.*;  
import static org.mockito.Matchers.*; 
  
/**  
 * Class ProgrammeVoitureTest  
 * Tests unitaires de la classe ProgrammeVoiture  
 * @author ok.Idriss  
 */  
public class ProgrammeVoitureTest(){  
  private ProgrammeVoiture programme;  
  private IPersistanceModeleVoiture persistanceMock;  
  
  /** Jeu de données */ 
  private ModeleVoiture modeleTest; 
  Long idExistant = 1L; 
  Long idInexistant = 2L; 
  String libelleTest = "Clio"; 
  String marqueTest = "Renault"; 
  List<ModeleVoiture> listTest; 
  
  /**  
   * Création du mock de la persistance et injection dans l'instance de la classe à tester  
   * @throws Exception  
   */  
  @Before   
  public void setUp() throws Exception {   
    programme = new ProgrammeVoiture();  
  
    // Création du mock  
    persistanceMock = mock(IPersistanceModeleVoiture.class);  
  
    // Injection du mock en lieu et place d'une réelle implémentation de IPersistanceModeleVoiture  
    programme.setPersistance(persistanceMock);  
  
    // Initialisation du jeu de données 
    modeleTest = new ModeleVoiture(); 
    modele.setMarque(marqueTest); 
    modele.setLibelle(libelleTest); 
    modele.setId(idExistant); 
    listTest.add(modeleTest); 
  }  
  
  @Test 
  public final void testRechercherVoitureParId(){ 
    // Lorsque l'on appelera la méthode searchModeleVoitureById avec comme paramètre "1", le mock retournera modeleTest 
    when(persistanceMock.searchModeleVoitureById(idExistant)).thenReturn(modeleTest); 
  
    // l'id existe en base (tel qu'est défini le mock) 
    // on vérifie qu'on renvoie bien le résultat retourné par la persistance 
    ModeleVoiture result = programme.rechercherVoitureParId(idExistant); 
    assertNotNull(result); 
    assertEquals(idExistant, result.getId()); 
    assertEquals(libelleTest, result.getLibelle()); 
    assertEquals(marqueTest, result.getMarque()); 
  
    // L'id n'existe pas en base 
    // on vérifie que l'on renvoie bien null dans ce cas-là 
    result = programme.rechercherVoitureParId(idInexistant); 
    assertNull(result); 
  } 
  
  @Test 
  public final void testRechercherVoitureParMarque(){ 
    // Renverra toujours le même résultat 
    // Le matcher any() contrairement au matcher eq() (utilisé implicitement dans le test du dessus) 
    // permet de renvoyer le résultat quelque soit l'instance de la classe spécifiée en paramètre 
    when(persistanceMock.searchModeleVoiture(any(CritereRerchercheModeleVoiture.class))).thenReturn(listTest); 
  
    List<ModeleVoiture> lstResult = programme.rechercherVoitureParMarque("Renault"); 
    assertNotNull(lstResult); 
    assertFalse(lstResult.isEmpty()); 
  
    // Ici aussi on aura malgré tout un résultat 
    lstResult = programme.rechercherVoitureParMarque("Peugeot"); 
    assertNotNull(lstResult); 
    assertFalse(lstResult.isEmpty()); 
  } 
}
```

---

* 🇫🇷 [Comment créer un mock avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-cr%C3%A9er-un-mock-avec-mockito-)

## Comment faire une assertion sur l'appel d'une méthode avec Mockito ?

__Syntaxe générale :__

```java
import static org.mockito.Mockito.*;   
import static org.mockito.Matchers.*;  
  
verify(objetMock).methode(valeurArgument); 
verify(objetMock).methode(eq(valeurArgument)); 
verify(objetMock).methode(any(ClassArgument.class));
```

__Exemple :__

Reprenons la classe de test `ProgrammeVoitureTest` de [cette question](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-cr%C3%A9er-un-mock-avec-mockito-) et complétons-le :

```java
import org.junit.Before;   
import org.junit.Test;   
  
import static org.junit.Assert.*; 
import static org.mockito.Mockito.*;  
import static org.mockito.Matchers.*; 
  
/**  
 * Class ProgrammeVoitureTest  
 * Tests unitaires de la classe ProgrammeVoiture  
 * @author ok.Idriss  
 */  
public class ProgrammeVoitureTest(){  
  private ProgrammeVoiture programme;  
  private IPersistanceModeleVoiture persistanceMock;  
  
  /** Jeu de données */ 
  private ModeleVoiture modeleTest; 
  Long idExistant = 1L; 
  Long idInexistant = 2L; 
  String libelleTest = "Clio"; 
  String marqueTest = "Renault"; 
  List<ModeleVoiture> listTest; 
  
  /**  
   * Création du mock de la persistance et injection dans l'instance de la classe à tester  
   * @throws Exception  
   */  
  @Before   
  public void setUp() throws Exception {   
  programme = new ProgrammeVoiture();  
  
  // Création du mock  
  persistanceMock = mock(IPersistanceModeleVoiture.class);  
  
  // Injection du mock en lieu et place d'une réelle implémentation de IPersistanceModeleVoiture  
  programme.setPersistance(persistanceMock);  
  
  // Initialisation du jeu de données 
  modeleTest = new ModeleVoiture(); 
  modele.setMarque(marqueTest); 
  modele.setLibelle(libelleTest); 
  modele.setId(idExistant); 
  listTest.add(modeleTest); 
  }  
  
  @Test 
  public final void testRechercherVoitureParId(){ 
  // Lorsque l'on appelera la méthode searchModeleVoitureById avec comme paramètre "1", le mock retournera modeleTest 
  when(persistanceMock.searchModeleVoitureById(idExistant)).thenReturn(modeleTest); 
  
  // l'id existe en base (tel qu'est défini le mock) 
  // on vérifie qu'on renvoie bien le résultat retourné par la persistance 
  ModeleVoiture result = programme.rechercherVoitureParId(idExistant); 
  assertNotNull(result); 
  assertEquals(idExistant, result.getId()); 
  assertEquals(libelleTest, result.getLibelle()); 
  assertEquals(marqueTest, result.getMarque()); 
  
  // L'id n'existe pas en base 
  // on vérifie que l'on renvoie bien null dans ce cas-là 
  result = programme.rechercherVoitureParId(idInexistant); 
  assertNull(result); 
  } 
  
  @Test 
  public final void testRechercherVoitureParMarque(){ 
  // Renverra toujours le même résultat 
  // Le matcher any() contrairement au matcher eq() (utilisé implicitement dans le test du dessus) 
  // permet de renvoyer le résultat quelque soit l'instance de la classe spécifiée en paramètre 
  when(persistanceMock.searchModeleVoiture(any(CritereRerchercheModeleVoiture.class))).thenReturn(listTest); 
  
  List<ModeleVoiture> lstResult = programme.rechercherVoitureParMarque("Renault"); 
  assertNotNull(lstResult); 
  assertFalse(lstResult.isEmpty()); 
  
  // Ici aussi on aura malgré tout un résultat 
  lstResult = programme.rechercherVoitureParMarque("Peugeot"); 
  assertNotNull(lstResult); 
  assertFalse(lstResult.isEmpty()); 
  } 
}
```

---

* 🇫🇷 [Comment créer un mock avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-cr%C3%A9er-un-mock-avec-mockito-)

## Comment utiliser les annotations avec Mockito ?

Il est possible d'instancier directement les objets de Mockito tels que les mocks ou les `ArgumentCaptor` à l'aide d'annotations en utilisant le runner `MockitoJUnitRunner` de la façon suivante :

```java
@RunWith(MockitoJUnitRunner.class) 
public class MaClasseDeTest{ 
  @Mock 
  ObjetMock mock; 
  
  @Spy 
  ObjetSpy spy; 
  
  @Captor 
  ArgumentCaptor<ArgumentAVerifier> captor; 
}
```

Ceci remplacerait les instructions suivantes :

```java
ObjetMock mock = mock(ObjetMock.class); 
ObjetSpy = spy(ObjetSpy.class); 
ArgumentCaptor<ArgumentAVerifier> captor = ArgumentCaptor.forClass(ArgumentAVerifier.class);
```

À noter qu'on peut remplacer le runner (notamment si on utilise déjà un autre runner junit) par l'instruction suivante dans une méthode annotée par `@Before` :

```java
MockitoAnnotations.initMocks(this);
```

---

* 🇫🇷 Comment faire des assertions poussées sur les paramètres d'une méthode avec les ArgumentCaptor ?
* 🇫🇷 Qu'est-ce qu'un « spy » (espion) ?

## Comment faire des assertions poussées sur les paramètres d'une méthode avec les ArgumentCaptor ?

__Syntaxe générale :__

```java
import org.mockito.ArgumentCaptor; 
import static org.mockito.Mockito.*; 
import static org.mockito.Matchers.*; 
  
ArgumentCaptor<ObjetParametreAVerifier> captor = ArgumentCaptor.forClass(ObjetParametreAVerifier.class); 
verify(ObjetMock).methodeAVerifier(eq(valeur), captor.capture()); 
  
ObjetParametreAVerifier objetAVerifier = captor.getValue(); 
// assertions sur les méthodes de objetAVerifier
```

__Exemple :__

Reprenons la classe de test `ProgrammeVoitureTest` de [cette question](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-cr%C3%A9er-un-mock-avec-mockito-) et complétons-le :

```java
import org.junit.Before;   
import org.junit.Test; 
import static org.mockito.Mockito.*;  
import static org.mockito.Matchers.*; 
import org.mockito.ArgumentCaptor; 
  
/**  
 * Class ProgrammeVoitureTest  
 * Tests unitaires de la classe ProgrammeVoiture  
 * @author ok.Idriss  
 */  
public class ProgrammeVoitureTest(){  
  private ProgrammeVoiture programme;  
  private IPersistanceModeleVoiture persistanceMock;  
  
  /**  
   * Création du mock de la persistance et injection dans l'instance de la classe à tester  
   * @throws Exception  
   */  
  @Before   
  public void setUp() throws Exception {   
    programme = new ProgrammeVoiture();  
  
    // Création du mock  
    persistanceMock = mock(IPersistanceModeleVoiture.class);  
  
    // Injection du mock en lieu et place d'une réelle implémentation de IPersistanceModeleVoiture  
    programme.setPersistance(persistanceMock);  
  }  
  
  @Test 
  public final void testEnregisterModeleVoiture_Creation(){ 
    // Captor 
    ArgumentCaptor<ModeleVoiture> captor = ArgumentCaptor.forClass(ModeleVoiture .class);  
  
  	// Instance sans id 
  	ModeleVoiture modele = new ModeleVoiture(); 
  	modele.setLibelle("libelle test"); 
  
  	programme.enregisterModeleVoiture(modele); 
  
  	// assertions 
  	verify(persistanceMock).addModeleVoiture(captor); 
    assertEquals("libelle test", captor.getValue().getLibelle()); 
  } 
  
  @Test 
  public final void testEnregisterModeleVoiture_Modification(){ 
    // Captor 
    ArgumentCaptor<ModeleVoiture> captor = ArgumentCaptor.forClass(ModeleVoiture .class);  
  
  	// Instance avec id 
  	ModeleVoiture modele = new ModeleVoiture(); 
  	modele.setLibelle("libelle test"); 
  	modele.setId(1L); 
  
  	programme.enregisterModeleVoiture(modele); 
  
  	// assertions 
  	verify(persistanceMock).updateModeleVoiture(captor); 
    assertEquals("libelle test", captor.getValue().getLibelle()); 
  } 
}
```

Pour créer un captor sur un paramètre de type `List<?>`, il faut privilégier l'utilisation des annotations :

```java
@Captor 
ArgumentCaptor<List<String>> captor;
```

Voir [Comment utiliser les annotations avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito/#comment-utiliser-les-annotations-avec-mockito-) pour en savoir plus.

---

* 🇫🇷 [Comment faire une assertion sur l'appel d'une méthode avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito/#comment-faire-une-assertion-sur-lappel-dune-m%C3%A9thode-avec-mockito-)
* 🇫🇷 [Comment utiliser les annotations avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito/#comment-utiliser-les-annotations-avec-mockito-)

## Qu'est-ce qu'un « spy » (espion) ?

À l'instar des mocks, on peut de la même façon prédire le résultat d'une méthode d'un spy et faire des assertions sur les appels des méthodes de l'objet « espionné ».

La différence majeure entre le spy et le mock est que le spy se comporte par défaut comme l'objet réel si on ne prédit pas son comportement tandis que le mock lui ne fait rien. On sort donc un peu du cadre des objets simulacres.

Pour déclarer un Spy :

```java
import static org.mockito.Mockito.*;  
  
ObjetSpy spy = spy(ObjetSpy.class);
```

Il est également possible de remplacer cette instruction par l'annotation `@Spy`.

Il suffit ensuite de prédire les méthodes pour lesquelles on souhaite modifier le comportement avec `when` et de faire des assertions avec `verify` à l'instar d'un mock.

---

* 🇫🇷 [Qu'est-ce qu'un mock ? Quelle est la différence entre un bouchon et un mock ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/generalites#quest-ce-quun-mock--quelle-est-la-diff%C3%A9rence-entre-un-bouchon-et-un-mock-)
* 🇫🇷 [Comment prédire le résultat d'une méthode via Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito#comment-pr%C3%A9dire-le-r%C3%A9sultat-dune-m%C3%A9thode-via-mockito-)
* 🇫🇷 [Comment faire une assertion sur l'appel d'une méthode avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito/#comment-faire-une-assertion-sur-lappel-dune-m%C3%A9thode-avec-mockito-)
* 🇫🇷 [Comment utiliser les annotations avec Mockito ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/mockito/#comment-utiliser-les-annotations-avec-mockito-)

## Comment simplifier l'injection de dépendances avec des mocks avec l'annotation @InjectMocks ?

Outre la méthode de passer par les setters de la classe qu'on veut tester comme montré dans les exemples précédents, il est possible d'utiliser l'annotation `@InjectMocks` de la façon suivante :

```java
@RunWith(MockitoJUnitRunner.class)  
public class MyControllerTest {  
  @Mock  
  MyService serviceMock;  
  
  // Injection de dépendances : la classe MyController qui a un attribut de type « MyService » va être instanciée automatiquement avec comme instance de « MyService » le mock au-dessus 
   @InjectMocks 
   @Spy // on peut aussi déclarer le controller comme Spy pour faire des asserts dessus 
   MyController controller;   
   // ... 
}
```

---

* 🇫🇷 [Qu'est-ce que l'injection de dépendances ?](https://www.ineumann.fr/docs/java/faq-tests/mocks/generalites#quest-ce-que-linjection-de-d%C3%A9pendances-)
