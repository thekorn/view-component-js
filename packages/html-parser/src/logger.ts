import util from 'util';

function genlog(level: 'log' | 'error') {
  return function(object: any) {
    const result = util.inspect(object, {showHidden: false, depth: null, colors: true});
    console[level](result);
  }
}

export const log = genlog('log')
export const error = genlog('error')