import { RuleTester } from '@typescript-eslint/rule-tester'
import rule from '../src'

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
})

ruleTester.run('consistent-function-type', rule, {
  valid: [
    {
      code: 'const foo: VoidFunction = () => {}',
      options: [{ default: 'VoidFunction' }]
    },
    {
      code: 'const foo: () => void = () => {}',
      options: [{ default: 'ArrowFunction' }]
    }
  ],
  invalid: [
    {
      code: 'const foo: () => void = () => {}',
      options: [{ default: 'VoidFunction' }],
      errors: [
        { messageId: 'errorUsingArrowFunction' }
      ],
      output: 'const foo: VoidFunction = () => {}'
    },
    {
      code: 'const foo: VoidFunction = () => {}',
      options: [{ default: 'ArrowFunction' }],
      errors: [
        { messageId: 'errorUsingVoidFunction' }
      ],
      output: 'const foo: () => void = () => {}'
    }
  ]
});