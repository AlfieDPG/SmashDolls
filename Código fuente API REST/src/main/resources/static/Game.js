import { devolver_nombre_equipo } from "./Menu.js";
import { devolver_IP } from "./Menu.js";
// Variables necesarias para realizar funciones con peticiones al servidor
var peticionesServer = new PeticionesServidor();
var textoObjetosRiddle = new Array(23);
var textoObjetosWiggle = new Array(23);
var textoRecords = new Array(5);
var titulo;
var equipo;
class SceneGame extends Phaser.Scene {

    reiniciado = false;
    vencido = false;
    tiempo = {
        minutos: '39',
        segundos: '59'
    }
    Riddle;
    Wiggle;
    cursors;
    muros;
    wake=false;
    finJuego;
    // Control del juego
    juegoDetenidoRiddle = true;
    juegoDetenidoWiggle = true;
    // Variables que almacenan todos los objetos interactuables por los personajes
    objetosInteractuables = new Array (100);
    caja;
    piano;
    estanteria1;
    estanteria2;
    puertaA;
    fragmento1LlaveB;
    mesaLlaveB;
    cajonesLlaveB;
    puertaB;
    puertaB2;
    mesaJardin1;
    mesaJardin2;
    clavel;
    lirio;
    tulipan;
    girasol;
    rosaBlanca;
    rosaRoja;
    cuadro1;
    cuadro2;
    puertaC;
    muebleCocina;
    puertaD;
    simboloPared;
    puertaAlmacen;
    comodaGatos;
    comodaMensaje;
    estanteria3;
    estanteria4;
    caldero1rubi;
    caldero2rubi;
    caldero1zafiro;
    caldero2zafiro;
    nevera1;
    nevera2;
    // Variables encargadas del sistema de diálogos y texto J1
    cajaTexto; // Imagen del cuadro de texto
    mostrandoTexto = false; // Controla que no se superpongan los textos
    tiempoTexto = 10000; // Tiempo que se deja al cuadro de texto en pantalla
    tiempoCaracter = 80; // Tiempo que se emplea para mostrar cada letra
    tiempoEsperaCuadro = 4000; // Tiempo que se deja el cuadro mostrado después de acabar de sacar el texto
    eventoTiempo;  // Evento encargado de mostrar el cuadro de texto
    dialogo; // Objeto texto
    stringTexto; // String con la frase a mostrar (array de caracteres)
    indiceLetra = 0; // Índice utilizado para mostrar el texto
    numeroCaracteres; // Número de caracteres que tiene la frase a mostrar
    dialogoCargado = ""; // Variable que almacena el texto acumulado
    linea1 = true;
    linea2 = false;
    linea3 = false;
    dialogoB;
    dialogoCargadoB = "";
    dialogoC;
    dialogoCargadoC = "";
    // Variables encargadas del sistema de diálogos y texto J2
    cajaTexto2;
    mostrandoTexto2 = false;
    tiempoTexto2 = 10000;
    eventoTiempo2;
    dialogo2;
    stringTexto2;
    indiceLetra2 = 0;
    numeroCaracteres2;
    dialogoCargado2 = "";
    linea1b = true;
    linea2b = false;
    linea2c = false;
    dialogo2B;
    dialogoCargado2B = "";
    dialogo2C;
    dialogoCargado2C = "";
    // Variables encargadas del control del flujo del juego y de los puzles
    inicioAbarrotado = false;
    estanteria1_interactuada = false;
    estanteria2_interactuada = false;
    comboPiano; // Variable que almacena la clave numérica que simboliza las teclas correctas del piano
    sinfoniaSecreta = false;
    resolucionMostradaPiano = false;
    numeroFragmentosLlave = 0;
    fragmentoMesa = false;
    fragmentoSuelo = false;
    fragmentoCajones = false;
    entrePetalos = false;
    cuadrosInteractuados = false;
    xPlantaA1; // Coordenadas de la imagen de las plantas
    yPlantaA1;
    plantaA1;
    xPlantaB1;
    yPlantaB1;
    plantaB1;
    xPlantaC1;
    yPlantaC1;
    plantaC1;
    xPlantaA2;
    yPlantaA2;
    plantaA2;
    xPlantaB2;
    yPlantaB2;
    plantaB2;
    xPlantaC2;
    yPlantaC2;
    plantaC2;
    floresJardin1 = new Array(3);
    floresJardin2 = new Array(3);
    clavesIntroducidas = 0;
    nuevaPosicionFlores = new Array(3);
    nuevoIntento = true;
    jardinEnArmonia = false;
    resolucionMostradaJardin = false;
    secretoFogones = false;
        resuelveFogones;
        contraseñaSimbolos = new Array(3);
        numeroDigitos = 0;
        enigmaAlmacen = false;
        resolucionMostradaAlmacen = false;
        mensajeObtenido = false;
        velasEncendidas = [false, false, false, false, false];
        llamasFelinas = false;
        mensajeGatosMostrado = false;
        puertaBibliotecaRiddle;
        puertaBibliotecaWiggle;
        puertaLaboratorioRiddle;
        puertaLaboratorioWiggle;
        estanteria3_interactuada = false;
        estanteria4_interactuada = false;
        elixirRubi = false;
        elixirZafiro = false;
        maestroMezclas = false;
        ingredientesRiddle1 = new Array(7);
        ingredientesRiddle2 = new Array(7);
        ingredientesWiggle1 = new Array(7);
        ingredientesWiggle2 = new Array(7);
        iconosNevera1 = new Array(7);
        iconosNevera2 = new Array(7);
        ingrediente1A;
        ingrediente2A;
        ingrediente3A;
        ingrediente4A;
        ingrediente5A;
        ingrediente6A;
        ingrediente7A;
        ingrediente8A;
        ingrediente9A;
        ingrediente10A;
        ingrediente11A;
        ingrediente12A;
        ingrediente13A;
        ingrediente14A;
        arrayIngredientesRiddle = new Array(14);
        ingrediente1B;
        ingrediente2B;
        ingrediente3B;
        ingrediente4B;
        ingrediente5B;
        ingrediente6B;
        ingrediente7B;
        ingrediente8B;
        ingrediente9B;
        ingrediente10B;
        ingrediente11B;
        ingrediente12B;
        ingrediente13B;
        ingrediente14B;
        arrayIngredientesWiggle = new Array(14);
        numeroIngredientesCaldero1 = 0;
        numeroIngredientesCaldero2 = 0;
        iconosCaldero1 = new Array(14);
        iconosCaldero2 = new Array(14);
        numeroIngredientesIntroducidos1 = 0;
        numeroIngredientesIntroducidos2 = 0;
        ingredientesIntroducidosCaldero1 = new Array(3);
        ingredientesIntroducidosCaldero2 = new Array(3);
        finalMostrado = false;
    // Variables encargadas de mostrar imágenes
    libroPianoVisibleRiddle = false;
    libroPianoVisibleWiggle = false;
    puzlePianoVisible = false;
    puzleFloresRiddleVisible1 = false;
    puzleFloresRiddleVisible2 = false;
    puzleFloresWiggleVisible1 = false;
    puzleFloresWiggleVisible2 = false;
    puzleSimbolosRiddleVisible = false;
    puzleSimbolosWiggleVisible = false;
    panelContraseñaRiddleVisible = false;
    panelContraseñaWiggleVisible = false;
    puzleGatosVisibleRiddle = false;
    puzleGatosVisibleWiggle = false;
    mensajeGatosVisibleRiddle = false;
    mensajeGatosVisibleWiggle = false;
    ingredientesNeveraRiddleVisible1 = false;
    ingredientesNeveraRiddleVisible2 = false;
    ingredientesNeveraWiggleVisible1 = false;
    ingredientesNeveraWiggleVisible2 = false;
    puzleCalderoRiddleVisible = false;
    puzleCalderoWiggleVisible = false;


    libroPiano1;
    libroPiano2;
    puzlePiano;
    puzleFloresR1;
    puzleFloresW1;
    puzleFloresR2;
    puzleFLoresW2;
    puzleSimbolos;
    puzleSimbolos2;
    panelContraseña1;
    panelContraseña2;
    puzleGatos1;
    puzleGatos2;
    vela1AE; // Velas encendidas y apagadas para cada puzle
    vela2AE;
    vela3AE;
    vela4AE;
    vela5AE;
    vela1AN;
    vela2AN;
    vela3AN;
    vela4AN;
    vela5AN;
    vela1BE;
    vela2BE;
    vela3BE;
    vela5BE;
    vela6BE;
    vela1BN;
    vela2BN;
    vela3BN;
    vela4BN;
    vela5BN;
    gatoBlanco;
    gatoVerde;
    gatoAzul;
    gatoNaranja;
    gatoRojo;
    mensajeGatos1;
    mensajeGatos2;
    ingredientesNeveraR1;
    ingredientesNeveraR2;
    ingredientesNeveraW1;
    ingredientesNeveraW2;
    ingredientesCaldero1;
    ingredientesCaldero2;
    timedEvent;
    textoTemp;
    // Inventarios
    inventarioRiddle = new Array(100);
    inventarioWiggle = new Array(100);

    // Imágenes de introducción, victoria y derrota
    introduccion1;
    introduccion2;
    introduccion3;
    introduccion4;
    victoria;
    derrota;

    constructor ()
    {
        super({ key: 'SceneGame' });
    }

    preload ()
    {
        this.load.image('mapa', 'Assets/MAPA.png');
        this.load.image('tiles', 'Assets/full tilemap.png');
        this.load.tilemapTiledJSON('mapa', 'Assets/mapa2.json');
        this.load.image('Riddle', 'Assets/Riddle.png');
        this.load.image('Wiggle', 'Assets/Wiggle.png');
        this.load.image('sky', 'Assets/Fondo_Black.jpg');
        this.load.image('fondo', 'Assets/fondo.png');
        this.load.image('pause', 'Assets/menu pausa.png')
        this.load.image('pointer', 'Assets/pointer.png');
        this.load.image('plataforma', 'Assets/platform.png');
        this.load.image('plataforma2', 'Assets/platform2.png');

        this.load.image('caja', 'assets/caja.png');
        this.load.image('piano', 'assets/piano.png');
        this.load.image('estanteria', 'assets/estanteria.png');
        this.load.image('puerta', 'assets/puerta.png');
        this.load.image('cajones', 'assets/cajones.png');
        this.load.image('mesa', 'assets/mesa.png');
        this.load.image('fragmento llave', 'assets/fragmento llave.png');
        this.load.image('puerta2', 'assets/puerta2.png');
        this.load.image('rosa blanca', 'assets/rosa blanca.png');
        this.load.image('rosa roja', 'assets/rosa roja.png');
        this.load.image('clavel', 'assets/clavel.png');
        this.load.image('lirio', 'assets/lirio.png');
        this.load.image('girasol', 'assets/girasol.png');
        this.load.image('tulipan', 'assets/tulipan.png');
        this.load.image('mesa flores', 'assets/mesa flores.png');
        this.load.image('cuadro', 'assets/cuadro.png');
        this.load.image('muebleCocina', 'assets/cocinaRiddle.png');
        this.load.image('muebleCocina2', 'assets/cocinaWiddle.png');
        this.load.image('simbolos', 'assets/simbolo pared.png');
        this.load.image('puertaAlmacen', 'assets/puerta almacen.png');
        this.load.image('candelabro', 'assets/candelabro.png');
        this.load.image('comodaMensaje', 'assets/comoda 2.png');
        this.load.image('comodaGatos', 'assets/comoda.png');
        this.load.image('gatoBlanco', 'assets/Gato blanco.png');
        this.load.image('gatoAzul', 'assets/Gato azul.png');
        this.load.image('gatoVerde', 'assets/Gato verde.png');
        this.load.image('gatoNaranja', 'assets/Gato naranja.png');
        this.load.image('gatoRojo', 'assets/Gato rojo.png');
        this.load.image('caldero1rubi', 'assets/caldero1 rubi.png');
        this.load.image('caldero2rubi', 'assets/caldero2 rubi.png');
        this.load.image('caldero1zafiro', 'assets/caldero1 zafiro.png');
        this.load.image('caldero2zafiro', 'assets/caldero2 zafiro.png');
        this.load.image('nevera', 'assets/nevera.png');
        this.load.image('Riddle', 'assets/Riddle.png');
        this.load.image('Wiggle', 'assets/Wiggle.png');
        this.load.image('estanteria2', 'assets/estanteria2.png');
        // Sistema de texto
        this.load.image('textBox', 'assets/textbox.png');
        // Imágenes
        this.load.image('libropiano1', 'assets/libro piano1.png');
        this.load.image('libropiano2', 'assets/libro piano2.png');
        this.load.image('puzle piano', 'assets/puzle piano.png');
        this.load.image('puzle flores R1', 'assets/puzleFloresR1.png');
        this.load.image('puzle flores W1', 'assets/puzleFloresW1.png');
        this.load.image('puzle flores R2', 'assets/puzleFloresR2.png');
        this.load.image('puzle flores W2', 'assets/puzleFloresW2.png');
        this.load.image('puzle simbolos1', 'assets/simbolo pared 1.png');
        this.load.image('puzle simbolos2', 'assets/simbolo pared 2.png');
        this.load.image('cartel almacen 1', 'assets/puzle simbolos 1.png');
        this.load.image('cartel almacen 2', 'assets/puzle simbolos 2.png');
        this.load.image('puzle gatos 1', 'assets/puzle gatos 1.png');
        this.load.image('puzle gatos 2', 'assets/puzle gatos 2.png');
        this.load.image('velaEncendida', 'assets/vela encendida.png');
        this.load.image('velaApagada', 'assets/vela apagada.png');
        this.load.image('mensaje1', 'assets/mensaje 1.png');
        this.load.image('mensaje2', 'assets/mensaje 2.png');
        this.load.image('ingredientesNeveraR1', 'assets/ingredientes nevera R1.png');
        this.load.image('ingredientesNeveraR2', 'assets/ingredientes nevera R2.png');
        this.load.image('ingredientesNeveraW1', 'assets/ingredientes nevera W1.png');
        this.load.image('ingredientesNeveraW2', 'assets/ingredientes nevera W2.png');
        this.load.image('icono', 'assets/conseguido.png');
        this.load.image('ingredientesCaldero1', 'assets/ingredientes caldero zafiro.png');
        this.load.image('ingredientesCaldero2', 'assets/ingredientes caldero rubi.png');
        this.load.image('inventarioRiddle', 'assets/inventarioRiddle.png');
        this.load.image('inventarioWiggle', 'assets/inventarioWiggle.png');
        

        // Elementos de adorno
        this.load.image('vater', 'assets/vater.png');
        this.load.image('MesaHori', 'assets/MesaHori.png');
        this.load.image('silla1', 'assets/silla1.png');
        this.load.image('silla2', 'assets/silla2.png');
        this.load.image('sofa', 'assets/sofa1.png');
        this.load.image('reloj', 'assets/reloj.png');
        this.load.image('plancha', 'assets/plancha.png');
        this.load.image('alfombra', 'assets/alfombraVertical.png');
        this.load.image('alfombra2', 'assets/alfombra2Vertical.png');
        this.load.image('perchero', 'assets/perchero.png');
        this.load.image('mesita', 'assets/mesitaCafe.png');
        this.load.image('sofaFrente', 'assets/sofa2.png');
        this.load.image('mesaVerti', 'assets/mesaVerti.png');
        this.load.image('chimenea', 'assets/chimenea.png');
        this.load.image('camaGato', 'assets/camaGato.png');
        this.load.image('tocaDiscos', 'assets/tocaDiscos.png');
        this.load.image('lampara', 'assets/lampara.png');
        this.load.image('mesaVacia', 'assets/mesa.png');
        this.load.image('lamparaChiquita', 'assets/lamparaChiquita.png');
        this.load.image('taburete', 'assets/taburete.png');
        this.load.image('alfombrilla', 'assets/alfombraRedonda.png');
        this.load.image('mueblillo', 'assets/mueble.png');
        this.load.image('mesitaCafe', 'assets/mesitaCafe.png');
        this.load.image('sofa4', 'assets/sofa4.png');
        this.load.image('sofaIzq', 'assets/sofaIzq.png');
        this.load.image('AlfombraHz', 'assets/alfombraHorizontal.png');
        this.load.audio("backgroundMusic", 'assets/backgroundMusic.mp3');

        // Introducción
        this.load.image('introduccion1', 'Assets/introduction1.png');
        this.load.image('introduccion2', 'Assets/introduction2.jpg');
        this.load.image('introduccion3', 'Assets/introduction3.png');
        this.load.image('introduccion4', 'Assets/introduction4.png');

        // Pantalla de victoria
        this.load.image('victoria', 'Assets/victory.png');

        // Pantalla de derrota
        this.load.image('derrota', 'assets/GameOver.png');
    }

    create (data)
    {
        equipo = devolver_nombre_equipo();
        this.ReiniciarObjetos();        
        this.backgroundMusic = this.sound.add("backgroundMusic", { loop: true });
        this.backgroundMusic.play();
        this.add.image(400, 300, 'sky').setScale(10);
        //Este código nos crea una configuración de botones predefinida dónde el jugador se mueve con las flechas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tp=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
       
        //Con este código se crea el movimiento derecha, izquierda, arriba, abajo, asignando la tecla que queramos, en este caso D,A,W,S.
        this.right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
                
        // Método que crea las colisiones de las paredes
        this.CrearColisionParedes();
        // Imagen del mapa
        this.add.image(400,300,'mapa').setScale(0.8);
        
        this.Alfombra=  this.physics.add.staticGroup().create(50,120,'alfombra').setScale(0.8).refreshBody();
        this.Alfombra2=  this.physics.add.staticGroup().create(60,200,'alfombra2').setScale(1.0).refreshBody();
        this.Alfombra3=  this.physics.add.staticGroup().create(190,180,'alfombra').setScale(1.0).refreshBody();
        this.Alfombra4=  this.physics.add.staticGroup().create(160,460,'alfombra').setScale(1.0).refreshBody();
        this.Alfombra5=  this.physics.add.staticGroup().create(480,230,'alfombra2').setScale(1.0).refreshBody();
        this.Alfombra6=  this.physics.add.staticGroup().create(495,455,'alfombra').setScale(0.9).refreshBody();
        this.Alfombra7=  this.physics.add.staticGroup().create(495,330,'AlfombraHz').setScale(1.0).refreshBody();
        this.Alfombra8=  this.physics.add.staticGroup().create(590,330,'alfombra').setScale(1.0).refreshBody();
        this.Alfombra9=  this.physics.add.staticGroup().create(750, 90,'AlfombraHz').setScale(1.0).refreshBody();

        //Añadimos unas coordenadas de aparición para los personajes
        this.Riddle = this.physics.add.sprite(750, 90, 'Riddle');
        //this.Riddle.setCollideWorldBounds(true);
        this.Riddle.setBounce(0.2);
        this.Wiggle = this.physics.add.sprite(90, 250, 'Wiggle');
        //this.Wiggle.setCollideWorldBounds(true);
        this.Wiggle.setBounce(0.2);
        //Escalamos los sprites
        this.Riddle.setScale(0.07);
        this.Wiggle.setScale(0.085);
        
        // Colisiones
        this.physics.add.collider(this.Riddle, this.muros);
        this.physics.add.collider(this.Wiggle, this.muros);   
        
        ////////////////DECORACIONES///////////////////////
        //Alfombras
        

        this.Silla=  this.physics.add.staticGroup().create(60,245,'silla1').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla);
        this.physics.add.collider(this.Wiggle, this.Silla);

