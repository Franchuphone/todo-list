import { Category } from "./category";
import * as dom from "./dom-display";

export class Controller {

    constructor () {
        this.cats = [];
    }

    createCat( name, description ) {
        const cat = new Category( name, description );
        this.cats.push( cat );
        return cat;
    }

    delete( id ) {
        const index = this.cats.findIndex( item => item.id === id )
        this.cats.splice( index, 1 );
    }

    getAllCats() {
        return this.cats;
    }

    getCat( id ) {
        return this.cats.find( item => item.id === id );
    }
}