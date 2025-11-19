( () => {
    let deck = [],
        kinds = ['C','D', 'S', 'H'],
        specials = ['A', 'J', 'K', 'Q'];

    const puntos = document.getElementsByTagName('small'),
          divCartas = document.querySelectorAll('.divCartas');

    let puntosJugadores = [];

    const inicializarJuego = ( jugadores = 2 ) => {
        deck = crearDeck();
        for( i = 0; i < jugadores; i++ ) puntosJugadores.push(0);
    }

    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10; i++ ){
            for( kind of kinds ){
                deck.push( i + kind );
            }
        }

        for( special of specials ){
            for( kind of kinds ){
                deck.push( special + kind );
            }
        }
        return _.shuffle( deck );
    }

    inicializarJuego();

    const tomarCarta = () => ( deck.length ===0 ) ? console.error('No hay cartas') : deck.shift()

    const valorCarta = ( carta ) =>{ 
        carta = carta.slice(0, -1);
        return (!isNaN(carta)) ? Number(carta) :
               (carta === 'A') ? 11            : 10;
    }

    const renderizarCarta = ( carta, turno ) => {
        let cartaPNG = document.createElement('img');
        cartaPNG.src = `assets//cartas/${carta}.png`;
        cartaPNG.className = "carta"
        divCartas[turno].appendChild( cartaPNG );

    }

    const renderizarPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntos[turno].innerText = puntosJugadores[turno];
    }

    const turnoComputadora = () => {
            btnPedir.disabled = true;
            btnDetener.disabled = true;

        do {
            const carta = tomarCarta();
            renderizarPuntos( carta, 1 )
        
            renderizarCarta( carta, 1 )

            if ( puntosJugadores[0] > 21 ) {
                break;
            }

        } while ( puntosJugadores[0] <= 21 && puntosJugadores[1] <= puntosJugadores[0] && puntosJugadores[1] < 21 );
        alertGanador();
    }

    const alertGanador = () => {
        setTimeout(() => {
            const mensaje =
            ( (puntosJugadores[0] === puntosJugadores[1]) ? 'Nadie gana' :
            (puntosJugadores[0] <= 21 && puntosJugadores[1] > 21) ? 'Jugador gana' :
            'Computadora gana')

            alert(mensaje);
        }, 500);
    };

    const evaluar = () => {
        if ( puntosJugadores[0] >= 21 ) {
            return turnoComputadora();
        }
    }

    // Eventos
    const btnPedir = document.getElementById('btnPedir');
    const btnNuevo = document.getElementById('btnNuevo');
    const btnDetener = document.getElementById('btnDetener');

    btnPedir.addEventListener( 'click', () => {
        const carta = tomarCarta();
        renderizarCarta(carta, 0);
        renderizarPuntos(carta, 0);

        evaluar();
    })

    btnDetener.addEventListener( 'click', () => {
        turnoComputadora();
    })

    btnNuevo.addEventListener( 'click', () => {
        inicializarJuego();
        
        divCartas[0].innerText = '';
        divCartas[1].innerText = '';

        puntos[0].innerText = 0;
        puntos[1].innerText = 0;

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    })

}) ();