# Create a CDK `select` component

## Root element `app-select`

### To-do list

## ControlValueAccessor

- [ ] Emit the value on click, from the `app-select-option` component
- [ ] After you emit the value we need to call the following methods:

```typescript
this.selectedValue = _value_from_option_;

this._onChange(_value_from_option_);
this._onTouched();
```

- [ ] How to actually pass the value from the `app-select-option` element by triggering a click event?

You can subscribe to the `@Output`.
I think you need to actually loop through all the options via `@ViewChildren`.

## Root element `app-select`

- [ ] Add a fixed width on the select element, and truncate the `selectedValue` if it surpasses its parent width

- [ ] Add a unique ID generator. (Check angular's `id-generator.ts` file.)
- [ ] Interpolate the `selectedValue` into the html template
- [ ] Query all `app-select-option` children
- [ ] Implement `ControlValueAccessor` interface
- [ ] Loop through all children, compare their values and `find()` the selected one

## Option element `app-select-option`

- [ ] Truncate the value if it surpasses its parent width
- [ ] On hover add a background
- [ ] First of all, before implementing the CVA API, implement the UI 😃

- [ ] Add an `@Input()` for the `value` attribute
- [ ] When we actually click on the `app-select-option` element, `emit()` the value to its parent root (`app-select`)
- [ ] When the `app-select-option` has been emitted, then change the `selectedValue` property
- [ ] If we click on the `app-select-option`, then close the select element
