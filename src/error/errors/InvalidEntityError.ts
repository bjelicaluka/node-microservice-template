export class InvalidEntityError extends Error {

  constructor(message: string) {
    super(message);
    this.name = "InvalidEntityError";
  }

}