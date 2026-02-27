import * as dom from "./dom-display"
import { projects } from "..";
import { Subcategory } from "./subcategory";
import { Controller } from "./controller";
import { differenceInDays, format, parseISO } from "date-fns";


// Delete button interaction
export function deleteListener( parentDiv, elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", () => {
        parentCat.delete( id );
        parentDiv.remove();
        handleAllProjects( projects );
        handleMenuClick( elementDiv, parentCat );
        projects.saveData()
    } );
};


// Edit button interaction
export function editListener( elementDiv, parentCat, id ) {
    elementDiv.addEventListener( "click", () => {
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
            handleListForm( dialog, dateBox, selectBox, id, parentCat )
            closeProjectDialog( dialog );
            projects.saveData()
        }
    } )
}

// All projects btn interaction
export function handleAllProjectsBtn() {
    const upcomingBtn = document.querySelectorAll( "#all-projects" );
    upcomingBtn.forEach( ( e ) => e.addEventListener( "click", () => dom.displayMain( projects.cats, projects ) ) );
};

// Initial change name function
export function handleNameBtn() {
    const nameBtn = document.querySelector( "#name-me" );
    const userInput = document.querySelector( "#user-name-input" );
    nameBtn.addEventListener( "click", () => {
        const userName = userInput.value;
        dom.displayUserHeader( userName );
        dom.displayMain( projects.getAllCats(), projects );
        localStorage.setItem( "user", userName )
    } );
}


// Change name on user btn intercation
export function handleUserBtn() {
    const userBtn = document.querySelector( ".user-header" );
    userBtn.addEventListener( "click", () => {
        const oldUser = document.querySelector( "#user" );
        const newUser = prompt( "Do you want to change your name?", oldUser.textContent );
        localStorage.setItem( "user", newUser )
        dom.displayUserHeader( newUser );
    } )
}

// Display tasks with due date of today
export function handleTodayBtn() {
    const todayBtn = document.querySelectorAll( "#today-events" );
    todayBtn.forEach( ( e ) => {
        e.addEventListener( "click", () => {
            const todaySubcats = [];
            const today = format( new Date(), "yyyy-MM-dd" );
            exportAllSubcats().forEach( subcat => {
                const dueDate = subcat.getDate();
                if ( dueDate === today ) todaySubcats.push( subcat )
            } );
            dom.displayMain( todaySubcats )
        } );
    } )
}

// Display tasks with due date in the 7 next days
export function handleUpcomingBtn() {
    const upcomingBtn = document.querySelectorAll( "#upcoming-events" );
    upcomingBtn.forEach( ( e ) => {
        e.addEventListener( "click", () => {
            const upcomingSubcats = [];
            const today = new Date();
            exportAllSubcats().forEach( subcat => {
                const dueDate = parseISO( subcat.getDate() );
                if ( differenceInDays( dueDate, today ) <= 7 && differenceInDays( dueDate, today ) >= 0 ) upcomingSubcats.push( subcat );
            } );
            dom.displayMain( upcomingSubcats )
        } );
    } )
}

// Display tasks with expired due date
export function handleExpiredBtn() {
    const expiredBtn = document.querySelectorAll( "#expired-events" );
    expiredBtn.forEach( ( e ) => {
        e.addEventListener( "click", () => {
            const expiredSubcats = [];
            const today = new Date();
            exportAllSubcats().forEach( subcat => {
                const dueDate = parseISO( subcat.getDate() );
                if ( differenceInDays( dueDate, today ) < 0 ) expiredSubcats.push( subcat );
            } );
            dom.displayMain( expiredSubcats );
        } )
    } )
}


// Lateral menu categories interaction
export function handleMenuClick( div, category, subcategory ) {
    div.addEventListener( "click", () => {
        dom.displayMain( category.getAllSubcats(), category );
        if ( subcategory instanceof Subcategory ) dom.openSubcatDetails( subcategory.getId() );
    } );
};


// Checkbox interaction and change states of elements
export function handleCheckbox( checkboxDiv, item, parentCat ) {
    checkboxDiv.addEventListener( "click", () => {
        item.changeState();
        const allBoxesChecked = checkSimilarBoxesState( parentCat.getId() )
        parentCat.changeState( allBoxesChecked );
        dom.displayCategoryChecked( parentCat )
    } );
}

// Refresh lateral menu display data on click in main interface
export function refreshDisplayMenu() {
    const main = document.querySelector( "main" );
    main.addEventListener( "click", () => dom.displayMenu( projects.cats ) )
}

// Save data in local storage on click in interdace
export function saveData() {
    const main = document.querySelector( "main" );
    main.addEventListener( "click", () => projects.saveData() )
}

