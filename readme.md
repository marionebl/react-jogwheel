> Take control of your CSS keyframe animations with React

![react-jogwheel logo](https://cdn.rawgit.com/marionebl/react-jogwheel/master/react-jogwheel-banner.svg)

# react-jogwheel

`react-jogwheel` allows for declarative declarative control of animations.
By using [jogwheel](/marionebl/jogwheel) under the hood,
it enables you to declare your animations where they belong
– in your CSS - while giving you top notch control over them
at the same time.

## Installation

Fetch `react-jogwheel` via npm, install `peerDependencies`

```bash
npm install --save react-jogwheel jogwheel react react-dom
```

## Usage

```javascript
// index.jsx
import {Component} from 'react';
import {render} from 'react-dom';
import JogWheel from 'react-jogwheel';

class AnimatedElement extends Component {
  state = {
    scroll: 0,
    scrollingElement: null
  };

  handleScroll() {
    const {scrollingElement} = this.state;
    const {scrollTop} = scrollingElement;

    this.setState({
      ...this.state,
      scrollTop
    });
  }

  componentWillMount() {
    const {document} = global;
    const scrollingElement = document.scrollingElement || document.body;
    const {scrollTop} = scrollingElement;

    this.setState({
      scrollingElement,
      scrollTop
    });

    global.addEventListener('scroll', (...args) => this.handleScroll(...args));
  }

  componentWillUnmount() {
    const {document} = global;
    document.body.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    <JogWheel
      {...this.props}
      progress={this.state.progress}
      />
  }
}

const element = <AnimatedElement className="animated" />;
const mount = document.querySelector('[data-mountpoint]');
render(mount, element);
```

```html
<!doctype html>
<html>
  <head>
    <title>react-jogwheel demo</title>
    <style>
      @keyframes shrink {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(0.5);
        }
      }
      .animated {
        width: 100px;
        height: 100px;
        background: #000;
        border-radius: 50%;
        animation: shrink 1s both;
        animation-play-state: paused;
      }
    </style>
  </head>
  <body>
    <div data-mountpoint></div>
    <script src="index.js"></script>
  </body>
</html>
```

---

⇨ See the [examples](./examples/) for details.

## API

⇨ See [API Doumentation](./documentation/api.md) for technical
 interface documentation.

## Contributing

You dig `react-jogwheel` and want to submit a pull request?
Awesome! Be sure to read the [contribution guide](./contributing.md)
and you should be good to go.
Here are some notes to get you coding real quick.

```bash
git clone git@github.com:marionebl/react-jogwheel.git
cd react-jogwheel
npm install
npm start
```

---

`react-jogwheel` is built by Mario Nebl and [contributors](./documentation/contributors.md)
with :heart: and released under the [MIT License](./license.md).
