# SmashDolls
**Grupo 06 - M0n3k0's**

 -  Alba Haro Ballesteros -> a.haro.2021@alumnos.urjc.es
   
 -  Alfonso Del Pino García -> a.delpino2020@alumnos.urjc.es
   
 -  Cristina Lozano Bautista -> c.lozano.2021@alumnos.urjc.es
   
 -  Francisco Rodríguez Martínez -> f.rodriguez.2021@alumnos.urjc.es

## INTRODUCCION
Bienvenido al documento de diseño de videojuego de Smash Dolls, creado por el estudio de videojuegos “M0n3k0’s”. Smash Dolls  es un videojuego para PC del que se explicarán y analizarán cada uno de los aspectos y características que lo componen, así como, sus detalles principales, muestras del apartado artístico, mecánicas que lo caracterizan, el sonido que lo ambientará y finalmente las distintas interfaces que se podrán encontrar.

### - Concepto -
En este videojuego se controlará una muñeca, dentro de un variado elenco de personajes, que se enfrentará a otra en un combate 2D medido por la vida de estas y un límite de tiempo, para así marcar su territorio en la gran tienda de muñecas.

### - Historia -
En una gran tienda de muñecas, cuando la luz del día sigue reflejándose por los escaparates, diferentes clases de muñecas esperan en su caja a ser compradas. 

Sin embargo, tras el último rayo de sol, estas pequeñas muñecas escapan de su prisión de cartón para entablar una gran pelea por lo que es suyo, “El escaparate principal” , donde las muñecas más fuertes y duras son expuestas por el día para que todo el mundo pueda verlas.

Para conseguir ser expuestas, los diferentes tipos de muñecas tendrán que pelear con aquellas que no son sus iguales (¡o que no son del mismo material!), para así marcar su territorio hasta llegar al gran escaparate.

Y tú, ¿mereces tu lugar en las estanterías de nuestra tienda?

### - Características Principales -
¿Qué define a Smash Dolls?

- Frenético: Un combate único en el que se tendrá que derrotar con rapidez y precisión al enemigo.

- Carismático: Cada personaje es único, lo que quiere decir que cada luchadora mostrará un gameplay totalmente diferente.

- Rejugabilidad: Ninguna pelea ni jugador son iguales al anterior, permite jugar múltiples veces sin tener la sensación de monotonía.

### - Género -
Smash Dolls es un videojuego de lucha con perspectiva 2D, basado en los clásicos de este género, Mortal kombat, Street Fighter, Tekken... 

Principalmente se jugará en un modo “1 vs 1” el cual mostrará a las dos contrincantes en cada extremo de la pantalla, cuya pelea finalizará tras acabar con la vida de una de ellas o al terminar el límite de tiempo, en el que la ganadora se medirá según la cantidad de vida restante.

### - Público Objetivo -
Smash Dolls busca mostrar una experiencia única con cada personaje y pelea. Para ello busca ofrecer pura diversión, dinamismo y múltiples posibilidades, para que cada pelea se sienta diferente evitando lo monótono , y batallas frenéticas que capten la atención del jugador.

Este videojuego se dirige principalmente a un público adulto - joven. Aunque la temática pueda parecer infantil, no deja de ser un juego violento, no muy explícito, pero sí está basado en peleas de pura violencia. Además es un juego casual, es decir,las partidas son dinámicas ya que son combates cortos divididos en rondas, lo que supone que también sea accesible para aquellas personas que no pueden dedicar tanto tiempo al ocio.

### - Jugabilidad -
Para iniciar una pelea se tendrán que tener en cuenta los siguientes factores:ç

- Personajes: Un elenco variado en el que cada personaje destaca por sus habilidades únicas.

- Movimiento: Al ser un juego con perspectiva 2D, la movilidad se basará en movimiento horizontal, salto, y agacharse

- Vida: Cada jugador contará con una barra de vida, que si llega a su fin, significará la derrota del jugador

- Tiempo: Límite de tiempo en el que se debe acabar con el oponente.

