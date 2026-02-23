import "./css/modern-normalize.css"
import "./css/main-style.css"
import images from "/src/js/images.js";

import { Controller } from "./js/controller";
import * as dom from "./js/dom-display";
import * as check from "./js/checkers"
import * as listener from "./js/listeners"


export const projects = new Controller();
projects.createCat( "common", "your place" ).cleanEntries();
projects.createCat( "another Common", "another place" ).cleanEntries();
for ( let i = 0; i <= 5; i++ ) {
    projects.cats[ 0 ].createSubcat( `place ${ i } ` );
    projects.cats[ 0 ].subcats[ i ].cleanEntries();
    for ( let j = 0; j <= Math.floor( Math.random() * 3 ) + 1; j++ ) {
        projects.cats[ 0 ].subcats[ i ].createList( `subcat ${ i } element ${ j }` )
        projects.cats[ 0 ].subcats[ i ].subcats[ j ].cleanEntries();
    }
}
for ( let i = 0; i <= 5; i++ ) {
    projects.cats[ 1 ].createSubcat( `place ${ i } ` );
    projects.cats[ 1 ].subcats[ i ].cleanEntries();
    for ( let j = 0; j <= Math.floor( Math.random() * 3 ) + 1; j++ ) {
        projects.cats[ 1 ].subcats[ i ].createList( `subcat ${ i } element ${ j }` )
        projects.cats[ 1 ].subcats[ i ].subcats[ j ].cleanEntries();

    }
}
// console.log( projects.cats )

const user = prompt( "What's your name stranger?" )
dom.displayUserHeader( user );
dom.displayMenu( projects.cats );
dom.displayMain( projects.cats, projects )

listener.handleUserClick();
listener.refreshDisplayMenu();
listener.addNewCategory();