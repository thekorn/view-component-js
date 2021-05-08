import { Parser } from 'htmlparser2';
import { DomHandler, Node } from 'domhandler';

class ParserError extends Error {}

// TODO: type for any in components
export async function parse(html: string): Promise<Node>{
  return new Promise((resolve, reject) => {
    const handler = new DomHandler((error, dom) => {
      if (error) {
        console.error('parser.parse error', error);
        reject(error)
      } else {
        if (dom.length != 1) {
          reject(new ParserError('template needs a single root element'))
        } else {
          resolve(dom[0])
        }
      }
    });
    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  })
};