### - Alcance -
Smash Dolls tiene un gran potencial a la hora de expandirse. Principalmente para su expansión, se añadirán nuevos escenarios jugables, así como nuevos y diferentes personajes que muestren un gameplay completamente nuevo.

## MECÁNICAS DE JUEGO
En este apartado desarrollaremos en profundidad las mecánicas y la jugabilidad de Smash Dolls. Se describirán las acciones que podrá realizar el usuario y la manera en la que este interactúa con el juego, a su vez, se explicarán detalladamente los movimientos y habilidades de los personajes con sus respectivos controles, los posibles modos de juego y como se visualizará el gameplay.

### - Gameplay -
El usuario podrá elegir entre dos modos de juego: single player (1 jugador) o multiplayer (2 jugadores) una vez pasada la interfaz de selección, el desarrollo del juego ocurre de forma similar en ambos modos.

El flujo del juego consistirá en un enfrentamiento de 3 minutos dividido en dos rondas de 1 minuto y medio cada una, en caso de empate se realizará una tercera ronda de la misma duración.  El jugador comenzará en la pantalla de selección de personaje donde escogerá la muñeca con la que peleará, en caso de que juegue en local (singleplayer) tendrá la opción de escoger también la muñeca rival.

Una vez comienza el combate, el usuario deberá golpear al rival con sus respectivas habilidades y movimientos hasta lograr que su barra de salud llegue a cero. En caso de que se acabe el tiempo antes de que uno de los dos personajes pierda todos los puntos de vida, ganará el usuario con más vida en ese momento. 

### - Movimiento y jugabilidad -
En esta sección se especificará cómo será el espacio de juego y el modo de pelea y se registran todos los movimientos, ataques y bloqueos que puede ejecutar el usuario una vez iniciada la partida. A su vez también se desarrollarán las habilidades especiales de los personajes, ya que cada uno tiene su propia personalidad y movimientos únicos.

#### Espacio de juego
Smash Dolls se desarrolla en un plano 2D por lo que el movimiento se produce sobre dos ejes (x e y). La interfaz de combate consistirá en un escenario estático de fondo, los dos personajes como objetos principales cuyos movimientos posibles serán; moverse hacia ambos lados (izquierda/derecha), agacharse, saltar, bloquear, ataque físico  y ataque especial.

#### Controles
El usuario interactúa con el teclado para poder controlar los movimientos del personaje:

AWSD -> para el movimiento; 

A -> izquierda

D -> derecha

W -> salto

S -> agacharse 

E -> ataque físico 

R -> ataque especial

Q - >bloqueo

#### Colisiones
En este juego de lucha para evitar un ataque tienes dos opciones; estar fuera del rango del contrincante o utilizando el botón de bloqueo (Q). Sin embargo, no siempre podrás realizar un bloqueo efectivo. Al usar tres veces seguidas el bloqueo para protegerte, la cuarta vez no funcionará y recibirás el daño del ataque por completo, de esta manera evitamos que el usuario mantenga presionado todo el rato el botón de bloqueo y damos más dinamismo al combate. 

### - Habilidades especiales -
Smash Dolls se caracteriza por la esencia de los personajes, su historia y habilidades que los hacen únicos respecto al resto de muñecas de la tienda, en está sección contaremos un poco de la historia de cada uno y sus ataques más poderosos:

- SuperFroppy: 

Su ataque básico consiste en un puñetazo que hace 40 de daño y es común a todos los personajes (E).

Su habilidad especial es un lenguetazo muy potente (R). Todas las habilidades especiales dañan un 100 de puntos de salud.

- Portea:

Ataque básico: puñetazo (E).

Habilidad especial: Porteak lanza un chorro de té hirviendo que daña a sus enemigos. (R)

- Voodoo Bella:

Ataque básico: puñetazo (E).

Habilidad especial: maldición, Bella saca una pequeña muñeca que actúa como el rival y le clava un tornillo de vudú.(R)

