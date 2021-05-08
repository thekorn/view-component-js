import path from 'path';

export function getDefaultTemplateFilename(fn: string): string {
  const basename = path.basename(fn, '.ts');
  const dirname = path.dirname(fn)
  return path.join(dirname, `${basename}.html`)
}