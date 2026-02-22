import * as dom from "./dom-display"
import { projects } from "..";
import * as check from "./checkers"

export function deleteListener( parentDiv, elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", ( e ) => {
        parentCat.delete( id );
        parentDiv.remove();
        dom.displayMenu( projects.cats );
        handleUserClick();
        queryCategory();
        querySubcategory();
    } );
};

export function editListener( elementDiv, element ) {

}

export function handleUserClick() {
    document.querySelector( "#user" ).addEventListener( "click", () => dom.displayMain( projects.cats, projects ) );
};

export function queryCategory() {
    const elements = document.querySelectorAll( "button[data-type='category']" );
    elements.forEach( ( element ) => element.addEventListener( "click", () => {
        for ( let i = 0; i < projects.cats.length; i++ ) {
            if ( projects.cats[ i ].id == element.dataset.id ) dom.displayMain( projects.cats[ i ].subcats, projects.cats[ i ] )
        }
    } ) );
};

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

export function handleCheckbox( checkboxDiv, item, parentCat ) {
    checkboxDiv.addEventListener( "click", () => {
        item.changeState();
        const allBoxesChecked = check.checkedSimilarBoxes( parentCat.getId() )
        parentCat.changeState( allBoxesChecked );
        dom.displayCategoryChecked( parentCat )
    } );
}
