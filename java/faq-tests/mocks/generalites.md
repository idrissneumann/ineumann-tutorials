# Généralités sur les mocks

## Qu'est-ce qu'un mock ? Quelle est la différence entre un bouchon et un mock ?

Bien que les concepts d'objets simulacres (mocks) et de bouchons (stubs) soient proches, on peut noter les différences suivantes :

Les bouchons (stubs) sont basés sur une vérification d'état. Ils permettent de s'abstraire d'une dépendance en fournissant des méthodes, Web services, base de données, ayant les mêmes entrants que cette dépendance, mais en fournissant une réponse contrôlée ou prédéfinie.

Ainsi l'utilisation de bouchons permet de :
* tester uniquement la méthode que l'on souhaite tester sans dépendre du résultat fourni par la dépendance en question
* de développer autour de dépendances non implémentées

Les objets simulacres (mocks), eux, sont basés sur une vérification de comportement. Contrairement aux bouchons, il ne peut s'agir que d'objets, mais dont le comportement est également totalement contrôlé. Contrairement aux bouchons qui sont appelés de manière transparente pour l'appelant, l'utilisation de mocks repose sur l'injection de dépendances.

Le gros avantage des mocks par rapport aux simples bouchons : permet d'être mis en place très rapidement à l'aide d'API comme Mockito au sein même d'un testCase JUnit et permet de faire des assertions sur les appels aux méthodes du mock (vérifier qu'on appelle bien telle méthode avec tels arguments par exemple).

Les mocks sont donc plus adaptés à l'écriture de tests unitaires ou l'on ne charge que la classe à tester en essayant de passer par tous les chemins possibles et de faire le maximum d'assertions sur les cas de tests possibles.

Les bouchons, quant à eux, sont davantage adaptés à la mise en place de tests d'intégration où l'on charge une partie de l'environnement des portions de code testées (par exemple : de vrais appels HTTP à des Web services bouchonnés dans le cadre d'un projet SOA).

---

* 🇫🇷 [Tutoriel : les simulacres ne sont pas des bouchons](https://bruno-orsier.developpez.com/mocks-arent-stubs/) de Martin Fowler et Bruno Orsier
* 🇫🇷 [Qu'est-ce que l'injection de dépendances ?](https://java.developpez.com/faq/tests?page=Les-mocks#Qu-est-ce-que-l-injection-de-dependances)

## Qu'est-ce que l'injection de dépendances ?

L'injection de dépendances est un principe de programmation orientée objet qui consiste à découpler les dépendances entre objets en injectant dynamiquement les instances de ces dépendances dans les classes manipulant ces dépendances (en passant par des métadonnées par exemple). Le framework Java par excellence qui implémente ce principe est sans nul doute le framework Spring qui rattache les beans les uns aux autres en passant par des fichiers XML.

Concrètement, l'injection de dépendances préconise que chaque dépendance ne soit plus directement instanciée par les classes manipulant ces dépendances. Voici un exemple en code qui permet de mieux comprendre le principe :

```java
// Ne permet pas l'injection de dépendances entre ClasseA et ClasseB 
public ClasseA { 
  private ClasseB objetDependance = new ClasseB(...); 
} 
  
// Ne permet pas non plus l'injection de dépendances entre ClasseA et ClasseB 
public ClasseA { 
  private ClasseB objetDependance; 
  
  public ClasseA (){ 
    objetDependance = new ClasseB(...); 
  } 
} 
  
// Permet l'injection de dépendances entre ClasseA et ClasseB à l'aide d'une classe intermédiaire ou encore de métadonnées 
public ClasseA { 
  private IInterfaceClasseB objetDependance; 
  
  public void setObjetDependance(IInterfaceClasseB objetDependance){ 
    this.objetDependance = objetDependance; 
  } 
  
  public ClasseB getObjetDependance(IInterfaceClasseB objetDependance){ 
    return objetDependance; 
  } 
}
```

L'injection de dépendances permet, entre autres, de changer les implémentations des objets injectés en passant par des interfaces, mais aussi d'injecter des objets simulacres en lieu et place de ces dépendances.

Il n'est pas toujours aussi simple de revoir tout un projet pour y faire de l'injection de dépendances en passant par des métadonnées ni de mettre en place Spring sur une architecture déjà prédéfinie et fixée. Dans ce cas, il existe une technique simple pour remplacer l'injection de dépendances afin de faciliter vos tests unitaires :

```java
public ClasseA { 
  private IInterfaceClasseB objetDependance; 
  
  public void setObjetDependance(IInterfaceClasseB objetDependance){ 
    this.objetDependance = objetDependance; 
  } 
  
  // instance par défaut 
  // à ne surtout pas appeler dans un constructeur  
  private void initClassBDefaultDependance(){ 
     // ce test permettra de laisser la possibilité d'injecter une autre instance de ClasseB via le setter 
     if (null == objetDependance){ 
       objetDependance = new ClasseB(...); 
       // autres opérations pour valoriser l'instance de objetDependance 
     } 
  } 
  
  public IInterfaceClasseB getObjetDependance(IInterfaceClasseB objetDependance){ 
    initClassBDefaultDependance(); 
    return objetDependance; 
  } 
}
```

Ainsi, dans vos tests, il vous sera tout aussi possible d'injecter un mock de `ClasseB` en passant par le setter tandis que l'application, elle, utilisera l'instance par défaut de la méthode `initClassBDefaultDependance` de manière totalement transparente.

---

* 🇬🇧 [Site de Spring](https://spring.io)
* 🇫🇷 [FAQ Spring sur developpez.com](https://spring.developpez.com/faq/)

## Quels sont les différents frameworks existants pour faire des mocks ?

Voici une liste non exhaustive des frameworks permettant de mettre en place des objets simulacres en Java :
* [Mockito](https://github.com/mockito/mockito)
* [EasyMock](https://easymock.org)
* [JMock](http://jmock.org)
* [PowerMock](https://github.com/powermock/powermock)
* [JMockit](https://jmockit.github.io)

Mockito est sans doute le plus populaire à l'heure actuelle.
