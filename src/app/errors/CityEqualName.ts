export class CityEqualName extends Error {
  description: string;
  constructor() {
    super(`City with this name already exists`);
    this.description = 'name';
    this.name = 'City with this name already exists';
  }
}
