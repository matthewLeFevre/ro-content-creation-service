import { Collection } from "@everlast-brands/local-collection";
import Services from "../services/Services";

export default class Service {
  collection: Collection;
  services?: Services;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  inject(services: Services) {
    this.services = services;
  }

  async create(data) {
    const id = await this.collection.create(data);
    return { id };
  }
  async createWithId(data, id) {
    await this.collection.createWithId(data, id);
    return { id };
  }
  async update(id, data) {
    const item = await this.collection.getById(id);
    await this.collection.updateById(id, { ...item, ...data });
  }
  async get(id) {
    const res = await this.collection.getById(id);
    return res;
  }
  async getAll() {
    const res = await this.collection.getAll();
    return res;
  }
  async delete(id) {
    await this.collection.deleteById(id);
  }
}
