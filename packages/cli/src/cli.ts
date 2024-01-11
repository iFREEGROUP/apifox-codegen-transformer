import { transform } from '@apifox-codegen-transformer/core'
import getStdin from 'get-stdin'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'
import yargs from 'yargs'

export async function run(argv: string[]) {
  const { _: files } = await yargs(argv)
    .parserConfiguration({
      'parse-positional-numbers': false,
    })
    .usage('Usage: $0 [file]')
    .help()
    .version()
    .parse()
  const file = files[0] as string

  const source = file
    ? await fs.readFile(file, 'utf8')
    : await getStdin()
  const output = transform(source)

  process.stdout.write(output)
}
