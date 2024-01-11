import { transform } from '@apifox-codegen-transformer/core'
import getStdin from 'get-stdin'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'
import yargs from 'yargs'
import * as cb from './clipboard.js'

export async function run(argv: string[]) {
  const { _: files, clipboard } = await yargs(argv)
    .parserConfiguration({
      'parse-positional-numbers': false,
    })
    .usage('Usage: $0 [file]')
    .boolean('clipboard')
    .help()
    .version()
    .parse()
  const file = files[0] as string

  const source = file
    ? await fs.readFile(file, 'utf8')
    : clipboard
    ? await cb.read()
    : await getStdin()
  const output = transform(source)

  if (clipboard) {
    await cb.write(output)
  } else {
    process.stdout.write(output)
  }
}
