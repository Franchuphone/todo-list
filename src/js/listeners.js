import * as dom from "./dom-display"
import { projects } from "..";
import * as check from "./checkers"
import { Category } from "./category";
import { Subcategory } from "./subcategory";

export function deleteListener( parentDiv, elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", ( e ) => {
        parentCat.delete( id );
        parentDiv.remove();
        handleUserClick();
        handleMenuClick( elementDiv, parentCat );
    } );
};

export function editListener( elementDiv, element ) {

}

export function handleUserClick() {
    document.querySelector( "#user" ).addEventListener( "click", () => dom.displayMain( projects.cats, projects ) );
};


// Listening click event on menu categories

export function handleMenuClick( div, category, subcategory ) {
    div.addEventListener( "click", () => {
        dom.displayMain( category.getAllSubcats(), category );
        // console.log( subcategory instanceof Subcategory )
        if ( subcategory instanceof Subcategory ) dom.openSubcatDetails( subcategory.getId() );
    } );
};

// Listening click event on menu subcategories

export function querySubcategory() {
    const elements = document.querySelectorAll( "button[data-type='subcategory']" );
    let listName = [];
    let id;
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < projects.cats.length; i++ ) {
            for ( let j = 0; j < projects.cats[ i ].subcats.length; j++ ) {
                if ( element.dataset.id === projects.cats[ i ].subcats[ j ].id ) {
                    dom.displayMain( projects.cats[ i ].subcats, projects.cats[ i ] );
                    dom.openSubcatDetails( element.dataset.id )
                }
            }
        }
    } ) );
};

// Listening event on checkbox and change states of elements 

export function handleCheckbox( checkboxDiv, item, parentCat ) {
    checkboxDiv.addEventListener( "click", () => {
        item.changeState();
        const allBoxesChecked = check.checkSimilarBoxesState( parentCat.getId() )
        parentCat.changeState( allBoxesChecked );
        dom.displayCategoryChecked( parentCat )
    } );
}

// Refresh lateral menu display on all clicks in main interface

export function refreshDisplayMenu() {
    const main = document.querySelector( "main" );
    main.addEventListener( "click", () => dom.displayMenu( projects.cats ) )
}

export function addNewCategory() {
    const button = document.querySelector( "#add-category" );
    const dialog = document.querySelector( "#project-dialog" )
    button.addEventListener( "click", () => {
        dialog.showModal();
    } )
}