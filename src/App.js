import React from 'react';
import store from './state-management/store'
import './styles/index.scss';
import {fetchAll, fetchJoke, toggleMenu} from './state-management/actions'
import preloader from './images/45.svg'
import urlParamsMaker from './helpers'
class App extends React.Component {
  state = {
    category: false,
  }
  componentDidMount () {
    store.dispatch(fetchAll())
    store.subscribe(() => this.forceUpdate());
  }
  urlParamsMaker = new urlParamsMaker ();
  componentWillReceiveProps() {
    console.log('wow')
  }
  componentDidUpdate() {
      let joke = document.getElementById('joke');
      joke.innerHTML = '';
      document.getElementById('jokes-block').classList.add('slip')
      setTimeout(() => {
        document.getElementById('jokes-block').classList.remove('slip')
      }, 400)
      let i = 0;
      let txt = store.getState().currentJoke;
      const speed = 5;
      function typeWriter() {
        if (i < txt.length) {
          joke.innerHTML += txt.charAt(i);
          i++;
        }
      }
      setInterval(typeWriter, speed);
    }

  jokeWithCategory = (category) => {
    this.toggleMenu()
    this.urlParamsMaker.addParam({
      category: category
    })
    this.setState({
      category: category
    }, () => store.dispatch(fetchJoke(this.state.category)))
  }
  handleClick = () => {

    store.dispatch(fetchJoke(this.state.category))
  }
  toggleMenu = () => {
    store.dispatch(toggleMenu(!store.getState().menu))
  }
  render () {
    if(store.getState().picture.length) {
      let menuItems = 'menu__item--hamburger'
      let jokesBlockClasses = 'jokes-block'
      let navBarWrapperClasses = 'nav-bar-wrapper'
      let navBarClasses = 'nav-bar'
      let navBarPoints = store.getState().categories.map((item, index) =>
      <li key={index} onClick={() => this.jokeWithCategory(`${item}`)}>{item}</li>
      )
      if(store.getState().menu) {
        menuItems = 'menu__item--hamburger menu-item-open'
        jokesBlockClasses = 'jokes-block mini-scaled'
        navBarClasses = 'nav-bar nav-bar-open'
        navBarWrapperClasses = 'nav-bar-wrapper nav-bar-wrapper-open'
      }
    return (
      <div className="App">
      <div className={navBarWrapperClasses}>
        <div className={navBarClasses}>
          <ul className="list">
          <li className="current-category">
            <p>Current category:</p>
            <p className="category-name">{store.getState().currentCategory ? store.getState().currentCategory : 'all'}</p>
          </li>
          <li>All</li>
            {navBarPoints}
          </ul>
        </div>
      </div>

        <div className="menu__wrapper" onClick={this.toggleMenu}>
          <div className={menuItems} tabIndex="1">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        {/* <Rotate> */}
        <div className={jokesBlockClasses} id="jokes-block">
          <p className="joke" id="joke"></p>
          <img src = {store.getState().picture} alt="" onClick= {this.handleClick}></img>
        </div>
        {/* </Rotate> */}
      </div>
    );
    } else return (
      <div className="App">
        <div className="preloader-block">
          <p>Wait</p>
          <div className="preloader">
          <img src={preloader} alt="preloader"></img>
          </div>
        </div>
      </div>
      )
  }
}

export default App;
