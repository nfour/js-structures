# Reactjs Antipatterns

## Pure render immutability
In order to preserve performance one needs to consider the creation of new entities in the render method.

```jsx
// BAD

class Component extends React.Component {
    state = { clicked: false }

    onClick() { this.setState({ clicked: true }) }

    render() {
        const options = this.props.options || { test: 1 } // Options object created each render if not set

        return <Something
            options={options}
            onClick={this.onClick.bind(this)} // New function created each render
            onTouchTap={(event) => this.onClick(event)} // New function & closure created each render
        />
    }
}
```
```jsx
// GOOD

class Component extends React.Component {
    state = { clicked: false }
    options = { test: 1 }

    onClick = () => { this.setState({ clicked: true }) }

    render() {
        const options = this.props.options || this.options // Options object created once

        return <Something
            options={options}
            onClick={this.onClick} // Function created once, bound once
            onTouchTap={this.onClick} // Function created once, bound once
        />
    }
}
```


## Pure render functions
- Use https://github.com/acdlite/recompose

```jsx
// BAD

export default (props, context) => {
    // ... do expensive compute on props ...

    return <SomeComponent {...props} />
}
```
```jsx
// GOOD

import { pure } from 'recompose';

// See: https://github.com/acdlite/recompose#composition

// This won't be called when the props DONT change
export default pure((props, context) => {
    // ... do expensive compute on props ...

    return <SomeComponent someProp={props.someProp} />
})
```

In the above example props are computed on heavily and thus the render method should be avoided as much as possible.
In react it is important to break components up when they do expensive operations, as the component hierachy is always rendered
from the top down.


```
- Root
  -> Expensive
    -> UserInput
```

In the above heirachy, if `UserInput` requires a re-render, `Expensive` will have to render. When possible the heirachy should be
something like this:

```
- Root
  -> Container
    -> Expensive
    -> UserInput
```

This way `Expensive` will be skipped.

This example could be further improved by breaking the `Expensive` component into smaller pieces. To determine how to split
them up you need to consider:
- Do different parts of the `props` change between renders?
- How can I split the `props` up between components to minimize renders?
