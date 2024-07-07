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
    }
  ],
  invalid: [
    {
      code: 'const foo: VoidFunction = () => {}',
      options: [{ default: 'ArrowFunction' }],
      errors: [
        { messageId: 'errorUsingVoidFunction' }
      ]
    }
  ]
});