#!/usr/bin/env node

import { transform } from '@apifox-codegen-transformer/core'
import getStdin from 'get-stdin'

const stdin = await getStdin()
console.log(transform(stdin))
