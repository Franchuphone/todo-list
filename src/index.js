import "./css/modern-normalize.css"
import "./css/main-style.css"
import images from "/src/js/images.js";

import * as cat from "./js/categories";
import * as dom from "./js/dom-display";
import * as check from "./js/checkers"


const cat1 = new cat.Subcategory( "cat1", "cat", "25", "pillow" );
const cat2 = new cat.Subcategory( "cat2", "to do ", "not" );
const test = new cat.Category( "test", "encore un test", cat1, cat2 );
cat1.cleanWords();
cat2.cleanWords();
test.cleanWords();

cat.addElement( cat.subcatList, cat1, cat2 )
cat.addElement( cat.catList, test )

// console.log( cat.subcatList )

dom.displayMain( cat.catList );
dom.displayMenu( cat.catList );
dom.displayUserHeader( "Franchuphone" );

document.querySelector( "#user" ).addEventListener( "click", () => dom.displayMain( cat.catList ) );

( function () {
    const elements = document.querySelectorAll( "button[data-type='category']" );
    let listName = [];
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < cat.catList.length; i++ ) {
            if ( cat.catList[ i ].id == element.dataset.id ) listName = cat.catList[ i ].list
        }
        dom.displayMain( listName );
    } ) );
} )();

( function () {
    const elements = document.querySelectorAll( "button[data-type='subcategory']" );
    let listName = [];
    let id;
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < cat.catList.length; i++ ) {
            for ( let j = 0; j < cat.catList[ i ].list.length; j++ ) {
                if ( element.dataset.id === cat.catList[ i ].list[ j ].id ) {
                    listName = cat.catList[ i ].list;
                    id = element.dataset.id;
                }
            }
        }
        dom.displayMain( listName );
        dom.openSubcatDetails( id )
    } ) );
} )();
