let deck = [],
    kinds = ['C','D', 'S', 'H'],
    specials = ['A', 'J', 'K', 'Q'];

let puntosJugador = 0,
    puntosComputadora = 0;

const crearDeck = () => {
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
    return deck = _.shuffle( deck );
}

crearDeck(); 

const tomarCarta = () => {
    if( deck.length === 0 ){
        throw 'No hay cartas';
    }
    return deck.shift()
}

const valorCarta = ( carta ) =>{ 
    carta = carta.substring( 0, carta.length-1 );
    return (!isNaN(carta)) ? Number(carta) :
            (carta === 'A') ? 11 : 10;
}

const renderizarCarta = ( carta ) => {
    let cartaPNG = document.createElement('img');
    cartaPNG.src = `assets//cartas/${carta}.png`;
    cartaPNG.className = "carta"
    divJugador.appendChild(cartaPNG)

}

const renderizarPuntos = ( carta ) => {
    puntosJugador += valorCarta(carta);
    puntos[0].innerText = puntosJugador;
}

const turnoComputadora = () => {
        btnPedir.disabled = true
        btnDetener.disabled = true

    do {
        
        const carta = tomarCarta();
    
        puntosComputadora += valorCarta(carta);
        puntos[1].innerText = puntosComputadora;
    
        let cartaPNG = document.createElement('img');
        cartaPNG.src = `assets//cartas/${carta}.png`;
        cartaPNG.className = "carta"
        divComputadora.appendChild(cartaPNG)

        if ( puntosJugador > 21 ) {
            break;
        }

    } while ( puntosJugador <= 21 && puntosComputadora <= puntosJugador && puntosComputadora < 21 );
    alertGanador();
}

const alertGanador = () => {
    setTimeout(() => {
        const mensaje =
        ( (puntosJugador === puntosComputadora) ? 'Nadie gana' :
          (puntosJugador <= 21 && puntosComputadora > 21) ? 'Jugador gana' :
          'Computadora gana')

        alert(mensaje);
    }, 500);
};

const evaluar = () => {
    if ( puntosJugador >= 21 ) {
        return turnoComputadora();
    }
}

// Eventos
const btnPedir = document.getElementById('btnPedir');
const btnNuevo = document.getElementById('btnNuevo');
const btnDetener = document.getElementById('btnDetener');

const puntos = document.getElementsByTagName('small');

const divJugador = document.getElementById('jugador-carta');
const divComputadora = document.getElementById('computadora-carta');


btnPedir.addEventListener( 'click', () => {
    const carta = tomarCarta();
    renderizarCarta(carta);
    renderizarPuntos(carta);

    evaluar();
})

btnDetener.addEventListener( 'click', () => {
    turnoComputadora();
})

btnNuevo.addEventListener( 'click', () => {
    puntosJugador = 0;
    puntosComputadora =0;

    deck = [];
    crearDeck();

    divJugador.innerText = '';
    divComputadora.innerText = '';

    puntos[0].innerText = 0;
    puntos[1].innerText = 0;

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})


