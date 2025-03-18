import { FailedToDecode, InvalidData } from './errors'
import { CountryRegion, Document, DocumentStatus, DocumentType } from './types'
import { isValid, parse } from './validation'

/**
 * Decodes the raw data from the document QR Code
 *
 * @param data Raw data read from the document QR Code
 * @returns Decoded document data
 *
 * @throws {InvalidData} If the input data is not valid
 * @throws {FailedToDecode} When its not possible to decode the document data
 */
export function decode(data: string): Document {
  if (!isValid(data)) throw new InvalidData()
  const parsedData = parse(data)

  try {
    const vat: Document['tax']['vat'] = []
    if (parsedData.I1 !== '0') {
      const taxSections = ['I', 'J', 'K'] as const
      for (const taxSection of taxSections) {
        const vatRegion = parsedData[`${taxSection}1`]
        const hasTaxAmounts = Object.keys(parsedData).some((v) => new RegExp(`${taxSection}([2-8])?$`).test(v))
        if (!vatRegion || !hasTaxAmounts) continue

        vat.push({
          countryRegion: CountryRegion[vatRegion as keyof typeof CountryRegion],
          exempt: parsedData[`${taxSection}2`] ?? 0,
          reduced: {
            base: parsedData[`${taxSection}3`] ?? 0,
            tax: parsedData[`${taxSection}4`] ?? 0,
          },
          intermediate: {
            base: parsedData[`${taxSection}5`] ?? 0,
            tax: parsedData[`${taxSection}6`] ?? 0,
          },
          standard: {
            base: parsedData[`${taxSection}7`] ?? 0,
            tax: parsedData[`${taxSection}8`] ?? 0,
          },
        })
      }
    }

    return {
      number: parsedData.G,
      atcud: parsedData.H,
      type: DocumentType[parsedData.D as keyof typeof DocumentType],
      status: DocumentStatus[parsedData.E as keyof typeof DocumentStatus],
      date: parsedData.F,
      issuer: {
        vatNumber: parsedData.A,
      },
      buyer: {
        vatNumber: parsedData.B,
        country: parsedData.C,
      },
      tax: {
        vat,
        nonTaxableAmount: parsedData.L,
        stampTax: parsedData.M,
        withholdingTaxAmount: parsedData.P,
        total: parsedData.N,
      },
      total: parsedData.O,
      hashCode: parsedData.Q,
      certificationNumber: parsedData.R,
      otherInfo: parsedData.S?.split(';'),
    }
  } catch {
    throw new FailedToDecode()
  }
}
