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
        return subcat
    }


    delete( id ) {
        const index = this.subcats.findIndex( item => item.id === id )
        this.subcats.splice( index, 1 )
    }

    deleteList( id ) {
        const index = this.lists.findIndex( item => item.id === id )
        this.lists.splice( index, 1 )
    }

    cleanEntries() {
        this.name = this.name.charAt( 0 ).toUpperCase() + this.name.toLowerCase().slice( 1 );
        this.description = this.description.charAt( 0 ).toUpperCase() + this.description.toLowerCase().slice( 1 );
    }

    getAllSubcats() {
        return this.subcats;
    }

    getSubcat( id ) {
        return this.subcats.find( item => item.id === id );
    }

    getId() {
        return this.id
    }

    getDescription() {
        return this.description;
    }

    getName() {
        return this.name;
    }

}





// const commonCategory = new Category( "Common", "Your main place where all your projects can begin" )
// let catList = [];
// let subcatList = [];
