import { BaseComponent, getDefaultTemplateFilename } from '../index';

function BaseTestComponent<T = {}>(template: string, components?: Record<string, any>) {
    class tempComponent extends BaseComponent<T>('', components) {
        async loadTemplate(): Promise<string> {
            return template
        }
    }
    return tempComponent
}

test('basic', async () => {
    class myComponent extends BaseTestComponent('<div>some div</div>') {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<div>some div</div>');
});

test('basic interpolation', async () => {
    class myComponent extends BaseTestComponent<{user: string}>('<div>hello ${user}</div>') {}
    const component = new myComponent()
    const content = await component.render({user: 'tim'});
    expect(content).toBe('<div>hello tim</div>');
});

test('basic interpolation missing reference', async () => {
    class myComponent extends BaseTestComponent<{user: string}>('<div>hello ${user}</div>') {}
    const component = new myComponent()
    const t = async () => {
        await component.render({} as any);
    }
    await expect(t).rejects.toThrow(ReferenceError);
});

//test('nested component', async () => {
//    class helloWorld extends BaseTestComponent('<div>hello</div>') {}
//    class myComponent extends BaseTestComponent('<helloWorld></helloWorld>', {helloWorld}) {}
//    const component = new myComponent()
//    const content = await component.render({});
//    expect(content).toBe('<div>hello</div>');
//});

test('nested component', async () => {
    class myComponent extends BaseTestComponent('<div><h1>some title</h1></div>') {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<div><h1>some title</h1></div>');
});