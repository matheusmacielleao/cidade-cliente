export class NotExists extends Error {
  description: string;
  constructor(entity: string) {
    super(`${entity} does not exist`);
    this.description = 'id';
    this.name = `${entity} does not exist`;
  }
}

