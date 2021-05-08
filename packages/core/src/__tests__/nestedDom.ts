import { BaseComponent, getDefaultTemplateFilename } from '../index';

function BaseTestComponent<T = {}>(template: string, components?: Record<string, any>) {
    class tempComponent extends BaseComponent<T>('', components) {
        async loadTemplate(): Promise<string> {
            return template
        }
    }
    return tempComponent
}

test('nested component', async () => {
    class myComponent extends BaseTestComponent('<div><h1>some title</h1><p>some text</p></div>') {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<div><h1>some title</h1><div>some text</div></div>');
});