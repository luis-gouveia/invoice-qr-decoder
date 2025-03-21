# Invoice QR Code Decoder
This TypeScript library decodes QR codes embedded in Portuguese invoices. As required by [Decree-Law No. 28/2019](https://diariodarepublica.pt/dr/en/detail/decree-law/28-2019-119622094), all invoices must include a QR code containing essential invoice data. This library validates and extracts that information into a structured format.
The implementation is based on the official [technical specifications](https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Novas_regras_faturacao/Documents/Especificacoes_Tecnicas_Codigo_QR.pdf) provided by the _Autoridade Tributária e Aduaneira (AT)_.

## Usage
This package can be used both as a Node.js module and via the command line.

### Module
#### _.isValid(data)_
This function validates the raw data from an invoice QR code. It checks whether the provided data complies with the [technical specification](https://info.portaldasfinancas.gov.pt/pt/apoio_contribuinte/Novas_regras_faturacao/Documents/Especificacoes_Tecnicas_Codigo_QR.pdf) set by _AT_ and returns a boolean indicating if the data is valid. Use this method to quickly verify the integrity of the data before performing further actions.

```ts
const valid = isValid(rawData)
```

- Parameters:
	- `data (string)`: The raw QR code data to be validated.
- Returns:
	- `true`: if the QR code data is valid.
	- `false`: if the QR code data is not valid.

#### _.decode(data)_
This function decodes the raw QR code data and extracts the information encoded within. After validation, this method returns an object containing the decoded data in a [structured format](https://github.com/luis-gouveia/invoice-qr-decoder/blob/main/src/lib/types.ts#L43).

```ts
const decodedData = decode(rawData)
```

- Parameters:
	- `data (string)`: The raw QR code data to be decoded.
- Returns:
	- An object containing the decoded data <br/> (e.g., _`{type: 'Invoice', atcud: 'ABCDEFGH-012345', total: 10.5, ...}`_)

### CLI
To use the CLI, first clone the repository and install all the dependencies:
```
git clone https://github.com/luis-gouveia/invoice-qr-decoder.git
cd invoice-qr-decoder
npm install
```
Then, run the CLI with:
```
npm run cli
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.