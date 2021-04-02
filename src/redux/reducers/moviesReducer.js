const initialState = {
  loading: false,
  refreshing: false,
  loadMore: false,
  movies: [],
  page: 1,
  genre: '',
  total: 0,
  index: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIES_START':
      return {
        ...state,
        loading: true,
        refreshing: action.refreshing,
        loadMore: action.loadMore,
      };
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        refreshing: false,
        loadMore: false,
        movies: action.loadMore
          ? [...state.movies, ...action.payload.results]
          : action.payload.results,
        page: action.page,
        genre: action.genre,
        total: action.payload.total_results,
      };
    case 'GET_MOVIES_FAIL':
      return {...state, loading: false, refreshing: false, loadMore: false};
    case 'FILTER_BY_GENRE_START':
      return {...state, genre: action.genre};
  }

  return state;
}
