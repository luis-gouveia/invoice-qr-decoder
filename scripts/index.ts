import readline from 'readline'
import { isValid } from '../src/lib/validation'
import { decode } from '../src/lib/decoder'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function askUser<T = string>(question: string, parser?: (value: string) => T): Promise<T> {
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      const response = parser ? parser(input) : (input as unknown as T)
      resolve(response)
    })
  })
}

async function validate(): Promise<void> {
  const input = await askUser('QR Code Value: ')
  const valid = isValid(input)
  console.log(`The QR Code is ${valid ? '' : 'not '}valid!`)
}

async function decoder(): Promise<void> {
  const input = await askUser('QR Code Value: ')
  const valid = decode(input)
  console.log('Decoded Data: ')
  console.dir(valid, { depth: null })
}

async function main(): Promise<void> {
  try {
    console.log('You will be asked to choose an action to perform.')
    const action = await askUser('0 - Validate QR Code\n1 - Decode QR Code\nChoose your option: ', parseInt)

    switch (action) {
      case 0: {
        await validate()
        break
      }
      case 1: {
        await decoder()
        break
      }
      default:
        throw new Error('Invalid option!')
    }
  } catch (error: any) {
    console.error(error)
    process.exit(1)
  } finally {
    rl.close()
  }
}

main()
