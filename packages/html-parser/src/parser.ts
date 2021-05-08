import { ElementType, Parser } from 'htmlparser2';
import { DomHandler, Node, Element } from 'domhandler';

function elementCB(element: Element) {
  console.log('---> element', element);
  if (element.type === ElementType.Tag && element.name === 'p') {
    element.name = 'div'
  }
}

export async function parse(html: string): Promise<Node[]>{
  return new Promise((resolve, reject) => {
    const handler = new DomHandler((error, dom) => {
      if (error) {
        console.error('parser.parse error', error);
        reject(error)
      } else {
        resolve(dom)
      }
    }, null, elementCB);
    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  })
};