import {API} from '../../helpers';
import {api_key} from '../../constants';

export const getMovies = ({refreshing = false, loadMore = false} = {}) => {
  return (dispatch, getState) => {
    dispatch({type: 'GET_MOVIES_START', refreshing, loadMore});

    const {request} = API();
    const {moviesState} = getState();
    let page = moviesState.page;
    let genre = moviesState.genre;

    if (refreshing) {
      page = 1;
    }

    if (loadMore) {
      page = page + 1;
    } else {
      page = 1;
    }

    let endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${genre}`;

    return request
      .get(endpoint)
      .then(resp => {
        dispatch({
          type: 'GET_MOVIES_SUCCESS',
          payload: resp.data,
          loadMore,
          genre,
          page,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'GET_MOVIES_FAIL'});
      });
  };
};
