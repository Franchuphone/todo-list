import { List } from "./list";

export class Subcategory {
    constructor ( name ) {
        this.name = name;
        this.subcats = [];
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

    getAllLists() {
        return this.subcats;
    }

    getList( id ) {
        return this.subcats.find( item => item.id === id )
    }

    delete( id ) {
        const index = this.subcats.findIndex( item => item.id === id )
        this.subcats.splice( index, 1 )
    }
}