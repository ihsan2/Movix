import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {genresIcon, greyColor, primaryColor} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {getGenres} from '../redux/actions/genreAction';
import {getMovies} from '../redux/actions/movieAction';
import CardGenres from '../components/CardGenres';
import CardMovies from '../components/CardMovies';
import {scrollIsCloseToBottom} from '../helpers';

const discoverGenre = {
  id: 1,
  name: 'Discover',
};

const Home = ({navigation}) => {
  const [genresItem, setGenresItem] = useState();
  const [scrollOffset, setScrrollOffset] = useState(null);

  const genresState = useSelector(state => state.genresState);
  const movieState = useSelector(state => state.moviesState);
  const dispatch = useDispatch();

  useEffect(() => {
    _getData();
  }, []);

  const setGenre = val => {
    dispatch({
      type: 'FILTER_BY_GENRE_START',
      genre: val,
    });
  };

  const _getData = () => {
    setGenresItem(discoverGenre);
    setGenre('');
    dispatch(getGenres());
    dispatch(getMovies());
  };

  const _onClickGenres = item => {
    setGenre(item.id === 1 ? '' : item.id);
    setGenresItem(item);
    dispatch(getMovies());
  };

  const _movieClick = item => {
    navigation.navigate('Detail', {item});
  };

  const _handleEndOfScroll = () => {
    const params = {
      loadMore: true,
    };
    if (!movieState.loading) {
      dispatch(getMovies(params));
    }
  };

  const _refreshData = () => {
    const params = {
      refreshing: true,
    };
    dispatch(getMovies(params));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listGenre}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={[discoverGenre, ...genresState?.genres]}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <CardGenres
              item={item}
              index={index}
              icon={genresIcon[index]}
              onClickGenres={() => _onClickGenres(item)}
              genresSelected={genresItem}
            />
          )}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={movieState.refreshing}
            onRefresh={_refreshData}
          />
        }
        onScroll={({nativeEvent}) => {
          const currentOffset = nativeEvent.contentOffset.y;
          setScrrollOffset(currentOffset);
          const direction = currentOffset > scrollOffset ? 'down' : 'up';

          if (direction === 'down' && scrollIsCloseToBottom(nativeEvent)) {
            _handleEndOfScroll();
          }
        }}>
        {movieState.loading && !movieState.loadMore ? (
          <ActivityIndicator
            color={primaryColor}
            size={'large'}
            style={{marginTop: 10}}
          />
        ) : (
          <View style={styles.listMovie}>
            {movieState.movies.map((item, index) => (
              <CardMovies
                key={index}
                item={item}
                index={index}
                onClick={() => _movieClick(item)}
              />
            ))}
          </View>
        )}
        {movieState.loadMore ? (
          <View style={{marginBottom: 10}}>
            <ActivityIndicator color={primaryColor} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  listGenre: {
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(208, 211, 212,0.4)',
  },
  listMovie: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
});

export default Home;
