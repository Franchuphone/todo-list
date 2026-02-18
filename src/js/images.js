function importAll( r ) {
    const map = {};
    r.keys().forEach( key => {
        const cleanKey = key.replace( './', '' );
        map[ cleanKey ] = r( key );
    } );
    return map;
}

const images = importAll( require.context( './img', false, /\.(png|jpe?g|svg)$/ ) );

export default images;