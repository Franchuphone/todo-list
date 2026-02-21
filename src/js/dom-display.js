// import { categoriesList } from "./categories";
import images from "/src/js/images.js";
import * as check from "./checkers";
import { deleteListener } from "./listeners";

export function displayMenu( listName ) {
    for ( let i = 0; i < listName.length; i++ ) {

        const categoryDiv = document.createElement( "div" );
        displayCategoryMenu( listName, i, categoryDiv );

        for ( let j = 0; j < listName[ i ].subcats.length; j++ ) {
            displaySubcategoryMenu( listName, i, j, categoryDiv );
        }
    }
}

export function displayMain( listName ) {
    const mainDiv = document.querySelector( "main" );
    mainDiv.innerHTML = "";

    for ( let i = 0; i < listName.length; i++ ) {
        const categoryId = listName[ i ].id;
        const categoryDiv = document.createElement( "div" );
        const categoryDetails = document.createElement( "details" );
        const categoryName = document.createElement( "summary" );
        const categoryDescription = document.createElement( "p" );
        const categoryBtnDiv = document.createElement( "div" );
        const editBtn = document.createElement( "button" );
        const imgEditBtn = document.createElement( "img" );
        const deleteBtn = document.createElement( "button" );
        const imgDeleteBtn = document.createElement( "img" );

        // Edit and delete buttons with listeners
        imgDeleteBtn.src = images[ "trash.svg" ];
        imgDeleteBtn.alt = "Trash icon";
        deleteBtn.id = "delete-btn";
        deleteBtn.append( imgDeleteBtn );
        imgEditBtn.src = images[ "pencil.svg" ];
        imgEditBtn.alt = "Pencil icon";
        editBtn.id = "edit-btn";
        editBtn.append( imgEditBtn );
        deleteListener( categoryDiv, imgDeleteBtn, listName[ i ] )


        categoryBtnDiv.dataset.id = categoryId;
        categoryBtnDiv.classList.add( "category-interactions" );
        categoryBtnDiv.append( editBtn, deleteBtn );
        categoryDescription.dataset.id = categoryId;
        if ( listName[ i ].description ) categoryDescription.textContent = listName[ i ].description;
        else displayListItems( listName[ i ].subcats, categoryDescription )
        categoryName.textContent = listName[ i ].name;
        categoryDetails.dataset.id = categoryId;
        categoryDetails.append( categoryName, categoryDescription, categoryBtnDiv );
        categoryDiv.dataset.id = categoryId;
        categoryDiv.classList.add( "category-card" );
        categoryDiv.append( categoryDetails );
        mainDiv.append( categoryDiv );
    }
}

export function displayUserHeader( user ) {
    const userHeader = document.querySelector( ".user-header" );
    const userIcon = document.createElement( "img" );
    const userName = document.createElement( "button" );

    userName.id = "user";
    userName.textContent = user;
    userIcon.src = images[ "user.svg" ];
    userIcon.alt = "User icon";
    userHeader.append( userIcon, userName );
}

export function openSubcatDetails( id ) {
    const details = document.querySelectorAll( "main details" )
    details.forEach( ( detail ) => {
        if ( detail.dataset.id === id ) detail.open = true;
    } )

}

// export function displaySubcategoryMain( categoriesList, categoryId ) {
//     const mainDiv = document.querySelector( "main" );
//     mainDiv.innerHTML = "";

//     for ( let i = 0; i < categoriesList.length; i++ ) {

//         console.log( categoriesList[ i ].list )

//         if ( categoriesList[ i ].id == categoryId ) {

//             for ( let j = 0; j < categoriesList[ i ].list.length; j++ ) {
//                 const subCategoryDiv = document.createElement( "div" );
//                 const subCategoryDetails = document.createElement( "details" );
//                 const subCategoryName = document.createElement( "summary" );
//                 const subCategoryDescription = document.createElement( "p" );
//                 const subCategoryBtnDiv = document.createElement( "div" );
//                 const editBtn = document.createElement( "button" );
//                 const imgEditBtn = document.createElement( "img" );
//                 const deleteBtn = document.createElement( "button" );
//                 const imgDeleteBtn = document.createElement( "img" );

//                 imgDeleteBtn.src = images[ "trash.svg" ];
//                 imgDeleteBtn.alt = "Trash icon";
//                 deleteBtn.id = "delete-btn";
//                 deleteBtn.append( imgDeleteBtn );
//                 imgEditBtn.src = images[ "pencil.svg" ];
//                 imgEditBtn.alt = "Pencil icon";
//                 editBtn.id = "edit-btn";
//                 editBtn.append( imgEditBtn );
//                 subCategoryBtnDiv.classList.add( "category-interactions" );
//                 subCategoryBtnDiv.append( editBtn, deleteBtn );
//                 subCategoryDescription.textContent = categoriesList[ i ].list[ j ].list[ 1 ];
//                 subCategoryName.textContent = categoriesList[ i ].list[ j ].name;
//                 subCategoryDetails.append( subCategoryName, subCategoryDescription, subCategoryBtnDiv );
//                 subCategoryDiv.classList.add( "category-card" );
//                 subCategoryDiv.append( subCategoryDetails );
//                 mainDiv.append( subCategoryDiv );
//             }
//         }
//     }
// }

function displayCategoryMenu( listName, i, categoryDiv ) {
    const navDiv = document.querySelector( ".nav-content" );
    const categoryBtn = document.createElement( "button" );
    const categoryIcon = document.createElement( "img" );

    categoryBtn.textContent = listName[ i ].name;
    categoryBtn.dataset.type = "category";
    categoryBtn.dataset.id = listName[ i ].id;
    categoryIcon.src = images[ "chart-tree.svg" ];
    categoryIcon.alt = "Category icon";
    categoryDiv.classList.add( "category-content" );
    categoryDiv.append( categoryIcon, categoryBtn );
    navDiv.append( categoryDiv );
}

function displaySubcategoryMenu( listName, i, j, categoryDiv ) {
    const subCategoryDiv = document.createElement( "div" );
    const subCategoryBtn = document.createElement( "button" );
    const subCategoryIcon = document.createElement( "img" );

    subCategoryBtn.textContent = listName[ i ].subcats[ j ].name;
    subCategoryBtn.dataset.type = "subcategory";
    subCategoryBtn.dataset.id = listName[ i ].subcats[ j ].id;
    subCategoryIcon.src = images[ "chemical-weapon.svg" ];
    subCategoryIcon.alt = "Sub category icon";
    subCategoryDiv.classList.add( "subcategory-content" );
    subCategoryDiv.append( subCategoryIcon, subCategoryBtn );
    categoryDiv.append( subCategoryDiv );
}

function displayListItems( listName, div ) {
    for ( let j = 0; j < listName.length; j++ ) {
        const inputList = document.createElement( "input" );
        const inputLabel = document.createElement( "label" )
        inputList.type = "checkbox";
        inputList.name = `list${ j }`;
        displayCategoryChecked( inputList );
        inputLabel.textContent = listName[ j ].description;
        inputLabel.for = `list${ j }`;
        div.append( inputList, inputLabel );
        div.classList.add( "list-display" );
    }
}

function displayCategoryChecked( div ) {
    div.addEventListener( "click", () => {
        const divChecked = document.querySelector( `div[data-id="${ div.parentElement.dataset.id }"]` );
        if ( check.checkedSimilarBoxes( div.parentElement.dataset.id ) ) {
            divChecked.classList.add( "category-card-checked" );
        }
        else divChecked.classList.remove( "category-card-checked" )
    } )
}

