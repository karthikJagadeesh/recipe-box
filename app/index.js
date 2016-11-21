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
    const styles = {
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      paddingRight: '10px'
    }
    const displayStyle = {
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
      textAlign: 'left',
      padding: '20px',
      display: 'block'
    }
    const hideStyle = {
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
      textAlign: 'left',
      padding: '20px',
      display: 'none'
    }

    const ingredients = this.props.ingredients.map((ingredient, index) => <p style={styles} key={ingredient}>{ingredient}</p>)

    return (
      <div style={ displayStyle }>
        <h3 style={{textAlign: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '10px'}}>Ingredients</h3>
        { ingredients }
        <div style={{padding: '15px 0px'}}>
          <button className="deleteEdit">Delete</button>
          <button className="deleteEdit">Edit</button>
        </div>
      </div>
    )
  }
}

class Recipe extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
    this.showDescription = this.showDescription.bind(this)
    let visible = false
  }

  showDescription() {
    if (!visible)
  };

  render() {
    const recipeName = this.props.recipes.map((recipe, index) => (
      <div key={recipe.name}>
        <div className="recipe" onClick={this.showDescription}>
          { recipe.name }
        </div>
        <RecipeDescription ingredients={recipe.ingredients}/>
      </div>
    ))
    return <div> { recipeName } </div>
  }
}

class RecipeBox extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      recipes: [{
        name: 'Fruit Salad',
        ingredients: ['Apple', 'Orange', 'Pineapple', 'Honey', 'Banana', 'Almonds']
      },
      {
        name: 'Milkshake',
        ingredients: ['Milk', 'Sugar', 'Water', 'Powder']
      }]
    }
  }

  render() {
    return (
      <div className="recipeBox">
        <Recipe recipes={this.state.recipes} />
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
