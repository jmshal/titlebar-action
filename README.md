# titlebar-action

Retrieves the type of action which should take place when the user double clicks the titlebar of an active window.

## APIs

All of the APIs expose a Node.js style callback as the only argument, and return a `Promise` - so you get the best of both worlds.

### titlebarAction(`Function` callback) `Promise<boolean>`

```js
import titlebarAction from 'titlebar-action';

titlebarAction((err, action) => {
  console.log(action); // 'Minimize', 'Maximize' or 'None'
});
```

### titlebarAction.isMinimize(`Function` callback) `Promise<boolean>`

### titlebarAction.isMaximize(`Function` callback) `Promise<boolean>`

### titlebarAction.isZoom(`Function` callback) `Promise<boolean>`

### titlebarAction.isDisabled(`Function` callback) `Promise<boolean>`

## License

MIT
