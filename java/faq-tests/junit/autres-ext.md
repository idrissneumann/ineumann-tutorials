# Autres extensions 

## Comment faire des assertions plus modernes avec AssertJ ?

Une alternative aux assertions JUnit : les assertions d’AssertJ, une bibliothèque mettant à disposition des assertions tout en adoptant le style de code « fluent ».

Voici des exemples inspirants d’assertions issues de la documentation officielle d’AssertJ :

```java
// Un seul import static à faire, c'est bien pratique 
import static org.assertj.core.api.Assertions.*; 
  
// Assertions simples 
assertThat(frodo.getName()).isEqualTo("Frodo"); 
assertThat(frodo).isNotEqualTo(sauron) 
         .isIn(fellowshipOfTheRing); 
  
// Assertions spécifiques aux chaînes de caractères ("commence par", "termine par", comparaison sans casse) 
assertThat(frodo.getName()).startsWith("Fro") 
               .endsWith("do") 
               .isEqualToIgnoringCase("frodo"); 
  
// Assertions spécifiques aux collections ("a pour taille", "contient", "ne contient pas") 
assertThat(fellowshipOfTheRing).hasSize(9) 
                 .contains(frodo, sam) 
                 .doesNotContain(sauron); 
  
// fellowshipOfTheRing est un objet de type List<TolkienCharacter>, dont on extrait une collection de chaînes de caractères sur l'attribut "name" de TolkienCharacter 
assertThat(fellowshipOfTheRing).extracting("name") 
                 .contains("Boromir", "Gandalf", "Frodo", "Legolas") 
                 .doesNotContain("Sauron", "Elrond"); 
  
// Même chose en utilisant la syntaxe de Java 8 
assertThat(fellowshipOfTheRing).extracting(TolkienCharacter::getName) 
                 .contains("Boromir", "Gandalf", "Frodo", "Legolas") 
                 .doesNotContain("Sauron", "Elrond"); 
  
// Filtrer la collection avant de faire des assertions 
assertThat(fellowshipOfTheRing).filteredOn("race", HOBBIT) 
                 .containsOnly(sam, frodo, pippin, merry); 
  
  
// Filtrer la collection avant de faire des assertions avec un prédicat Java 8 
assertThat(fellowshipOfTheRing).filteredOn(character -> character.getName().contains("o")) 
                 .containsOnly(aragorn, frodo, legolas, boromir); 
  
// Combiner les filtres et extractions 
assertThat(fellowshipOfTheRing).filteredOn(character -> character.getName().contains("o")) 
                 .containsOnly(aragorn, frodo, legolas, boromir) 
                 .extracting(character -> character.getRace().getName()) 
                 .contains("Hobbit", "Elf", "Man");
```

À noter qu'il existe d'autres libs pour faire des assertions comme Harmcrest par exemple.
