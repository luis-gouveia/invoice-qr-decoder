/** Error thrown when its not possible to parse the raw document data into JSON format */
export class FailedToParse extends Error {
  /** Invalid fields in the provided raw data */
  readonly invalidFields: { argument: string; message: string }[] | undefined

  constructor(invalidFields?: { argument: string; message: string }[]) {
    super('Failed to parse document data.')
    this.invalidFields = invalidFields
  }
}
