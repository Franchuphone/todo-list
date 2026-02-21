export function deleteListener( parentDiv, elementDiv, element ) {
    elementDiv.addEventListener( "click", () => {
        element.delete();
        parentDiv.remove();
    } );
};

export function editListener( elementDiv, element ) {

}
