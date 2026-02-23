export function checkSimilarBoxesState( SubcatId ) {
    const checkBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]:checked` );
    const divBoxes = document.querySelectorAll( `div[data-id="${ SubcatId }"] input[type="checkbox"]` );
    if ( checkBoxes.length === divBoxes.length ) return true
}

export function checkCatState( cat ) {

}