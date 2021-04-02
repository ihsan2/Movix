import {API} from '../../helpers';
import {api_key} from '../../constants';

export const getGenres = ({refreshing = false} = {}) => {
  return dispatch => {
    dispatch({type: 'GET_GENRES_START', refreshing});

    const {request} = API();

    return request
      .get(`genre/movie/list?api_key=${api_key}&language=en-US`)
      .then(resp => {
        dispatch({
          type: 'GET_GENRES_SUCCESS',
          payload: resp.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'GET_GENRES_FAIL'});
      });
  };
};
