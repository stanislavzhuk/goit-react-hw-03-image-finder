import { Component } from 'react';
// import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';

import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
  };
  
  render() {
    return (
      <div className={css.App}>
        <Searchbar />
      </div>
    )
  }
}

export default App;