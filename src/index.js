import "./css/modern-normalize.css"
import "./css/main-style.css"
import images from "/src/js/images.js";

import { Controller } from "./js/controller";
import * as cat from "./js/category";
import * as dom from "./js/dom-display";
import * as check from "./js/checkers"


const projects = new Controller();
projects.createCat( "Common", "Your place" );
projects.createCat( "Another Common", "Another place" )
for ( let i = 0; i <= 5; i++ ) {
    projects.cats[ 0 ].createSubcat( `place ${ i } ` );
    for ( let j = 0; j <= Math.floor( Math.random() * 3 ) + 1; j++ ) {
        console.log()
        projects.cats[ 0 ].subcats[ i ].createList( `subcat ${ i } element ${ j }` )
    }
}
console.log( projects.cats )
dom.displayUserHeader( "Franchuphone" );
dom.displayMenu( projects.cats )

document.querySelector( "#user" ).addEventListener( "click", () => dom.displayMain( projects.cats ) );

( function () {
    const elements = document.querySelectorAll( "button[data-type='category']" );
    let listName = [];
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < projects.cats.length; i++ ) {
            if ( projects.cats[ i ].id == element.dataset.id ) listName = projects.cats[ i ].subcats
        }
        dom.displayMain( listName );
    } ) );
} )();

( function () {
    const elements = document.querySelectorAll( "button[data-type='subcategory']" );
    let listName = [];
    let id;
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < projects.cats.length; i++ ) {
            for ( let j = 0; j < projects.cats[ i ].subcats.length; j++ ) {
                if ( element.dataset.id === projects.cats[ i ].subcats[ j ].id ) {
                    listName = projects.cats[ i ].subcats;
                    id = element.dataset.id;
                }
            }
        }
        dom.displayMain( listName );
        dom.openSubcatDetails( id )
    } ) );
} )();