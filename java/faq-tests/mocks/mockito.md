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
