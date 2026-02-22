export class List {
    constructor ( description = null, state = false, dueDate = null ) {
        this.description = description;
        this.dueDate = dueDate;
        this.state = state;
        this.id = crypto.randomUUID();
    }

    editList( description, state = false, dueDate = null ) {
        this.description = description;
        this.state = state;
        this.dueDate = dueDate;
    }

    changeState() {
        ( this.state ) ? this.state = false : this.state = true;
    }

    cleanEntries() {
        this.description = this.description.charAt( 0 ).toUpperCase() + this.description.toLowerCase().slice( 1 );
    }

    getState() {
        return this.state;
    }

    getId() {
        return this.id
    }
}