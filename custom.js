// 1. Get base component
const Input = Formio.Components.components.input;

// 2. Create custom component
class MyCustomComponent extends Input {

  static schema(...extend) {
    return Input.schema({
      type: 'mycustom',
      label: 'My Custom',
      key: 'mycustom'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'My Custom',
      icon: 'terminal',
      group: 'basic',
      weight: 0,
      schema: MyCustomComponent.schema()
    };
  }

  render() {
    return super.render(`<input ref="input" class="form-control"/>`);
  }

  attach(element) {
    this.loadRefs(element, { input: 'single' });

    this.addEventListener(this.refs.input, 'input', () => {
      this.updateValue();
    });

    return super.attach(element);
  }

  getValue() {
    return this.refs.input.value;
  }
}

// 3. REGISTER (THIS IS CRITICAL)
Formio.Components.addComponent('mycustom', MyCustomComponent);