        this.Silla2=  this.physics.add.staticGroup().create(40,245,'silla1').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla2);
        this.physics.add.collider(this.Wiggle, this.Silla2);

        this.MesaHori=  this.physics.add.staticGroup().create(50,260,'MesaHori').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesaHori);
        this.physics.add.collider(this.Wiggle, this.MesaHori);

        this.Sofa=  this.physics.add.staticGroup().create(30,200,'sofa').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa);
        this.physics.add.collider(this.Wiggle, this.Sofa);

        this.Reloj=  this.physics.add.staticGroup().create(90,40,'reloj').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Reloj);
        this.physics.add.collider(this.Wiggle, this.Reloj);

        this.Plancha=  this.physics.add.staticGroup().create(90,120,'plancha').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Plancha);
        this.physics.add.collider(this.Wiggle, this.Plancha);

        this.Perchero=  this.physics.add.staticGroup().create(190,50,'perchero').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Perchero);
        this.physics.add.collider(this.Wiggle, this.Perchero);

        this.Mesita=  this.physics.add.staticGroup().create(190,170,'mesita').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Mesita);
        this.physics.add.collider(this.Wiggle, this.Mesita);

        this.Sofa2=  this.physics.add.staticGroup().create(160,170,'sofa').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa2);
        this.physics.add.collider(this.Wiggle, this.Sofa2);

        this.Sofa3=  this.physics.add.staticGroup().create(190,140,'sofaFrente').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa3);
        this.physics.add.collider(this.Wiggle, this.Sofa3);

        this.Lampara=  this.physics.add.staticGroup().create(160,130,'lampara').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Lampara);
        this.physics.add.collider(this.Wiggle, this.Lampara);

        this.Lampara2=  this.physics.add.staticGroup().create(130,420,'lampara').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Lampara2);
        this.physics.add.collider(this.Wiggle, this.Lampara2);

        this.Silla3=  this.physics.add.staticGroup().create(270,300,'silla2').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla3);
        this.physics.add.collider(this.Wiggle, this.Silla3);

        this.Silla4=  this.physics.add.staticGroup().create(290,280,'silla1').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla4);
        this.physics.add.collider(this.Wiggle, this.Silla4);

        this.MesaVerti=  this.physics.add.staticGroup().create(290,300,'mesaVerti').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesaVerti);
        this.physics.add.collider(this.Wiggle, this.MesaVerti);

        this.Chime=  this.physics.add.staticGroup().create(290,340,'chimenea').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Chime);
        this.physics.add.collider(this.Wiggle, this.Chime);

        this.Taburete=  this.physics.add.staticGroup().create(290,360,'taburete').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Taburete);
        this.physics.add.collider(this.Wiggle, this.Taburete);

        this.CamaGato=  this.physics.add.staticGroup().create(320,360,'camaGato').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.CamaGato);
        this.physics.add.collider(this.Wiggle, this.CamaGato);

        this.Disc=  this.physics.add.staticGroup().create(160,420,'tocaDiscos').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Disc);
        this.physics.add.collider(this.Wiggle, this.Disc);

        this.Sofa4=  this.physics.add.staticGroup().create(130,460,'sofa').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa4);
        this.physics.add.collider(this.Wiggle, this.Sofa4);

        this.Silla5=  this.physics.add.staticGroup().create(340,450,'silla1').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla5);
        this.physics.add.collider(this.Wiggle, this.Silla5);

        this.MesaVacia=  this.physics.add.staticGroup().create(340,460,'mesaVacia').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesaVacia);
        this.physics.add.collider(this.Wiggle, this.MesaVacia);

        this.Alfombrilla=  this.physics.add.staticGroup().create(340,455,'alfombrilla').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Alfombrilla);
        this.physics.add.collider(this.Wiggle, this.Alfombrilla);

        this.LamparaChikita=  this.physics.add.staticGroup().create(350,450,'lamparaChiquita').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.LamparaChikita);
        this.physics.add.collider(this.Wiggle, this.LamparaChikita);

        this.Silla6=  this.physics.add.staticGroup().create(520,140,'silla2').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla6);
        this.physics.add.collider(this.Wiggle, this.Silla6);

        this.Silla7=  this.physics.add.staticGroup().create(540,120,'silla1').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla7);
        this.physics.add.collider(this.Wiggle, this.Silla7);

        this.MesaVerti=  this.physics.add.staticGroup().create(540,140,'mesaVerti').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesaVerti);
        this.physics.add.collider(this.Wiggle, this.MesaVerti);

        this.Sofa5=  this.physics.add.staticGroup().create(460,230,'sofa').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa5);
        this.physics.add.collider(this.Wiggle, this.Sofa5);

        this.MesitaCafe=  this.physics.add.staticGroup().create(595,210,'mesitaCafe').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesitaCafe);
        this.physics.add.collider(this.Wiggle, this.MesitaCafe);

        this.LamparaChikita2=  this.physics.add.staticGroup().create(595,200,'lamparaChiquita').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.LamparaChikita2);
        this.physics.add.collider(this.Wiggle, this.LamparaChikita2);

        this.MesitaCafe2=  this.physics.add.staticGroup().create(690,210,'mesitaCafe').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.MesitaCafe2);
        this.physics.add.collider(this.Wiggle, this.MesitaCafe2);

        this.LamparaChikita3=  this.physics.add.staticGroup().create(690,200,'lamparaChiquita').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.LamparaChikita3);
        this.physics.add.collider(this.Wiggle, this.LamparaChikita3);

        this.Reloj=  this.physics.add.staticGroup().create(660,40,'reloj').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Reloj);
        this.physics.add.collider(this.Wiggle, this.Reloj);

        this.SofaChiquito=  this.physics.add.staticGroup().create(750,310,'sofa4').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.SofaChiquito);
        this.physics.add.collider(this.Wiggle, this.SofaChiquito);

        this.Lampara=  this.physics.add.staticGroup().create(775,300,'lampara').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Lampara);
        this.physics.add.collider(this.Wiggle, this.Lampara);

        this.SofaIzq=  this.physics.add.staticGroup().create(775,330,'sofaIzq').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.SofaIzq);
        this.physics.add.collider(this.Wiggle, this.SofaIzq);

        this.Alfombrilla=  this.physics.add.staticGroup().create(750,335,'alfombrilla').setScale(1.5).refreshBody();
        this.physics.add.collider(this.Riddle, this.Alfombrilla);
        this.physics.add.collider(this.Wiggle, this.Alfombrilla);

        
        this.Mesita=  this.physics.add.staticGroup().create(495,450,'mesita').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Mesita);
        this.physics.add.collider(this.Wiggle, this.Mesita);

        this.Sofa2=  this.physics.add.staticGroup().create(465,450,'sofa').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa2);
        this.physics.add.collider(this.Wiggle, this.Sofa2);

        this.Sofa3=  this.physics.add.staticGroup().create(495,410,'sofaFrente').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Sofa3);
        this.physics.add.collider(this.Wiggle, this.Sofa3);

        this.Lampara=  this.physics.add.staticGroup().create(465,410,'lampara').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Lampara);
        this.physics.add.collider(this.Wiggle, this.Lampara);

        this.Perchero2=  this.physics.add.staticGroup().create(660,465,'perchero').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Perchero2);
        this.physics.add.collider(this.Wiggle, this.Perchero2);

        this.Silla7=  this.physics.add.staticGroup().create(580,450,'silla2').setScale(0.8).refreshBody();
        this.physics.add.collider(this.Riddle, this.Silla7);
        this.physics.add.collider(this.Wiggle, this.Silla7);
        
        //////////////// CREACIÓN DE LOS ELEMENTOS INTERACTUABLES ////////////////
        // Caja
        this.caja = this.physics.add.staticGroup().create(120,225,'caja').setScale(2).refreshBody();
        this.caja.interactuar = function() {
            return "caja";
        };
        this.objetosInteractuables.push(this.caja);
        this.physics.add.collider(this.Riddle, this.caja);
        this.physics.add.collider(this.Wiggle, this.caja);
        // Estantería 1
        this.estanteria1 = this.physics.add.staticGroup().create(725,40,'estanteria').setScale(0.8).refreshBody();
        this.estanteria1.interactuar = function() {
            return "estanteria1";
        }
        this.objetosInteractuables.push(this.estanteria1);
        this.physics.add.collider(this.Riddle, this.estanteria1);
        this.physics.add.collider(this.Wiggle, this.estanteria1);
        // Estantería 2
        this.estanteria2 = this.physics.add.staticGroup().create(770,40,'estanteria').setScale(0.8).refreshBody();
        this.estanteria2.interactuar = function() {
            return "estanteria2";
        }
        this.physics.add.collider(this.Riddle, this.estanteria2);
        this.physics.add.collider(this.Wiggle, this.estanteria2);
        this.objetosInteractuables.push(this.estanteria2);
        // Piano
        this.piano = this.physics.add.staticGroup().create(250,420,'piano').setScale(0.08).refreshBody();
        this.piano.interactuar = function() {
                return "piano";
            };
        this.objetosInteractuables.push(this.piano);
        this.physics.add.collider(this.Riddle, this.piano);
        this.physics.add.collider(this.Wiggle, this.piano);
        // Puerta A - Habitación de Riddle
        this.puertaA = this.physics.add.staticGroup().create(738,200,'puerta2').setScale(0.56).refreshBody();
        this.puertaA.interactuar = function() {
            return "puertaA";
        }
        this.objetosInteractuables.push(this.puertaA);
        this.physics.add.collider(this.Riddle, this.puertaA);
        this.physics.add.collider(this.Wiggle, this.puertaA);
        // Mesa
        this.mesaLlaveB = this.physics.add.staticGroup().create(610,450,'mesa').setScale(1).refreshBody();
        this.mesaLlaveB.interactuar = function() {
            return "mesaLlave";
        }
        this.objetosInteractuables.push(this.mesaLlaveB);
        this.physics.add.collider(this.Riddle, this.mesaLlaveB);
        this.physics.add.collider(this.Wiggle, this.mesaLlaveB);
        // Cajones salón
        this.cajonesLlaveB = this.physics.add.staticGroup().create(640,290,'cajones').setScale(1).refreshBody();
        this.cajonesLlaveB.interactuar = function() {
            return "cajonesLlave";
        }
        this.objetosInteractuables.push(this.cajonesLlaveB);
        this.physics.add.collider(this.Riddle, this.cajonesLlaveB);
        this.physics.add.collider(this.Wiggle, this.cajonesLlaveB);
        // Fragmento de llave
        this.fragmento1LlaveB = this.physics.add.staticGroup().create(730,140,'fragmento llave').setScale(0.05).refreshBody();
        this.fragmento1LlaveB.interactuar = function() {
            return "fragmentoLlaveB";
        }
        this.objetosInteractuables.push(this.fragmento1LlaveB);
        this.physics.add.collider(this.Riddle, this.fragmento1LlaveB);
        this.physics.add.collider(this.Wiggle, this.fragmento1LlaveB);
        // Puerta B - Jardines
        this.puertaB = this.physics.add.staticGroup().create(738,458,'puerta2').setScale(0.56).refreshBody();
        this.puertaB.interactuar = function() {
            return "puertaB";
        }
        this.objetosInteractuables.push(this.puertaB);
        this.physics.add.collider(this.Riddle, this.puertaB);
        this.physics.add.collider(this.Wiggle, this.puertaB);

        this.puertaB2 = this.physics.add.staticGroup().create(320,240,'puerta').setScale(0.7).refreshBody();
        this.puertaB2.interactuar = function() {
            return "puertaB2";
        }
        this.objetosInteractuables.push(this.puertaB2);
        this.physics.add.collider(this.Riddle, this.puertaB2);
        this.physics.add.collider(this.Wiggle, this.puertaB2);
        // Coordenadas de las flores
        this.xPlantaA1 = 715;
        this.yPlantaA1 = 517;
        this.xPlantaB1 = 730;
        this.yPlantaB1 = 517;
        this.xPlantaC1 = 745;
        this.yPlantaC1 = 517;
        this.xPlantaA2 = 340;
        this.yPlantaA2 = 202;
        this.xPlantaB2 = 355;
        this.yPlantaB2 = 202;
        this.xPlantaC2 = 370;
        this.yPlantaC2 = 202;
        
        // Mesa jardín 1
        this.mesaJardin1 = this.physics.add.staticGroup().create(730,530,'mesa').setScale(1).refreshBody();
        this.mesaJardin1.interactuar = function() {
            return "mesaJardin1";
        }
        this.objetosInteractuables.push(this.mesaJardin1);
        this.physics.add.collider(this.Riddle, this.mesaJardin1);
        this.physics.add.collider(this.Wiggle, this.mesaJardin1);
        // Mesa jardín 2
        this.mesaJardin2 = this.physics.add.staticGroup().create(355,215,'mesa').setScale(1).refreshBody();
        this.mesaJardin2.interactuar = function() {
            return "mesaJardin2";
        }
        this.objetosInteractuables.push(this.mesaJardin2);
        this.physics.add.collider(this.Riddle, this.mesaJardin2);
        this.physics.add.collider(this.Wiggle, this.mesaJardin2);

        // Imágenes de las flores (no interactuables)
        this.girasol = this.add.image(this.xPlantaA1,this.yPlantaA1, 'girasol').setScale(0.05);
        this.rosaRoja = this.add.image(this.xPlantaB1,this.yPlantaB1,'rosa roja').setScale(0.05);
        this.clavel = this.add.image(this.xPlantaC1, this.yPlantaC1,'clavel').setScale(0.03);
        this.rosaBlanca = this.add.image(this.xPlantaA2,this.yPlantaA2, 'rosa blanca').setScale(0.05);
        this.tulipan = this.add.image(this.xPlantaB2,this.yPlantaB2,'tulipan').setScale(0.05);
        this.lirio = this.add.image(this.xPlantaC2,this.yPlantaC2,'lirio').setScale(0.05);


        // Cuadro 1
        this.cuadro1 = this.physics.add.staticGroup().create(570,277,'cuadro').setScale(1).refreshBody();
        this.cuadro1.interactuar = function() {
            return "cuadro1";
        }
        this.objetosInteractuables.push(this.cuadro1);
        this.physics.add.collider(this.Riddle, this.cuadro1);
        this.physics.add.collider(this.Wiggle, this.cuadro1);
        // Cuadro 2
        this.cuadro2 = this.physics.add.staticGroup().create(160,343,'cuadro').setScale(1).refreshBody();
        this.cuadro2.interactuar = function() {
            return "cuadro2";
        }
        this.objetosInteractuables.push(this.cuadro2);
        this.physics.add.collider(this.Riddle, this.cuadro2);
        this.physics.add.collider(this.Wiggle, this.cuadro2);

        // Puerta C - Cocinas
        this.puertaC = this.physics.add.staticGroup().create(530,200,'puerta2').setScale(0.56).refreshBody();
        this.puertaC.interactuar = function () {
            return "puertaC";
        }
        this.objetosInteractuables.push(this.puertaC);
        this.physics.add.collider(this.Riddle, this.puertaC);
        this.physics.add.collider(this.Wiggle, this.puertaC);

        this.puertaC2 = this.physics.add.staticGroup().create(117,360,'puerta').setScale(0.7,0.4).refreshBody();
        this.puertaC2.interactuar = function() {
            return "puertaC2";
        }
        this.objetosInteractuables.push(this.puertaC2);
        this.physics.add.collider(this.Riddle, this.puertaC2);
        this.physics.add.collider(this.Wiggle, this.puertaC2);
        // Mueble cocina
        this.muebleCocina = this.physics.add.staticGroup().create(513,60,'muebleCocina').setScale(0.7,0.35).refreshBody().setScale(0.7,0.7);
        this.muebleCocina.interactuar = function () {
            return "muebleCocina";
        }
        this.objetosInteractuables.push(this.muebleCocina);
        this.physics.add.collider(this.Riddle, this.muebleCocina);
        this.physics.add.collider(this.Wiggle, this.muebleCocina);

        this.muebleCocina2 = this.physics.add.staticGroup().create(70,352,'muebleCocina2').setScale(0.6).refreshBody().setScale(0.65);
        this.physics.add.collider(this.Riddle, this.muebleCocina2);
        this.physics.add.collider(this.Wiggle, this.muebleCocina2);

        // Puerta D - Baño Wiggle
        this.puertaD = this.physics.add.staticGroup().create(127,310,'puerta').setScale(0.7,0.4).refreshBody();
        this.puertaD.interactuar = function () {
            return "puertaD";
        }
        this.objetosInteractuables.push(this.puertaD);
        this.physics.add.collider(this.Riddle, this.puertaD);
        this.physics.add.collider(this.Wiggle, this.puertaD);

        // Simbolos en la pared del baño
        this.simboloPared = this.add.image(95, 295, 'simbolos').setScale(0.025);
        this.simboloPared.interactuar = function () {
            return "simboloPared";
        }
        this.objetosInteractuables.push(this.simboloPared);
        // Puerta almacén
        this.puertaAlmacen = this.physics.add.staticGroup().create(355,335,'puertaAlmacen').setScale(0.04).refreshBody();
        this.puertaAlmacen.interactuar = function () {
            return "puertaAlmacen";
        }
        this.objetosInteractuables.push(this.puertaAlmacen);
        this.physics.add.collider(this.Riddle, this.puertaAlmacen);
        this.physics.add.collider(this.Wiggle, this.puertaAlmacen);

        // Cómoda con las estatuas de gato
        this.comodaGatos = this.physics.add.staticGroup().create(230,58, 'comodaGatos').setScale(0.35,0.22).refreshBody();
        this.comodaGatos.interactuar = function () {
            return "comodaGatos";
        }
        this.objetosInteractuables.push(this.comodaGatos);
        this.physics.add.collider(this.Riddle, this.comodaGatos);
        this.physics.add.collider(this.Wiggle, this.comodaGatos);
        this.gatoAzul = this.add.image(214, 40, 'gatoAzul').setScale(0.03);
        this.gatoNaranja = this.add.image(222, 40, 'gatoNaranja').setScale(0.03);
        this.gatoBlanco = this.add.image(230, 40, 'gatoBlanco').setScale(0.03);
        this.gatoRojo = this.add.image(238, 40, 'gatoRojo').setScale(0.03);
        this.gatoVerde = this.add.image(246, 40, 'gatoVerde').setScale(0.03);
        
        // Cómoda con el mensaje de los gatos
        this.comodaMensaje = this.physics.add.staticGroup().create(303,53, 'comodaMensaje').setScale(0.25).refreshBody();
        this.comodaMensaje.interactuar = function () {
            return "comodaMensaje";
        }
        this.objetosInteractuables.push(this.comodaMensaje);
        this.physics.add.collider(this.Riddle, this.comodaMensaje);
        this.physics.add.collider(this.Wiggle, this.comodaMensaje);

        // Puerta biblioteca Riddle
        this.puertaBibliotecaRiddle = this.physics.add.staticGroup().create(643,200,'puerta2').setScale(0.56).refreshBody();
        this.puertaBibliotecaRiddle.interactuar = function () {
            return "puertaBR";
        }
        this.objetosInteractuables.push(this.puertaBibliotecaRiddle);
        this.physics.add.collider(this.Riddle, this.puertaBibliotecaRiddle);
        this.physics.add.collider(this.Wiggle, this.puertaBibliotecaRiddle);

        // Puerta biblioteca Wiggle
        this.puertaBibliotecaWiggle = this.physics.add.staticGroup().create(128,63,'puerta').setScale(0.7).refreshBody();
        this.puertaBibliotecaWiggle.interactuar = function () {
            return "puertaBW";
        }
        this.objetosInteractuables.push(this.puertaBibliotecaWiggle);
        this.physics.add.collider(this.Riddle, this.puertaBibliotecaWiggle);
        this.physics.add.collider(this.Wiggle, this.puertaBibliotecaWiggle);

        // Puerta laboratorio Riddle
        this.puertaLaboratorioRiddle = this.physics.add.staticGroup().create(544,367,'puerta').setScale(0.7,0.7).refreshBody();
        this.puertaLaboratorioRiddle.interactuar = function () {
            return "puertaLR";
        }
        this.objetosInteractuables.push(this.puertaLaboratorioRiddle);
        this.physics.add.collider(this.Riddle, this.puertaLaboratorioRiddle);
        this.physics.add.collider(this.Wiggle, this.puertaLaboratorioRiddle);

        // Puerta laboratorio Wiggle
        this.puertaLaboratorioWiggle = this.physics.add.staticGroup().create(322,82,'puerta').setScale(0.7,0.5).refreshBody();
        this.puertaLaboratorioWiggle.interactuar = function () {
            return "puertaLW";
        }
        this.objetosInteractuables.push(this.puertaLaboratorioWiggle);
        this.physics.add.collider(this.Riddle, this.puertaLaboratorioWiggle);
        this.physics.add.collider(this.Wiggle, this.puertaLaboratorioWiggle);

        // Estanteria 3 - Biblioteca Riddle
        this.estanteria3 = this.physics.add.staticGroup().create(495,290,'estanteria2').setScale(0.7,0.7).refreshBody();
        this.estanteria3.interactuar = function() {
            return "estanteria3";
        }
        this.objetosInteractuables.push(this.estanteria3);
        this.physics.add.collider(this.Riddle, this.estanteria3);
        this.physics.add.collider(this.Wiggle, this.estanteria3);

        // Estantería 4 - Biblioteca Wiggle
        this.estanteria4 = this.physics.add.staticGroup().create(50,50,'estanteria2').setScale(0.7,0.7).refreshBody();
        this.estanteria4.interactuar = function() {
            return "estanteria4";
        }
        this.objetosInteractuables.push(this.estanteria4);
        this.physics.add.collider(this.Riddle, this.estanteria4);
        this.physics.add.collider(this.Wiggle, this.estanteria4);

        // Caldero rubí (Wiggle)
        this.caldero1rubi = this.physics.add.staticGroup().create(365, 90, 'caldero1rubi').setScale(0.05).refreshBody();
        this.caldero2rubi = this.physics.add.staticGroup().create(365, 90, 'caldero2rubi').setScale(0.05).refreshBody();
        this.caldero2rubi.visible = false;
        this.caldero1rubi.interactuar = function() {
            return "calderoRubi";
        }
        this.objetosInteractuables.push(this.caldero1rubi);
        this.physics.add.collider(this.Riddle, this.caldero1rubi);
        this.physics.add.collider(this.Wiggle, this.caldero1rubi);
        this.physics.add.collider(this.Riddle, this.caldero2rubi);
        this.physics.add.collider(this.Wiggle, this.caldero2rubi);
        // Caldero zafiro (Riddle)
        this.caldero1zafiro = this.physics.add.staticGroup().create(640, 65, 'caldero1zafiro').setScale(0.05).refreshBody();
        this.caldero2zafiro = this.physics.add.staticGroup().create(640, 65, 'caldero2zafiro').setScale(0.05).refreshBody();
        this.caldero2zafiro.visible = false;
        this.caldero1zafiro.interactuar = function() {
            return "calderoZafiro";
        }
        this.objetosInteractuables.push(this.caldero1zafiro);
        this.physics.add.collider(this.Riddle, this.caldero1zafiro);
        this.physics.add.collider(this.Wiggle, this.caldero1zafiro);
        this.physics.add.collider(this.Riddle, this.caldero2zafiro);
        this.physics.add.collider(this.Wiggle, this.caldero2zafiro);

        // Nevera 1
        this.nevera1 = this.physics.add.staticGroup().create(60,355, 'nevera').setScale(0.8).refreshBody();
        this.nevera1.interactuar = function() {
            return "nevera1";
        }
        this.objetosInteractuables.push(this.nevera1);
        this.physics.add.collider(this.Riddle, this.nevera1);
        this.physics.add.collider(this.Wiggle, this.nevera1);

        // Nevera 2
        this.nevera2 = this.physics.add.staticGroup().create(463, 58, 'nevera').setScale(0.8).refreshBody();
        this.nevera2.interactuar = function() {
            return "nevera2";
        }
        this.objetosInteractuables.push(this.nevera2);
        this.physics.add.collider(this.Riddle, this.nevera2);
        this.physics.add.collider(this.Wiggle, this.nevera2);

        /// Elementos de decoración
        this.vater = this.physics.add.staticGroup().create(80, 310, 'vater').setScale(0.1).refreshBody();
        this.physics.add.collider(this.Riddle, this.vater);
        this.physics.add.collider(this.Wiggle, this.vater);

        this.fondoWiggle = this.add.image(200, 300, 'sky').setScale(0.5, 1.5);
        this.fondoWiggle.visible = false;
        this.fondoRiddle = this.add.image(600, 300, 'sky').setScale(0.5, 1.5);
        this.fondoRiddle.visible = false;

        // CREACIÓN DE LAS CAJA DE TEXTO Y DE SUS EVENTOS ASOCIADOS
        this.cajaTexto = this.add.image(630,530,'textBox').setScale(0.7);
        this.cajaTexto.visible = false;
        this.cajaTexto2 = this.add.image(170, 530, 'textBox').setScale(0.7);
        this.cajaTexto2.visible = false;
        this.eventoTiempo = this.time.addEvent({ delay: this.tiempoTexto, callback: this.DesaparecerCuadro, callbackScope: this});
        this.eventoTiempo.paused = true;
        this.eventoTiempo2 = this.time.addEvent({ delay: this.tiempoTexto2, callback: this.DesaparecerCuadro2, callbackScope: this});
        this.eventoTiempo2.paused = true;
        this.letra = this.time.addEvent({ delay: this.tiempoCaracter, callback: this.MostrarCaracteres, callbackScope: this});
        this.dialogo = this.add.text(505, 505, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.dialogoB = this.add.text(505, 520, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.dialogoC = this.add.text(505, 535, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.letra.paused = true;
        this.letra2 = this.time.addEvent({ delay: this.tiempoCaracter, callback: this.MostrarCaracteres2, callbackScope: this});
        this.dialogo2 = this.add.text(45, 505, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.dialogo2B = this.add.text(45, 520, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.dialogo2C = this.add.text(45, 535, '', { fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.letra2.paused = true;

        // CREACIÓN DE LAS IMÁGENES
        this.libroPiano1 = this.add.image(600,300,'libropiano1').setScale(0.25);
        this.libroPiano1.visible = false;
        this.libroPiano2 = this.add.image(600,300,'libropiano2').setScale(0.25);
        this.libroPiano2.visible = false;
        this.puzlePiano = this.add.image(200,300,'puzle piano').setScale(0.175);
        this.puzlePiano.visible = false;
        this.puzleFloresR1 = this.add.image(600,300,'puzle flores R1').setScale(0.175);
        this.puzleFloresR1.visible = false;
        this.puzleFloresR2 = this.add.image(200,300,'puzle flores R2').setScale(0.175);
        this.puzleFloresR2.visible = false;
        this.puzleFloresW1 = this.add.image(600,300,'puzle flores W1').setScale(0.175);
        this.puzleFloresW1.visible = false;
        this.puzleFloresW2 = this.add.image(200,300,'puzle flores W2').setScale(0.175);
        this.puzleFloresW2.visible = false;
        this.puzleSimbolos = this.add.image(200,300, 'puzle simbolos1').setScale(0.23);
        this.puzleSimbolos.visible = false;
        this.puzleSimbolos2 = this.add.image(200, 300, 'puzle simbolos2').setScale(0.23);
        this.puzleSimbolos2.visible = false;
        this.panelContraseña1 = this.add.image(200,300, 'cartel almacen 1').setScale(0.23);
        this.panelContraseña1.visible = false;
        this.panelContraseña2 = this.add.image(200,300, 'cartel almacen 2').setScale(0.23);
        this.panelContraseña2.visible = false;
        //Slider Musica
        /*
        var print2;
        this.rexUI.add.slider({
                x: 200,
                y: 230,
                width: 200,
                height: 30,
                orientation: 'x',
    
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
    
                input: 'click', 
    
                valuechangeCallback: function(value) {
                    backgroundMusic.volume = value; // set volume between 0 - 1
                },
    
            })
            .layout();
            */

        // Imágenes del puzle de los gatos
        this.puzleGatos1 = this.add.image(200, 300, 'puzle gatos 1').setScale(0.175);
        this.puzleGatos1.visible = false;
        this.puzleGatos2 = this.add.image(200,300, 'puzle gatos 2').setScale(0.175);
        this.puzleGatos2.visible = false;
        this.vela1AE = this.add.image(100, 257, 'velaEncendida').setScale(0.3);
        this.vela1AE.visible = false;
        this.vela2AE = this.add.image(155, 257, 'velaEncendida').setScale(0.3);
        this.vela2AE.visible = false;
        this.vela3AE = this.add.image(210, 257, 'velaEncendida').setScale(0.3);
        this.vela3AE.visible = false;
        this.vela4AE = this.add.image(270, 257, 'velaEncendida').setScale(0.3);
        this.vela4AE.visible = false;
        this.vela5AE = this.add.image(330, 257, 'velaEncendida').setScale(0.3);
        this.vela5AE.visible = false;
        this.vela1AN = this.add.image(100, 257, 'velaApagada').setScale(0.3);
        this.vela1AN.visible = false;
        this.vela2AN = this.add.image(155, 257, 'velaApagada').setScale(0.3);
        this.vela2AN.visible = false;
        this.vela3AN = this.add.image(210, 257, 'velaApagada').setScale(0.3);
        this.vela3AN.visible = false;
        this.vela4AN = this.add.image(270, 257, 'velaApagada').setScale(0.3);
        this.vela4AN.visible = false;
        this.vela5AN = this.add.image(330, 257, 'velaApagada').setScale(0.3);
        this.vela5AN.visible = false;
        this.vela1BE = this.add.image(100, 257, 'velaEncendida').setScale(0.3);
        this.vela1BE.visible = false;
        this.vela2BE = this.add.image(155, 257, 'velaEncendida').setScale(0.3);
        this.vela2BE.visible = false;
        this.vela3BE = this.add.image(210, 257, 'velaEncendida').setScale(0.3);
        this.vela3BE.visible = false;
        this.vela4BE = this.add.image(270, 257, 'velaEncendida').setScale(0.3);
        this.vela4BE.visible = false;
        this.vela5BE = this.add.image(330, 257, 'velaEncendida').setScale(0.3);
        this.vela5BE.visible = false;
        this.vela1BN = this.add.image(100, 257, 'velaApagada').setScale(0.3);
        this.vela1BN.visible = false;
        this.vela2BN = this.add.image(155, 257, 'velaApagada').setScale(0.3);
        this.vela2BN.visible = false;
        this.vela3BN = this.add.image(210, 257, 'velaApagada').setScale(0.3);
        this.vela3BN.visible = false;
        this.vela4BN = this.add.image(270, 257, 'velaApagada').setScale(0.3);
        this.vela4BN.visible = false;
        this.vela5BN = this.add.image(330, 257, 'velaApagada').setScale(0.3);
        this.vela5BN.visible = false;
        this.mensajeGatos1 = this.add.image(200,250, 'mensaje1').setScale(0.75);
        this.mensajeGatos1.visible = false;
        this.mensajeGatos2 = this.add.image(200,250, 'mensaje2').setScale(0.75);
        this.mensajeGatos2.visible = false;
        this.ingredientesNeveraR1 = this.add.image(200,300, 'ingredientesNeveraR1').setScale(0.165);
        this.ingredientesNeveraR1.visible = false;
        this.ingredientesNeveraR2 = this.add.image(600,300, 'ingredientesNeveraR2').setScale(0.165);
        this.ingredientesNeveraR2.visible = false;
        this.ingredientesNeveraW1 = this.add.image(200,300, 'ingredientesNeveraW1').setScale(0.165);
        this.ingredientesNeveraW1.visible = false;
        this.ingredientesNeveraW2 = this.add.image(600,300, 'ingredientesNeveraW2').setScale(0.165);
        this.ingredientesNeveraW2.visible = false;
        this.iconosNevera1[0] = this.add.image(568,255, 'icono').setScale(0.05);
        this.iconosNevera1[0].visible = false;
        this.iconosNevera1[1] = this.add.image(568,267, 'icono').setScale(0.05);
        this.iconosNevera1[1].visible = false;
        this.iconosNevera1[2] = this.add.image(568,279, 'icono').setScale(0.05);
        this.iconosNevera1[2].visible = false;
        this.iconosNevera1[3] = this.add.image(568,291, 'icono').setScale(0.05);
        this.iconosNevera1[3].visible = false;
        this.iconosNevera1[4] = this.add.image(568,303, 'icono').setScale(0.05);
        this.iconosNevera1[4].visible = false;
        this.iconosNevera1[5] = this.add.image(568,315, 'icono').setScale(0.05);
        this.iconosNevera1[5].visible = false;
        this.iconosNevera1[6] = this.add.image(568,327, 'icono').setScale(0.05);
        this.iconosNevera1[6].visible = false;
        this.iconosNevera2[0] = this.add.image(160,255, 'icono').setScale(0.05);
        this.iconosNevera2[0].visible = false;
        this.iconosNevera2[1] = this.add.image(160,267, 'icono').setScale(0.05);
        this.iconosNevera2[1].visible = false;
        this.iconosNevera2[2] = this.add.image(160,279, 'icono').setScale(0.05);
        this.iconosNevera2[2].visible = false;
        this.iconosNevera2[3] = this.add.image(160,291, 'icono').setScale(0.05);
        this.iconosNevera2[3].visible = false;
        this.iconosNevera2[4] = this.add.image(160,303, 'icono').setScale(0.05);
        this.iconosNevera2[4].visible = false;
        this.iconosNevera2[5] = this.add.image(160,315, 'icono').setScale(0.05);
        this.iconosNevera2[5].visible = false;
        this.iconosNevera2[6] = this.add.image(160,327, 'icono').setScale(0.05);
        this.iconosNevera2[6].visible = false;
        this.ingredientesCaldero2 = this.add.image(200,300, 'ingredientesCaldero2').setScale(0.165);
        this.ingredientesCaldero2.visible = false;
        this.ingrediente1B = this.add.text(45, 258, 'Ingrediente 1', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente1B.setText('');
        this.iconosCaldero2[0] = this.add.image(45,258,'icono').setScale(0.05);
        this.iconosCaldero2[0].visible = false;
        this.arrayIngredientesWiggle[0] = this.ingrediente1B;
        this.ingrediente2B = this.add.text(45, 270, 'Ingrediente 2', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente2B.setText('');
        this.iconosCaldero2[1] = this.add.image(45,270,'icono').setScale(0.05);
        this.iconosCaldero2[1].visible = false;
        this.arrayIngredientesWiggle[1] = this.ingrediente2B;
        this.ingrediente3B = this.add.text(45, 282, 'Ingrediente 3', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente3B.setText('');
        this.iconosCaldero2[2] = this.add.image(45,282,'icono').setScale(0.05);
        this.iconosCaldero2[2].visible = false;
        this.arrayIngredientesWiggle[2] = this.ingrediente3B;
        this.ingrediente4B = this.add.text(45, 294, 'Ingrediente 4', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente4B.setText('');
        this.iconosCaldero2[3] = this.add.image(45,294,'icono').setScale(0.05);
        this.iconosCaldero2[3].visible = false;
        this.arrayIngredientesWiggle[3] = this.ingrediente4B;
        this.ingrediente5B = this.add.text(45, 306, 'Ingrediente 5', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente5B.setText('');
        this.iconosCaldero2[4] = this.add.image(45,306,'icono').setScale(0.05);
        this.iconosCaldero2[4].visible = false;
        this.arrayIngredientesWiggle[4] = this.ingrediente5B;
        this.ingrediente6B = this.add.text(45, 318, 'Ingrediente 6', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente6B.setText('');
        this.iconosCaldero2[5] = this.add.image(45,318,'icono').setScale(0.05);
        this.iconosCaldero2[5].visible = false;
        this.arrayIngredientesWiggle[5] = this.ingrediente6B;
        this.ingrediente7B = this.add.text(45, 330, 'Ingrediente 7', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente7B.setText('');
        this.iconosCaldero2[6] = this.add.image(45,330,'icono').setScale(0.05);
        this.iconosCaldero2[6].visible = false;
        this.arrayIngredientesWiggle[6] = this.ingrediente7B;
        this.ingrediente8B = this.add.text(170, 258, 'Ingrediente 8', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente8B.setText('');
        this.iconosCaldero2[7] = this.add.image(170,258,'icono').setScale(0.05);
        this.iconosCaldero2[7].visible = false;
        this.arrayIngredientesWiggle[7] = this.ingrediente8B;
        this.ingrediente9B = this.add.text(170, 270, 'Ingrediente 9', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente9B.setText('');
        this.iconosCaldero2[8] = this.add.image(170,270,'icono').setScale(0.05);
        this.iconosCaldero2[8].visible = false;
        this.arrayIngredientesWiggle[8] = this.ingrediente9B;
        this.ingrediente10B = this.add.text(170, 282, 'Ingrediente 10', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente10B.setText('');
        this.iconosCaldero2[9] = this.add.image(170,282,'icono').setScale(0.05);
        this.iconosCaldero2[9].visible = false;
        this.arrayIngredientesWiggle[9] = this.ingrediente10B;
        this.ingrediente11B = this.add.text(170, 294, 'Ingrediente 11', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente11B.setText('');
        this.iconosCaldero2[10] = this.add.image(170,294,'icono').setScale(0.05);
        this.iconosCaldero2[10].visible = false;
        this.arrayIngredientesWiggle[10] = this.ingrediente11B;
        this.ingrediente12B = this.add.text(170, 306, 'Ingrediente 12', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente12B.setText('');
        this.iconosCaldero2[11] = this.add.image(170,306,'icono').setScale(0.05);
        this.iconosCaldero2[11].visible = false;
        this.arrayIngredientesWiggle[11] = this.ingrediente12B;
        this.ingrediente13B = this.add.text(170, 318, 'Ingrediente 13', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente13B.setText('');
        this.iconosCaldero2[12] = this.add.image(170,318,'icono').setScale(0.05);
        this.iconosCaldero2[12].visible = false;
        this.arrayIngredientesWiggle[12] = this.ingrediente13B;
        this.ingrediente14B = this.add.text(170, 330, 'Ingrediente 14', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente14B.setText('');
        this.iconosCaldero2[13] = this.add.image(170,330,'icono').setScale(0.05);
        this.iconosCaldero2[13].visible = false;
        this.arrayIngredientesWiggle[13] = this.ingrediente14B;
        this.ingredientesCaldero1 = this.add.image(600,300, 'ingredientesCaldero1').setScale(0.165);
        this.ingredientesCaldero1.visible = false;
        this.ingrediente1A = this.add.text(445, 258, 'Ingrediente 1', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente1A.setText('');
        this.iconosCaldero1[0] = this.add.image(445,258,'icono').setScale(0.05);
        this.iconosCaldero1[0].visible = false;
        this.arrayIngredientesRiddle[0] = this.ingrediente1A;
        this.ingrediente2A = this.add.text(445, 270, 'Ingrediente 2', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente2A.setText('');
        this.iconosCaldero1[1] = this.add.image(445,270,'icono').setScale(0.05);
        this.iconosCaldero1[1].visible = false;
        this.arrayIngredientesRiddle[1] = this.ingrediente2A;
        this.ingrediente3A = this.add.text(445, 282, 'Ingrediente 3', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente3A.setText('');
        this.iconosCaldero1[2] = this.add.image(445,282,'icono').setScale(0.05);
        this.iconosCaldero1[2].visible = false;
        this.arrayIngredientesRiddle[2] = this.ingrediente3A;
        this.ingrediente4A = this.add.text(445, 294, 'Ingrediente 4', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente4A.setText('');
        this.iconosCaldero1[3] = this.add.image(445,294,'icono').setScale(0.05);
        this.iconosCaldero1[3].visible = false;
        this.arrayIngredientesRiddle[3] = this.ingrediente4A;
        this.ingrediente5A = this.add.text(445, 306, 'Ingrediente 5', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente5A.setText('');
        this.iconosCaldero1[4] = this.add.image(445,306,'icono').setScale(0.05);
        this.iconosCaldero1[4].visible = false;
        this.arrayIngredientesRiddle[4] = this.ingrediente5A;
        this.ingrediente6A = this.add.text(445, 318, 'Ingrediente 6', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente6A.setText('');
        this.iconosCaldero1[5] = this.add.image(445,318,'icono').setScale(0.05);
        this.iconosCaldero1[5].visible = false;
        this.arrayIngredientesRiddle[5] = this.ingrediente6A;
        this.ingrediente7A = this.add.text(445, 330, 'Ingrediente 7', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente7A.setText('');
        this.iconosCaldero1[6] = this.add.image(445,330,'icono').setScale(0.05);
        this.iconosCaldero1[6].visible = false;
        this.arrayIngredientesRiddle[6] = this.ingrediente7A;
        this.ingrediente8A = this.add.text(570, 258, 'Ingrediente 8', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente8A.setText('');
        this.iconosCaldero1[7] = this.add.image(570,258,'icono').setScale(0.05);
        this.iconosCaldero1[7].visible = false;
        this.arrayIngredientesRiddle[7] = this.ingrediente8A;
        this.ingrediente9A = this.add.text(570, 270, 'Ingrediente 9', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente9A.setText('');
        this.iconosCaldero1[8] = this.add.image(570,270,'icono').setScale(0.05);
        this.iconosCaldero1[8].visible = false;
        this.arrayIngredientesRiddle[8] = this.ingrediente9A;
        this.ingrediente10A = this.add.text(570, 282, 'Ingrediente 10', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente10A.setText('');
        this.iconosCaldero1[9] = this.add.image(570,281,'icono').setScale(0.05);
        this.iconosCaldero1[9].visible = false;
        this.arrayIngredientesRiddle[9] = this.ingrediente10A;
        this.ingrediente11A = this.add.text(570, 294, 'Ingrediente 11', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente11A.setText('');
        this.iconosCaldero1[10] = this.add.image(570,294,'icono').setScale(0.05);
        this.iconosCaldero1[10].visible = false;
        this.arrayIngredientesRiddle[10] = this.ingrediente11A;
        this.ingrediente12A = this.add.text(570, 306, 'Ingrediente 12', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente12A.setText('');
        this.iconosCaldero1[11] = this.add.image(570,306,'icono').setScale(0.05);
        this.iconosCaldero1[11].visible = false;
        this.arrayIngredientesRiddle[11] = this.ingrediente12A;
        this.ingrediente13A = this.add.text(570, 318, 'Ingrediente 13', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente13A.setText('');
        this.iconosCaldero1[12] = this.add.image(570,318,'icono').setScale(0.05);
        this.iconosCaldero1[12].visible = false;
        this.arrayIngredientesRiddle[12] = this.ingrediente13A;
        this.ingrediente14A = this.add.text(570, 330, 'Ingrediente 14', { fontSize: '10px', fill: '#ffffff' });
        this.ingrediente14A.setText('');
        this.iconosCaldero1[13] = this.add.image(570,330,'icono').setScale(0.05);
        this.iconosCaldero1[13].visible = false;
        this.arrayIngredientesRiddle[13] = this.ingrediente14A;

        // Imágenes del inventario
        this.inventarioRiddleImg = this.add.image(600,300, 'inventarioRiddle').setScale(0.165);
        this.inventarioRiddleImg.visible = false;

        this.objeto1R = this.add.text(445, 250, 'Objeto 1', { fontSize: '8px', fill: '#ffffff' });
        this.objeto1R.setText('');
        textoObjetosRiddle[0] = this.objeto1R;
        this.objeto2R = this.add.text(445, 258, 'Objeto 2', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[1] = this.objeto2R;
        this.objeto2R.setText('');
        this.objeto3R = this.add.text(445, 266, 'Objeto 3', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[2] = this.objeto3R;
        this.objeto3R.setText('');
        this.objeto4R = this.add.text(445, 274, 'Objeto 4', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[3] = this.objeto4R;
        this.objeto4R.setText('');
        this.objeto5R = this.add.text(445, 282, 'Objeto 5', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[4] = this.objeto5R;
        this.objeto5R.setText('');
        this.objeto6R = this.add.text(445, 290, 'Objeto 6', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[5] = this.objeto6R;
        this.objeto6R.setText('');
        this.objeto7R = this.add.text(445, 298, 'Objeto 7', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[6] = this.objeto7R;
        this.objeto7R.setText('');
        this.objeto8R = this.add.text(445, 306, 'Objeto 8', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[7] = this.objeto8R;
        this.objeto8R.setText('');
        this.objeto9R = this.add.text(445, 314, 'Objeto 9', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[8] = this.objeto9R;
        this.objeto9R.setText('');
        this.objeto10R = this.add.text(445, 322, 'Objeto 10', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[9] = this.objeto10R;
        this.objeto10R.setText('');
        this.objeto11R = this.add.text(445, 330, 'Objeto 11', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[10] = this.objeto11R;
        this.objeto11R.setText('');
        this.objeto12R = this.add.text(445, 338, 'Objeto 12', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[11] = this.objeto12R;
        this.objeto12R.setText('');
        this.objeto13R = this.add.text(615, 250, 'Objeto 13', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[12] = this.objeto13R;
        this.objeto13R.setText('');
        this.objeto14R = this.add.text(615, 258, 'Objeto 14', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[13] = this.objeto14R;
        this.objeto14R.setText('');
        this.objeto15R = this.add.text(615, 266, 'Objeto 15', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[14] = this.objeto15R;
        this.objeto15R.setText('');
        this.objeto16R = this.add.text(615, 274, 'Objeto 16', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[15] = this.objeto16R;
        this.objeto16R.setText('');
        this.objeto17R = this.add.text(615, 282, 'Objeto 17', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[16] = this.objeto17R;
        this.objeto17R.setText('');
        this.objeto18R = this.add.text(615, 290, 'Objeto 18', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[17] = this.objeto18R;
        this.objeto18R.setText('');
        this.objeto19R = this.add.text(615, 298, 'Objeto 19', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[18] = this.objeto19R;
        this.objeto19R.setText('');
        this.objeto20R = this.add.text(615, 306, 'Objeto 20', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[19] = this.objeto20R;
        this.objeto20R.setText('');
        this.objeto21R = this.add.text(615, 314, 'Objeto 21', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[20] = this.objeto21R;
        this.objeto21R.setText('');
        this.objeto22R = this.add.text(615, 322, 'Objeto 22', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[21] = this.objeto22R;
        this.objeto22R.setText('');
        this.objeto23R = this.add.text(615, 330, 'Objeto 23', { fontSize: '8px', fill: '#ffffff' });
        textoObjetosRiddle[22] = this.objeto23R;
        this.objeto23R.setText('');
        
        this.inventarioWiggleImg = this.add.image(200,300, 'inventarioWiggle').setScale(0.165);
        this.inventarioWiggleImg.visible = false;

        this.objeto1W = this.add.text(45, 250, 'Objeto 1', { fontSize: '8px', fill: '#ffffff' });
        this.objeto1W.setText('');
        textoObjetosWiggle[0] = this.objeto1W;
        this.objeto2W = this.add.text(45, 258, 'Objeto 2', { fontSize: '8px', fill: '#ffffff' });
        this.objeto2W.setText('');
        textoObjetosWiggle[1] = this.objeto2W;
        this.objeto3W = this.add.text(45, 266, 'Objeto 3', { fontSize: '8px', fill: '#ffffff' });
        this.objeto3W.setText('');
        textoObjetosWiggle[2] = this.objeto3W;
        this.objeto4W = this.add.text(45, 274, 'Objeto 4', { fontSize: '8px', fill: '#ffffff' });
        this.objeto4W.setText('');
        textoObjetosWiggle[3] = this.objeto4W;
        this.objeto5W = this.add.text(45, 282, 'Objeto 5', { fontSize: '8px', fill: '#ffffff' });
        this.objeto5W.setText('');
        textoObjetosWiggle[4] = this.objeto5W;
        this.objeto6W = this.add.text(45, 290, 'Objeto 6', { fontSize: '8px', fill: '#ffffff' });
        this.objeto6W.setText('');
        textoObjetosWiggle[5] = this.objeto6W;
        this.objeto7W = this.add.text(45, 298, 'Objeto 7', { fontSize: '8px', fill: '#ffffff' });
        this.objeto7W.setText('');
        textoObjetosWiggle[6] = this.objeto7W;
        this.objeto8W = this.add.text(45, 306, 'Objeto 8', { fontSize: '8px', fill: '#ffffff' });
        this.objeto8W.setText('');
        textoObjetosWiggle[7] = this.objeto8W;
        this.objeto9W = this.add.text(45, 314, 'Objeto 9', { fontSize: '8px', fill: '#ffffff' });
        this.objeto9W.setText('');
        textoObjetosWiggle[8] = this.objeto9W;
        this.objeto10W = this.add.text(45, 322, 'Objeto 10', { fontSize: '8px', fill: '#ffffff' });
        this.objeto10W.setText('');
        textoObjetosWiggle[9] = this.objeto10W;
        this.objeto11W = this.add.text(45, 330, 'Objeto 11', { fontSize: '8px', fill: '#ffffff' });
        this.objeto11W.setText('');
        textoObjetosWiggle[10] = this.objeto11W;
        this.objeto12W = this.add.text(45, 338, 'Objeto 12', { fontSize: '8px', fill: '#ffffff' });
        this.objeto12W.setText('');
        textoObjetosWiggle[11] = this.objeto12W;
        this.objeto13W = this.add.text(215, 250, 'Objeto 13', { fontSize: '8px', fill: '#ffffff' });
        this.objeto13W.setText('');
        textoObjetosWiggle[12] = this.objeto13W;
        this.objeto14W = this.add.text(215, 258, 'Objeto 14', { fontSize: '8px', fill: '#ffffff' });
        this.objeto14W.setText('');
        textoObjetosWiggle[13] = this.objeto14W;
        this.objeto15W = this.add.text(215, 266, 'Objeto 15', { fontSize: '8px', fill: '#ffffff' });
        this.objeto15W.setText('');
        textoObjetosWiggle[14] = this.objeto15W;
        this.objeto16W = this.add.text(215, 274, 'Objeto 16', { fontSize: '8px', fill: '#ffffff' });
        this.objeto16W.setText('');
        textoObjetosWiggle[15] = this.objeto16W;
        this.objeto17W = this.add.text(215, 282, 'Objeto 17', { fontSize: '8px', fill: '#ffffff' });
        this.objeto17W.setText('');
        textoObjetosWiggle[16] = this.objeto17W;
        this.objeto18W = this.add.text(215, 290, 'Objeto 18', { fontSize: '8px', fill: '#ffffff' });
        this.objeto18W.setText('');
        textoObjetosWiggle[17] = this.objeto18W;
        this.objeto19W = this.add.text(215, 298, 'Objeto 19', { fontSize: '8px', fill: '#ffffff' });
        this.objeto19W.setText('');
        textoObjetosWiggle[18] = this.objeto19W;
        this.objeto20W = this.add.text(215, 306, 'Objeto 20', { fontSize: '8px', fill: '#ffffff' });
        this.objeto20W.setText('');
        textoObjetosWiggle[19] = this.objeto20W;
        this.objeto21W = this.add.text(215, 314, 'Objeto 21', { fontSize: '8px', fill: '#ffffff' });
        this.objeto21W.setText('');
        textoObjetosWiggle[20] = this.objeto21W;
        this.objeto22W = this.add.text(215, 322, 'Objeto 22', { fontSize: '8px', fill: '#ffffff' });
        this.objeto22W.setText('');
        textoObjetosWiggle[21] = this.objeto22W;
        this.objeto23W = this.add.text(215, 330, 'Objeto 23', { fontSize: '8px', fill: '#ffffff' });
        this.objeto23W.setText('');
        textoObjetosWiggle[22] = this.objeto23W;

        // COMBOS Y CONTRASEÑAS
        this.comboPiano = "102365";
        this.claveIntroducida = "";
        this.numeroTeclas = 0;

        // TEXTO SOBRE EL PUZLE DE LAS FLORES
        this.plantaA1 = this.add.text(650, 250, 'Flor 1', { fontSize: '12px', fill: '#ffffff' });
        this.plantaA1.setText('');
        this.plantaB1 = this.add.text(650, 280, 'Flor 2', { fontSize: '12px', fill: '#ffffff' });
        this.plantaB1.setText('');
        this.plantaC1 = this.add.text(650, 310, 'Flor 3', { fontSize: '12px', fill: '#ffffff' });
        this.plantaC1.setText('');
        this.plantaA2 = this.add.text(250, 250, 'Flor 1', { fontSize: '12px', fill: '#ffffff' });
        this.plantaA2.setText('');
        this.plantaB2 = this.add.text(250, 280, 'Flor 2', { fontSize: '12px', fill: '#ffffff' });
        this.plantaB2.setText('');
        this.plantaC2 = this.add.text(250, 310, 'Flor 3', { fontSize: '12px', fill: '#ffffff' });
        this.plantaC2.setText('');
        this.temporizadorNuevoIntento = this.time.addEvent({ delay: 500, callback: this.NuevoIntentoPlantas, callbackScope: this});
        this.temporizadorNuevoIntento.paused = true;

        // TEXTO SOBRE EL PUZLE DE LOS SÍMBOLOS
        this.contraseña1 = this.add.text(180,315, '987', { fontSize: '24px', fill: '#ffffff' });
        this.contraseña1.setText('');
        this.contraseña2 = this.add.text(180,315, '987', { fontSize: '24px', fill: '#ffffff' });
        this.contraseña2.setText('');

        this.victoriaJuego = this.time.addEvent({ delay: 15000, callback: this.FinJuego, callbackScope: this})
        this.victoriaJuego.paused = true;
        this.derrotaJuego = this.time.addEvent({ delay: 5000, callback: this.DerrotaFin, callbackScope: this})
        this.derrotaJuego.paused = true;

        // EVENTO PARA LA RESOLUCIÓN DEL PUZLE DE LAS FLORES
        this.eventoTecladoJardin = this.input.keyboard.on('keydown', event =>
        {
            if(this.puzleFloresR1.visible) {

                if(event.key>=1&&event.key<=3&&this.clavesIntroducidas<3) {
                    var encontrado = false;
                    for(var i=0; i<this.floresJardin1.length; i++) {
                        if(this.nuevaPosicionFlores[i]===event.key) {
                            encontrado = true;
                        }
                    }
                    if(!encontrado&&this.nuevoIntento) {
                        this.nuevaPosicionFlores[this.clavesIntroducidas]=(event.key);
                        this.clavesIntroducidas++;
                        switch(this.clavesIntroducidas) {
                            case 1:
                                if(event.key==="1") {
                                    this.plantaA1.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaA1.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaA1.setText("Girasol");
                                }
                                break;
                            case 2:
                                if(event.key==="1") {
                                    this.plantaB1.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaB1.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaB1.setText("Girasol");
                                }
                                break;
                            case 3:
                                if(event.key==="1") {
                                    this.plantaC1.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaC1.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaC1.setText("Girasol");
                                }
                                break;
                        }
                    }
                }
                if(this.clavesIntroducidas==3) {
                    for(var i=0; i<this.floresJardin1.length; i++) {
                        this.floresJardin1[i] = this.nuevaPosicionFlores[i];
                        this.nuevaPosicionFlores[i] = 0;
                    }
                    this.ColocarFlores1();
                    this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleR1();
                    this.clavesIntroducidas = 0;
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;                   
                } 
            }
            
            if(this.puzleFloresR2.visible) {
                if(event.key>=1&&event.key<=3&&this.clavesIntroducidas<3) {
                var encontrado = false;
                for(var i=0; i<this.floresJardin2.length; i++) {
                    if(this.nuevaPosicionFlores[i]===event.key) {
                        encontrado = true;
                    }
                }
                if(!encontrado&&this.nuevoIntento) {
                    this.nuevaPosicionFlores[this.clavesIntroducidas]=(event.key);
                    this.clavesIntroducidas++;
                    switch(this.clavesIntroducidas) {
                        case 1:
                            if(event.key==="1") {
                                this.plantaA1.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaA1.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaA1.setText("Tulipán");
                            }
                            break;
                        case 2:
                            if(event.key==="1") {
                                this.plantaB1.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaB1.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaB1.setText("Tulipán");
                            }
                            break;
                        case 3:
                            if(event.key==="1") {
                                this.plantaC1.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaC1.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaC1.setText("Tulipán");
                            }
                            break;
                    }
                }
            }
            if(this.clavesIntroducidas==3) {
                for(var i=0; i<this.floresJardin2.length; i++) {
                    this.floresJardin2[i] = this.nuevaPosicionFlores[i];
                    this.nuevaPosicionFlores[i] = 0;
                }
                this.ColocarFlores2();
                this.juegoDetenidoRiddle = false;
                this.OcultarPuzleR2();
                this.clavesIntroducidas = 0;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;                   
            }
            }

            if(this.puzleFloresW1.visible) {

                if(event.key>=1&&event.key<=3&&this.clavesIntroducidas<3) {
                    var encontrado = false;
                    for(var i=0; i<this.floresJardin1.length; i++) {
                        if(this.nuevaPosicionFlores[i]===event.key) {
                            encontrado = true;
                        }
                    }
                    if(!encontrado&&this.nuevoIntento) {
                        this.nuevaPosicionFlores[this.clavesIntroducidas]=(event.key);
                        this.clavesIntroducidas++;
                        switch(this.clavesIntroducidas) {
                            case 1:
                                if(event.key==="1") {
                                    this.plantaA2.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaA2.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaA2.setText("Girasol");
                                }
                                break;
                            case 2:
                                if(event.key==="1") {
                                    this.plantaB2.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaB2.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaB2.setText("Girasol");
                                }
                                break;
                            case 3:
                                if(event.key==="1") {
                                    this.plantaC2.setText("Rosa roja");
                                }
                                if(event.key==="2") {
                                    this.plantaC2.setText("Clavel");
                                }
                                if(event.key==="3") {
                                    this.plantaC2.setText("Girasol");
                                }
                                break;
                        }
                    }
                }
                if(this.clavesIntroducidas==3) {
                    for(var i=0; i<this.floresJardin1.length; i++) {
                        this.floresJardin1[i] = this.nuevaPosicionFlores[i];
                        this.nuevaPosicionFlores[i] = 0;
                    }
                    this.ColocarFlores1();
                    this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleW1();
                    this.clavesIntroducidas = 0;
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;                   
                } 
            }

            if(this.puzleFloresW2.visible) {
                if(event.key>=1&&event.key<=3&&this.clavesIntroducidas<3) {
                var encontrado = false;
                for(var i=0; i<this.floresJardin2.length; i++) {
                    if(this.nuevaPosicionFlores[i]===event.key) {
                        encontrado = true;
                    }
                }
                if(!encontrado&&this.nuevoIntento) {
                    this.nuevaPosicionFlores[this.clavesIntroducidas]=(event.key);
                    this.clavesIntroducidas++;
                    switch(this.clavesIntroducidas) {
                        case 1:
                            if(event.key==="1") {
                                this.plantaA2.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaA2.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaA2.setText("Tulipán");
                            }
                            break;
                        case 2:
                            if(event.key==="1") {
                                this.plantaB2.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaB2.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaB2.setText("Tulipán");
                            }
                            break;
                        case 3:
                            if(event.key==="1") {
                                this.plantaC2.setText("Rosa blanca");
                            }
                            if(event.key==="2") {
                                this.plantaC2.setText("Lirio");
                            }
                            if(event.key==="3") {
                                this.plantaC2.setText("Tulipán");
                            }
                            break;
                    }
                }
            }
            if(this.clavesIntroducidas==3) {
                for(var i=0; i<this.floresJardin2.length; i++) {
                    this.floresJardin2[i] = this.nuevaPosicionFlores[i];
                    this.nuevaPosicionFlores[i] = 0;
                }
                this.ColocarFlores2();
                this.juegoDetenidoWiggle = false;
                this.OcultarPuzleW2();
                this.clavesIntroducidas = 0;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;                   
            }
            }
            
            if(this.panelContraseña1.visible) {
                if(this.numeroDigitos==3) {
                    this.contraseña1.setText('');
                    this.numeroDigitos = 0;
                }
                if(this.numeroDigitos<=3&&event.key>=1&&event.key<=10) {
                    if(this.nuevoIntento) {
                        this.contraseñaSimbolos[this.numeroDigitos] = event.key;
                        this.numeroDigitos++;
                        var texto = "";
                        for(var i=0; i<this.numeroDigitos; i++) {
                            texto+=this.contraseñaSimbolos[i];
                        }
                        this.contraseña1.setText(texto);
                    }
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
                if(this.numeroDigitos==3) {
                    this.ComprobarContraseñaSimbolos("R");                            
                }
            }

            if(this.panelContraseña2.visible) {
                if(this.numeroDigitos==3) {
                    this.contraseña2.setText('');
                    this.numeroDigitos = 0;
                }
                if(this.numeroDigitos<=3&&event.key>=1&&event.key<=10) {
                    if(this.nuevoIntento) {
                        this.contraseñaSimbolos[this.numeroDigitos] = event.key;
                        this.numeroDigitos++;
                        var texto = "";
                        for(var i=0; i<this.numeroDigitos; i++) {
                            texto+=this.contraseñaSimbolos[i];
                        }
                        this.contraseña2.setText(texto);
                    }
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
                if(this.numeroDigitos==3) {
                    this.ComprobarContraseñaSimbolos("W");                            
                }
            }

            if(this.puzleGatos1.visible) {
                if(event.key>=1&&event.key<=5) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                if(this.vela1AE.visible) {
                                    this.vela1AE.visible = false;
                                    this.vela1AN.visible = true;
                                    this.velasEncendidas[0] = false;
                                }
                                else{
                                    this.vela1AE.visible = true;
                                    this.vela1AN.visible = false;
                                    this.velasEncendidas[0] = true;
                                }
                                break;
                            case '2':
                                if(this.vela2AE.visible) {
                                    this.vela2AE.visible = false;
                                    this.vela2AN.visible = true;
                                    this.velasEncendidas[1] = false;
                                }
                                else{
                                    this.vela2AE.visible = true;
                                    this.vela2AN.visible = false;
                                    this.velasEncendidas[1] = true;
                                }
                                break;

                            case '3':
                                if(this.vela3AE.visible) {
                                    this.vela3AE.visible = false;
                                    this.vela3AN.visible = true;
                                    this.velasEncendidas[2] = false;
                                }
                                else{
                                    this.vela3AE.visible = true;
                                    this.vela3AN.visible = false;
                                    this.velasEncendidas[2] = true;
                                }
                                break;
                            case '4':
                                if(this.vela4AE.visible) {
                                    this.vela4AE.visible = false;
                                    this.vela4AN.visible = true;
                                    this.velasEncendidas[3] = false;
                                }
                                else{
                                    this.vela4AE.visible = true;
                                    this.vela4AN.visible = false;
                                    this.velasEncendidas[3] = true;
                                }
                                break;
                            case '5':
                                if(this.vela5AE.visible) {
                                    this.vela5AE.visible = false;
                                    this.vela5AN.visible = true;
                                    this.velasEncendidas[4] = false;
                                }
                                else{
                                    this.vela5AE.visible = true;
                                    this.vela5AN.visible = false;
                                    this.velasEncendidas[4] = true;
                                }
                                break;
                        }
                        this.ComprobarVelasEncendidas();
                        this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                    }
                }
            }

            if(this.puzleGatos2.visible) {
                if(event.key>=1&&event.key<=5) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                if(this.vela1BE.visible) {
                                    this.vela1BE.visible = false;
                                    this.vela1BN.visible = true;
                                    this.velasEncendidas[0] = false;
                                }
                                else{
                                    this.vela1BE.visible = true;
                                    this.vela1BN.visible = false;
                                    this.velasEncendidas[0] = true;
                                }
                                break;
                            case '2':
                                if(this.vela2BE.visible) {
                                    this.vela2BE.visible = false;
                                    this.vela2BN.visible = true;
                                    this.velasEncendidas[1] = false;
                                }
                                else{
                                    this.vela2BE.visible = true;
                                    this.vela2BN.visible = false;
                                    this.velasEncendidas[1] = true;
                                }
                                break;

                            case '3':
                                if(this.vela3BE.visible) {
                                    this.vela3BE.visible = false;
                                    this.vela3BN.visible = true;
                                    this.velasEncendidas[2] = false;
                                }
                                else{
                                    this.vela3BE.visible = true;
                                    this.vela3BN.visible = false;
                                    this.velasEncendidas[2] = true;
                                }
                                break;
                            case '4':
                                if(this.vela4BE.visible) {
                                    this.vela4BE.visible = false;
                                    this.vela4BN.visible = true;
                                    this.velasEncendidas[3] = false;
                                }
                                else{
                                    this.vela4BE.visible = true;
                                    this.vela4BN.visible = false;
                                    this.velasEncendidas[3] = true;
                                }
                                break;
                            case '5':
                                if(this.vela5BE.visible) {
                                    this.vela5BE.visible = false;
                                    this.vela5BN.visible = true;
                                    this.velasEncendidas[4] = false;
                                }
                                else{
                                    this.vela5BE.visible = true;
                                    this.vela5BN.visible = false;
                                    this.velasEncendidas[4] = true;
                                }
                                break;
                        }
                        this.ComprobarVelasEncendidas();
                        this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                    }
                }
            }

            if(this.ingredientesNeveraR1.visible) {
                if(event.key>=1&&event.key<=7) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                this.inventarioRiddle.push("Pitahayas");
                                var objeto = {
                                    nombre: "Pitahayas",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '2':
                                this.inventarioRiddle.push("Uvas");
                                var objeto = {
                                    nombre: "Uvas",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '3':
                                this.inventarioRiddle.push("Zumo de tomate");
                                var objeto = {
                                    nombre: "Zumo de tomate",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '4':
                                this.inventarioRiddle.push("Manzana");
                                var objeto = {
                                    nombre: "Manzana",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '5':
                                this.inventarioRiddle.push("Pomelo");
                                var objeto = {
                                    nombre: "Pomelo",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '6':
                                this.inventarioRiddle.push("Calabaza");
                                var objeto = {
                                    nombre: "Calabaza",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '7':
                                this.inventarioRiddle.push("Zumo de piña");
                                var objeto = {
                                    nombre: "Zumo de piña",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                        }
                    }
                    this.ComprobarInventarioRiddle1();
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
            }

            if(this.ingredientesNeveraR2.visible) {
                if(event.key>=1&&event.key<=7) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                this.inventarioRiddle.push("Coco helado");
                                var objeto = {
                                    nombre: "Coco helado",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '2':
                                this.inventarioRiddle.push("Cerezas");
                                var objeto = {
                                    nombre: "Cerezas",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '3':
                                this.inventarioRiddle.push("Zumo de arandanos");
                                var objeto = {
                                    nombre: "Zumo de arandanos",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '4':
                                this.inventarioRiddle.push("Zumo de naranja");
                                var objeto = {
                                    nombre: "Zumo de naranja",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '5':
                                this.inventarioRiddle.push("Limon");
                                var objeto = {
                                    nombre: "Limon",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '6':
                                this.inventarioRiddle.push("Sandia");
                                var objeto = {
                                    nombre: "Sandia",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '7':
                                this.inventarioRiddle.push("Melon");
                                var objeto = {
                                    nombre: "Melon",
                                    jugador: "R",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                        }
                    }
                    this.ComprobarInventarioRiddle2();
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
            }

            if(this.ingredientesNeveraW1.visible) {
                if(event.key>=1&&event.key<=7) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                this.inventarioWiggle.push("Pitahayas");
                                var objeto = {
                                    nombre: "Pitahayas",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '2':
                                this.inventarioWiggle.push("Uvas");
                                var objeto = {
                                    nombre: "Uvas",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '3':
                                this.inventarioWiggle.push("Zumo de tomate");
                                var objeto = {
                                    nombre: "Zumo de tomate",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '4':
                                this.inventarioWiggle.push("Manzana");
                                var objeto = {
                                    nombre: "Manzana",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '5':
                                this.inventarioWiggle.push("Pomelo");
                                var objeto = {
                                    nombre: "Pomelo",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '6':
                                this.inventarioWiggle.push("Calabaza");
                                var objeto = {
                                    nombre: "Calabaza",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '7':
                                this.inventarioWiggle.push("Zumo de piña");
                                var objeto = {
                                    nombre: "Zumo de piña",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                        }
                    }
                    this.ComprobarInventarioWiggle1();
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
                
            }

            if(this.ingredientesNeveraW2.visible) {
                if(event.key>=1&&event.key<=7) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                this.inventarioWiggle.push("Coco helado");
                                var objeto = {
                                    nombre: "Coco helado",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '2':
                                this.inventarioWiggle.push("Cerezas");
                                var objeto = {
                                    nombre: "Cerezas",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '3':
                                this.inventarioWiggle.push("Zumo de arandanos");
                                var objeto = {
                                    nombre: "Zumo de arandanos",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '4':
                                this.inventarioWiggle.push("Zumo de naranja");
                                var objeto = {
                                    nombre: "Zumo de naranja",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '5':
                                this.inventarioWiggle.push("Limon");
                                var objeto = {
                                    nombre: "Limon",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '6':
                                this.inventarioWiggle.push("Sandia");
                                var objeto = {
                                    nombre: "Sandia",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                            case '7':
                                this.inventarioWiggle.push("Melon");
                                var objeto = {
                                    nombre: "Melon",
                                    jugador: "W",
                                    nombreUsuario: equipo
                                }
                                peticionesServer.añadirObjeto(objeto, devolver_IP());
                                break;
                        }
                    }
                    this.ComprobarInventarioWiggle2();
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
            }

            if(this.ingredientesCaldero1.visible) {
                if(this.numeroIngredientesIntroducidos1<3) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[0].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(1);
                                }
                                break;
                            case '2':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[1].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(2);
                                }
                                break;
                            case '3':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[2].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(3);
                                }
                                break;
                            case '4':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[3].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(4);
                                }
                                break;
                            case '5':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[4].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(5);
                                }
                                break;
                            case '6':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[5].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(6);
                                }
                                break;
                            case '7':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[6].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(7);
                                }
                                break;
                            case '8':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[7].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(8);
                                }
                                break;
                            case '9':
                                if(event.key<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[8].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(9);
                                }
                                break;
                            case 'a':
                                if(10<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[9].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(10);
                                }
                                break;
                            case 'b':
                                if(11<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[10].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(11);
                                }
                                break;
                            case 'c':
                                if(12<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[11].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(12);
                                }
                                break;
                             case 'd':
                                if(13<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[12].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(13);
                                }
                                break;
                            case 'e':
                                if(14<=this.numeroIngredientesCaldero1) {
                                    this.iconosCaldero1[13].visible = true;
                                    this.numeroIngredientesIntroducidos1++;
                                    this.AñadirIngredienteZafiro(14);
                                }
                                break;
                        }
                    }
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
                if(this.numeroIngredientesIntroducidos1 == 3) {
                    this.ComprobarFormulaZafiro();
                    this.numeroIngredientesIntroducidos1 = 0;
                }
            }

            if(this.ingredientesCaldero2.visible) {
                if(this.numeroIngredientesIntroducidos2<3) {
                    if(this.nuevoIntento) {
                        switch(event.key) {
                            case '1':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[0].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(1);
                                }
                                break;
                            case '2':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[1].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(2);
                                }
                                break;
                            case '3':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[2].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(3);
                                }
                                break;
                            case '4':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[3].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(4);
                                }
                                break;
                            case '5':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[4].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(5);
                                }
                                break;
                            case '6':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[5].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(6);
                                }
                                break;
                            case '7':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[6].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(7);
                                }
                                break;
                            case '8':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[7].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(8);
                                }
                                break;
                            case '9':
                                if(event.key<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[8].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(9);
                                }
                                break;
                            case 'a':
                                if(10<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[9].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(10);
                                }
                                break;
                            case 'b':
                                if(11<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[10].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(11);
                                }
                                break;
                            case 'c':
                                if(12<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[11].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(12);
                                }
                                break;
                             case 'd':
                                if(13<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[12].visible = true;
                                    this.numeroIngredientesIntroducidos2++;
                                    this.AñadirIngredienteRubi(13);
                                }
                                break;
                            case 'e':
                                if(14<=this.numeroIngredientesCaldero2) {
                                    this.iconosCaldero2[13].visible = true;
                                    this.numeroIngredientesIntroducido2s++;
                                    this.AñadirIngredienteRubi(14); 
                                }
                                break;
                        }
                    }
                    this.nuevoIntento = false;
                    this.temporizadorNuevoIntento.paused = false;
                }
                if(this.numeroIngredientesIntroducidos2 == 3) {
                    this.ComprobarFormulaRubi();
                    this.numeroIngredientesIntroducidos2 = 0;
                }
            }

            if(this.puzlePiano.visible) {
                if(this.nuevoIntento) {
                    if(event.key>=0&&event.key<=9) {
                        this.numeroTeclas++;
                        this.claveIntroducida+= event.key;
                    }
                    if(this.numeroTeclas==6) {
                        if(this.claveIntroducida === this.comboPiano) {
                            this.ComprobarComboPiano();
                        }
                        else {
                            this.numeroTeclas = 0;
                            this.claveIntroducida = "";
                        }
                    }
                }
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
            }
        });

        // Temporizadores para más texto con las fórmulas de los elixires
        this.formulaRubi1 = this.time.addEvent({ delay: 10800, callback: this.MostrarTextoRubi1, callbackScope: this});
        this.formulaRubi1.paused = true;
        this.formulaZafiro1 = this.time.addEvent({ delay: 10800, callback: this.MostrarTextoZafiro1, callbackScope: this});
        this.formulaZafiro1.paused = true;
        this.formulaRubi2 = this.time.addEvent({ delay: 10800, callback: this.MostrarTextoRubi2, callbackScope: this});
        this.formulaRubi2.paused = true;
        this.formulaZafiro2 = this.time.addEvent({ delay: 10800, callback: this.MostrarTextoZafiro2, callbackScope: this});
        this.formulaZafiro2.paused = true;


        //this.comboPiano = this.input.keyboard.createCombo('102365', {resetOnWrongKey: true, deleteOnMatch: true});
        //TEMPORIZADOR
        this.textoTemp = this.add.text(32, 32,{ fontSize: '23px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.eventoContador = this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                this.actualizarContador();
            }
        });
        this.eventoContador.paused = true;
        //const combo = this.input.keyboard.createCombo('MORE');
        //this.input.keyboard.on('keycombomatch', function (event) {
        //tiempo.minutos++;
        //});
        // Imágenes de introducción
        this.introduccion4 = this.add.image(400,300,'introduccion4');
        this.introduccion3 = this.add.image(400,300,'introduccion3');
        this.introduccion2 = this.add.image(400,300,'introduccion2');
        this.introduccion1 = this.add.image(400,300,'introduccion1');

        // Imágenes de victoria y derrota
        this.victoria = this.add.image(400,300,'victoria');
        this.victoria.visible = false;
        titulo = this.add.text(32, 15, '- Mejores tiempos -' ,{ fontSize: '20px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        titulo.setText('');
        this.record1 = this.add.text(32, 65, 'Record1' ,{ fontSize: '18px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textoRecords[0] = this.record1;
        this.record1.setText('');
        this.record2 = this.add.text(32, 95,'Record2' ,{ fontSize: '18px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textoRecords[1] = this.record2;
        this.record2.setText('');
        this.record3 = this.add.text(32, 125,'Record3' ,{ fontSize: '18px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textoRecords[2] = this.record3;
        this.record3.setText('');
        this.record4 = this.add.text(32, 155,'Record4' ,{ fontSize: '18px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textoRecords[3] = this.record4;
        this.record4.setText('');
        this.record5 = this.add.text(32, 185,'Record5' ,{ fontSize: '18px', fill: '#ffffff', fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textoRecords[4] = this.record5;
        this.record5.setText('');
        this.derrota = this.add.image(400,300,'derrota');
        this.derrota.visible = false;
        
    }

    update ()
    {
        // Introducción
        this.input.keyboard.on('keydown_ENTER', () =>{ 
            if(this.introduccion1.visible&&this.nuevoIntento) {
                this.introduccion1.visible = false;
                this.introduccion2.visible = true;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
            }
            if(this.introduccion2.visible&&this.nuevoIntento) {
                this.introduccion2.visible = false;
                this.introduccion3.visible = true;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
            }
            if(this.introduccion3.visible&&this.nuevoIntento) {
                this.introduccion3.visible = false;
                this.introduccion4.visible = true;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
            }
            if(this.introduccion4.visible&&this.nuevoIntento) {
                this.introduccion4.visible = false;
                this.juegoDetenidoRiddle = false;
                this.juegoDetenidoWiggle = false;
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
                this.eventoContador.paused = false;
                
                //CAMERA 1
                this.camera1 = this.cameras.add(0, 0, 400, 800);
                this.camera1.setZoom(3); // Ajusta el valor según sea necesario
                this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
                this.camera1.startFollow(this.Wiggle);

                // CAMERA 2
                this.camera2 = this.cameras.add(400, 0, 400, 800);
                this.camera2.setZoom(3); // Ajusta el valor según sea necesario
                this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
                this.camera2.startFollow(this.Riddle); 
                
            }
        
        });
        if(!this.introduccion4.visible) {
            if(this.fondoWiggle.visible) {
                this.textoTemp.x = 50;
                this.textoTemp.y = 30;
                this.textoTemp.setScale(1);
            }
            else {
                this.textoTemp.x = this.camera1.scrollX + 150;
                this.textoTemp.y = this.camera1.scrollY + 280;
                this.textoTemp.setScale(0.35);
            }
            this.textoTemp.setText('Tiempo restante: ' +this.tiempo.minutos + ':' +this.tiempo.segundos);
        }

        /*
        //Menu PAUSA
        this.input.keyboard.on('keydown_TAB', () =>{ 
           this.scene

        });
        */

        //Controles Riddle
        //Movimiento horizontal
        if(!this.juegoDetenidoRiddle) {

            if (this.cursors.left.isDown)
                {
                    this.Riddle.setVelocityX(-40);
                }

            else if (this.cursors.right.isDown)
                {
                    this.Riddle.setVelocityX(40);
                }

            else if (this.cursors.up.isDown)
                {
                    this.Riddle.setVelocityY(-40);
                }

            else if (this.cursors.down.isDown)
                {
                    this.Riddle.setVelocityY(40);
                }

            if(this.cursors.left.isUp&&this.cursors.right.isUp&&this.cursors.up.isUp&&this.cursors.down.isUp) {
                    this.Riddle.setVelocityX(0);
                    this.Riddle.setVelocityY(0);
            }
        }

        this.input.keyboard.on('keydown_Z', () =>{
            if(this.nuevoIntento) {
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
                this.camera2.stopFollow();
                if(this.Riddle.x>400) {
                    this.camera2.centerOn(600,300);
                } else {
                    this.camera2.centerOn(200,300);
                }
                this.camera2.setZoom(1);
                this.MostrarInventarioRiddle();
            }
        });

        if(this.inventarioRiddleImg.visible) {
            this.juegoDetenidoRiddle = true;
            this.input.keyboard.on('keydown_SHIFT', () =>{ 
                    this.juegoDetenidoRiddle = false;
                this.OcultarInventarioRiddle(); });
        }


        this.input.keyboard.on('keydown_M', () =>{
            if(this.nuevoIntento) {
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
                this.camera1.stopFollow();
                if(this.Wiggle.x>400) {
                    this.camera1.centerOn(600,300);
                } else {
                    this.camera1.centerOn(200,300);
                }
                this.camera1.setZoom(1);
                this.MostrarInventarioWiggle();
            }
        });

        if(this.inventarioWiggleImg.visible) {
            this.juegoDetenidoWiggle = true;
            this.input.keyboard.on('keydown_ENTER', () =>{ 
                    this.juegoDetenidoWiggle = false;
                this.OcultarInventarioWiggle(); });
        }

            this.input.keyboard.on('keydown_W', () =>{
                    if(!this.juegoDetenidoWiggle) {
                        this.Wiggle.setVelocityY(-40);
                    } 
                 });
            this.input.keyboard.on('keydown_A', () =>{ 
                if(!this.juegoDetenidoWiggle) {
                    this.Wiggle.setVelocityX(-40);
                } 
                 });
            this.input.keyboard.on('keydown_S', () =>{ 
                if(!this.juegoDetenidoWiggle) {
                    this.Wiggle.setVelocityY(40);
                } 
                 });
            this.input.keyboard.on('keydown_D', () =>{ 
                if(!this.juegoDetenidoWiggle) {
                    this.Wiggle.setVelocityX(40);
                } 
                 });

            this.input.keyboard.on('keyup_W', () =>{ 
                    this.Wiggle.setVelocityY(0);
                 });
            this.input.keyboard.on('keyup_A', () =>{ 
                    this.Wiggle.setVelocityX(0);
                 });
            this.input.keyboard.on('keyup_S', () =>{ 
                    this.Wiggle.setVelocityY(0);
                 });
            this.input.keyboard.on('keyup_D', () =>{ 
                    this.Wiggle.setVelocityX(0);
                 });
        
        // Cuando Wiggle interactua con un objeto
        this.input.keyboard.on('keydown_Q', () =>{ 
                this.ComprobarObjetoInteractuableJ2(); });
        // Cuando Riddle interactua con un objeto
        this.input.keyboard.on('keydown_SPACE', () =>{ 
                this.ComprobarObjetoInteractuableJ1(); });
        
                if(this.cajaTexto.visible){
                    this.juegoDetenidoRiddle = true;
                }
                if(this.cajaTexto2.visible){
                    this.juegoDetenidoWiggle = true;
                }
                if(this.libroPiano1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarLibro1(); });
                }
    
                if(this.libroPiano2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarLibro2(); });
                }
    
                if(this.puzlePiano.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzlePiano(); });
                }

                if(this.puzleFloresR1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleR1(); });
                }
    
                if(this.puzleFloresR2.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleR2(); });
                }
                if(this.puzleFloresW1.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleW1(); });
                }
                if(this.puzleFloresW2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleW2(); });
                }
                if(this.puzleSimbolos.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleSimbolos1(); });
                }
                if(this.puzleSimbolos2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleSimbolos2(); });
                }
                if(this.panelContraseña1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleContraseña1(); });
                }
                if(this.panelContraseña2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleContraseña2(); });
                }
                if(this.puzleGatos1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarPuzleGatos1(); });
                }
                if(this.puzleGatos2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarPuzleGatos2(); });
                }
                if(this.mensajeGatos1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarMensajeGatos1(); });
                }
                if(this.mensajeGatos2.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarMensajeGatos2(); });
                }

                if(this.ingredientesNeveraR1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarIngredientesNeveraR1(); });
                }
                if(this.ingredientesNeveraR2.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarIngredientesNeveraR2(); });
                }
                if(this.ingredientesNeveraW1.visible) {
                    this.juegoDetenidoWiggle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle= false;
                    this.OcultarIngredientesNeveraW1(); });
                }
                if(this.ingredientesNeveraW2.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarIngredientesNeveraW2(); });
                }
                if(this.ingredientesCaldero1.visible) {
                    this.juegoDetenidoRiddle = true;
                    this.input.keyboard.on('keydown_SHIFT', () =>{ 
                        this.juegoDetenidoRiddle = false;
                    this.OcultarIngredientesCaldero1(); });
                }
                if(this.ingredientesCaldero2.visible) {
                    this.juegoDetenidoWiddle = true;
                    this.input.keyboard.on('keydown_ENTER', () =>{ 
                        this.juegoDetenidoWiggle = false;
                    this.OcultarIngredientesCaldero2(); });
                }

                this.input.keyboard.on('keycombomatch', event =>
                {
                    this.ComprobarComboPiano();
                });   
                

                if(this.libroPianoVisibleRiddle&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(600,300);
                    this.camera2.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.libroPiano1.visible = true;
                }

                if(this.libroPianoVisibleWiggle&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(600,300);
                    this.camera1.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.libroPiano2.visible = true;
                }
                if(this.puzlePianoVisible&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.puzlePiano.visible = true;
                }
                if(this.puzleFloresRiddleVisible1&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(600,300);
                    this.camera2.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.puzleFloresR1.visible = true;
                }
                if(this.puzleFloresRiddleVisible2&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.puzleFloresR2.visible = true;
                }

                if(this.puzleFloresWiggleVisible1&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(600,300);
                    this.camera1.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.puzleFloresW1.visible = true;
                }
                if(this.puzleFloresWiggleVisible2&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.puzleFloresW2.visible = true;
                }
                if(this.puzleSimbolosRiddleVisible&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.puzleSimbolos.visible = true;
                }
                if(this.puzleSimbolosWiggleVisible&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.puzleSimbolos2.visible = true;
                }
                if(this.panelContraseñaRiddleVisible&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.panelContraseña1.visible = true;
                }
                if(this.panelContraseñaWiggleVisible&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.panelContraseña2.visible = true;
                }
                if(this.puzleGatosVisibleRiddle&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.PrepararVelasRiddle();
                }
                if(this.puzleGatosVisibleWiggle&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.PrepararVelasWiggle();
                }
                if(this.mensajeGatosVisibleRiddle&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.mensajeGatos1.visible = true;
                }
                if(this.mensajeGatosVisibleWiggle&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.mensajeGatos2.visible = true;
                }
                if(this.ingredientesNeveraRiddleVisible1&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(200,300);
                    this.camera2.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.ingredientesNeveraR1.visible = true;
                    this.ComprobarInventarioRiddle1();
                }
                if(this.ingredientesNeveraRiddleVisible2&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(600,300);
                    this.camera2.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.ingredientesNeveraR2.visible = true;
                    this.ComprobarInventarioRiddle2();
                }
                if(this.ingredientesNeveraWiggleVisible1&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.ingredientesNeveraW1.visible = true;
                    this.ComprobarInventarioWiggle1();
                }
                if(this.ingredientesNeveraWiggleVisible2&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(600,300);
                    this.camera1.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.ingredientesNeveraW2.visible = true;                   
                    this.ComprobarInventarioWiggle2();
                }
                if(this.puzleCalderoRiddleVisible&&!this.mostrandoTexto) {
                    this.camera2.stopFollow();
                    this.camera2.centerOn(600,300);
                    this.camera2.setZoom(1);
                    this.fondoRiddle.visible = true;
                    this.ingredientesCaldero1.visible = true;
                    this.PrepararIngredientesZafiro();
                }
                if(this.puzleCalderoWiggleVisible&&!this.mostrandoTexto2) {
                    this.camera1.stopFollow();
                    this.camera1.centerOn(200,300);
                    this.camera1.setZoom(1);
                    this.fondoWiggle.visible = true;
                    this.ingredientesCaldero2.visible = true;
                    this.PrepararIngredientesRubi();
                }

        
        this.InicioAbarrotadoResuelto();
        this.SinfoniaSecretaResuelta();
        this.EntrePetalosResuelto();
        this.JardinEnArmoniaResuelto();
        this.SecretoEnLosFogonesResuelto();
        this.EnigmaAlmacenResuelto();
        this.LlamasFelinasResuelto();
        this.ComprobarMaestroMezclas();

        if(this.tp.isDown&&!this.juegoDetenidoRiddle&&!this.juegoDetenidoWiggle){
            if(this.nuevoIntento) {
                this.IntercambiarPosiciones();
                this.nuevoIntento = false;
                this.temporizadorNuevoIntento.paused = false;
            }
        }
    }

    CrearColisionParedes() {
                // Se crean plataformas para crear las colisiones
                this.muros = this.physics.add.staticGroup();
                this.muros.create(250,500,'plataforma').setScale(0.75,0.8).refreshBody();
                this.muros.create(560,500,'plataforma').setScale(0.57,0.8).refreshBody();
                this.muros.create(560,277,'plataforma').setScale(0.57,0.8).refreshBody();
                this.muros.create(730,580,'plataforma').setScale(0.37,0.8).refreshBody();
                this.muros.create(697,450,'plataforma').setScale(0.12,0.8).refreshBody();
                this.muros.create(775,450,'plataforma').setScale(0.10,0.8).refreshBody();
                this.muros.create(775,195,'plataforma').setScale(0.10,0.8).refreshBody();
                this.muros.create(690,195,'plataforma').setScale(0.16,0.8).refreshBody();
                this.muros.create(587,195,'plataforma').setScale(0.2,0.8).refreshBody();
                this.muros.create(480,195,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(355,195,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(355,295,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(355,134,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(355,65,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(642,35,'plataforma').setScale(0.17,0.8).refreshBody();
                this.muros.create(745,35,'plataforma').setScale(0.22,0.8).refreshBody();
                this.muros.create(515,35,'plataforma').setScale(0.35,0.8).refreshBody();
                this.muros.create(165,35,'plataforma').setScale(0.8,0.8).refreshBody();
                this.muros.create(73,293,'plataforma').setScale(0.28,0.75).refreshBody();
                this.muros.create(73,165,'plataforma').setScale(0.28,0.75).refreshBody();
                this.muros.create(120,340,'plataforma').setScale(0.45,0.75).refreshBody();
                this.muros.create(315,340,'plataforma').setScale(0.37,0.75).refreshBody();
                this.muros.create(75,405,'plataforma').setScale(0.20,0.75).refreshBody();
                this.muros.create(322,160,'plataforma2').setScale(0.17,0.32).refreshBody();
                this.muros.create(322,295,'plataforma2').setScale(0.17,0.2).refreshBody();
                this.muros.create(130,145,'plataforma2').setScale(0.17,0.32).refreshBody();
                this.muros.create(130,273,'plataforma2').setScale(0.17,0.16).refreshBody();
                this.muros.create(130,332,'plataforma2').setScale(0.17,0.05).refreshBody();
                this.muros.create(15,170,'plataforma2').setScale(0.17,0.65).refreshBody();
                this.muros.create(115,450,'plataforma2').setScale(0.17,0.4).refreshBody();
                this.muros.create(33,370,'plataforma2').setScale(0.17,0.2).refreshBody();
                this.muros.create(67,310,'plataforma2').setScale(0.17,0.07).refreshBody();
                this.muros.create(388,285,'plataforma2').setScale(0.17,1.15).refreshBody();
                this.muros.create(448,275,'plataforma2').setScale(0.17,1.15).refreshBody();
                this.muros.create(789,300,'plataforma2').setScale(0.17,1.35).refreshBody();
                this.muros.create(705,110,'plataforma2').setScale(0.17,0.45).refreshBody();
                this.muros.create(675,110,'plataforma2').setScale(0.17,0.45).refreshBody();
                this.muros.create(608,110,'plataforma2').setScale(0.17,0.45).refreshBody();
                this.muros.create(580,110,'plataforma2').setScale(0.17,0.45).refreshBody();
                this.muros.create(675,325,'plataforma2').setScale(0.17,0.3).refreshBody();
                this.muros.create(674,510,'plataforma2').setScale(0.17,0.3).refreshBody();
                this.muros.create(545,310,'plataforma2').setScale(0.17,0.2).refreshBody();
                this.muros.create(545,440,'plataforma2').setScale(0.17,0.28).refreshBody();
    }

    // Funciones que comprueban la distancia de los jugadores con todos los objetos, para saber con cuál interactuar
    ComprobarObjetoInteractuableJ1 () {
        var indiceObjetoInteractuable = 0;
        var menorDistancia = 100;
        for(var i=0; i<this.objetosInteractuables.length; i++) {
            var objeto = this.objetosInteractuables[i];
            if(objeto!=undefined) {
                if(Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Riddle.x,this.Riddle.y)<40 && !this.mostrandoTexto) {
                    if(objeto.visible&&Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Riddle.x,this.Riddle.y)<menorDistancia) {
                        indiceObjetoInteractuable = i;
                        menorDistancia=Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Riddle.x,this.Riddle.y);
                    }
                }
            }
        }
        var objetoI = this.objetosInteractuables[indiceObjetoInteractuable];
        if(objetoI!=undefined) {
            this.InteraccionJugador1(objetoI.interactuar());
        }
    }
    
    ComprobarObjetoInteractuableJ2 () {
        var indiceObjetoInteractuable = 0;
        var menorDistancia = 100;
        for(var i=0; i<this.objetosInteractuables.length; i++) {
            var objeto = this.objetosInteractuables[i];
            if(objeto!=undefined) {
                if(Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Wiggle.x,this.Wiggle.y)<40 && !this.mostrandoTexto2) {
                    if(objeto.visible) {                        
                        if(objeto.visible&&Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Wiggle.x,this.Wiggle.y)<menorDistancia) {
                            indiceObjetoInteractuable = i;
                            menorDistancia=Phaser.Math.Distance.Between(objeto.x,objeto.y,this.Wiggle.x,this.Wiggle.y);
                        }
                    }
                }
            }
        }
        var objetoI = this.objetosInteractuables[indiceObjetoInteractuable];
        if(objetoI!=undefined) {
            this.InteraccionJugador2(objetoI.interactuar());
        }
    }

    ////////////////////////////// SISTEMA DE DIÁLOGO //////////////////////////////
    MostrarTexto(texto) {
        this.juegoDetenidoRiddle = true;
        this.stringTexto = new String(texto);
        this.numeroCaracteres = this.stringTexto.length;
        this.tiempoTexto = this.tiempoCaracter * this.numeroCaracteres + this.tiempoEsperaCuadro;
        this.eventoTiempo = this.time.addEvent({ delay: this.tiempoTexto, callback: this.DesaparecerCuadro, callbackScope: this});
        this.eventoTiempo.paused = false;
        this.mostrandoTexto = true;
        this.cajaTexto.y = this.camera2.scrollY + 580 - 130;
        this.cajaTexto.x = this.camera2.scrollX + 200;
        this.cajaTexto.setScale(0.25);
        this.dialogo.x = this.cajaTexto.x - 45;
        this.dialogo.y = this.cajaTexto.y-10;
        this.dialogo.setScale(0.2);
        this.dialogoB.x = this.cajaTexto.x - 45;
        this.dialogoB.y = this.cajaTexto.y-2.5;
        this.dialogoB.setScale(0.2);
        this.dialogoC.x = this.cajaTexto.x - 45;
        this.dialogoC.y = this.cajaTexto.y+5;
        this.dialogoC.setScale(0.2);
        this.cajaTexto.visible = true;
        this.letra.paused = false;
    }

    MostrarTexto2(texto) {
        this.juegoDetenidoWiggle = true;
        this.stringTexto2 = new String(texto);
        this.numeroCaracteres2 = this.stringTexto2.length;
        this.tiempoTexto2 = this.tiempoCaracter * this.numeroCaracteres2 + this.tiempoEsperaCuadro;
        this.eventoTiempo2 = this.time.addEvent({ delay: this.tiempoTexto2, callback: this.DesaparecerCuadro2, callbackScope: this});
        this.eventoTiempo2.paused = false;
        this.mostrandoTexto2 = true;
        this.cajaTexto2.y = this.camera1.scrollY + 580 - 130;
        this.cajaTexto2.x = this.camera1.scrollX + 200;
        this.cajaTexto2.setScale(0.25);
        this.dialogo2.x = this.cajaTexto2.x - 45;
        this.dialogo2.y = this.cajaTexto2.y-10;
        this.dialogo2.setScale(0.2);
        this.dialogo2B.x = this.cajaTexto2.x - 45;
        this.dialogo2B.y = this.cajaTexto2.y-2.5;
        this.dialogo2B.setScale(0.2);
        this.dialogo2C.x = this.cajaTexto2.x - 45;
        this.dialogo2C.y = this.cajaTexto2.y+5;
        this.dialogo2C.setScale(0.2);
        this.cajaTexto2.visible = true;
        this.letra2.paused = false;
    }

    MostrarCaracteres() {
        // Se comprueba si se escribe en la línea 1 o en la línea 2
        if(this.indiceLetra>28 && this.linea1) {
            if(this.stringTexto[this.indiceLetra]===" ") {
                this.linea1 = false;
                this.linea2 = true;
                this.indiceLetra++;
            }
        }
        if(this.indiceLetra>60 && this.linea2) {
            if(this.stringTexto[this.indiceLetra]===" ") {
                this.linea2 = false;
                this.linea3 = true;
                this.indiceLetra++;
            }
        }
        if(this.linea1) {                        
            this.dialogoCargado += this.stringTexto[this.indiceLetra];
            this.indiceLetra++;
            this.dialogo.setText(this.dialogoCargado);
        }
        if(this.linea2) {
            this.dialogoCargadoB += this.stringTexto[this.indiceLetra];
            this.indiceLetra++;
            this.dialogoB.setText(this.dialogoCargadoB);
        }
        if(this.linea3) {
            this.dialogoCargadoC += this.stringTexto[this.indiceLetra];
            this.indiceLetra++;
            this.dialogoC.setText(this.dialogoCargadoC);
        }
        this.letra = this.time.addEvent({ delay: this.tiempoCaracter, callback: this.MostrarCaracteres, callbackScope: this});
        this.letra.paused = true;
        
        if(this.indiceLetra<this.numeroCaracteres) {
            this.letra.paused = false;
        }
        else {
            this.indiceLetra = 0;
            this.dialogoCargado = "";
            this.dialogoCargadoB = "";
            this.dialogoCargadoC = "";
        }
    }

    MostrarCaracteres2() {
        if(this.indiceLetra2>28 && this.linea1b) {
            if(this.stringTexto2[this.indiceLetra2]===" ") {
                this.linea1b = false;
                this.linea2b = true;
                this.indiceLetra2++;
            }
        }
        if(this.indiceLetra2>60 && this.linea2b) {
            if(this.stringTexto2[this.indiceLetra2]===" ") {
                this.linea2b = false;
                this.linea3b = true;
                this.indiceLetra2++;
            }
        }
        if(this.linea1b) {                        
            this.dialogoCargado2 += this.stringTexto2[this.indiceLetra2];
            this.indiceLetra2++;
            this.dialogo2.setText(this.dialogoCargado2);
        }
        if(this.linea2b) {
            this.dialogoCargado2B += this.stringTexto2[this.indiceLetra2];
            this.indiceLetra2++;
            this.dialogo2B.setText(this.dialogoCargado2B);
        }
        if(this.linea3b) {
            this.dialogoCargado2C += this.stringTexto2[this.indiceLetra2];
            this.indiceLetra2++;
            this.dialogo2C.setText(this.dialogoCargado2C);
        }
        this.letra2 = this.time.addEvent({ delay: this.tiempoCaracter, callback: this.MostrarCaracteres2, callbackScope: this});
        this.letra2.paused = true;

        if(this.indiceLetra2<this.numeroCaracteres2) {
            this.letra2.paused = false;
        }
        else {
            this.indiceLetra2 = 0;
            this.dialogoCargado2 = "";
            this.dialogoCargado2B = "";
            this.dialogoCargado2C = "";
        }
    }
    
    // Función encargada de desaparecer el cuadro de texto
    DesaparecerCuadro () {
        this.juegoDetenidoRiddle = false;
        this.mostrandoTexto = false;
        this.dialogo.setText('');
        this.dialogoB.setText('');
        this.dialogoC.setText('');
        this.linea1 = true;
        this.linea2 = false;
        this.linea3 = false;
        this.cajaTexto.visible = false;
        // Se le añade de nuevo el evento para que pueda volver a suceder
        this.eventoTiempo = this.time.addEvent({ delay: this.tiempoTexto, callback: this.DesaparecerCuadro, callbackScope: this});
        this.eventoTiempo.paused = true;
    }

    DesaparecerCuadro2() {
        this.juegoDetenidoWiggle = false;
        this.mostrandoTexto2 = false;
        this.dialogo2.setText('');
        this.dialogo2B.setText('');
        this.dialogo2C.setText('');
        this.linea1b = true;
        this.linea2b = false;
        this.linea3b = false;
        this.cajaTexto2.visible = false;
        // Se le añade de nuevo el evento para que pueda volver a suceder
        this.eventoTiempo2 = this.time.addEvent({ delay: this.tiempoTexto2, callback: this.DesaparecerCuadro2, callbackScope: this});
        this.eventoTiempo2.paused = true;
    }

    //////////////////////// INTERACCIÓN DE LOS JUGADORES CON LOS OBJETOS
    // FUNCIONES ENCARGADAS DE TODOS LOS EVENTOS QUE SUCEDEN AL INTERACTUAR CON LOS OBJETOS
                // RIDDLE
                InteraccionJugador1(objeto) {

                    if(objeto === "caja") {
                        var frase = "Yo puedo quitar estas cajas para poder salir de la habitación. Así seguiremos avanzando.";
                        this.MostrarTexto(frase);
                        this.inicioAbarrotado = true;
                    }
                    if(objeto === "piano") {
                        var frase;
                        if(this.estanteria1_interactuada&&this.estanteria2_interactuada) {
                            frase = "Estoy seguro de que el piano es la clave para seguir avanzando, pero yo no sé tocarlo...";
                        }
                        else {
                            frase = "Qué curioso que haya aquí un piano...";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "estanteria1") {
                        var frase = "En este libro aparece un mensaje muy raro... A C# D F E, no sé qué querrá decir.";
                        this.MostrarTexto(frase);
                        this.estanteria1_interactuada = true;
                    }
                    if(objeto === "estanteria2") {
                        var frase = "Aquí aparece una imagen de un teclado con unas letras.";
                        this.MostrarTexto(frase);
                        this.estanteria2_interactuada = true;
                        this.libroPianoVisibleRiddle = true;
                    }
                    if(objeto ==="puertaA") {
                        var frase = "No tenemos la llave para abrir esta puerta...";
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "mesaLlave" && !this.fragmentoMesa) {
                        this.numeroFragmentosLlave++;
                        this.inventarioRiddle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "R",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoMesa = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "¡Anda! Debajo de la mesa había un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioRiddle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "R",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "¡Anda! Debajo de la mesa había un fragmento de llave";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "cajonesLlave"&&!this.fragmentoCajones) {
                        this.numeroFragmentosLlave++;
                        this.inventarioRiddle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "R",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoCajones = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "Entre los cajones he encontrado un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioRiddle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "R",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "Entre los cajones he encontrado un fragmento de llave";
                        }
                        this.MostrarTexto(frase);

                    }
                    if(objeto === "fragmentoLlaveB"&&!this.fragmentoSuelo) {
                        this.numeroFragmentosLlave++;
                        this.inventarioRiddle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "R",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoSuelo = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "Esto parece un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioRiddle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "R",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "Esto parece un fragmento de llave. Si consigo otros dos más podré formar una.";
                        }
                        this.MostrarTexto(frase);
                        this.fragmento1LlaveB.disableBody(true,true);

                    }
                    if(objeto ==="puertaB") {
                        var llave = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Llave jardines") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que hemos construido encaja perfectamente!";
                            this.MostrarTexto(frase);
                            this.puertaB.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto(frase);
                        }
                    }

                    if(objeto ==="puertaB2") {
                        var llave = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Llave jardines") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que hemos construido encaja perfectamente!";
                            this.MostrarTexto(frase);
                            this.puertaB2.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto(frase);
                        }
                    }

                    if(objeto === "mesaJardin1") {
                        var frase;
                        if(!this.cuadrosInteractuados) {
                            frase = "Unos girasoles, unas rosas rojas y unos claveles hay en este jardín, qué bonitas flores. "
                        }
                        else {
                            frase = "Voy a tratar de colocar las flores correctamente...";
                            this.juegoDetenidoRiddle = true;
                            this.puzleFloresRiddleVisible1 = true;
                        }
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "mesaJardin2") {
                        var frase;
                        if(!this.cuadrosInteractuados) {
                            frase = "Unas rosas blancas, unos lirios y unos tulipanes hay en este jardín, qué bonitas flores. "
                        }
                        else {
                            frase = "Voy a tratar de colocar las flores correctamente...";
                            this.juegoDetenidoRiddle = true;
                            this.puzleFloresRiddleVisible2 = true;
                        }
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "cuadro1") {
                        var frase = "¡Si son las flores del jardín de Wiggle: lirio, tulipán y rosa blanca! ¿Habrá que colocarlas así?";
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto(frase);
                        this.cuadrosInteractuados = true;
                    }
                    if(objeto === "cuadro2") {
                        var frase = "¡Si son las flores de mi jardín: rosa roja, girasol y clavel! ¿Habrá que colocarlas así?";
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto(frase);
                        this.cuadrosInteractuados = true;
                    }
                    if(objeto === "puertaC") {
                        var llave = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Llave cocinas") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que cayó del árbol funciona y abre la puerta!";
                            this.MostrarTexto(frase);
                            this.puertaC.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto(frase);
                        }
                    }
                    if(objeto === "puertaC2") {
                        var llave = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Llave cocinas") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que cayó del árbol funciona y abre la puerta!";
                            this.MostrarTexto(frase);
                            this.puertaC2.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto(frase);
                        }
                    }
                    if(objeto === "muebleCocina") {
                        this.secretoFogones = true;
                        this.resuelveFogones = "R";
                    }
                    if(objeto === "puertaD") {
                        var llave = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Llave baño") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "Sabía que esta llave abriría una puerta para Wiggle, todo siempre está donde no debe...";
                            this.MostrarTexto(frase);
                            this.puertaD.disableBody(true,true);
                            this.simboloPared.visible = true;
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto(frase);
                        }
                    }
                    if(objeto === "simboloPared") {
                        frase = "Estos signos son muy raros, no entiendo nada.";
                        this.MostrarTexto(frase);
                        this.juegoDetenidoRiddle = true;
                        this.puzleSimbolosRiddleVisible = true;
                    }
                    if(objeto === "puertaAlmacen"&&this.puertaAlmacen.visible) {
                        var frase = "Esta puerta no tiene cerradura, pero tiene un cartel y varios números... Sus símbolos me suenan.";
                        this.MostrarTexto(frase);
                        this.juegoDetenidoRiddle = true;
                        this.panelContraseñaRiddleVisible = true;
                    }
                    if(objeto === "candelabro") {
                        var frase = "Este candelabro encendido no encaja del todo en el almacén. Voy a guardarlo por si luego es útil .";
                        this.MostrarTexto(frase);
                        this.candelabro.visible = false;
                        this.inventarioRiddle.push("Candelabro");
                        var objeto = {
                            nombre: "Candelabro",
                            jugador: "R",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                    }
                    if(objeto === "comodaGatos") {
                        var frase;
                        var candelabro = false;
                        for(var i=0; i<this.inventarioRiddle.length; i++) {
                            if(this.inventarioRiddle[i]==="Candelabro") {
                                candelabro = true;
                            }
                        }
                        if(!candelabro) {
                            frase = "Estas estatuillas de gato y las velas que tienen encima significarán algo importante...";
                        }
                        if(!this.mensajeObtenido && candelabro) {
                            frase = "Encima de las estatuillas de los gatos hay unas velas apagadas, ¿podría encenderlas con el candelabro?";
                        }
                        if(this.mensajeObtenido && candelabro&&!this.llamasFelinas) {
                            frase = "El mensaje hablaba de los gatos, ¡debo encender las velas de rubí y zafiro!";
                            this.juegoDetenidoRiddle = true;
                            this.puzleGatosVisibleRiddle = true;
                        }
                        if(this.llamasFelinas) {
                            frase = "Qué manera tan curiosa de ponernos a prueba...";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto === "comodaMensaje") {
                        var frase = "En el cajón de esta cómoda hay una nota muy sospechosa... Esos colores me recuerdan a algo.";
                        this.MostrarTexto(frase);
                        this.juegoDetenidoRiddle = true;
                        this.mensajeGatosVisibleRiddle = true;
                        this.mensajeObtenido = true;
                    }
                    if(objeto==="estanteria3") {
                        var frase = "Un toque de fuego ligado a una dulzura teñida de rojo originan el elixir del rubí.";
                        this.MostrarTexto(frase);
                        if(!this.estanteria3_interactuada) {
                            this.formulaRubi1.paused = false;
                        }
                        this.estanteria3_interactuada = true;
                    }
                    if(objeto==="estanteria4") {
                        var frase = "La frialdad de un amargo invierno se tiñe de azul y crea el elixir del zafiro.";
                        this.MostrarTexto(frase);
                        if(!this.estanteria4_interactuada) {
                            this.formulaZafiro1.paused = false;
                        }
                        this.estanteria4_interactuada = true;
                    }
                    if(objeto==="calderoRubi") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&!this.neveras) {
                            frase = "En este caldero podemos fabricar el elixir del rubí, necesitamos traer los ingredientes.";
                        }
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&this.neveras) {
                            frase = "Wiggle se tiene que encargar de conseguir el elixir de rubí...";
                        }
                        if(!this.estanteria3_interactuada&&!this.estanteria4_interactuada) {
                            frase = "Seguro que este caldero es muy importante, tiene un rubí en su superficie.";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto==="calderoZafiro") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&!this.neveras) {
                            frase = "En este caldero podemos fabricar el elixir del zafiro, necesitamos traer los ingredientes.";
                        }
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&this.neveras&&!this.elixirZafiro) {
                            frase = "Tengo que tener cuidado al escoger los ingredientes y seguir la fórmula...";
                            this.juegoDetenidoRiddle = true;
                            // Mostrar el panel para echar los ingredientes
                            this.puzleCalderoRiddleVisible = true;
                            this.PrepararIngredientesZafiro();
                        }
                        if(!this.estanteria3_interactuada&&!this.estanteria4_interactuada) {
                            frase = "Seguro que este caldero es muy importante, tiene un zafiro en su superficie."
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto==="nevera1") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada) {
                            this.neveras = true;
                            frase = "A ver qué puedo coger de todo lo que hay aquí...";
                            this.juegoDetenidoRiddle = true;
                            // Mostrar lista de ingredientes
                            this.ingredientesNeveraRiddleVisible1 = true;
                            //this.ComprobarInventarioRiddle1();
                        }
                        else {
                            frase = "Hay cosas en buen estado en la nevera que se podrían aprovechar...";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto==="nevera2") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada) {
                            this.neveras = true;
                            frase = "A ver qué puedo coger de todo lo que hay aquí...";
                            this.juegoDetenidoRiddle = true;
                            // Mostrar lista de ingredientes
                            this.ingredientesNeveraRiddleVisible2 = true;
                            //this.ComprobarInventarioRiddle2();
                        }
                        else {
                            frase = "Hay cosas en buen estado en la nevera que se podrían aprovechar...";
                        }
                        this.MostrarTexto(frase);
                    }
                    if(objeto==="puertaBR"||objeto==="puertaBW"||objeto==="puertaLR"||objeto==="puertaLW") {
                        var frase = "No tenemos la llave para abrir esta puerta...";
                        this.MostrarTexto(frase);
                    }
                }
                // WIGGLE
                InteraccionJugador2(objeto) {

                    if(objeto === "caja") {
                        var frase = "Estas cajas son demasiado pesadas y me impiden salir de la habitación. Quizá Riddle me pueda ayudar...";
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "piano") {
                        var frase;
                        if(this.estanteria1_interactuada&&this.estanteria2_interactuada&&!this.sinfoniaSecreta) {
                            frase = "Ahora lo entiendo, lo que decía en los libros... ¡Debo tocar las notas correctas!";
                            this.juegoDetenidoWiggle = true;
                            this.puzlePianoVisible = true;
                        }
                        else {
                            frase = "Qué curioso que haya aquí un piano...";
                        }
                        if(this.sinfoniaSecreta) {
                            frase = "Qué acertijo tan curioso...";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "estanteria1") {
                        var frase = "En este libro aparece un mensaje muy raro... A C# D F E, no sé qué querrá decir.";
                        this.MostrarTexto2(frase);
                        this.estanteria1_interactuada = true;
                    }
                    if(objeto === "estanteria2") {
                        var frase = "Aquí aparece una imagen de un teclado con unas letras.";
                        this.MostrarTexto2(frase);
                        this.estanteria2_interactuada = true;
                        this.libroPianoVisibleWiggle = true;
                    }
                    if(objeto ==="puertaA") {
                        var llave = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Llave habitación") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "Con la llave del piano puedo abrir esta puerta y Riddle podrá salir de aquí.";
                            this.MostrarTexto2(frase);
                            this.puertaA.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto2(frase);
                        }
                    }
                    if(objeto === "mesaLlave" && !this.fragmentoMesa) {
                        this.numeroFragmentosLlave++;
                        this.inventarioWiggle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "W",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoMesa = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "¡Anda! Debajo de la mesa había un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioWiggle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "W",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "¡Anda! Debajo de la mesa había un fragmento de llave";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "cajonesLlave"&&!this.fragmentoCajones) {
                        this.numeroFragmentosLlave++;
                        this.inventarioWiggle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "W",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoCajones = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "Entre los cajones he encontrado un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioWiggle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "W",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "Entre los cajones he encontrado un fragmento de llave";
                        }
                        this.MostrarTexto2(frase);
                    }

                    if(objeto === "fragmentoLlaveB"&&!this.fragmentoSuelo) {
                        this.numeroFragmentosLlave++;
                        this.inventarioWiggle.push("Fragmento de llave");
                        var objeto = {
                            nombre: "Fragmento de llave",
                            jugador: "W",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                        this.fragmentoSuelo = true;
                        var frase;
                        if(this.numeroFragmentosLlave==3) {
                            frase = "Esto parece un fragmento de llave. Ya puedo formar una completa.";
                            this.entrePetalos = true;
                            this.inventarioWiggle.push("Llave jardines");
                            var objeto = {
                                nombre: "Llave jardines",
                                jugador: "W",
                                nombreUsuario: equipo
                            }
                            peticionesServer.añadirObjeto(objeto, devolver_IP());
                        }
                        else {
                            frase = "Esto parece un fragmento de llave. Si consigo más podré formar una completa.";
                        }
                        this.MostrarTexto2(frase);
                        this.fragmento1LlaveB.disableBody(true,true);
                    }

                    if(objeto ==="puertaB") {
                        var llave = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Llave jardines") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que hemos construido encaja perfectamente!";
                            this.MostrarTexto2(frase);
                            this.puertaB.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto2(frase);
                        }
                    }
                    if(objeto ==="puertaB2") {
                        var llave = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Llave jardines") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que hemos construido encaja perfectamente!";
                            this.MostrarTexto2(frase);
                            this.puertaB2.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto2(frase);
                        }
                    }
                    if(objeto === "mesaJardin1") {
                        var frase;
                        if(!this.cuadrosInteractuados) {
                            frase = "Unos girasoles, unas rosas rojas y unos claveles hay en este jardín, qué bonitas flores. ";
                        }
                        else {
                            frase = "Voy a tratar de colocar las flores correctamente...";
                            this.juegoDetenidoWiggle = true;
                            this.puzleFloresWiggleVisible1 = true;
                        }
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "mesaJardin2") {
                        var frase;
                        if(!this.cuadrosInteractuados) {
                            frase = "Unas rosas blancas, unos lirios y unos tulipanes hay en este jardín, qué bonitas flores. ";
                        }
                        else {
                            frase = "Voy a tratar de colocar las flores correctamente...";
                            this.juegoDetenidoWiggle = true;
                            this.puzleFloresWiggleVisible2 = true;
                        }
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "cuadro1") {
                        var frase = "¡Si son las flores de mi jardín: lirio, tulipán y rosa blanca! ¿Habrá que colocarlas así?";
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto2(frase);
                        this.cuadrosInteractuados = true;
                    }
                    if(objeto === "cuadro2") {
                        var frase = "¡Si son las flores del jardín de Riddle: rosa roja, girasol y clavel! ¿Habrá que colocarlas así?";
                        if(this.jardinEnArmonia) {
                            frase = "Colocadas como en los cuadros, las flores quedan más bonitas."
                        }
                        this.MostrarTexto2(frase);
                        this.cuadrosInteractuados = true;
                    }
                    if(objeto === "puertaC") {
                        var llave = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Llave cocinas") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "¡La llave que cayó del árbol funciona y abre la puerta!";
                            this.MostrarTexto2(frase);
                            this.puertaC.disableBody(true,true);
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto2(frase);
                        }
                    }
                    if(objeto === "muebleCocina") {
                        this.secretoFogones = true;
                        this.resuelveFogones = "W";   
                    }
                    if(objeto === "puertaD") {
                        var llave = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Llave baño") {
                                llave = true;
                            }
                        }
                        var frase;
                        if(llave) {
                            frase = "Sabía que esta llave abriría una puerta de esta casa, todo siempre está donde no debe...";
                            this.MostrarTexto2(frase);
                            this.puertaD.disableBody(true,true);
                            this.simboloPared.visible = true;
                        }
                        else {
                            frase = "No tenemos la llave para abrir esta puerta...";
                            this.MostrarTexto2(frase);
                        }
                    }
                    if(objeto === "simboloPared") {
                        frase = "Estos signos parecen formar una ecuación, pero no sé qué número representan...";
                        this.MostrarTexto2(frase);
                        this.juegoDetenidoWiggle = true;
                        this.puzleSimbolosWiggleVisible = true;
                    }
                    if(objeto === "puertaAlmacen"&&this.puertaAlmacen.visible) {
                        var frase = "Esta puerta no tiene cerradura, pero tiene un cartel y varios números... Sus símbolos me suenan.";
                        this.MostrarTexto2(frase);
                        this.juegoDetenidoWiggle = true;
                        this.panelContraseñaWiggleVisible = true;
                    }
                    if(objeto === "candelabro") {
                        var frase = "Este candelabro encendido no encaja del todo en el almacén. Voy a guardarlo por si luego es útil.";
                        this.MostrarTexto2(frase);
                        this.candelabro.visible = false;
                        this.inventarioWiggle.push("Candelabro");
                        var objeto = {
                            nombre: "Candelabro",
                            jugador: "W",
                            nombreUsuario: equipo
                        }
                        peticionesServer.añadirObjeto(objeto, devolver_IP());
                    }
                    if(objeto === "comodaGatos") {
                        var frase;
                        var candelabro = false;
                        for(var i=0; i<this.inventarioWiggle.length; i++) {
                            if(this.inventarioWiggle[i]==="Candelabro") {
                                candelabro = true;
                            }
                        }
                        if(!candelabro) {
                            frase = "Estas estatuillas de gato y las velas que tienen encima significarán algo importante...";
                        }
                        if(!this.mensajeObtenido && candelabro) {
                            frase = "Encima de las estatuillas de los gatos hay unas velas apagadas, ¿podría encenderlas con el candelabro?";
                        }
                        if(this.mensajeObtenido && candelabro &&!this.llamasFelinas) {
                            frase = "El mensaje hablaba de los gatos, ¡debo encender las velas de rubí y zafiro!";
                            this.juegoDetenidoWiggle = true;
                            this.puzleGatosVisibleWiggle = true;
                        }
                        if(this.llamasFelinas) {
                            frase = "Qué manera tan curiosa de ponernos a prueba...";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto === "comodaMensaje") {
                        var frase = "En el cajón de esta cómoda hay una nota muy sospechosa...";
                        this.MostrarTexto2(frase);
                        this.mensajeGatosVisibleWiggle = true;
                        this.mensajeObtenido = true;
                    }
                    if(objeto==="estanteria3") {
                        var frase = "Un toque de fuego ligado a una dulzura teñida de rojo originan el elixir del rubí.";
                        this.MostrarTexto2(frase);
                        if(!this.estanteria3_interactuada) {
                            this.formulaRubi2.paused = false;
                        }
                        this.estanteria3_interactuada = true;
                    }
                    if(objeto==="estanteria4") {
                        var frase = "La frialdad de un amargo invierno se tiñe de azul y crea el elixir del zafiro.";
                        this.MostrarTexto2(frase);
                        if(!this.estanteria4_interactuada) {
                            this.formulaZafiro2.paused = false;
                        }
                        this.estanteria4_interactuada = true;
                    }
                    if(objeto==="calderoRubi") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&!this.neveras) {
                            frase = "En este caldero podemos fabricar el elixir del rubí, necesitamos traer los ingredientes.";
                        }
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&this.neveras&&!this.elixirRubi) {
                            frase = "Tengo que tener cuidado al escoger los ingredientes y seguir la fórmula...";
                            // Mostrar el panel para echar los ingredientes
                            this.juegoDetenidoWiggle = true;
                            this.puzleCalderoWiggleVisible = true;
                        }
                        if(!this.estanteria3_interactuada&&!this.estanteria4_interactuada) {
                            frase = "Seguro que este caldero es muy importante, tiene un rubí en su superficie.";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto==="calderoZafiro") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&!this.neveras) {
                            frase = "En este caldero podemos fabricar el elixir del zafiro, necesitamos traer los ingredientes.";
                        }
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada&&this.neveras) {
                            frase = "Riddle se tiene que encargar de crear el elixir de zafiro...";
                        }
                        if(!this.estanteria3_interactuada&&!this.estanteria4_interactuada) {
                            frase = "Seguro que este caldero es muy importante, tiene un zafiro en su superficie.";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto==="nevera1") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada) {
                            this.neveras = true;
                            frase = "A ver qué puedo coger de todo lo que hay aquí...";
                            // Mostrar lista de ingredientes
                            this.ingredientesNeveraWiggleVisible1 = true;                           
                            this.juegoDetenidoWiggle = true;
                        }
                        else {
                            frase = "Hay cosas en buen estado en la nevera que se podrían aprovechar...";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto==="nevera2") {
                        var frase;
                        if(this.estanteria3_interactuada&&this.estanteria4_interactuada) {
                            this.neveras = true;
                            frase = "A ver qué puedo coger de todo lo que hay aquí...";
                            // Mostrar lista de ingredientes
                            this.ingredientesNeveraWiggleVisible2 = true;
                            this.juegoDetenidoWiggle = true;
                        }
                        else {
                            frase = "Hay cosas en buen estado en la nevera que se podrían aprovechar...";
                        }
                        this.MostrarTexto2(frase);
                    }
                    if(objeto==="puertaBR"||objeto==="puertaBW"||objeto==="puertaLR"||objeto==="puertaLW") {
                        var frase = "No tenemos la llave para abrir esta puerta...";
                        this.MostrarTexto2(frase);
                    }
                }
    
        ///////////////////////////// CONTROL DE FLUJO DEL JUEGO Y DE LOS PUZLES
        InicioAbarrotadoResuelto() {
            if(this.inicioAbarrotado) {
                // Acciones que suceden tras resolver el puzle
                this.caja.disableBody(true, true);
            }
        }
        OcultarLibro1() {
            this.libroPiano1.visible = false;
            this.libroPianoVisibleRiddle = false;
            this.fondoRiddle.visible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
        }

        OcultarLibro2() {
            this.libroPiano2.visible = false;
            this.libroPianoVisibleWiggle = false;
            this.fondoRiddle.visible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
        }

        OcultarPuzlePiano() {
            this.puzlePianoVisible = false;
            this.puzlePiano.visible = false;
            this.fondoWiggle.visible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
        }

        ComprobarComboPiano() {
            if(this.puzlePiano.visible) {
                this.sinfoniaSecreta = true;
                this.OcultarPuzlePiano();
            }
        }

        SinfoniaSecretaResuelta() {
            if(this.sinfoniaSecreta&&!this.resolucionMostradaPiano) {
                // Acciones que suceden tras resolver el puzle
                this.puzlePiano.visible = false;
                this.MostrarTexto2("¡He acertado en la combinación! Del teclado ha salido una llave, no sé qué puerta abrirá.");
                this.inventarioWiggle.push("Llave habitación");
                var objeto = {
                    nombre: "Llave habitación",
                    jugador: "W",
                    nombreUsuario: equipo
                }
                peticionesServer.añadirObjeto(objeto, devolver_IP());
                this.resolucionMostradaPiano = true;
            }
        }

        EntrePetalosResuelto() {
            if(this.entrePetalos) {
                // Se eliminan los fragmentos de llave
                for(var i=0; i<this.inventarioRiddle.length; i++) {
                    if(this.inventarioRiddle[i]!=undefined) {
                        if(this.inventarioRiddle[i]==="Fragmento de llave") {
                            delete this.inventarioRiddle[i];
                        }
                    }
                }
                for(var i=0; i<this.inventarioWiggle.length; i++) {
                    if(this.inventarioWiggle[i]!=undefined) {
                        if(this.inventarioWiggle[i]==="Fragmento de llave") {
                            delete this.inventarioWiggle[i];
                        }
                    }
                }
            }
        }

        OcultarPuzleR1() {
            this.plantaA1.setText('');
            this.plantaB1.setText('');
            this.plantaC1.setText('');
            this.puzleFloresRiddleVisible1 = false;
            this.puzleFloresR1.visible = false;
            this.fondoRiddle.visible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
        }

        OcultarPuzleR2() {
            this.plantaA1.setText('');
            this.plantaB1.setText('');
            this.plantaC1.setText('');
            this.puzleFloresR2.visible = false;
            this.fondoWiggle.visible = false;
            this.puzleFloresRiddleVisible2 = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
        }

        OcultarPuzleW1() {
            this.plantaA2.setText('');
            this.plantaB2.setText('');
            this.plantaC2.setText('');
            this.puzleFloresW1.visible = false;
            this.fondoRiddle.visible = false;
            this.puzleFloresWiggleVisible1 = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
        }

        OcultarPuzleW2() {
            this.plantaA2.setText('');
            this.plantaB2.setText('');
            this.plantaC2.setText('');
            this.puzleFloresW2.visible = false;
            this.fondoWiggle.visible = false;
            this.puzleFloresWiggleVisible2 = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
        }

        ColocarFlores1() {
            // Se representa a la rosa roja con un 1, al clavel con un 2 y al girasol con un 3
            for(var i=0; i<this.floresJardin1.length; i++) {
                switch(i) {
                    case 0:
                        if(this.floresJardin1[i]==="1") {
                            this.rosaRoja.x = this.xPlantaA1;
                            this.rosaRoja.y = this.yPlantaA1;
                        }
                        if(this.floresJardin1[i]==="2") {
                            this.clavel.x = this.xPlantaA1;
                            this.clavel.y = this.yPlantaA1;
                        }
                        if(this.floresJardin1[i]==="3") {
                            this.girasol.x = this.xPlantaA1;
                            this.girasol.y = this.yPlantaA1;
                        }
                        break;
                    case 1:
                        if(this.floresJardin1[i]==="1") {
                            this.rosaRoja.x = this.xPlantaB1;
                            this.rosaRoja.y = this.yPlantaB1;
                        }
                        if(this.floresJardin1[i]==="2") {
                            this.clavel.x = this.xPlantaB1;
                            this.clavel.y = this.yPlantaB1;
                        }
                        if(this.floresJardin1[i]==="3") {
                            this.girasol.x = this.xPlantaB1;
                            this.girasol.y = this.yPlantaB1;
                        }
                        break;
                    case 2:
                        if(this.floresJardin1[i]==="1") {
                            this.rosaRoja.x = this.xPlantaC1;
                            this.rosaRoja.y = this.yPlantaC1;
                        }
                        if(this.floresJardin1[i]==="2") {
                            this.clavel.x = this.xPlantaC1;
                            this.clavel.y = this.yPlantaC1;
                        }
                        if(this.floresJardin1[i]==="3") {
                            this.girasol.x = this.xPlantaC1;
                            this.girasol.y = this.yPlantaC1;
                        }
                }
            }
            this.ComprobarOrdenPlantas();
        }

        ColocarFlores2() {
            // Se representa a la rosa roja con un 1, al clavel con un 2 y al girasol con un 3
            for(var i=0; i<this.floresJardin2.length; i++) {
                switch(i) {
                    case 0:
                        if(this.floresJardin2[i]==="1") {
                            this.rosaBlanca.x = this.xPlantaA2;
                            this.rosaBlanca.y = this.yPlantaA2;
                        }
                        if(this.floresJardin2[i]==="2") {
                            this.lirio.x = this.xPlantaA2;
                            this.lirio.y = this.yPlantaA2;
                        }
                        if(this.floresJardin2[i]==="3") {
                            this.tulipan.x = this.xPlantaA2;
                            this.tulipan.y = this.yPlantaA2;
                        }
                        break;
                    case 1:
                        if(this.floresJardin2[i]==="1") {
                            this.rosaBlanca.x = this.xPlantaB2;
                            this.rosaBlanca.y = this.yPlantaB2;
                        }
                        if(this.floresJardin2[i]==="2") {
                            this.lirio.x = this.xPlantaB2;
                            this.lirio.y = this.yPlantaB2;
                        }
                        if(this.floresJardin2[i]==="3") {
                            this.tulipan.x = this.xPlantaB2;
                            this.tulipan.y = this.yPlantaB2;
                        }
                        break;
                    case 2:
                        if(this.floresJardin2[i]==="1") {
                            this.rosaBlanca.x = this.xPlantaC2;
                            this.rosaBlanca.y = this.yPlantaC2;
                        }
                        if(this.floresJardin2[i]==="2") {
                            this.lirio.x = this.xPlantaC2;
                            this.lirio.y = this.yPlantaC2;
                        }
                        if(this.floresJardin2[i]==="3") {
                            this.tulipan.x = this.xPlantaC2;
                            this.tulipan.y = this.yPlantaC2;
                        }
                }
            }
            this.ComprobarOrdenPlantas();
        }

        NuevoIntentoPlantas() {
            this.nuevoIntento = true;
            this.temporizadorNuevoIntento = this.time.addEvent({ delay: 300, callback: this.NuevoIntentoPlantas, callbackScope: this});
            this.temporizadorNuevoIntento.paused = true;
        }

        ComprobarOrdenPlantas() {
            if(
                this.floresJardin1[0]==="1"&&
                this.floresJardin1[1]==="3"&&
                this.floresJardin1[2]==="2"&&
                this.floresJardin2[0]==="2"&&
                this.floresJardin2[1]==="3"&&
                this.floresJardin2[2]==="1"
            ) {
                this.jardinEnArmonia = true;
            }     
        }

        JardinEnArmoniaResuelto() {
            if(this.jardinEnArmonia&&!this.resolucionMostradaJardin) {
                var frase = "¡Lo hemos resuelto! Ha caído una nueva llave del árbol. ¿Qué puertas abrirá?";
                this.MostrarTexto(frase);
                this.MostrarTexto2(frase);
                this.resolucionMostradaJardin = true;
                this.inventarioRiddle.push("Llave cocinas");
                var objeto = {
                    nombre: "Llave cocinas",
                    jugador: "R",
                    nombreUsuario: equipo
                }
                peticionesServer.añadirObjeto(objeto, devolver_IP());
                this.inventarioWiggle.push("Llave cocinas");
                var objeto = {
                    nombre: "Llave cocinas",
                    jugador: "W",
                    nombreUsuario: equipo
                }
                peticionesServer.añadirObjeto(objeto, devolver_IP());
            }
        }

        SecretoEnLosFogonesResuelto() {
            if(this.secretoFogones&&!this.resolucionMostradaCocina) {
                var frase = "Otra llave se encontraba oculta en los muebles... Esto comienza a ser un caos. ¿De dónde será?";
                this.resolucionMostradaCocina = true;

                if(this.resuelveFogones==="R") {
                    this.MostrarTexto(frase);
                    this.inventarioRiddle.push("Llave baño");
                    var objeto = {
                        nombre: "Llave baño",
                        jugador: "R",
                        nombreUsuario: equipo
                    }
                    peticionesServer.añadirObjeto(objeto, devolver_IP());
                }
                if(this.resuelveFogones==="W") {
                    this.MostrarTexto2(frase);
                    this.inventarioWiggle.push("Llave baño");
                    var objeto = {
                        nombre: "Llave baño",
                        jugador: "W",
                        nombreUsuario: equipo
                    }
                    peticionesServer.añadirObjeto(objeto, devolver_IP());
                }
            }
        }

        OcultarPuzleSimbolos1() {
            this.puzleSimbolosRiddleVisible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoWiggle.visible = false;
            this.puzleSimbolos.visible =false;
        }

        OcultarPuzleSimbolos2() {
            this.puzleSimbolosWiggleVisible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
            this.fondoWiggle.visible = false;
            this.puzleSimbolos2.visible =false;
        }

        OcultarPuzleContraseña1() {
            this.panelContraseña1.visible = false;
            this.contraseña1.setText('');
            this.panelContraseñaRiddleVisible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoWiggle.visible = false;
        }

        OcultarPuzleContraseña2() {
            this.panelContraseña2.visible = false;
            this.contraseña2.setText('');
            this.panelContraseñaWiggleVisible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
            this.fondoWiggle.visible = false;
        }

        ComprobarContraseñaSimbolos(resolutor) {
            if(
                this.contraseñaSimbolos[0]==="1"&&
                this.contraseñaSimbolos[1]==="7"&&
                this.contraseñaSimbolos[2]==="9"
            ) {
                this.contraseña1.setText('');
                this.contraseña2.setText('');
                this.enigmaAlmacen = true;
                this.OcultarPuzleContraseña1();
                this.OcultarPuzleContraseña2();
            }
            else {
                for(var i=0; i<this.contraseñaSimbolos.length; i++) {
                    this.contraseñaSimbolos[i] = 0;
                }
                var frase = "La contraseña no abre la puerta...";
                if(resolutor=="R") {
                    this.MostrarTexto(frase);
                }
                else {
                    this.MostrarTexto2(frase);
                }
            }
        }

        EnigmaAlmacenResuelto() {
            if(this.enigmaAlmacen&&!this.resolucionMostradaAlmacen) {
                var frase = "¡La contraseña es correcta! Hemos podido entrar en el almacén y hemos encontrado un candelabro...";
                this.MostrarTexto(frase);
                this.MostrarTexto2(frase);
                this.panelContraseña1.visible = false;
                this.panelContraseña2.visible = false;
                this.juegoDetenidoRiddle = false;
                this.juegoDetenidoWiggle = false;
                this.resolucionMostradaAlmacen = true;
                this.inventarioWiggle.push("Candelabro");
                var objeto = {
                    nombre: "Candelabro",
                    jugador: "W",
                    nombreUsuario: equipo
                }
                peticionesServer.añadirObjeto(objeto, devolver_IP());
                this.inventarioRiddle.push("Candelabro");
                var objeto = {
                    nombre: "Candelabro",
                    jugador: "R",
                    nombreUsuario: equipo
                }
                peticionesServer.añadirObjeto(objeto, devolver_IP());
            }
        }
        PrepararVelasRiddle() {
            this.puzleGatos1.visible = true;
            if(this.velasEncendidas[0]) {
                this.vela1AE.visible = true;
            }
            if(!this.velasEncendidas[0]) {
                this.vela1AN.visible = true;
            }
            if(this.velasEncendidas[1]) {
                this.vela2AE.visible = true;
            }
            if(!this.velasEncendidas[1]) {
                this.vela2AN.visible = true;
            }
            if(this.velasEncendidas[2]) {
                this.vela3AE.visible = true;
            }
            if(!this.velasEncendidas[2]) {
                this.vela3AN.visible = true;
            }
            if(this.velasEncendidas[3]) {
                this.vela4AE.visible = true;
            }
            if(!this.velasEncendidas[3]) {
                this.vela4AN.visible = true;
            }
            if(this.velasEncendidas[4]) {
                this.vela5AE.visible = true;
            }
            if(!this.velasEncendidas[4]) {
                this.vela5AN.visible = true;
            }
        }

        PrepararVelasWiggle() {
            this.puzleGatos2.visible = true;
            if(this.velasEncendidas[0]) {
                this.vela1BE.visible = true;
            }
            if(!this.velasEncendidas[0]) {
                this.vela1BN.visible = true;
            }
            if(this.velasEncendidas[1]) {
                this.vela2BE.visible = true;
            }
            if(!this.velasEncendidas[1]) {
                this.vela2BN.visible = true;
            }
            if(this.velasEncendidas[2]) {
                this.vela3BE.visible = true;
            }
            if(!this.velasEncendidas[2]) {
                this.vela3BN.visible = true;
            }
            if(this.velasEncendidas[3]) {
                this.vela4BE.visible = true;
            }
            if(!this.velasEncendidas[3]) {
                this.vela4BN.visible = true;
            }
            if(this.velasEncendidas[4]) {
                this.vela5BE.visible = true;
            }
            if(!this.velasEncendidas[4]) {
                this.vela5BN.visible = true;
            }
        }

        OcultarPuzleGatos1() {
            this.puzleGatos1.visible = false;
            this.vela1AE.visible = false;
            this.vela1AN.visible = false;
            this.vela2AE.visible = false;
            this.vela2AN.visible = false;
            this.vela3AE.visible = false;
            this.vela3AN.visible = false;
            this.vela4AE.visible = false;
            this.vela4AN.visible = false;
            this.vela5AE.visible = false;
            this.vela5AN.visible = false;
            this.puzleGatosVisibleRiddle = false;
            this.fondoWiggle.visible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
        }

        OcultarPuzleGatos2() {
            this.puzleGatos2.visible = false;
            this.vela1BE.visible = false;
            this.vela1BN.visible = false;
            this.vela2BE.visible = false;
            this.vela2BN.visible = false;
            this.vela3BE.visible = false;
            this.vela3BN.visible = false;
            this.vela4BE.visible = false;
            this.vela4BN.visible = false;
            this.vela5BE.visible = false;
            this.vela5BN.visible = false;
            this.puzleGatosVisibleWiggle = false;
            this.fondoWiggle.visible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
        }

        ComprobarVelasEncendidas() {
            if(
                !this.velasEncendidas[0]&&
                !this.velasEncendidas[1]&&
                this.velasEncendidas[2]&&
                !this.velasEncendidas[3]&&
                this.velasEncendidas[4]
            ) {
                this.llamasFelinas = true;
            }
        }
        OcultarMensajeGatos1() {
            this.mensajeGatos1.visible = false;
            this.mensajeGatosVisibleRiddle = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoWiggle.visible = false;
        }

        OcultarMensajeGatos2() {
            this.mensajeGatos2.visible = false;
            this.mensajeGatosVisibleWiggle = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
            this.fondoWiggle.visible = false;
        }

        LlamasFelinasResuelto() {
            if(this.llamasFelinas&&!this.mensajeGatosMostrado) {
                this.puzleGatos1.visible = false;
                this.puzleGatos2.visible = false;
                this.juegoDetenidoRiddle = false;
                this.juegoDetenidoWiggle = false;
                this.vela1AE.visible = false;
                this.vela1AN.visible = false;
                this.vela2AE.visible = false;
                this.vela2AN.visible = false;
                this.vela3AE.visible = false;
                this.vela3AN.visible = false;
                this.vela4AE.visible = false;
                this.vela4AN.visible = false;
                this.vela5AE.visible = false;
                this.vela5AN.visible = false;
                this.vela1BE.visible = false;
                this.vela1BN.visible = false;
                this.vela2BE.visible = false;
                this.vela2BN.visible = false;
                this.vela3BE.visible = false;
                this.vela3BN.visible = false;
                this.vela4BE.visible = false;
                this.vela4BN.visible = false;
                this.vela5BE.visible = false;
                this.vela5BN.visible = false;
                this.OcultarPuzleGatos1();
                this.OcultarPuzleGatos2();
                var candelabroWiggle = false;
                for(var i=0; i<this.inventarioWiggle.length; i++) {
                    if(this.inventarioWiggle[i]==="Candelabro") {
                        candelabroWiggle = true;
                    }
                }
                var frase = "He debido de acertar, porque se ha escuchado un ruido y, ¡he visto abrirse el resto de puertas!";
                if(candelabroWiggle) {
                    this.MostrarTexto2(frase);
                }
                else {
                    this.MostrarTexto(frase);
                }
                this.mensajeGatosMostrado = true;

                // Abrir todas las puertas
                this.puertaBibliotecaRiddle.disableBody(true,true);
                this.puertaBibliotecaWiggle.disableBody(true,true);
                this.puertaLaboratorioRiddle.disableBody(true,true);
                this.puertaLaboratorioWiggle.disableBody(true,true);

            }
        }

        MostrarTextoRubi1() {
            var frase = "Parece la fórmula del elixir rojo que necesitamos para salir. Hay que buscar los ingredientes.";
            this.MostrarTexto(frase);
            this.formulaRubi1.paused = true;
        }

        MostrarTextoRubi2() {
            var frase = "Parece la fórmula del elixir rojo que necesitamos para salir. Hay que buscar los ingredientes.";
            this.MostrarTexto2(frase);
            this.formulaRubi2.paused = true;
        }

        MostrarTextoZafiro1() {
            var frase = "Parece la fórmula del elixir azul que necesitamos para salir. Hay que buscar los ingredientes.";
            this.MostrarTexto(frase);
            this.formulaZafiro1.paused = true;
        }

        MostrarTextoZafiro2() {
            var frase = "Parece la fórmula del elixir azul que necesitamos para salir. Hay que buscar los ingredientes.";
            this.MostrarTexto2(frase);
            this.formulaZafiro2.paused = true;
        }


        OcultarIngredientesNeveraR1() {
            this.ingredientesNeveraR1.visible = false;
            for(var i=0; i<this.iconosNevera1.length; i++) {
                this.iconosNevera1[i].visible = false;
                this.iconosNevera2[i].visible = false;
            }
            this.ingredientesNeveraRiddleVisible1 = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoWiggle.visible = false;
        }

        OcultarIngredientesNeveraR2() {
            this.ingredientesNeveraR2.visible = false;
            for(var i=0; i<this.iconosNevera2.length; i++) {
                this.iconosNevera1[i].visible = false;
                this.iconosNevera2[i].visible = false;
            }
            this.ingredientesNeveraRiddleVisible2 = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoRiddle.visible = false;
        }

        OcultarIngredientesNeveraW1() {
            this.ingredientesNeveraW1.visible = false;
            for(var i=0; i<this.iconosNevera1.length; i++) {
                this.iconosNevera1[i].visible = false;
                this.iconosNevera2[i].visible = false;
            }
            this.ingredientesNeveraWiggleVisible1 = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
            this.fondoWiggle.visible = false;
        }

        OcultarIngredientesNeveraW2() {
            this.ingredientesNeveraW2.visible = false;
            for(var i=0; i<this.iconosNevera2.length; i++) {
                this.iconosNevera1[i].visible = false;
                this.iconosNevera2[i].visible = false;
            }
            this.ingredientesNeveraWiggleVisible2 = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
            this.fondoRiddle.visible = false;
        }

        OcultarIngredientesCaldero1() {
            this.ingredientesCaldero1.visible = false;
            for(var i=0; i<this.arrayIngredientesRiddle.length; i++) {
                this.arrayIngredientesRiddle[i].setText('');
            }
            for(var i=0; i<this.iconosCaldero1.length;i++) {
                this.iconosCaldero1[i].visible = false;
            }
            for(var i=0; i<this.ingredientesIntroducidosCaldero1.length;i++) {
                    this.ingredientesIntroducidosCaldero1[i] = 0;
                }
            this.puzleCalderoRiddleVisible = false;
        this.camera2.setZoom(3); // Ajusta el valor según sea necesario
        this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
        this.camera2.startFollow(this.Riddle);
            this.fondoRiddle.visible = false;
        }

        OcultarIngredientesCaldero2() {
            this.ingredientesCaldero2.visible = false;
            for(var i=0; i<this.arrayIngredientesWiggle.length; i++) {
                this.arrayIngredientesWiggle[i].setText('');
            }
            for(var i=0; i<this.iconosCaldero2.length;i++) {
                this.iconosCaldero2[i].visible = false;
            }
            for(var i=0; i<this.ingredientesIntroducidosCaldero2.length;i++) {
                    this.ingredientesIntroducidosCaldero2[i] = 0;
                }
                this.puzleCalderoWiggleVisible = false;
        this.camera1.setZoom(3); // Ajusta el valor según sea necesario
        this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
        this.camera1.startFollow(this.Wiggle);
                this.fondoWiggle.visible = false;
        }

        ComprobarInventarioRiddle1() {
            for(var i=0; i<this.inventarioRiddle.length;i++) {
                if(this.inventarioRiddle[i]==="Pitahayas") {
                    this.ingredientesRiddle1[0] = true;
                }
                if(this.inventarioRiddle[i]==="Uvas") {
                    this.ingredientesRiddle1[1] = true;
                }
                if(this.inventarioRiddle[i]==="Zumo de tomate") {
                    this.ingredientesRiddle1[2] = true;
                }
                if(this.inventarioRiddle[i]==="Manzana") {
                    this.ingredientesRiddle1[3] = true;
                }
                if(this.inventarioRiddle[i]==="Pomelo") {
                    this.ingredientesRiddle1[4] = true;
                }
                if(this.inventarioRiddle[i]==="Calabaza") {
                    this.ingredientesRiddle1[5] = true;
                }
                if(this.inventarioRiddle[i]==="Zumo de piña") {
                    this.ingredientesRiddle1[6] = true;
                }
            }
            for(var i=0; i<this.ingredientesRiddle1.length;i++) {
                if(this.ingredientesRiddle1[i]) {
                    this.iconosNevera2[i].visible = true;
                }
            }
        }

        ComprobarInventarioRiddle2() {
            for(var i=0; i<this.inventarioRiddle.length;i++) {
                if(this.inventarioRiddle[i]==="Coco helado") {
                    this.ingredientesRiddle2[0] = true;
                }
                if(this.inventarioRiddle[i]==="Cerezas") {
                    this.ingredientesRiddle2[1] = true;
                }
                if(this.inventarioRiddle[i]==="Zumo de arandanos") {
                    this.ingredientesRiddle2[2] = true;
                }
                if(this.inventarioRiddle[i]==="Zumo de naranja") {
                    this.ingredientesRiddle2[3] = true;
                }
                if(this.inventarioRiddle[i]==="Limon") {
                    this.ingredientesRiddle2[4] = true;
                }
                if(this.inventarioRiddle[i]==="Sandia") {
                    this.ingredientesRiddle2[5] = true;
                }
                if(this.inventarioRiddle[i]==="Melon") {
                    this.ingredientesRiddle2[6] = true;
                }
            }
            for(var i=0; i<this.ingredientesRiddle2.length;i++) {
                if(this.ingredientesRiddle2[i]) {
                    this.iconosNevera1[i].visible = true;
                }
            }
        }

        ComprobarInventarioWiggle1() {
            for(var i=0; i<this.inventarioWiggle.length;i++) {
                if(this.inventarioWiggle[i]==="Pitahayas") {
                    this.ingredientesWiggle1[0] = true;
                }
                if(this.inventarioWiggle[i]==="Uvas") {
                    this.ingredientesWiggle1[1] = true;
                }
                if(this.inventarioWiggle[i]==="Zumo de tomate") {
                    this.ingredientesWiggle1[2] = true;
                }
                if(this.inventarioWiggle[i]==="Manzana") {
                    this.ingredientesWiggle1[3] = true;
                }
                if(this.inventarioWiggle[i]==="Pomelo") {
                    this.ingredientesWiggle1[4] = true;
                }
                if(this.inventarioWiggle[i]==="Calabaza") {
                    this.ingredientesWiggle1[5] = true;
                }
                if(this.inventarioWiggle[i]==="Zumo de piña") {
                    this.ingredientesWiggle1[6] = true;
                }
            }
            for(var i=0; i<this.ingredientesWiggle1.length;i++) {
                if(this.ingredientesWiggle1[i]) {
                    this.iconosNevera2[i].visible = true;
                }
            }
        }

        ComprobarInventarioWiggle2() {
            for(var i=0; i<this.inventarioWiggle.length;i++) {
                if(this.inventarioWiggle[i]==="Coco helado") {
                    this.ingredientesWiggle2[0] = true;
                }
                if(this.inventarioWiggle[i]==="Cerezas") {
                    this.ingredientesWiggle2[1] = true;
                }
                if(this.inventarioWiggle[i]==="Zumo de arandanos") {
                    this.ingredientesWiggle2[2] = true;
                }
                if(this.inventarioWiggle[i]==="Zumo de naranja") {
                    this.ingredientesWiggle2[3] = true;
                }
                if(this.inventarioWiggle[i]==="Limon") {
                    this.ingredientesWiggle2[4] = true;
                }
                if(this.inventarioWiggle[i]==="Sandia") {
                    this.ingredientesWiggle2[5] = true;
                }
                if(this.inventarioWiggle[i]==="Melon") {
                    this.ingredientesWiggle2[6] = true;
                }
            }
            for(var i=0; i<this.ingredientesWiggle2.length;i++) {
                if(this.ingredientesWiggle2[i]) {
                    this.iconosNevera1[i].visible = true;
                }
            }
        }

        PrepararIngredientesZafiro() {
            var indice = 0;
            var clave = indice+1;
            for(var i=0; i<this.ingredientesRiddle1.length*2;i++) {
                if(i<7) {
                    if(this.ingredientesRiddle1[i]) {
                        switch(i) {
                            case 0:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Pitahayas");
                                break;
                            case 1:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Uvas");
                                break;
                            case 2:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Zumo de tomate");
                                break;
                            case 3:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Manzana");
                                break;
                            case 4:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Pomelo");
                                break;
                            case 5:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Calabaza");
                                break;
                            case 6:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Zumo de piña");
                                break;
                        }
                        indice++;
                        this.numeroIngredientesCaldero1++;
                        if(indice<9) {
                            clave = indice+1;
                        }
                        if(indice==9) {
                            clave = "A";
                        }
                        if(indice==10) {
                            clave = "B";
                        }
                        if(indice==11) {
                            clave = "C";
                        }
                        if(indice==12) {
                            clave = "D";
                        }
                        if(indice==13) {
                            clave = "E";
                        }
                    }
                }
                else {
                    if(this.ingredientesRiddle2[i-this.ingredientesRiddle1.length]) {
                        switch(i-this.ingredientesRiddle1.length) {
                            case 0:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Coco helado");
                                break;
                            case 1:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Cerezas");
                                break;
                            case 2:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Zumo de arándanos");
                                break;
                            case 3:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Zumo de naranja");
                                break;
                            case 4:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Limón");
                                break;
                            case 5:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Sandía");
                                break;
                            case 6:
                                this.arrayIngredientesRiddle[indice].setText((clave)+"- Melón");
                                break;
                        }
                        indice++;
                        this.numeroIngredientesCaldero1++;
                        if(indice<9) {
                            clave = indice+1;
                        }
                        if(indice==9) {
                            clave = "A";
                        }
                        if(indice==10) {
                            clave = "B";
                        }
                        if(indice==11) {
                            clave = "C";
                        }
                        if(indice==12) {
                            clave = "D";
                        }
                        if(indice==13) {
                            clave = "E";
                        }
                    }
                }
            }
        }

        PrepararIngredientesRubi() {
            var indice = 0;
            var clave = indice+1;
            for(var i=0; i<this.ingredientesWiggle1.length*2;i++) {
                if(i<7) {
                    if(this.ingredientesWiggle1[i]) {
                        switch(i) {
                            case 0:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Pitahayas");
                                break;
                            case 1:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Uvas");
                                break;
                            case 2:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Zumo de tomate");
                                break;
                            case 3:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Manzana");
                                break;
                            case 4:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Pomelo");
                                break;
                            case 5:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Calabaza");
                                break;
                            case 6:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Zumo de piña");
                                break;
                        }
                        indice++;
                        this.numeroIngredientesCaldero2++;
                        if(indice<9) {
                            clave = indice+1;
                        }
                        if(indice==9) {
                            clave = "A";
                        }
                        if(indice==10) {
                            clave = "B";
                        }
                        if(indice==11) {
                            clave = "C";
                        }
                        if(indice==12) {
                            clave = "D";
                        }
                        if(indice==13) {
                            clave = "E";
                        }
                    }
                }
                else {
                    if(this.ingredientesWiggle2[i-this.ingredientesWiggle1.length]) {
                        switch(i-this.ingredientesWiggle1.length) {
                            case 0:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Coco helado");
                                break;
                            case 1:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Cerezas");
                                break;
                            case 2:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Zumo de arándanos");
                                break;
                            case 3:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Zumo de naranja");
                                break;
                            case 4:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Limón");
                                break;
                            case 5:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Sandía");
                                break;
                            case 6:
                                this.arrayIngredientesWiggle[indice].setText((clave)+"- Melón");
                                break;
                        }
                        indice++;
                        this.numeroIngredientesCaldero2++;
                        if(indice<9) {
                            clave = indice+1;
                        }
                        if(indice==9) {
                            clave = "A";
                        }
                        if(indice==10) {
                            clave = "B";
                        }
                        if(indice==11) {
                            clave = "C";
                        }
                        if(indice==12) {
                            clave = "D";
                        }
                        if(indice==13) {
                            clave = "E";
                        }
                    }
                }
            }
        }

        AñadirIngredienteZafiro(indice) {
            var contador = 0;
            var idIngrediente = 0;
            for(var i=0; i<this.ingredientesRiddle1.length*2;i++) {
                if(i<7) {
                    if(this.ingredientesRiddle1[i]) {
                        contador++;
                    }
                }
                else {
                    if(this.ingredientesRiddle2[i-this.ingredientesRiddle1.length]) {
                        contador++;
                    }
                }
                if(contador==indice&&idIngrediente==0) {
                    idIngrediente = i+1;
                }
            }
            this.ingredientesIntroducidosCaldero1[this.numeroIngredientesIntroducidos1] = idIngrediente;
        }

        AñadirIngredienteRubi(indice) {
            var contador = 0;
            var idIngrediente = 0;
            for(var i=0; i<this.ingredientesWiggle1.length*2;i++) {
                if(i<7) {
                    if(this.ingredientesWiggle1[i]) {
                        contador++;
                    }
                }
                else {
                    if(this.ingredientesWiggle2[i-this.ingredientesWiggle1.length]) {
                        contador++;
                    }
                }
                if(contador==indice&&idIngrediente==0) {
                    idIngrediente = i+1;
                }
            }
            this.ingredientesIntroducidosCaldero2[this.numeroIngredientesIntroducidos2] = idIngrediente;
        }

        ComprobarFormulaZafiro() {
            var frase;
            // Los identificadores de los ingredientes que tienen que estar en los introducidos son: 5, 8, 10 (Pomelo, coco helado y zumo de arándanos)
            var id5 = false;
            var id8 = false;
            var id10 = false;
            for(var i=0; i<this.ingredientesIntroducidosCaldero1.length;i++) {
                if(this.ingredientesIntroducidosCaldero1[i]==5) {
                    id5 = true;
                }
                if(this.ingredientesIntroducidosCaldero1[i]==8) {
                    id8 = true;
                }
                if(this.ingredientesIntroducidosCaldero1[i]==10) {
                    id10 = true;
                }
            }
            if(id5&&id8&&id10) {
                // Cambiar icono caldero azul
                this.caldero1zafiro.visible = false;
                this.caldero2zafiro.visible = true;
                this.elixirZafiro = true;
                if(this.elixirRubi) {
                    this.maestroMezclas = true;
                }
                else{
                    frase = "El contenido del caldero se ha teñido de azul, ¡he acertado! Solo queda que Wiggle haga lo suyo.";
                }
            }
            else {
                frase = "He debido de equivocarme en algo, revisaré bien la fórmula y los detalles de cada ingrediente.";

            }
            this.OcultarIngredientesCaldero1();
            this.MostrarTexto(frase);
        }

        ComprobarFormulaRubi() {
            var frase;
            // Los identificadores de los ingredientes que tienen que estar en los introducidos son: 1, 3, 9 (Pitahayas, zumo de tomate y cerezas)
            var id1 = false;
            var id3 = false;
            var id9 = false;
            for(var i=0; i<this.ingredientesIntroducidosCaldero2.length;i++) {
                if(this.ingredientesIntroducidosCaldero2[i]==1) {
                    id1 = true;
                }
                if(this.ingredientesIntroducidosCaldero2[i]==3) {
                    id3 = true;
                }
                if(this.ingredientesIntroducidosCaldero2[i]==9) {
                    id9 = true;
                }
            }
            if(id1&&id3&&id9) {                       
                // Cambiar icono caldero rojo
                this.caldero1rubi.visible = false;
                this.caldero2rubi.visible = true;
                this.elixirRubi = true;
                if(this.elixirZafiro) {
                    this.maestroMezclas = true;
                }
                else{
                    frase = "El contenido del caldero se ha teñido de rojo, ¡he acertado! Solo queda que Riddle haga lo suyo.";
                }
            }
            else {
                frase = "He debido de equivocarme en algo, revisaré bien la fórmula y los detalles de cada ingrediente."
            }
            this.OcultarIngredientesCaldero2();
            this.MostrarTexto2(frase);
        }

        ComprobarMaestroMezclas() {
            if(this.maestroMezclas&&!this.finalMostrado) {
                var frase = "Los dos elixires están empezando a crear un portal y a derretir el candado... ¡Por fin saldremos de aquí!";
                this.MostrarTexto(frase);
                this.MostrarTexto2(frase);
                this.finalMostrado = true;
                this.victoriaJuego.paused = false;
            }
        }
        actualizarContador(){
            this.tiempo.segundos--;
            this.tiempo.segundos = (this.tiempo.segundos>=10)? this.tiempo.segundos: '0' + this.tiempo.segundos;
            if(this.tiempo.segundos==0){
                if(this.tiempo.minutos=="00") {
                    this.derrotaJuego.paused = false;
                } else {
                    this.tiempo.segundos = '59'
                    this.tiempo.minutos--;
                    this.tiempo.minutos = (this.tiempo.minutos>=10)? this.tiempo.minutos: '0' + this.tiempo.minutos;
                }
            }
            //TEXTO TEMPORIZADOR
            this.textoTemp.setText('Tiempo restante: ' +this.tiempo.minutos + ':' +this.tiempo.segundos);
        }
        IntercambiarPosiciones(player, player2) {
            // Intercambiar las posiciones x e y de los objetos
            var tempX = this.Riddle.x;
            var tempY = this.Riddle.y;
        
            this.Riddle.x = this.Wiggle.x;
            this.Riddle.y = this.Wiggle.y;
        
            this.Wiggle.x = tempX;
            this.Wiggle.y = tempY;
            
        }

        FinJuego() {
            // TRANSICIÓN A ESCENA DE VICTORIA
            this.juegoDetenidoRiddle = true;
            this.juegoDetenidoWiggle = true;
            this.camera1.setZoom(1);
            this.camera1.stopFollow();
            this.camera1.centerOn(200,400);
            this.camera2.setZoom(1); // Ajusta el valor según sea necesario
            this.camera2.stopFollow();
            this.camera2.centerOn(600, 400);
            // Gestión de records con el servidor
            this.victoria.visible = true;
            this.MostrarRecordsTiempo();
        }

        DerrotaFin() {
            // TRANSICIÓN A ESCENA DE DERROTA
            this.juegoDetenidoRiddle = true;
            this.juegoDetenidoWiggle = true;
            this.camera1.setZoom(1);
            this.camera1.stopFollow();
            this.camera1.centerOn(200,400);
            this.camera2.setZoom(1); // Ajusta el valor según sea necesario
            this.camera2.stopFollow();
            this.camera2.centerOn(600, 400);
            this.derrota.visible = true;
        }
        // Gestión de elementos con la API REST
        ReiniciarObjetos() {
            if(!this.reiniciado) {
                // Se obtiene la longitud de los objetos
                var longitud = 0;
                $.ajax({
                    url: 'http://'+devolver_IP()+'/objetos'
                }).done(function(objetos) {
                    console.log('Objetos cargados: '+ JSON.stringify(objetos));
                    longitud = objetos.length;
                    // Se eliminan los objetos por su identificador
                    for(var i=0; i<longitud; i++) {
                        peticionesServer.destruirObjeto(i+1, devolver_IP());
                    }
                }).fail(function() {
                    console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
                })
                this.reiniciado = true;
            }
        }

        MostrarInventarioRiddle() {
            if(this.Riddle.x>400) {
                this.inventarioRiddleImg.x = 600;
                this.objeto1R.x = 445;
                this.objeto2R.x = 445;
                this.objeto3R.x = 445;
                this.objeto4R.x = 445;
                this.objeto5R.x = 445;
                this.objeto6R.x = 445;
                this.objeto7R.x = 445;
                this.objeto8R.x = 445;
                this.objeto9R.x = 445;
                this.objeto10R.x = 445;
                this.objeto11R.x = 445;
                this.objeto12R.x = 445;
                this.objeto13R.x = 615;
                this.objeto14R.x = 615;
                this.objeto15R.x = 615;
                this.objeto16R.x = 615;
                this.objeto17R.x = 615;
                this.objeto18R.x = 615;
                this.objeto19R.x = 615;
                this.objeto20R.x = 615;
                this.objeto21R.x = 615;
                this.objeto22R.x = 615;
                this.objeto23R.x = 615;
                this.fondoRiddle.visible = true;
            }
            else {
                this.inventarioRiddleImg.x = 200;
                this.objeto1R.x = 45;
                this.objeto2R.x = 45;
                this.objeto3R.x = 45;
                this.objeto4R.x = 45;
                this.objeto5R.x = 45;
                this.objeto6R.x = 45;
                this.objeto7R.x = 45;
                this.objeto8R.x = 45;
                this.objeto9R.x = 45;
                this.objeto10R.x = 45;
                this.objeto11R.x = 45;
                this.objeto12R.x = 45;
                this.objeto13R.x = 215;
                this.objeto14R.x = 215;
                this.objeto15R.x = 215;
                this.objeto16R.x = 215;
                this.objeto17R.x = 215;
                this.objeto18R.x = 215;
                this.objeto19R.x = 215;
                this.objeto20R.x = 215;
                this.objeto21R.x = 215;
                this.objeto22R.x = 215;
                this.objeto23R.x = 215;
                this.fondoWiggle.visible = true;
            }
            this.inventarioRiddleImg.visible = true;
            $.ajax({
                url: 'http://'+devolver_IP()+'/objetos'
            }).done(function(objetos) {
                var indice = 0;
                for(var i=0; i<objetos.length; i++) {
                    if(objetos[i]!=null) {         
                        if(objetos[i].jugador=="R" && objetos[i].nombreEquipo == equipo) {
                            textoObjetosRiddle[indice].setText(objetos[i].nombre);
                            indice++;
                        }
                    }
                }
            }).fail(function() {
                console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
            })
        }

        OcultarInventarioRiddle() {
            for(var i=0; i<textoObjetosRiddle.length; i++) {
                textoObjetosRiddle[i].setText('');
            }
            this.inventarioRiddleImg.visible = false;
            if(this.Riddle.x>400) {
                this.fondoRiddle.visible = false;
            }
            else {
                this.fondoWiggle.visible = false;
            }
            this.camera2.setZoom(3); // Ajusta el valor según sea necesario
            this.camera2.centerOn(this.Riddle.x, this.Riddle.y);
            this.camera2.startFollow(this.Riddle);
        }

        MostrarInventarioWiggle() {
            if(this.Wiggle.x>400) {
                this.inventarioWiggleImg.x = 600;
                this.objeto1W.x = 445;
                this.objeto2W.x = 445;
                this.objeto3W.x = 445;
                this.objeto4W.x = 445;
                this.objeto5W.x = 445;
                this.objeto6W.x = 445;
                this.objeto7W.x = 445;
                this.objeto8W.x = 445;
                this.objeto9W.x = 445;
                this.objeto10W.x = 445;
                this.objeto11W.x = 445;
                this.objeto12W.x = 445;
                this.objeto13W.x = 615;
                this.objeto14W.x = 615;
                this.objeto15W.x = 615;
                this.objeto16W.x = 615;
                this.objeto17W.x = 615;
                this.objeto18W.x = 615;
                this.objeto19W.x = 615;
                this.objeto20W.x = 615;
                this.objeto21W.x = 615;
                this.objeto22W.x = 615;
                this.objeto23W.x = 615;
                this.fondoRiddle.visible = true;
            }
            else {
                this.inventarioWiggleImg.x = 200;
                this.objeto1W.x = 45;
                this.objeto2W.x = 45;
                this.objeto3W.x = 45;
                this.objeto4W.x = 45;
                this.objeto5W.x = 45;
                this.objeto6W.x = 45;
                this.objeto7W.x = 45;
                this.objeto8W.x = 45;
                this.objeto9W.x = 45;
                this.objeto10W.x = 45;
                this.objeto11W.x = 45;
                this.objeto12W.x = 45;
                this.objeto13W.x = 215;
                this.objeto14W.x = 215;
                this.objeto15W.x = 215;
                this.objeto16W.x = 215;
                this.objeto17W.x = 215;
                this.objeto18W.x = 215;
                this.objeto19W.x = 215;
                this.objeto20W.x = 215;
                this.objeto21W.x = 215;
                this.objeto22W.x = 215;
                this.objeto23W.x = 215;
                this.fondoWiggle.visible = true;
            }
            this.inventarioWiggleImg.visible = true;
            $.ajax({
                url: 'http://'+devolver_IP()+'/objetos'
            }).done(function(objetos) {
                var indice = 0;
                for(var i=0; i<objetos.length; i++) {
                    if(objetos[i]!=null) {                      
                        if(objetos[i].jugador=="W" && objetos[i].nombreEquipo == equipo) {
                            textoObjetosWiggle[indice].setText(objetos[i].nombre);
                            indice++;
                        }
                    }
                }
            }).fail(function() {
                console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
            })
        }

        OcultarInventarioWiggle() {
            for(var i=0; i<textoObjetosWiggle.length; i++) {
                textoObjetosWiggle[i].setText('');
            }
            this.inventarioWiggleImg.visible = false;
            if(this.Wiggle.x>400) {
                this.fondoRiddle.visible = false;
            }
            else {
                this.fondoWiggle.visible = false;
            }
            this.camera1.setZoom(3); // Ajusta el valor según sea necesario
            this.camera1.centerOn(this.Wiggle.x, this.Wiggle.y);
            this.camera1.startFollow(this.Wiggle);
        }

        MostrarRecordsTiempo() {
            if(!this.vencido) {
                this.vencido = true;
                // Se envía el record actual al servidor
                var record = {
                    minutos : this.tiempo.minutos,
                    segundos : this.tiempo.segundos,
                    nombreEquipo : equipo
                }
                var recordsOrdenados = new Array(5);
                peticionesServer.añadirRecordTiempo(record, devolver_IP());
                $.ajax({
                    url: 'http://'+devolver_IP()+'/tiempo'
                }).done(function(records) {
                    var numRecordsEquipo = 0;

                    for(var i = 0; i<records.length;i++){
                        if(records[i]!=null) {
                            if(records[i].nombreEquipo == equipo){
                                numRecordsEquipo++;
                            }
                        }
                    }

                    // El algoritmo se queda con 5 records ordenados de mejor a peor
                    var indices = [-1, -1, -1, -1, -1];
                    var indiceRecords = 0;
                    while(indiceRecords<indices.length&&indiceRecords<records.length) {
                        var indiceMayor = 0;
                        var maximoMinutos = 0;
                        var maximoSegundos = 0;
                        for(var i=0; i<records.length; i++) {
                            var encontrado = false;
                            for(var j=0; j<indices.length; j++) {
                                if(i==indices[j]) {
                                    encontrado = true;
                                }
                            }
                            if(records[i]!=null) {
                                if(records[i].nombreEquipo == equipo &&(records[i].minutos>maximoMinutos||(records[i].minutos==maximoMinutos&&records[i].segundos>maximoSegundos))&&!encontrado) {
                                    indiceMayor = i;
                                    maximoMinutos = records[i].minutos;
                                    maximoSegundos = records[i].segundos;
                                }
                            }
                        }
                        recordsOrdenados[indiceRecords] = records[indiceMayor];
                        indices[indiceRecords] = indiceMayor;
                        indiceRecords++;
                    }

                    titulo.setText('- Mejores tiempos del equipo 1-');
    
                    // Después, se muestran esos records en la pantalla de victoria
                    if(numRecordsEquipo>0) {
                        textoRecords[0].setText(' 1- '+(39-recordsOrdenados[0].minutos)+ ' minutos y '+(60-recordsOrdenados[0].segundos)+ ' segundos');
                        if(numRecordsEquipo>1) {
                            textoRecords[1].setText(' 2- '+(39-recordsOrdenados[1].minutos)+ ' minutos y '+(60-recordsOrdenados[1].segundos)+ ' segundos');
                            if(numRecordsEquipo>2) {
                                textoRecords[2].setText(' 3- '+(39-recordsOrdenados[2].minutos)+ ' minutos y '+(60-recordsOrdenados[2].segundos)+ ' segundos');
                                if(numRecordsEquipo>3) {
                                    textoRecords[3].setText(' 4- '+(39-recordsOrdenados[3].minutos)+ ' minutos y '+(60-recordsOrdenados[3].segundos)+ ' segundos');
                                    if(numRecordsEquipo>4) {
                                        textoRecords[4].setText(' 5- '+(39-recordsOrdenados[4].minutos)+ ' minutos y '+(60-recordsOrdenados[4].segundos)+ ' segundos');
                                    }
                                }
                            }
                        }
                    }

                }).fail(function() {
                    console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');       
                })
            }

        }
}
export default SceneGame;