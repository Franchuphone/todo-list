export function checkedSimilarBoxes( boxId ) {
    const checkBoxes = document.querySelectorAll( `div[data-id="${ boxId }"] input[type="checkbox"]:checked` );
    const divBoxes = document.querySelectorAll( `div[data-id="${ boxId }"] input[type="checkbox"]` );
    if ( checkBoxes.length === divBoxes.length ) return true
}

