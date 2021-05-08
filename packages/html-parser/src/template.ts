

export class Template {
  private string: string;

  constructor(str: string) {
    this.string = str
  }

  interpolate(params: any): string {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this.string}\`;`)(...vals);
  }
}

export function interpolate(str: string, params: any): string {
  const temp = new Template(str);
  return temp.interpolate(params);
}