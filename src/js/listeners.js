import * as dom from "./dom-display"
import { projects } from "..";
// import { Category } from "./category";
import { Subcategory } from "./subcategory";
import { Controller } from "./controller";

export function deleteListener( parentDiv, elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", () => {
        parentCat.delete( id );
        parentDiv.remove();
        handleUserClick( projects );
        handleMenuClick( elementDiv, parentCat );
    } );
};

export function editListener( elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", () => {
        // console.log( parentCat instanceof Controller )
        if ( parentCat instanceof Controller ) {
            const dialog = document.querySelector( "#project-dialog" );
            dialog.showModal();
            handleCategoryForm( dialog, id );
            closeProjectDialog( dialog );
        } else {
            const dialog = document.querySelector( "#list-dialog" );
            const dateBox = document.getElementById( "list-duedate" );
            const selectBox = document.getElementById( "project-choice" );
            dialog.showModal();
            // console.log( parentCat, id )
            handleListForm( dialog, dateBox, selectBox, id )
            closeProjectDialog( dialog );
        }
    } )
}

export function handleUserClick( projects ) {
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


// Listening event on checkbox and change states of elements 

export function handleCheckbox( checkboxDiv, item, parentCat ) {
    checkboxDiv.addEventListener( "click", () => {
        item.changeState();
        const allBoxesChecked = checkSimilarBoxesState( parentCat.getId() )
        parentCat.changeState( allBoxesChecked );
        dom.displayCategoryChecked( parentCat )
    } );
}

// Refresh lateral menu display on all clicks in main interface

export function refreshDisplayMenu( projects ) {
    const main = document.querySelector( "main" );
    main.addEventListener( "click", () => dom.displayMenu( projects.cats ) )
}

// Listeners for users interaction on adding elements

export function addNewCategory() {
    const btn = document.querySelector( "#add-category" );
    const dialog = document.querySelector( "#project-dialog" );
    const form = document.getElementById( "project-form" );
    btn.addEventListener( "click", () => {
        form.reset();
        dialog.showModal();
        closeProjectDialog( dialog );
        handleCategoryForm( dialog );
    } )
}

export function addNewList() {
    const btn = document.querySelector( "#add-list" );
    const dialog = document.querySelector( "#list-dialog" );
    const dateBox = document.getElementById( "list-duedate" );
    const selectBox = document.getElementById( "project-choice" );
    btn.addEventListener( "click", () => {
        const form = document.getElementById( "list-form" );
        console.log( form )
        // form.reset();
        addNewDefaultDate( dateBox );
        addProjectInSelectBox( selectBox, projects );
        dialog.showModal();
        closeProjectDialog( dialog );
        handleListForm( dialog, dateBox, selectBox )
    } )
}

function closeProjectDialog( dialog ) {
    const closeBtn = document.querySelector( `#${ dialog.id } #dialog-close` );
    const form = document.querySelector( `#${ dialog.id } form` );
    // console.log( form )
    closeBtn.addEventListener( "click", ( e ) => {
        form.reset()
        form.replaceWith( form.cloneNode( true ) );
        e.preventDefault();
        dialog.close();
    } );
}

function addNewDefaultDate( dateDiv ) {
    dateDiv.innerHTML = "";
    dateDiv.valueAsDate = new Date();
}

function addProjectInSelectBox( select, projects ) {
    select.innerHTML = "";
    projects.getAllCats().forEach( element => {
        const option = document.createElement( "option" );
        select.append( option );
        option.text = element.getName();
        option.dataset.id = element.getId();
    } );
}

function handleCategoryForm( dialog, id ) {
    const title = document.getElementById( "project-title" );
    const description = document.getElementById( "project-description" );
    const form = document.getElementById( "project-form" );
    const button = document.querySelector( "#project-dialog #submit-form" );
    if ( id ) {
        title.value = projects.getCat( id ).getName();
        description.value = projects.getCat( id ).getDescription();
        button.textContent = "Edit Project";
        form.addEventListener( "submit", ( e ) => {
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            projects.getCat( id ).editCat( title.value, description.value );
            refreshDisplayOnSubmission( dialog, form, projects.cats, projects );
            console.log( projects )
        } );
    } else {
        button.textContent = "Add Project"
        form.addEventListener( "submit", ( e ) => {
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            projects.createCat( title.value, description.value ).cleanEntries();
            refreshDisplayOnSubmission( dialog, form, projects.cats, projects );
        } )
    };
}

function handleListForm( dialog, date, select, id ) {
    const title = document.getElementById( "list-title" );
    const description = [];
    const form = document.getElementById( "list-form" );
    const button = document.querySelector( "#list-dialog #submit-form" );
    console.log( id )

    if ( id ) {
        console.log( "not hre" );
        button.textContent = "Edit tasks";
        form.addEventListener( "submit", ( e ) => {
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            title.value = projects;
        } )
    } else {
        button.textContent = "New tasks";
        form.addEventListener( "submit", ( e ) => {
            console.log( form )
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            const idCat = select.options[ select.selectedIndex ].dataset.id;
            const cat = projects.getCat( idCat );
            const subcat = cat.createSubcat( title.value )
            subcat.cleanEntries();
            const idSubcat = subcat.getId();
            for ( let i = 1; i <= 5; i++ ) {
                description[ i ] = document.getElementById( `list-description-${ i }` );
                if ( description[ i ].value != "" ) subcat.createList( description[ i ].value, false, date.value ).cleanEntries();
            };
            refreshDisplayOnSubmission( dialog, form, cat.getAllSubcats(), cat, idSubcat )
            // console.log( "test" )
            // dom.displayMain( cat.getAllSubcats(), cat );
            // dom.openSubcatDetails( idSubcat );
            // dom.displayMenu( projects.cats );
            // dialog.close();
            // form.reset();
        } )
    };
}

function checkSimilarBoxesState( SubcatId ) {
    const checkBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]:checked` );
    const divBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]` );
    if ( checkBoxes.length === divBoxes.length ) return true
}

function refreshDisplayOnSubmission( dialog, form, list, parentCat, idSubcat ) {
    form.reset();
    form.replaceWith( form.cloneNode( true ) );
    dom.displayMain( list, parentCat )
    // dom.displayMain( projects.cats, projects );
    dom.openSubcatDetails( idSubcat );
    dom.displayMenu( projects.cats );
    dialog.close();

}

