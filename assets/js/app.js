let deck = [];
let kinds = ['C','D', 'S', 'H'];
let specials = ['A', 'J', 'K', 'Q'];

let puntosJugador = 0
    puntosComputadora = 0

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

const valorCarta = ( valorCarta ) =>{ 
    valorCarta = valorCarta.substring( 0, valorCarta.length-1 );
    return (!isNaN(valorCarta)) ? Number(valorCarta) :
            (valorCarta === 'A') ? 11 : 10;
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

    do {
        
        const carta = tomarCarta();
    
        puntosComputadora += valorCarta(carta);
        puntos[1].innerText = puntosComputadora;
    
        let cartaPNG = document.createElement('img');
        cartaPNG.src = `assets//cartas/${carta}.png`;
        cartaPNG.className = "carta"
        divComputadora.appendChild(cartaPNG)

    } while ( puntosComputadora < puntosJugador || puntosComputadora < 21 );
    // puntosComputadora > puntosJugador || puntosComputadora > 21

}

const evaluar = ( puntos ) => {

    if ( puntos <= 21 ) {
        return;
    }

    btnPedir.disabled = true
    turnoComputadora();

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


    evaluar(puntosJugador);
})

btnNuevo.addEventListener( 'click', () => {

    deck = [];
    crearDeck();
    


})

btnDetener.addEventListener( 'click', () => {

    btnPedir.disabled = true
    turnoComputadora();
    


})



