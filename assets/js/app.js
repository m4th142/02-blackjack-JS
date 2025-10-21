

const crearDeck = () => {

    let deck = [];
    let kinds = ['C','D', 'S', 'H'];
    let specials = ['A', 'J', 'K', 'Q'];

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

let deck = crearDeck(); 


const tomarCarta = () => {
    if( deck.length === 0 ){
        throw 'No hay cartas';
    }

    return deck.shift();
}

