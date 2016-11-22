import React, { Component } from 'react'
import { render } from 'react-dom'

class Heading extends Component {
  render() {
    return <h1 className="heading">RECIPE BOX &nbsp;<i className="fa fa-cutlery"></i></h1>
  }
}

class Button extends Component {
  constructor(props, context) {
    super(props, context)
    this.showModal = this.showModal.bind(this)
  }

  showModal() {
    let modal = document.getElementById('modal')
    modal.style.display = 'block'
  }

  render() {
    return <button onClick={this.showModal} className="button">Add Recipe <i className="fa fa-plus"></i></button>
  }
}

class RecipeDescription extends Component {
  render() {
    const styles = {
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      paddingRight: '10px'
    }
    let displayStyle = {
      boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
      textAlign: 'left',
      padding: '20px',
      display: 'none',
      marginBottom: '10px'
    }

    displayStyle.display = this.props.showIngredients ? 'block' : 'none'
    let ingredients = this.props.ingredients.map((ingredient, index) => <p style={styles} key={ingredient}>{ingredient}</p>)

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
      id: ''
    }
    this.showDescription = this.showDescription.bind(this)
  }

  showDescription(event) {
    this.setState({ id: event.currentTarget.dataset.id })
  };

  render() {
    let recipeName = this.props.recipes.map((recipe, index) => (
      <div key={index}>
        <div data-id={index} className="recipe" onClick={this.showDescription}>
          { recipe.name }
        </div>
        <RecipeDescription showIngredients={(this.state.id === String(index)) ? true : false} ingredients={recipe.ingredients}/>
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
      },
      {
        name: 'Lemon Juice',
        ingredients: ['Lemon', 'Sugar', 'Water']
      }],
      recipeName: '',
      ingredients: ''
    }

    this.addNewRecipe = this.addNewRecipe.bind(this)
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
  }

  handleRecipeNameChange(value) {
    this.setState({
      recipeName: value
    })
  }

  handleIngredientsChange(value) {
    this.setState({
      ingredients: value
    })
  }

  addNewRecipe() {
    let recipeIngredients = this.state.ingredients.split(',').map(ingredient => ingredient.trim())
    let recipeName = this.state.recipeName.trim()
    this.setState({
      recipes: this.state.recipes.concat({
        name: recipeName,
        ingredients: recipeIngredients
      }),
      recipeName: '',
      ingredients: ''
    })

    document.getElementById('modal').style.display = 'none'
  }

  render() {
    return (
      <div className="recipeBox">
        <Recipe recipes={this.state.recipes} />
        <Modal
          handleRecipeNameChange={this.handleRecipeNameChange}
          handleIngredientsChange={this.handleIngredientsChange}
          addNewRecipe={this.addNewRecipe}
          recipeName={this.state.recipeName}
          recipeIngredients={this.state.ingredients}/>
      </div>
    )
  }
}

class Modal extends Component {
  constructor(props, context) {
    super(props, context)

    this.closeModal = this.closeModal.bind(this)
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this)

    let modal = document.getElementById('modal')
  }

  closeModal() {
    modal.style.display = 'none'
  }

  handleRecipeNameChange() {
    const name = this.refs.recipeName.value
    this.props.handleRecipeNameChange(name)
  }

  handleIngredientsChange() {
    const ingredients = this.refs.ingredients.value
    this.props.handleIngredientsChange(ingredients)
  }

  render() {
    return (
      <div id="modal" className="modal">
        <div id="modalContent" className="modalContent">

          <div className="modalHeader">
            <h3>Add a Recipe <span onClick={this.closeModal} className="close"><i className="fa fa-times"></i></span></h3>
          </div>

          <div className="modalBody">
            <label>Recipe</label>
            <div className="modalInput recipeInputBox"><input value={this.props.recipeName} ref="recipeName" onChange={this.handleRecipeNameChange} className="inputBox" type="text" placeholder="Recipe Name" /></div>
            <label>Ingredients</label>
            <div className="modalInput"><textarea value={this.props.recipeIngredients} ref="ingredients" onChange={this.handleIngredientsChange} className="inputBox" placeholder="Enter Ingredients seperated by commas"></textarea></div>
          </div>

          <div className="modalFooter">
            <button className="modalButton addRecipeButton" onClick={this.props.addNewRecipe}>Add Recipe</button>
            <button className="modalButton closeButton" onClick={this.closeModal}>Close</button>
          </div>

        </div>
      </div>
    )
  }
}

class Container extends Component {
  constructor(props, context) {
    super(props, context)

  }

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
