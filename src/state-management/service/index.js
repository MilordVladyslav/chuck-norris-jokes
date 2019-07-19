export default class JokeService {
  constructor(category) {
    this.category = category ? `?category=${category}` : ''
  }
  getJoke = async () => {
    const joke = await fetch(`https://api.chucknorris.io/jokes/random${this.category}`);
    return joke.json()
  }
  getCategories = async () => {
    const categories = await fetch('https://api.chucknorris.io/jokes/categories');
    return categories.json()
  }
}