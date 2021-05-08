

export class Template {
  private string: String;

  constructor(str: String) {
    this.string = str
  }

  interpolate(params: any): String {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this.string}\`;`)(...vals);
  }
}

export default function(str: String, params: any): String {
  const temp = new Template(str);
  return temp.interpolate(params);
}