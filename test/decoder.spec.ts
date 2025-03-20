import { decode } from '../src/lib/decoder'

describe('Decoder', () => {
  test('Should fail to parse invalid QR code data', () => {
    const decodeOrError = () => decode('invalid-data')
    expect(decodeOrError).toThrow('The provided data is not valid.')
  })

  test('Should be able parse valid QR code data', () => {
    const decodedData = decode(
      'A:000000000*B:999999999*C:PT*D:FT*E:N*F:20250314*G:AB 123/456789*H:ABCDEFGH-012345*I1:PT*I3:10.00*I4:0.50*N:0.50*O:10.50*Q:AaAa*R:1234',
    )
    expect(decodedData.issuer.vatNumber).toEqual('000000000')
    expect(decodedData.buyer.vatNumber).toEqual('999999999')
    expect(decodedData.buyer.country).toEqual('PT')
    expect(decodedData.type).toEqual('Invoice')
    expect(decodedData.status).toEqual('Normal')
    expect(decodedData.date.toISOString()).toEqual(new Date('2025-03-14').toISOString())
    expect(decodedData.number).toEqual('AB 123/456789')
    expect(decodedData.atcud).toEqual('ABCDEFGH-012345')
    expect(decodedData.tax.vat.length).toEqual(1)
    expect(decodedData.tax.vat[0].countryRegion).toEqual('Portugal')
    expect(decodedData.tax.vat[0].reduced.base).toEqual(10)
    expect(decodedData.tax.vat[0].reduced.tax).toEqual(0.5)
    expect(decodedData.tax.vat[0].intermediate.base).toEqual(0)
    expect(decodedData.tax.vat[0].intermediate.tax).toEqual(0)
    expect(decodedData.tax.vat[0].standard.base).toEqual(0)
    expect(decodedData.tax.vat[0].standard.tax).toEqual(0)
    expect(decodedData.tax.vat[0].exempt).toEqual(0)
    expect(decodedData.tax.nonTaxableAmount).toBeUndefined()
    expect(decodedData.tax.stampTax).toBeUndefined()
    expect(decodedData.tax.withholdingTaxAmount).toBeUndefined()
    expect(decodedData.tax.total).toEqual(0.5)
    expect(decodedData.total).toEqual(10.5)
    expect(decodedData.hashCode).toEqual('AaAa')
    expect(decodedData.certificationNumber).toEqual(1234)
    expect(decodedData.otherInfo).toBeUndefined()
  })
})
