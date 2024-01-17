import * as recast from 'recast'
import * as parser from 'recast/parsers/typescript.js'

const n = recast.types.namedTypes
const b = recast.types.builders

export interface Options {
  optionalToUndefined?: boolean
}

export function transform(source: string, options: Options = {}): string {
  const ast = recast.parse(source, { parser })

  recast.visit(ast, {
    visitTSPropertySignature(path) {
      path.node.comments = []
      this.traverse(path)

      const { node } = path
      if (
        options.optionalToUndefined && node.optional &&
        node.typeAnnotation?.typeAnnotation &&
        !n.TSTypeAnnotation.check(node.typeAnnotation.typeAnnotation) &&
        !n.TSTypePredicate.check(node.typeAnnotation.typeAnnotation)
      ) {
        node.optional = false
        node.typeAnnotation.typeAnnotation = b.tsUnionType([
          node.typeAnnotation.typeAnnotation,
          b.tsUndefinedKeyword(),
        ])
      }
    },
    visitTSIndexSignature(path) {
      path.prune()
      return false
    },
  })

  return recast.print(ast).code
}
