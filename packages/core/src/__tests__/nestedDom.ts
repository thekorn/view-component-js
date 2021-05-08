import { BaseComponent } from '../index';

function BaseTestComponent<T = {}>(template: string, components?: Record<string, any>) {
    class tempComponent extends BaseComponent<T>('', components) {
        async loadTemplate(): Promise<string> {
            return template
        }
    }
    return tempComponent
}

test('nested component', async () => {
    class helloWorld extends BaseTestComponent('<p>hello</p>') {}
    class myComponent extends BaseTestComponent('<div><h1>title</h1><helloWorld></helloWorld></div>', {helloWorld}) {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<div><h1>title</h1><p>hello</p></div>');
});

test('custom component', async () => {
    class helloWorld extends BaseTestComponent('<p>hello</p>') {}
    class myComponent extends BaseTestComponent('<helloWorld></helloWorld>', {helloWorld}) {}
    const component = new myComponent()
    const content = await component.render({});
    expect(content).toBe('<p>hello</p>');
});

test('custom component with interpolation', async () => {
    class helloWorld extends BaseTestComponent('<p>hello ${user}</p>') {}
    class myComponent extends BaseTestComponent('<helloWorld></helloWorld>', {helloWorld}) {}
    const component = new myComponent()
    const content = await component.render({user: 'hans'});
    expect(content).toBe('<p>hello hans</p>');
});