import { List } from "./list";

export class Subcategory {
    constructor ( name ) {
        this.name = name;
        this.subcats = [];
        this.state = false;
        this.id = crypto.randomUUID();
    }

    editSubcat( name ) {
        this.name = name;
    }

    createList( description, state = false, dueDate = null ) {
        const list = new List( description, state, dueDate )
        this.subcats.push( list );
        return list;
    }

    delete( id ) {
        const index = this.subcats.findIndex( item => item.id === id )
        this.subcats.splice( index, 1 )
    }

    changeState( value ) {
        ( this.state ) = value;
    }

    cleanEntries() {
        this.name = this.name.charAt( 0 ).toUpperCase() + this.name.toLowerCase().slice( 1 );
    }

    getState() {
        return this.state;
    }

    getAllLists() {
        return this.subcats;
    }

    getList( id ) {
        return this.subcats.find( item => item.id === id );
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

}