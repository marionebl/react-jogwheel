# ReactJogwheel

[source/index.js:79-96](https://github.com/marionebl/react-jogwheel/blob/9b073aeab7f503ea22ca983b4713a6e8cf668186/source/index.js#L79-L96 "Source code on GitHub")

React wrapper component for JogWheel

**Properties**

-   `component` **([element](https://developer.mozilla.org/en-US/docs/Web/API/Element)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))** ='div' to render
-   `children` **([node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)>)** to render
-   `progress` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the applied animation
-   `onProgress` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** =() => {} callback fired progress changes
-   `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the animation in milliseconds, overrides `animation-duration`
-   `delay` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the animation in milliseconds, overrides `animation-delay`
-   `iterationCount` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** of the animation, overrides `animation-iteration-count`
-   `timingFunction` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the animation overrides `animation-timing-function`
-   `playing` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** state of the animation

**Examples**

```javascript
// Render with alternative tagName
<JogWheel component="span" />
// Render other React component
<JogWheel component={Toolbar} />
```

```javascript
// Render with children
<JogWheel>
 <span className="child" />
</JogWheel>
```

```javascript
// Render with progress set to mid-animation
<JogWheel progress={0.5} />
```

```javascript
// Render with onProgress callback
onProgress (...args) => {
  console.log(...args);
}
<JogWheel {...{onProgress}} />
```

```javascript
// Force animation-duration to 100ms
<JogWheel duration={100} />
```

```javascript
// Force animation-delay to 1000ms
<JogWheel delay={1000} />
```

```javascript
// Force animation-iteration-count to 42
<JogWheel iterationCount={42} />
```

```javascript
// Force animation-timing-function to 'ease-in-out'
<JogWheel timingFunction="ease-in-out" />
```

```javascript
// Force animation-play-state to 'paused'
<JogWheel playing={false} />
// Force animation-play-state to 'playing'
<JogWheel playing />
```

**Meta**

-   **version**: 0.1.1
-   **copyright**: 2016 Mario Nebl
-   **author**: Mario Nebl
-   **license**: MIT
