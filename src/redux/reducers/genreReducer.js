const initialState = {
  loading: false,
  refreshing: false,
  genres: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_GENRES_START':
      return {
        ...state,
        loading: true,
        refreshing: action.refreshing,
      };
    case 'GET_GENRES_SUCCESS':
      return {
        ...state,
        loading: false,
        refreshing: false,
        genres: action.payload.genres,
      };
    case 'GET_GENRES_FAIL':
      return {...state, loading: false, refreshing: false};
  }

  return state;
}
