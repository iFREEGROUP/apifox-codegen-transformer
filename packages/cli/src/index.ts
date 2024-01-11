#!/usr/bin/env node

import * as process from 'node:process'
import { run } from './cli.js'

await run(process.argv.slice(2))
