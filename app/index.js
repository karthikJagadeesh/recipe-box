import React, { Component } from 'react'
import { render } from 'react-dom'

class Heading extends Component {
  render() {
    return <h1 className="heading">RECIPE BOX &nbsp;<i className="fa fa-cutlery"></i></h1>
  }
}

class Button extends Component {
  render() {
    return <button className="button">Add Recipe <i className="fa fa-plus"></i></button>
  }
}

class RecipeDescription extends Component {
  render() {

    return (
      <div style={{borderBottom: '2px solid rgba(0, 0, 0, 0.1)', textAlign: 'left'}}>
        <ul>
          <li>Apple</li>
          <li>Orange</li>
        </ul>
      </div>
    )
  }
}

class Recipe extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      show: false
    }
    this.showDescription = this.showDescription.bind(this)
  }

  showDescription() {
    const self = this.state
    this.setState({
      show: !self.show
    })
  };

  render() {
    return (
      <div>
        <div className="recipe" onClick={this.showDescription}>
          Fruit Salad
        </div>
        { this.state.show ? this.props.children : undefined }
      </div>
    )
  }
}

class RecipeBox extends Component {
  render() {
    return (
      <div className="recipeBox">
        <Recipe>
          <RecipeDescription/>
        </Recipe>
      </div>
    )
  }
}

class Container extends Component {
  render() {
    return (
      <div className="container">
        <RecipeBox/>
        <Button/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <Heading/>
        <Container/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
