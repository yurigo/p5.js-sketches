# AC.02 — Sistema Viu: plàncton bioluminescent

Peça audiovisual generativa feta amb p5.js i p5.sound. És un petit mar nocturn on viuen tres famílies d'agents que s'espanten, es refugien, cacen i muten.


## Com executar-lo

1. Obrir la carpeta del projecte a VS Code i executar `index.html` amb Live Server (cal connexió a Internet, ja que p5.js i p5.sound es carreguen des d'un CDN).
2. Fer un clic o prémer una tecla per activar el so (el navegador no permet que soni abans).

**Controls**

| Acció | Efecte |
|---|---|
| Moure el ratolí | Corrent que atrau o repel·leix el plàncton (cercle suau) |
| Clic | Llança una ona que empeny i espanta |
| Tecla `E` | Alterna entre atreure i repel·lir |
| Roda del ratolí | Canvia la força del corrent |
| Tecla `R` | Reinicia el sistema |

## Concepte i intenció visual

La peça imita el plàncton bioluminescent: punts de llum que brillen més quan alguna cosa els pertorba. Volia un món fosc, tranquil i una mica hipnòtic, que es pugui mirar durant diversos minuts. Al principi tot flota a poc a poc, les llums s'agrupen al voltant de les meduses i el so és un brunzit greu i suau. Quan arriben els depredadors, l'ambient es tensa: les llums fugen, brillen més i sonen notes de cristall. Amb el temps, el plàncton espantat canvia de color i el mar passa del cian als verds i violetes.

La sensació que busco és la d'observar un aquari o el mar de nit: calma, amb petits moments de perill que es resolen sols.

Aquestes són les tres preguntes de l'enunciat:

**Quin tipus de món he creat?**

Un mar nocturn vist des de dins, amb plàncton bioluminescent. És un món fosc, silenciós i sense fi (les vores es connecten), on la llum és l'única cosa que importa: cada ésser brilla i aquesta llum explica què li passa. Gairebé tot està en calma i hi ha poca llum, i la brillantor apareix quan alguna cosa s'espanta.

**Quines relacions existeixen entre els seus habitants?**

Són relacions de protecció i d'amenaça:
- Les **llums** (plàncton) busquen la companyia de les **meduses**, que els serveixen de refugi i a les quals queden unides per un fil de llum.
- Els **depredadors** les cacen. Quan un s'acosta, les llums obliden el refugi i fugen, perquè la por és més forta que la protecció.
- Els ensurts repetits les canvien: una llum que s'espanta moltes vegades canvia de color. El perill deixa empremta en el plàncton i el mar va canviant de color amb el temps.

**Quina sensació hauria de produir observar-lo durant diversos minuts?**

Calma i una mica d'hipnosi, com mirar un aquari o el mar de nit, amb petits moments de tensió que es resolen sols. Al principi tot flota a poc a poc, les llums s'agrupen al voltant de les meduses i el so és un brunzit greu i suau. Quan arriben els depredadors, l'ambient es tensa: les llums fugen, brillen més i sonen notes de cristall. Després torna la calma, però amb altres colors (cian, verd i violeta), de manera que la peça no es queda igual i sempre hi ha alguna cosa a mirar.

## Famílies d'agents (140 en total)

| Família | Quantitat | Paper | Aspecte |
|---|---|---|---|
| **Llum** (plàncton) | 120 | Presa. Es mou a la deriva, fuig, es refugia i muta | Punts amb halo, cian al principi |
| **Medusa** | 14 | Refugi. Es mou molt a poc a poc i batega | Campana violeta translúcida amb 5 tentacles |
| **Depredador** | 6 | Caça. Patrulla ràpidament | Cos fosc amb contorn vermell |

## Regles que governen les relacions

1. **Por (Llum ↔ Depredador).** Si un depredador és a menys de 150 px, la llum fuig en direcció contrària. Com més a prop és, més intensa és la fugida, més gran és l'halo i més blanc és el nucli.
2. **Refugi (Llum ↔ Medusa).** Si hi ha una medusa a menys de 80 px, la llum s'hi acosta a poc a poc i es dibuixa un fil de llum entre totes dues. L'atracció disminueix quan la llum té por: guanya la por.
3. **Caça (Depredador ↔ Llum).** Si un depredador toca una llum, la llum mor i esclata en partícules. Més tard neix una altra llum al costat d'una medusa, amb el color d'una llum que continua viva.
4. **Mutació (la llum amb si mateixa).** Cada llum compta els seus ensurts. En arribar a 5, canvia de color a poc a poc (cian, verd o violeta, sempre diferent de l'actual).

Així hi ha tres relacions entre famílies (por, refugi, caça) i una que afecta l'evolució del sistema (mutació).

## Implementació

**Moviment.** Cada agent té una posició (`px`, `py`) i una velocitat (`vx`, `vy`). Les regles modifiquen la velocitat a cada fotograma sumant vectors unitaris (dividint per la distància), i després es limita amb `constrain()`. Les llums tenen una velocitat màxima que augmenta amb la por. Quan surten per una vora, reapareixen per la contrària. Tots els agents són classes (`Llum`, `Medusa`, `Depredador`) guardades en arrays.

**Partícules secundàries.** N'hi ha de dos tipus, tots dos amb una vida limitada (`ttl`), com a la sessió 6:
- `Particula`: 14 espurnes que apareixen quan es caça una llum; perden velocitat per fricció i s'esvaeixen.
- `Ona`: anell que creix amb el clic de l'usuari.

A cada fotograma s'actualitzen i després s'eliminen les mortes amb `filter()` i `isAlive()`.

**Interacció.** El ratolí és un corrent (cercle suau) que atrau o repel·leix les llums dins d'un radi; la roda en canvia la força. El clic llança una ona que empeny i espanta només les llums que toca el seu front. L'usuari pertorba el sistema, però no el controla: les llums segueixen les seves pròpies regles (per exemple, la por d'un depredador té més pes que el corrent). `R` ho reinicia tot.

**So.** Tot el so utilitza `p5.Oscillator` i canvia segons el que passa al sistema:
- *Meduses*: dos oscil·ladors greus (La1 i la seva quinta) formen un brunzit continu. Sona més fort com més plàncton hi ha refugiat i, si augmenta la proporció de llums espantades, la quinta baixa cap a un tríton, un so més tens.
- *Llums*: quan s'espanten, toquen una nota d'una escala pentatònica; la posició X tria la nota i el color tria el timbre (cian = sinusoïdal, verd = triangle, violeta = quadrada).
- *Depredadors*: quan cacen, sona un cop greu descendent (ona de serra), més greu com més gran és el depredador.
- *Mutació*: un glissando ascendent cap a una nota que depèn del nou color.
- *Clic*: un escombratge descendent.

Les notes curtes provenen d'un grup de 12 oscil·ladors que es reparteixen per torns, cadascun amb el seu `ttl` i una disminució progressiva del volum (*fade out*) en acabar. Es limita el nombre de notes per fotograma perquè no es converteixi en soroll.

## Decisions estètiques

- Paleta en HSB: fons blau marí gairebé negre, cian per al plàncton, violeta per a les meduses i vermell només per al perill, perquè el vermell destaqui.
- Estela: el fons es pinta amb un rectangle amb poca alfa a cada fotograma, de manera que cada moviment deixa una cua lluminosa.
- Les meduses van al fons i són gairebé transparents; les llums brillen per sobre.
- Els fils de llum entre llum i medusa s'esvaeixen amb la distància i amb la por.
- El llenç ocupa el 90 % de la finestra, amb la pàgina d'un blau una mica més clar, perquè es vegi com un marc.
- El so segueix la mateixa lògica: calma i tons greus per defecte, sons cristal·lins i aguts quan hi ha un ensurt.

## Dificultats trobades

- **Fil que travessava la pantalla:** si una llum travessava la vora mentre la medusa continuava guardada, es dibuixava una línia de banda a banda. Ara es torna a mesurar la distància just abans de dibuixar el fil.
- **Mutació massa lenta:** al principi les partícules sortien de la pantalla abans que cap canviés de color. Es va reduir el nombre d'ensurts necessaris (de 12 a 5) i es va accelerar el canvi de color.
- **Atracció del ratolí poc visible:** es va augmentar la força, es va evitar que caigués a zero a la vora del cercle i es va reduir el radi.
- **Reproducció automàtica del navegador:** l'àudio no pot començar sol, per això s'activa amb el primer clic o la primera tecla i la pantalla ho indica fins aleshores.

## Idees futures

- Que les meduses també reaccionin (per exemple, que llancin partícules en prémer).
- Que els depredadors persegueixin activament les llums en lloc de patrullar.
- Una reproducció del so més rica (filtres o reverberació) i espacialització segons la posició.
- Que els colors mutats s'heretin amb més varietat i es pugui veure una evolució a més llarg termini.

## Ús d'eines d'IA

He utilitzat **Claude**:

- **Idees i concepte:** li vaig demanar una pluja d'idees i vaig triar jo la del plàncton bioluminescent.
- **Corregir errors i ajustar:** li vaig descriure el que veia (el fil que travessava la pantalla, la mutació massa lenta, l'atracció del ratolí poc visible) i Claude va proposar varies solucions.
- **Documentació:** l'esborrany d'aquest README.