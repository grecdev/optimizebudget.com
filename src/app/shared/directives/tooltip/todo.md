# Tooltip component creation

---

_\*Use the `select.component.ts` example for appending the component into the DOM :grinning:_

- [ ] Create a shared `@Directive`
- [ ] Create a `@Component` used only for the tooltip, where you will project the tooltip's message
- [ ] Use the `mouseenter` event and initialize it via `ngAfterViewInit()` hook
- [ ] Initialize the `mouseleave` event at the moment of `mouseenter` event triggers
- [ ] Add an `attached` state of type `boolean`
- [ ] Append the overlay into the `<body>`, not locally, in the target node
- [ ] Make sure the target node always comes on top of the overlay
- [ ] Get the target node location in order to set an `absolute` position to the tooltip
- [ ] Add style to the new tooltip after you add it to the DOM
- [ ] Do not forget to use the `markForCheck()` in order to trigger Angular's change detection cycle, whenever we add or close the tooltip

### Preview

---

![img.png](img.png)
