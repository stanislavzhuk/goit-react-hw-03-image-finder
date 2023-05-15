// 1st option using fetch
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '34785717-8063b5203a171717f86304ea0';

// async function fetchImages(searchQuery, page) {
//   return await fetch(
//     `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => {
//     if (!response.ok) {
//       return Promise.reject(new Error('We apologize for the inconvenience. Please try again later.'));
//     }
//     return response.json();
//   })
// }

// export default fetchImages;


// 2nd option using Axios

import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34785717-8063b5203a171717f86304ea0';

async function fetchImages(searchQuery, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: searchQuery,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchImages;