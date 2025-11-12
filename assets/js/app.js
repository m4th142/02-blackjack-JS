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
    divCartas.appendChild(cartaPNG)

}

const renderizarPuntos = ( carta ) => {

    puntosJugador += valorCarta(carta);
    puntos[0].innerText = puntosJugador;

}




// Eventos
const btnPedir = document.getElementById('btnPedir');
const puntos = document.getElementsByTagName('small');

const divCartas = document.getElementById('jugador-carta');


btnPedir.addEventListener( 'click', () => {
    const carta = tomarCarta();
    renderizarCarta(carta);
    renderizarPuntos(carta);

})



