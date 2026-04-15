(function () {

  const FieldComponent = Formio.Components.components.field;

  class ProductCalculator extends FieldComponent {

    static schema(...extend) {
      return FieldComponent.schema({
        type: 'productcalc',
        key: 'productcalc',
        label: 'Product Calculator'
      }, ...extend);
    }

    static get builderInfo() {
      return {
        title: 'Product Calculator',
        group: 'basic',
        icon: 'shopping-cart',
        weight: 10,
        schema: ProductCalculator.schema()
      };
    }

    render() {
      return super.render(`
        <div style="display:flex; gap:10px;">
          <input type="text" ref="name" class="form-control" placeholder="Product Name"/>
          <input type="number" ref="price" class="form-control" placeholder="Price"/>
          <input type="number" ref="qty" class="form-control" placeholder="Qty"/>
          <div><strong>Total: </strong><span ref="total">0</span></div>
        </div>
      `);
    }

    attach(element) {
      this.loadRefs(element, {
        name: 'single',
        price: 'single',
        qty: 'single',
        total: 'single'
      });

      const calculate = () => {
        const value = {
          name: this.refs.name.value || '',
          price: parseFloat(this.refs.price.value) || 0,
          quantity: parseFloat(this.refs.qty.value) || 0,
        };

        value.total = value.price * value.quantity;

        if (this.refs.total) {
          this.refs.total.innerHTML = value.total;
        }

        // 🔥 IMPORTANT FIX
        this.dataValue = value;
        this.triggerChange();
      };

      this.addEventListener(this.refs.name, 'input', calculate);
      this.addEventListener(this.refs.price, 'input', calculate);
      this.addEventListener(this.refs.qty, 'input', calculate);

      return super.attach(element);
    }

    getValue() {
      return this.dataValue;
    }

    setValue(value) {
      if (!value) return;

      if (this.refs.name) this.refs.name.value = value.name || '';
      if (this.refs.price) this.refs.price.value = value.price || 0;
      if (this.refs.qty) this.refs.qty.value = value.quantity || 0;
      if (this.refs.total) this.refs.total.innerHTML = value.total || 0;

      this.dataValue = value;
    }
  }

  Formio.Components.addComponent('productcalc', ProductCalculator);

})();