## APARTADO ARTÍSTICO
En Smash Dolls utilizaremos un estilo artístico de tipo cartoon, creemos que este estilo es el más adecuado para este proyecto ya que al ser este un estilo menos serio y con formas y proporciones más exageradas y al no tener que ser realista, encajaba èrfectamente con la temática linda y coqueta del juego, ademas queda perfecto con la historia bizarra de muñecas que pelean entre sí por ver cuál de ellas merece su puesto en el gran escaparate de la tienda. 

### - Personajes -
Dentro del juego podremos seleccionar entre un elenco de tres muñecas distintas para combatir, cada una de ellas con un diseño propio y una temática distinta, además estas tendrán una forma de combatir y unas habilidades que encajen con sus diseños. 

- SuperFroppy: 

Por un lado está la gran justiciera SuperFroppy, para su diseño se ha tomado inspiración de los trajes clásicos de superheroinas como los de la serie “Sakura, cazadora de cartas” o los de la línea de skins “Star Guardian” del juego “League of Legends”. 

Para darle un tono más dulce a su diseño, SuperFroppy lleva siempre su gorro favorito que simula la cabeza de una rana, además esta rana tiene en sus ojos la forma de un sol y una luna ya que el sueño de SuperFroppy es salir algun dia de la tienda para poder llevar la justicia a todos los rincones del universo.

