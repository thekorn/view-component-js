import { parse, compile, render } from './src/index';
import * as logger from './src/logger';

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