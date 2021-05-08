import { Parser } from 'htmlparser2';
import { DomHandler, Node } from 'domhandler';

export default async function (html: string): Promise<Node[]>{
  return new Promise((resolve, reject) => {
    const handler = new DomHandler((error, dom) => {
      if (error) {
        console.error('parser.parse error', error);
        reject(error)
      } else {
        resolve(dom)
      }
    });
    const parser = new Parser(handler);
    parser.write(html);
    parser.end();
  })
};