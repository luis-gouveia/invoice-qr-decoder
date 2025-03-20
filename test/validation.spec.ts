import { isValid, parse } from '../src/lib/validation'

describe('Validation', () => {
  const validData =
    'A:000000000*B:999999999*C:PT*D:FT*E:N*F:20250314*G:AB 123/456789*H:ABCDEFGH-012345*I1:PT*I3:10.00*I4:0.50*N:0.50*O:10.50*Q:AaAa*R:1234'

  test('Should be able to identify valid QR code data', () => {
    const valid = isValid(validData)
    expect(valid).toBeTruthy()
  })

  test('Should be able to identify invalid QR code data', () => {
    const valid = isValid('invalid-data')
    expect(valid).toBeFalsy()
  })

  test('Should fail to parse invalid QR code data', () => {
    const parseOrError = () => parse('invalid-data')
    expect(parseOrError).toThrow('Failed to parse document data.')
  })

  test('Should be able parse valid QR code data', () => {
    const parsedData = parse(validData)
    expect(parsedData.A).toEqual('000000000')
    expect(parsedData.B).toEqual('999999999')
    expect(parsedData.C).toEqual('PT')
    expect(parsedData.D).toEqual('FT')
    expect(parsedData.E).toEqual('N')
    expect(parsedData.F.toISOString()).toEqual(new Date('2025-03-14').toISOString())
    expect(parsedData.G).toEqual('AB 123/456789')
    expect(parsedData.H).toEqual('ABCDEFGH-012345')
    expect(parsedData.I1).toEqual('PT')
    expect(parsedData.I2).toBeUndefined()
    expect(parsedData.I3).toEqual(10)
    expect(parsedData.I4).toEqual(0.5)
    expect(parsedData.I5).toBeUndefined()
    expect(parsedData.I6).toBeUndefined()
    expect(parsedData.I7).toBeUndefined()
    expect(parsedData.I8).toBeUndefined()
    expect(parsedData.J1).toBeUndefined()
    expect(parsedData.J2).toBeUndefined()
    expect(parsedData.J3).toBeUndefined()
    expect(parsedData.J4).toBeUndefined()
    expect(parsedData.J5).toBeUndefined()
    expect(parsedData.J6).toBeUndefined()
    expect(parsedData.J7).toBeUndefined()
    expect(parsedData.J8).toBeUndefined()
    expect(parsedData.K1).toBeUndefined()
    expect(parsedData.K2).toBeUndefined()
    expect(parsedData.K3).toBeUndefined()
    expect(parsedData.K4).toBeUndefined()
    expect(parsedData.K5).toBeUndefined()
    expect(parsedData.K6).toBeUndefined()
    expect(parsedData.K7).toBeUndefined()
    expect(parsedData.K8).toBeUndefined()
    expect(parsedData.L).toBeUndefined()
    expect(parsedData.M).toBeUndefined()
    expect(parsedData.N).toEqual(0.5)
    expect(parsedData.O).toEqual(10.5)
    expect(parsedData.P).toBeUndefined()
    expect(parsedData.Q).toEqual('AaAa')
    expect(parsedData.R).toEqual(1234)
    expect(parsedData.S).toBeUndefined()
  })
})
