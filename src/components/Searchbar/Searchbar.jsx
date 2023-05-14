import { Component } from "react";
// import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  render() {
    return (
      <header className={css.Searchbar}>
        <form class="form">
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;