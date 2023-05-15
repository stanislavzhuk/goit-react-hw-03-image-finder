import { Component } from 'react';
import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
}

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: STATUS.IDLE,
    error: null,
    largeImage: {},
    showModal: false,
  };

  async componentDidUpdate(pervProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: STATUS.PENDING });

      try {
        const { hits } = await fetchImages(searchQuery, page);
        if (!hits.length) {
          toast.warning('No results were found for your search, please try something else.')
        }
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          status: STATUS.RESOLVED,
        }));
      } catch (error) {
        toast.error(`Sorry something went wrong. ${error.message}`);
        this.setState({ status: STATUS.REJECTED });
      }
    }
  }

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      status: STATUS.IDLE,
      error: null,
      largeImage: {},
      showModal: false,
    })
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  }

  handleToggleModal = (image = null) => {
    if (image) {
      const largeImage = { src: image.largeImageURL, alt: image.tags };
      this.setState({ largeImage, showModal: true });
    } else {
      this.setState({ showModal: false });
    }
  };
  
  render() {
    const { images, showModal, largeImage, status } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === STATUS.PENDING && <Loader />}
        <ImageGallery images={images} onClick={this.handleToggleModal} />
        {showModal && (
          <Modal
            image={largeImage}
            onClose={this.handleToggleModal}
          />
        )}
        <ToastContainer />
      </div>
    )
  }
}

export default App;