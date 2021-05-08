import { Node } from 'domhandler';

class CompileError extends Error {}

export function compile(nodes: Node[], components?: Record<string, any>): Node {
  if (nodes.length != 1) {
    throw new CompileError('template needs a single root element')
  }
  const node = nodes[0];
  return node
}