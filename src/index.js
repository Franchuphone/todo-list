import "./css/modern-normalize.css"
import "./css/main-style.css"

import { Controller } from "./js/controller";
import { Category } from "./js/category";
import { Subcategory } from "./js/subcategory";
import { List } from "./js/list";
import * as dom from "./js/dom-display";
import * as listener from "./js/listeners";

// Initialize app and create root project (not removable)
let projects;
let user;
dom.InitialDisplay();

if ( !localStorage.getItem( "projects" ) ) {
    projects = new Controller();
    projects.createCat( "main project", "your place for all your ideas" ).cleanEntries();
    projects.getAllCats()[ 0 ].setId( "0" );
    user = listener.handleNameBtn();
}
else {
    projects = JSON.parse( localStorage.getItem( "projects" ) );
    Object.setPrototypeOf( projects, Controller.prototype );
    projects.getAllCats().forEach( cat => {
        Object.setPrototypeOf( cat, Category.prototype );
        cat.getAllSubcats().forEach( subcat => {
            Object.setPrototypeOf( subcat, Subcategory.prototype );
            subcat.getAllLists().forEach( list => Object.setPrototypeOf( list, List.prototype ) );
        } )
    } );
    dom.displayUserHeader( user );
    dom.displayMain( projects.getAllCats(), projects );
}

if ( localStorage.getItem( "user" ) ) user = localStorage.getItem( "user" );

// Initial interface display load
dom.displayMenu( projects.getAllCats() );


listener.handleAllProjectsBtn();
listener.handleUserBtn();
listener.handleTodayBtn();
listener.handleUpcomingBtn();
listener.handleExpiredBtn();
listener.refreshDisplayMenu();
listener.addNewCategory();
listener.addNewList();
listener.saveData();


export { projects };