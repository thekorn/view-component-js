import parse from './lib/parser';
import compile from './lib/compiler';
import render from './lib/renderer';
import * as logger from './lib/logger';

async function main() {
  const result = await parse('<div data=${1}><h1>Hello World</h1></div>')
  logger.log(result);
  const code = compile(result);
  const html = render(code)
  console.log(html);
  
}

main().then(() => {
  console.log('DONE');
  process.exit();
}).catch((reason) => {
  console.error('ERROR', reason);
  process.exit(1);
});