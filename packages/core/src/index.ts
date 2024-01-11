import * as recast from 'recast'
import * as parser from 'recast/parsers/typescript.js'

export function transform(source: string): string {
  const ast = recast.parse(source, { parser })

  recast.visit(ast, {
    visitComment(path) {
      path.prune()
      return false
    },
    visitTSIndexSignature(path) {
      path.prune()
      return false
    },
  })

  return recast.print(ast).code
}
