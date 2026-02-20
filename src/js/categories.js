class Category {
    constructor ( name, description, ...subCategories ) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
        this.list = [ ...subCategories ];
    }

    cleanWords() {
        this.name = this.name.charAt( 0 ).toUpperCase() + this.name.toLowerCase().slice( 1 );;
        this.description = this.description.charAt( 0 ).toUpperCase() + this.description.toLowerCase().slice( 1 );
    }
}

class Subcategory {
    constructor ( name, ...lists ) {
        this.name = name;
        this.list = [ ...lists ];
        this.id = crypto.randomUUID();
    }

    cleanWords() {
        this.name = this.name.charAt( 0 ).toUpperCase() + this.name.toLowerCase().slice( 1 );;
        this.list.forEach( ( element, index ) => this.list[ index ] = element.charAt( 0 ).toUpperCase() + element.toLowerCase().slice( 1 ) );
    }
}

function addElement( array, ...elements ) {
    for ( let i = 0; i < elements.length; i++ ) {
        array.push( elements[ i ] );
    }
};

const commonCategory = new Category( "Common", "Your main place where all your projects can begin" )
let catList = [];
let subcatList = [];
addElement( catList, commonCategory )

export { subcatList, catList, Category, Subcategory, addElement }