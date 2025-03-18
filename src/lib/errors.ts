/** Error thrown when its not possible to parse the raw document data into JSON format */
export class FailedToParse extends Error {
  /** Invalid fields in the provided raw data */
  readonly invalidFields: { argument: string; message: string }[] | undefined

  constructor(invalidFields?: { argument: string; message: string }[]) {
    super('Failed to parse document data.')
    this.invalidFields = invalidFields
  }
}

/** Error thrown when the provided raw document data is not valid */
export class InvalidData extends Error {
  constructor() {
    super('The provided data is not valid.')
  }
}

/** Error thrown when its not possible to decode the document data */
export class FailedToDecode extends Error {
  constructor() {
    super('Failed to decode the document data.')
  }
}
