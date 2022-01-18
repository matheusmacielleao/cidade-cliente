export default class NotFound extends Error {
  description: string;
  status : number;
  constructor(name: string) {
    super();
    this.description = `Value  ${name} Notfound`;
    this.message = name;
    this.status =404;
  }
}
