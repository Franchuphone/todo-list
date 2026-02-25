import { List } from "./list";

export class Subcategory {
    constructor ( name, dueDate = null ) {
        this.name = name;
        this.subcats = [];
        this.state = false;
        this.dueDate = dueDate;
        this.id = crypto.randomUUID();
    }

    editSubcat( name, dueDate ) {
        this.name = name;
        this.dueDate = dueDate;
    }

    createList( description, state = false ) {
        const list = new List( description, state )
        this.subcats.push( list );
        return list;
    }

    deleteList( id ) {
        const index = this.lists.findIndex( item => item.id === id )
        this.lists.splice( index, 1 )
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

    getDate() {
        return this.dueDate;
    }

}