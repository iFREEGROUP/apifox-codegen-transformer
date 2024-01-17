import { expect, test } from 'vitest'
import { transform } from '../src/index.js'

test('basic transformation', () => {
  const output = transform(`
export type T1 = {
    /**
     * field1
     */
    field1: string;
    /**
     * field2
     */
    field2: number;
    [property: string]: any;
}

export type T2 = {
    /**
     * field3
     */
    field3: string;
    /**
     * field4
     */
    field4: number;
    [key: string]: any;
}
`)
  expect(output).toMatchSnapshot()
})

test('optional properties with comments', () => {
  const output = transform(`
export type T1 = {
    /**
     * field1
     */
    field1?: string;
    /**
     * field2
     */
    field2?: number;
    [property: string]: any;
}
`)
  expect(output).toMatchSnapshot()
})

test('convert optional properties to `undefined`', () => {
  const output = transform(
    `
export type T1 = {
    field1?: string;
    field2?: number;
    [property: string]: any;
}
`,
    { optionalToUndefined: true }
  )
  expect(output).toMatchSnapshot()
})
