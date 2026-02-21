import { Subcategory } from "./subcategory";

export class Category {
    constructor ( name, description ) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
        this.subcats = [];
    }

    editCat( name, description ) {
        this.name = name;
        this.description = description;
    }

    createSubcat( name ) {
        const subcat = new Subcategory( name );
        this.subcats.push( subcat );
    }

    getAllSubcats() {
        return this.subcats;
    }

    getSubcat( id ) {
        return this.subcats.find( item => item.id === id );
    }

    delete( id ) {
        const index = this.subcats.findIndex( item => item.id === id )
        this.subcats.splice( index, 1 )
    }

    deleteList( id ) {
        const index = this.lists.findIndex( item => item.id === id )
        this.lists.splice( index, 1 )
    }

}



const cleanWords = () => {
    this.name = this.name.charAt( 0 ).toUpperCase() + this.name.toLowerCase().slice( 1 );
}

// const commonCategory = new Category( "Common", "Your main place where all your projects can begin" )
// let catList = [];
// let subcatList = [];
