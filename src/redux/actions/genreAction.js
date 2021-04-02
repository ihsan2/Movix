import {API} from '../../helpers';
import {api_key, genresIcon} from '../../constants';
const discoverGenre = {
  id: 1,
  name: 'Discover',
};

export const getGenres = ({refreshing = false} = {}) => {
  return dispatch => {
    dispatch({type: 'GET_GENRES_START', refreshing});

    const {request} = API();

    return request
      .get(`genre/movie/list?api_key=${api_key}&language=en-US`)
      .then(resp => {
        let data = [discoverGenre, ...resp.data.genres];
        for (const i in data) {
          for (const j in genresIcon) {
            if (i === j) {
              data[i]['icon'] = genresIcon[j];
              data[i]['key'] = data[i]['id'];
              data[i]['title'] = data[i]['name'];
            }
          }
        }
        dispatch({
          type: 'GET_GENRES_SUCCESS',
          payload: data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({type: 'GET_GENRES_FAIL'});
      });
  };
};