// New project button interaction
export function addNewCategory() {
    const btn = document.querySelector( "#add-category" );
    const dialog = document.querySelector( "#project-dialog" );
    const form = document.getElementById( "project-form" );
    btn.addEventListener( "click", () => {
        dialog.showModal();
        closeProjectDialog( dialog );
        handleCategoryForm( dialog );
    } )
}

// New tasks button interaction
export function addNewList() {
    const btn = document.querySelector( "#add-list" );
    const dialog = document.querySelector( "#list-dialog" );
    const dateBox = document.getElementById( "list-duedate" );
    const selectBox = document.getElementById( "project-choice" );
    btn.addEventListener( "click", () => {
        dom.addNewDefaultDate( dateBox );
        addProjectInSelectBox( selectBox, projects );
        dialog.showModal();
        closeProjectDialog( dialog );
        handleListForm( dialog, dateBox, selectBox )
    } )
}

// Private functions for event listeners

function closeProjectDialog( dialog ) {
    const closeBtn = document.querySelector( `#${ dialog.id } #dialog-close` );
    const form = document.querySelector( `#${ dialog.id } form` );
    closeBtn.addEventListener( "click", ( e ) => {
        form.reset()
        form.replaceWith( form.cloneNode( true ) );
        const btn = document.querySelector( "#add-list" );
        btn.replaceWith( btn.cloneNode( true ) );
        addNewList();
        e.preventDefault();
        dialog.close();
    } );
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

function handleListForm( dialog, date, select, id, parentCat ) {
    const title = document.getElementById( "list-title" );
    const description = [];
    const form = document.getElementById( "list-form" );
    const button = document.querySelector( "#list-dialog #submit-form" );

    // Edit existing task list
    if ( id ) {
        const subcat = parentCat.getSubcat( id );
        title.value = subcat.getName();
        for ( let i = 1; i <= 5; i++ ) {
            const list = subcat.getAllLists()[ i - 1 ]
            description[ i ] = document.getElementById( `list-description-${ i }` );
            description[ i ].value = list.getDescription();
        };
        date.value = subcat.getDate();
        addProjectInSelectBox( select, projects );
        select.value = parentCat.getName();
        button.textContent = "Edit tasks";
        form.addEventListener( "submit", ( e ) => {
            const idCat = select.options[ select.selectedIndex ].dataset.id;
            const cat = projects.getCat( idCat );
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            subcat.editSubcat( title.value, date.value, idCat );
            for ( let i = 1; i <= 5; i++ ) {
                const list = subcat.getAllLists()[ i - 1 ]
                description[ i ] = document.getElementById( `list-description-${ i }` );
                list.changeDescription( description[ i ].value );
            };
            changeParentCat( subcat, parentCat, cat )
            refreshDisplayOnSubmission( dialog, form, cat.getAllSubcats(), cat, id, date, select );
        } )
    }

    // Create new task list
    else {
        button.textContent = "New tasks";
        form.addEventListener( "submit", ( e ) => {
            if ( !form.checkValidity() ) return;
            e.preventDefault();
            const idCat = select.options[ select.selectedIndex ].dataset.id;
            const cat = projects.getCat( idCat );
            const subcat = cat.createSubcat( title.value, date.value )
            subcat.cleanEntries();
            const idSubcat = subcat.getId();
            for ( let i = 1; i <= 5; i++ ) {
                description[ i ] = document.getElementById( `list-description-${ i }` );
                subcat.createList( description[ i ].value, false ).cleanEntries();
            };
            refreshDisplayOnSubmission( dialog, form, cat.getAllSubcats(), cat, idSubcat, date, select )
        } )
    };
}

function checkSimilarBoxesState( SubcatId ) {
    const checkBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]:checked` );
    const divBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]` );
    if ( checkBoxes.length === divBoxes.length ) return true
}

// Render displays and refresh forms after submitting it
function refreshDisplayOnSubmission( dialog, form, list, parentCat, idSubcat, date, select ) {
    form.reset();
    form.replaceWith( form.cloneNode( true ) );
    dom.displayMain( list, parentCat )
    dom.displayMenu( projects.cats );
    if ( idSubcat ) {
        dom.openSubcatDetails( idSubcat );
        dom.addNewDefaultDate( date );
        addProjectInSelectBox( select, projects );
        const btn = document.querySelector( "#add-list" );
        btn.replaceWith( btn.cloneNode( true ) );
        addNewList();
    }
    dialog.close();
}

function changeParentCat( subcat, oldCat, newCat ) {
    oldCat.delete( subcat.getId() );
    newCat.editSubcats( subcat );
}

function exportAllSubcats() {
    const allSubcats = [];
    projects.getAllCats().forEach( ( cat ) => {
        cat.getAllSubcats().forEach( ( subcat ) => {
            allSubcats.push( subcat )
        } )
    } )
    return allSubcats;
}
