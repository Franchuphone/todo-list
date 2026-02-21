import { Category } from "./category";

export class Controller {

    constructor () {
        this.cats = [];
    }

    createCat( name, description ) {
        const cat = new Category( name, description );
        this.cats.push( cat );
        return cat;
    }

    getAllCats() {
        return this.cats;
    }

    getCat( id ) {
        return this.cats.find( item => item.id === id );
    }

    deleteCat( id ) {
        const index = this.cats.findIndex( item => item.id === id )
        this.projects.splice( index, 1 );
    }

}