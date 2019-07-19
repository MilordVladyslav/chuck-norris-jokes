import JokeService from '../service'
import initialState from '../initialState'

function fetchAllActionCreator (value) {
  return {
    type: 'FETCHALL',
    value
  }
}

function fetchAll(category) {
  const jokeService = new JokeService(category)
  return (dispatch) => {
    jokeService
    .getJoke()
    .then(res => {
      initialState.currentJoke = res.value
    })
    .then(() => {
      jokeService
      .getCategories()
      .then(res => {
       initialState.categories = res
       dispatch(fetchAllActionCreator([initialState.currentJoke, initialState.categories]))
      })
    })
  }
}

function toggleMenu (value) {
  return {
    type: 'TOGGLEMENU',
    value
  }
}

function fetchJoke(category) {
  const jokeService = new JokeService(category)
  return (dispatch) => {
    jokeService
    .getJoke()
    .then(res => {
      initialState.currentJoke = res.value
      initialState.currentCategory = res.categories[0]
      dispatch(fetchAllActionCreator([initialState.currentJoke, initialState.categories, res.categories[0]]))
    })
  }
}

export {fetchAll, fetchJoke, toggleMenu}