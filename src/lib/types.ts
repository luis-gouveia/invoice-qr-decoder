/** Possible document status  */
export enum DocumentStatus {
  'N' = 'Normal',
  'S' = 'Self-Billing',
  'A' = 'Annulled Document',
  'F' = 'Invoiced Document',
  'R' = 'Summary Document',
}

/** Possible document types  */
export enum DocumentType {
  'FT' = 'Invoice',
  'FS' = 'Simplified Invoice',
  'FR' = 'Invoice-Rceipt',
  'ND' = 'Debit Note',
  'NC' = 'Credit Note',
  'VD' = 'Sale for Cash and Invoice/ Sales Ticket',
  'TV' = 'Sale Ticket',
  'TD' = 'Return Ticket',
  'AA' = 'Assets Alienation',
  'DA' = 'Assets Return',
  'RP' = 'Premium or Premium Receipt',
  'RE' = 'Return Insurance or Receipt of Return Insurance',
  'CS' = 'Imputation to Co-Insurance Companies',
  'LD' = 'Imputation to Leadership Co-Insurance Companies',
  'RA' = 'Accepted Re-Insurance',
}

/** Possible VAT country region values  */
export enum CountryRegion {
  'PT' = 'Portugal',
  'PT-MA' = 'Madeira',
  'PT-AC' = 'Azores',
}

export type TaxRate = {
  /** Total amount to be taxed */
  base: number
  /** Total amount taxed */
  tax: number
}

export type Document = {
  /** Unique identifier of the document */
  number: string
  /** ACTUD Code */
  atcud: string
  /** Type of document */
  type: `${DocumentType}`
  /** Status of the document */
  status: `${DocumentStatus}`
  /** Date of the document */
  date: Date
  /** Document issuer's information */
  issuer: {
    /** Document issuer's VAT Number */
    vatNumber: string
  }
  /** Buyer's information */
  buyer: {
    /** Buyer's VAT Number */
    vatNumber: string
    /** Country Code of the buyer */
    country: string
  }
  /** Information about the taxes in the document */
  tax: {
    /** VAT information */
    vat: {
      /** VAT country region */
      countryRegion: `${CountryRegion}`
      /** Standard VAT rate information */
      standard: TaxRate
      /** Intermediate VAT rate information */
      intermediate: TaxRate
      /** Reduced VAT rate information */
      reduced: TaxRate
      /** Amount that is exempt from VAT */
      exempt: number
    }[]
    /** Total amount not subject to VAT */
    nonTaxableAmount?: number
    /** Stamp tax of the document */
    stampTax?: number
    /** Withholding tax amount of the document */
    withholdingTaxAmount?: number
    /** Total value of taxes of the document */
    total: number
  }
  /** Total value of the document including taxes */
  total: number
  /** Last 4 digits of the security hash */
  hashCode: string
  /** Software certification number issued by AT */
  certificationNumber: number
  /** Other useful information like IBAN or payment references */
  otherInfo?: string[]
}
