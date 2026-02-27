export class List {
  constructor(description = null, state = false) {
    this.description = description;
    this.state = state;
    this.id = crypto.randomUUID();
  }

  changeDescription(description) {
    this.description = description;
  }

  changeState() {
    this.state ? (this.state = false) : (this.state = true);
  }

  cleanEntries() {
    this.description =
      this.description.charAt(0).toUpperCase() +
      this.description.toLowerCase().slice(1);
  }

  getState() {
    return this.state;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }
}
