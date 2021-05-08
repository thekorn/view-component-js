import { Node } from 'domhandler';
import * as logger from './logger';

class CompileError extends Error {}

function generateDom(nodes: Node[], components?: Record<string, any>): Node[] {
  return []
}

export function compile(nodes: Node[], components?: Record<string, any>): Node {
  if (nodes.length != 1) {
    throw new CompileError('template needs a single root element')
  }
  const node = nodes[0];
  // logger.log(node)
  return node
}