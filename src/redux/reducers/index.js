import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moviesReducer from './moviesReducer';
import genresReducer from './genreReducer';

const moviePersistConfig = {
  key: 'movies',
  storage: AsyncStorage,
  blacklist: ['loading', 'refreshing', 'search'],
};

const genrePersistConfig = {
  key: 'genres',
  storage: AsyncStorage,
  blacklist: ['loading', 'refreshing'],
};

const rootReducer = combineReducers({
  moviesState: persistReducer(moviePersistConfig, moviesReducer),
  genresState: persistReducer(genrePersistConfig, genresReducer),
});

export default rootReducer;
