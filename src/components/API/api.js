import axios from 'axios';

const fetchImages = (search, page, images) => {
  const API_URL = 'https://pixabay.com/api/';
  const API_KEY = '35643945-433c06e40cd86730ec72beccd';
  const perPage = 12;

  return axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage,
        page,
      },
    })
    .then(response => {
      const { data } = response;
      const newImages = [...images, ...data.hits];
      const hasMoreImages = data.hits.length >= perPage;

      return {
        images: newImages,
        loading: false,
        showLoadMoreButton: hasMoreImages,
      };
    })
    .catch(error => {
      console.log('Error fetching data:', error);
      return {
        loading: false,
      };
    });
};

export default fetchImages;