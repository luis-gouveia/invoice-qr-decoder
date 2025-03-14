import { z, ZodError } from 'zod'
import { CountryRegion, DocumentStatus, DocumentType } from './types'
import { FailedToParse } from './errors'

/**
 * Converts the Enum keys into an array o strings suitable for zod validation
 *
 * @param object Enum object
 * @returns Array of enum keys suitable for zod validation
 */
function enumKeys<T extends object>(object: T): readonly [string, ...string[]] {
  const [firstKey, ...otherKeys] = Object.keys(object)
  return [firstKey, ...otherKeys]
}

/** Schema to validate floating point values */
const floatSchema = z
  .string()
  .refine((v) => /^\d{1,13}(\.\d{2})?$/.test(v ?? ''))
  .pipe(z.coerce.number())

/** Schema to validate the data from the Document QR Code */
const documentSchema = z.object({
  // Issuer's VAT number
  A: z.string().min(8).max(9),
  // Buyer's VAT number
  B: z.string().min(8).max(30),
  // Buyer's country code
  C: z.string().min(2).max(12),
  // Document type
  D: z.enum(enumKeys(DocumentType)),
  // Document status
  E: z.enum(enumKeys(DocumentStatus)),
  // Document date
  F: z
    .string()
    .length(8)
    .transform((v) => new Date(v.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')))
    .pipe(z.coerce.date()),
  // Unique identifier of the document
  G: z.string().min(1).max(60),
  // ATCUD code
  H: z.string().min(12).max(70),
  // VAT country region
  I1: z.enum(enumKeys({ ...CountryRegion, '0': '0' })),
  J1: z.enum(enumKeys(CountryRegion)).optional(),
  K1: z.enum(enumKeys(CountryRegion)).optional(),
  // Amount that is exempt from VAT
  I2: floatSchema.optional(),
  J2: floatSchema.optional(),
  K2: floatSchema.optional(),
  // Total amount to be taxed at a reduced rate
  I3: floatSchema.optional(),
  J3: floatSchema.optional(),
  K3: floatSchema.optional(),
  // Total amount taxed at a reduced rate
  I4: floatSchema.optional(),
  J4: floatSchema.optional(),
  K4: floatSchema.optional(),
  // Total amount to be taxed at a intermediate rate
  I5: floatSchema.optional(),
  J5: floatSchema.optional(),
  K5: floatSchema.optional(),
  // Total amount taxed at a intermediate rate
  I6: floatSchema.optional(),
  J6: floatSchema.optional(),
  K6: floatSchema.optional(),
  // Total amount to be taxed at a standard rate
  I7: floatSchema.optional(),
  J7: floatSchema.optional(),
  K7: floatSchema.optional(),
  // Total amount taxed at a standard rate
  I8: floatSchema.optional(),
  J8: floatSchema.optional(),
  K8: floatSchema.optional(),
  // Total amount not subject to VAT
  L: floatSchema.optional(),
  // Stamp tax of the document
  M: floatSchema.optional(),
  // Total value of taxes of the document
  N: floatSchema,
  // Total value of the document including taxes
  O: floatSchema,
  // Withholding tax amount of the document
  P: floatSchema.optional(),
  // Last 4 digits of the security hash
  Q: z.string().length(4),
  // Software certification number issued by AT
  R: z.string().length(4).pipe(z.coerce.number()),
  // Other useful information like IBAN or payment references
  S: z.string().min(1).max(65).optional(),
})

/**
 * Converts the data read from the document QR Code into a JSON object
 *
 * @param data Data read from the document QR Code
 * @returns Data provided in JSON format
 */
function convertToJSON(data: string): Record<string, string> {
  const result: Record<string, string> = {}

  data.split('*').forEach((entity) => {
    const [key, value] = entity.split(':')
    result[key] = value
  })

  return result
}

/**
 * Validates the raw data read from the documet QR Code
 *
 * @param data Data read from the document QR Code
 * @returns *true* if the data is valid
 */
export function isValid(data: string): boolean {
  try {
    const structuredData = convertToJSON(data)
    return !!documentSchema.parse(structuredData)
  } catch {
    return false
  }
}

/**
 * Parses the raw data from the document QR Code into a JSON object
 *
 * @param data Data read from the document QR Code
 * @returns Document Data in JSON format
 *
 * @throws {FailedToParse} When the raw data is not valid
 */
export function parse(data: string) {
  try {
    const structuredData = convertToJSON(data)
    return documentSchema.parse(structuredData)
  } catch (error) {
    let invalidFields
    if (error instanceof ZodError) {
      invalidFields = error.errors.map((issue: any) => ({
        argument: issue.path.join('.'),
        message: issue.message,
      }))
    }
    throw new FailedToParse(invalidFields)
  }
}