[![Superheroina.png](https://i.postimg.cc/pd9zyCXs/Superheroina.png)](https://postimg.cc/cKSrbQ33)

- Portea:

Por otro lado tenemos a la tranquila Portea, en su diseño hemos querido mostrar un personaje delicado y apacible mediante el uso de formas redondeadas y patrones florales en su armadura. Es una muñeca muy tranquila que adora pasar su tiempo libre tomando el té con sus amigas.

En este  diseño queríamos mezclar el concepto de las tacitas de porcelana con el Kintsugi, que es un arte japonés que consiste en reparar con oro piezas rotas, es por eso que se verán numerosas grietas doradas en su diseño.

[![Captura.png](https://i.postimg.cc/BZdSGCdq/Captura.png)](https://postimg.cc/fkfncYzF)

- Voodoo Bela:

Por último se encuentra Voodoo Bela, una muñeca que tras años de no ser escogida por nadie decidió reconstruirse con piezas de otras muñecas en busca de conseguir ser querida por alguien tal y como se ve en su diseño, en el que podemos apreciar como tiene distintas partes cosidas formando su cuerpo.

Además de esto, al estar inspirada en un muñeco vudú, podemos ver como tiene una serie de agujas clavadas como parte de su diseño.

Este diseño trata de mostrar un personaje mucho más loco que los anteriores pero sin llegar a ser desagradable, sino que conociendo su historia se pueda llegar hasta empatizar con ellas

[![Captura-2.png](https://i.postimg.cc/y82XmtGM/Captura-2.png)](https://postimg.cc/w1cmHfg2)

### - Escenario -
Como no podía ser de otra forma, el escenario donde se llevarán a cabo estas divertidísimas batallas será la propia tienda en sí. Las muñecas lucharán encima de una de las mesas de la tienda pudiendo ver de fondo un cacho de la tienda donde podremos ver detalles tales como cajas rotas que representan las cajas de las que salen las muñecas para participar en los combates.

Consideramos que el hecho de que el escenario sea la propia tiende ayuda al jugador a entrar en situación y meterse en el contexto en el que ocurre el juego así como empatizar más con las historias de las muñecas.

## INTERFACES
En esta sección, se detallan las interfaces que formarán parte de Smash Dolls. Aunque no se incluye el arte final, se detallan los elementos esenciales que se presentarán en cada pantalla y el diagrama de flujo entre estas.

### - Menú de inicio -
Es el punto de entrada al juego, desde esta pantalla el jugador podrá acceder a partidas, opciones de configuración y controles… El fondo del menú de inicio será una ilustración de un escaparate de una tienda de muñecas y los botones aparecerán en la puerta y el título del juego en el letrero de la tienda. Al ir desplazándose entre una opción u otra se ampliará una parte del escaparate u otra.

[![inicio.jpg](https://i.postimg.cc/HxWKJ3L8/inicio.jpg)](https://postimg.cc/SX5V36Cm)

### - Menú “Jugar” -
En este menú se elige si se quiere jugar con otra persona o contra el ordenador.

Da igual qué botón pulsemos (single player o multiplayer) que irá al menú selección de muñeca. 

El botón “back” nos llevará de vuelta al menú de inicio.

[![jugar.jpg](https://i.postimg.cc/G3T0v7Qv/jugar.jpg)](https://postimg.cc/RqmbBT20)

### - Menú de selección de personaje -
En el modo multijugador primero elegirá personaje el jugador 1 y luego el jugador 2 y cuando elijan ambos se pasará al menú de selección de escenario. Aparecerá una ilustración grande del personaje en 2D y abajo la vida, la energía y las habilidades. 

[![personaje.jpg](https://i.postimg.cc/NjJbJYGF/personaje.jpg)](https://postimg.cc/87vhc26g)

En el modo singleplayer se elige un personaje y el otro se elige a continuación.

### - Menú de selección de escenario -
En el menú de selección de escenario tendremos un escenario en el centro junto con una breve descripción del mismo que se podrá elegir pulsando sobre él o pasar al siguiente con unos botones de flechas que se encuentran abajo. 

En esta pantalla encontraremos también los botones “Choose doll” y “Menu” que nos llevarán al menú de elección de personaje o al menú de inicio respectivamente.

[![escenario.jpg](https://i.postimg.cc/1RdmQVWr/escenario.jpg)](https://postimg.cc/Z0rtPnzW)

### - Pantalla principal -

[![principal.jpg](https://i.postimg.cc/xCcdvvxq/principal.jpg)](https://postimg.cc/ZBzZZdhh)

El escenario donde se encuentran las muñecas se mostrará en pantalla completa.

En las esquinas de la parte superior se muestran las barras de vida de los personajes y cuantos combates lleva ganados cada personaje, quien llegue a 3 combates ganados gana.

En la parte superior-centro aparece el tiempo del combate.

Por último el botón “back” nos devuelve al menú de elección de escenario.

## SONIDO
### - Introducción -
El sonido es una pieza clave para una buena inversión, debe guiar como debe sentirse el jugador en cada segundo de su experiencia. Desde el frenesí y la tensión durante las batallas, la impotencia de la derrota y la felicidad de la victoria. 

### - Estilo musical -
El estilo musical será música alegre y llena de energía y cambiará según el oponente ya que acompañará al aspecto y personalidad de este. Ejemplo de videojuegos que hagan esto es el “Cuphead” que tiene una canción para cada boss. 

- Batalla contra SuperFroppy: Su música de combate será alegre, enérgica y heroica. Tomará referencias de bandas sonoras de películas de superhéroes, con coros épicos y melodías vibrantes que acentuarán la emoción de las batallas.

- Batalla contra Porteak: Porteak, por otro lado, encarna la tranquilidad y la delicadeza. La música que acompaña a Porteak por lo tanto, será relajante y pacífica, en un estilo similar al lofi. Incorporará instrumentos suaves, como el piano y la flauta, para crear una atmósfera serena que refleje su personalidad tranquila.

- Batalla contra Voodoo Bela: La música de Voodo Bela será siniestra y experimental para transmitir esa complejidad que tiene el personaje. La percusión y los ritmos inusuales añadirán un toque distintivo, reflejando su singularidad y su conexión con la magia vudú.

### - Efectos de sonidos -
- Sonidos de los movimientos: lenguetazo de superfroppy, sonido de clavo hincándose en una muñeca vudú, sonido de té derramándose acompañado de un grito de dolor, sonido de puñetazo, etc.

- Sonido de las muñecas moviéndose

- Las voces y los gritos de los personajes también reflejarán su aspecto y personalidad.

### - Música menú de inicio -
La música del menú de inicio se hará simulando una caja de música, ya que aporta personalidad y se asocia a la infancia. Cuando se vaya desplazando el ratón sobre los diferentes botones se escuchará como un sonido de engranaje de caja de música.
