import { transform } from '@ifreegroup/apifox-codegen-transformer-core'
import getStdin from 'get-stdin'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'
import yargs from 'yargs'
import * as cb from './clipboard.js'

export async function run(argv: string[]) {
  const { _: files, clipboard, optionalToUndefined } = await yargs(argv)
    .parserConfiguration({
      'parse-positional-numbers': false,
    })
    .usage('Usage: $0 [file]')
    .option('clipboard', {
      type: 'boolean',
      description: 'read code from clipboard then write back to clipboard after transformation',
    })
    .option('optional-to-undefined', {
      type: 'boolean',
      description: 'convert optional properties to `T | undefined`',
    })
    .scriptName('apifox-ct')
    .help()
    .version()
    .parse()
  const file = files[0] as string

  const source = file
    ? await fs.readFile(file, 'utf8')
    : clipboard
      ? await cb.read()
      : await getStdin()
  const output = transform(source, { optionalToUndefined })

  if (clipboard) {
    await cb.write(output)
  } else {
    process.stdout.write(output)
  }
}
