import { Component } from 'react';
import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    error: null,
  };

  async componentDidUpdate(pervProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      try {
        const { hits } = await fetchImages(searchQuery, page);
        if (!hits.length) {
          toast.warning('No results were found for your search, please try something else.')
        }
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          status: 'resolved',
        }));
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: 'rejected' });
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({searchQuery})
  }
  
  render() {
    const { images } = this.state;

    return (
      <div className={css.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.handleOpenModal} />
      </div>
    )
  }
}

export default App;