import { expect, test } from 'vitest'
import { transform } from '../src'

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
