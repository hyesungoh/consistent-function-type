import * as ts from 'typescript';
import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
  () => `https://github.com/hyesungoh/eslint-plugin-consistent-function-type`
);

export const isIdentifier = (node: ts.Node): node is ts.Identifier => {
  return ts.isIdentifier(node);
};
