import domRenderer from 'dom-serializer';
import type { Node } from 'domhandler';

export function render(node: Node | Node[]): string {
  return domRenderer(node)
}