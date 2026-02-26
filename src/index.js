import "./css/modern-normalize.css"
import "./css/main-style.css"
import images from "/src/js/images.js";

import { Controller } from "./js/controller";
import * as dom from "./js/dom-display";
import * as listener from "./js/listeners"
import { Category } from "./js/category";
import { Subcategory } from "./js/subcategory";
import { List } from "./js/list";

// Initilizes app and creates root project (not removable)
let projects;

if ( !localStorage.getItem( "projects" ) ) {
    projects = new Controller();
    projects.createCat( "main project", "your place for all your ideas" ).cleanEntries();
    projects.getAllCats()[ 0 ].setId( "0" );
}
else {
    projects = JSON.parse( localStorage.getItem( "projects" ) );
    Object.setPrototypeOf( projects, Controller.prototype );
    projects.getAllCats().forEach( cat => {
        Object.setPrototypeOf( cat, Category.prototype );
        cat.getAllSubcats().forEach( subcat => {
            Object.setPrototypeOf( subcat, Subcategory.prototype );
            subcat.getAllLists().forEach( list => Object.setPrototypeOf( list, List.prototype ) )
        } )
    } );
}

let user;
if ( localStorage.getItem( "user" ) ) user = localStorage.getItem( "user" );
dom.displayUserHeader( user );
dom.displayMenu( projects.getAllCats() );
dom.displayMain( projects.getAllCats(), projects )

listener.handleAllProjectsBtn();
listener.handleUserBtn();
listener.refreshDisplayMenu();
listener.addNewCategory();
listener.addNewList();
listener.saveData();


export { projects };