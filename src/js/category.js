import { Subcategory } from "./subcategory";

export class Category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.id = crypto.randomUUID();
    this.subcats = [];
  }

  editCat(name, description) {
    this.name = name;
    this.description = description;
  }

  editSubcats(newSubcat) {
    this.subcats.push(newSubcat);
  }

  setId(id) {
    this.id = id;
  }

  createSubcat(name, dueDate) {
    const subcat = new Subcategory(name, dueDate, this.id);
    this.subcats.push(subcat);
    return subcat;
  }

  deleteSubcat(id) {
    const index = this.subcats.findIndex((item) => item.id === id);
    this.lists.subcats(index, 1);
  }

  delete(id) {
    const index = this.subcats.findIndex((item) => item.id === id);
    this.subcats.splice(index, 1);
  }

  cleanEntries() {
    this.name =
      this.name.charAt(0).toUpperCase() + this.name.toLowerCase().slice(1);
    this.description =
      this.description.charAt(0).toUpperCase() +
      this.description.toLowerCase().slice(1);
  }

  getAllSubcats() {
    return this.subcats;
  }

  getSubcat(id) {
    return this.subcats.find((item) => item.id === id);
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getName() {
    return this.name;
  }
}
