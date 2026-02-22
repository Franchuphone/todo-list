import images from "/src/js/images.js";
import * as check from "./checkers";
import * as listeners from "./listeners";

export function displayMenu( list ) {
    const navDiv = document.querySelector( ".nav-content" );
    navDiv.innerHTML = "";
    for ( let i = 0; i < list.length; i++ ) {

        const projectDiv = document.createElement( "div" );
        const categoryDiv = document.createElement( "div" );
        const categoryBtn = document.createElement( "button" );
        const categoryIcon = document.createElement( "img" );

        categoryBtn.textContent = list[ i ].name;
        categoryBtn.dataset.type = "category";
        categoryBtn.dataset.id = list[ i ].id;
        categoryIcon.src = images[ "chart-tree.svg" ];
        categoryIcon.alt = "Category icon";
        categoryDiv.classList.add( "category-content" );
        categoryDiv.append( categoryIcon, categoryBtn );
        projectDiv.classList.add( "project-content" );
        projectDiv.append( categoryDiv );
        navDiv.append( projectDiv );

        for ( let j = 0; j < list[ i ].subcats.length; j++ ) {
            const subCategoryDiv = document.createElement( "div" );
            const subCategoryBtn = document.createElement( "button" );
            const subCategoryIcon = document.createElement( "img" );

            subCategoryBtn.textContent = list[ i ].subcats[ j ].name;
            subCategoryBtn.dataset.type = "subcategory";
            subCategoryBtn.dataset.id = list[ i ].subcats[ j ].id;
            subCategoryIcon.src = images[ "chemical-weapon.svg" ];
            subCategoryIcon.alt = "Sub category icon";
            subCategoryDiv.classList.add( "subcategory-content" );
            subCategoryDiv.append( subCategoryIcon, subCategoryBtn );
            projectDiv.append( subCategoryDiv );
        }
    }
}

export function displayMain( list, parentCat ) {
    const mainDiv = document.querySelector( "main" );
    mainDiv.innerHTML = "";
    // console.log( list )
    for ( let i = 0; i < list.length; i++ ) {
        const categoryId = list[ i ].id;
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
        listeners.deleteListener( categoryDiv, deleteBtn, parentCat, list[ i ].id );


        categoryBtnDiv.dataset.id = categoryId;
        categoryBtnDiv.classList.add( "category-interactions" );
        categoryBtnDiv.append( editBtn, deleteBtn );
        categoryDescription.dataset.id = categoryId;

        categoryName.textContent = list[ i ].name;
        categoryDetails.dataset.id = categoryId;
        categoryDetails.append( categoryName, categoryDescription, categoryBtnDiv );
        categoryDiv.dataset.id = categoryId;
        categoryDiv.classList.add( "category-card" );
        categoryDiv.append( categoryDetails );
        mainDiv.append( categoryDiv );

        if ( list[ i ].description ) categoryDescription.textContent = list[ i ].description;
        else displayListItems( list[ i ], list[ i ].subcats, categoryDescription );
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

// function displayCategoryMenu( list, i, categoryDiv ) {
//     const categoryBtn = document.createElement( "button" );
//     const categoryIcon = document.createElement( "img" );

//     categoryBtn.textContent = list[ i ].name;
//     categoryBtn.dataset.type = "category";
//     categoryBtn.dataset.id = list[ i ].id;
//     categoryIcon.src = images[ "chart-tree.svg" ];
//     categoryIcon.alt = "Category icon";
//     categoryDiv.classList.add( "category-content" );
//     categoryDiv.append( categoryIcon, categoryBtn );
//     navDiv.append( categoryDiv );
// }

// function displaySubcategoryMenu( list, i, j, categoryDiv ) {
//     const subCategoryDiv = document.createElement( "div" );
//     const subCategoryBtn = document.createElement( "button" );
//     const subCategoryIcon = document.createElement( "img" );

//     subCategoryBtn.textContent = list[ i ].subcats[ j ].name;
//     subCategoryBtn.dataset.type = "subcategory";
//     subCategoryBtn.dataset.id = list[ i ].subcats[ j ].id;
//     subCategoryIcon.src = images[ "chemical-weapon.svg" ];
//     subCategoryIcon.alt = "Sub category icon";
//     subCategoryDiv.classList.add( "subcategory-content" );
//     subCategoryDiv.append( subCategoryIcon, subCategoryBtn );
//     categoryDiv.append( subCategoryDiv );
// }

function displayListItems( parentCat, list, div ) {
    for ( let j = 0; j < list.length; j++ ) {
        const inputList = document.createElement( "input" );
        const inputLabel = document.createElement( "label" );
        inputList.dataset.id = list[ j ].id;
        inputList.type = "checkbox";
        inputList.name = `list${ j }`;
        if ( list[ j ].getState() ) inputList.checked = true;
        // console.log( parentCat.getState() )
        listeners.handleCheckbox( inputList, list[ j ], parentCat );
        // displayCategoryChecked( inputList, parentCat );
        // console.log( list, parentCat )
        inputLabel.dataset.id = list[ j ].id;
        inputLabel.textContent = list[ j ].description;
        inputLabel.for = `list${ j }`;
        div.append( inputList, inputLabel );
        div.classList.add( "list-display" );
        // console.log( parentCat.getId() )
        displayCategoryChecked( parentCat );
    }
}

// Toggle visual validation state on subcategory

export function displayCategoryChecked( parentCat ) {
    const divChecked = document.querySelector( `main > div[data-id='${ parentCat.getId() }']` );
    divChecked.classList.toggle( "category-card-checked", parentCat.getState() )
    if ( divChecked.classList.contains( "category-card-checked" ) && ( !parentCat.getState() ) ) divChecked.classList.remove( "category-card-checked" );
}