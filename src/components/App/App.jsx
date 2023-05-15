import { Component } from 'react';
// import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
  };

  handleFormSubmit = searchQuery => {
    this.setState({searchQuery})
  }
  
  render() {
    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}

export default App;