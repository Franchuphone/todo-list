import "./css/modern-normalize.css"
import "./css/main-style.css"
import images from "/src/js/images.js";

import { Controller } from "./js/controller";
import * as dom from "./js/dom-display";
import * as listener from "./js/listeners"

// Initilizes app and creates root project (not removable)
export const projects = new Controller();
projects.createCat( "main project", "your place for all your ideas" ).cleanEntries();
projects.cats[ 0 ].id = "0";

// projects.createCat( "another Common", "another place" ).cleanEntries();
// for ( let i = 0; i <= 5; i++ ) {
//     projects.cats[ 0 ].createSubcat( `place ${ i } ` );
//     projects.cats[ 0 ].subcats[ i ].cleanEntries();
//     for ( let j = 0; j <= Math.floor( Math.random() * 3 ) + 1; j++ ) {
//         projects.cats[ 0 ].subcats[ i ].createList( `subcat ${ i } element ${ j }` )
//         projects.cats[ 0 ].subcats[ i ].subcats[ j ].cleanEntries();
//     }
// }
// for ( let i = 0; i <= 5; i++ ) {
//     projects.cats[ 1 ].createSubcat( `place ${ i } ` );
//     projects.cats[ 1 ].subcats[ i ].cleanEntries();
//     for ( let j = 0; j <= Math.floor( Math.random() * 3 ) + 1; j++ ) {
//         projects.cats[ 1 ].subcats[ i ].createList( `subcat ${ i } element ${ j }` )
//         projects.cats[ 1 ].subcats[ i ].subcats[ j ].cleanEntries();

//     }
// }
// console.log( projects.cats[ 0 ].id )

const user = "Fran" // prompt( "What's your name stranger?" )
dom.displayUserHeader( user );
dom.displayMenu( projects.cats );
dom.displayMain( projects.cats, projects )

listener.handleUserClick( projects );
listener.refreshDisplayMenu( projects );
listener.addNewCategory( projects );
listener.addNewList( projects );