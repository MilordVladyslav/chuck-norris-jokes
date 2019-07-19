import initialState from '../initialState'
import images from '../images'
function reducer (state = initialState, action) {
  switch (action.type) {
    case "FETCHALL": {
      let pictureIndex = Math.floor(Math.random()*10)
      return {
        ...state,
        currentJoke: action.value[0],
        categories: action.value[1],
        picture: images[pictureIndex],
        currentCategory: action.value[2]
      }
    }
    case "TOGGLEMENU": {
      return {
        ...state,
        menu: action.value
      }
    }
    default: return state
  }
}

export default reducer