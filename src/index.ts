import { createRule } from './util';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

type OptionString = 'VoidFunction' | 'ArrowFunction';
type Options = [
  {
    default: OptionString;
  },
];

type MessageIds = 'errorUsingArrowFunction' | 'errorUsingVoidFunction';

export default createRule<Options, MessageIds>({
  name: 'consistent-function-type',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure consistent function type usage',
    },
    messages: {
      errorUsingArrowFunction: 'Unexpected function type, should use VoidFunction',
      errorUsingVoidFunction: 'Unexpected function type, should use arrow function type',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          default: {
            type: 'string',
            enum: ['VoidFunction', 'ArrowFunction'],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ default: 'ArrowFunction' }],
  create(context, [option]) {
    return {
      TSTypeReference(node) {
        if (
          node.typeName.type === AST_NODE_TYPES.Identifier &&
          node.typeName.name === 'VoidFunction'
        ) {
          if (option.default === 'ArrowFunction') {
            context.report({
              node,
              messageId: 'errorUsingVoidFunction',
              fix(fixer) {
                return fixer.replaceText(node, `() => void`);
              },
            });
          }
        }
      },
      TSTypeAnnotation(node) {
        if (node.typeAnnotation && node.typeAnnotation.type === AST_NODE_TYPES.TSFunctionType) {
          if (option.default === 'VoidFunction') {
            context.report({
              node,
              messageId: 'errorUsingArrowFunction',
              fix(fixer) {
                // const sourceCode = context.getSourceCode();
                // const typeAnnotation = sourceCode.getText(node.typeAnnotation);
                return fixer.replaceText(node.typeAnnotation, `VoidFunction`);
              },
            });
          }
        }
      },
    };
  },
});
