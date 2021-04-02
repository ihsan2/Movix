import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {primaryColor} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {getGenres} from '../redux/actions/genreAction';
import {getMovies} from '../redux/actions/movieAction';
import {TabView, TabBar} from 'react-native-tab-view';
import TabList from './TabList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const genresState = useSelector(state => state.genresState);
  const movieState = useSelector(state => state.moviesState);
  const dispatch = useDispatch();

  useEffect(() => {
    _getData();
    _getMovies();
  }, [index]);

  const _getData = () => {
    dispatch(getGenres());
  };

  const _setGenre = () => {
    let genre = genresState.genres.filter((item, i) => {
      return i === index;
    });
    let g = genre[0]?.id === 1 ? '' : genre[0]?.id;
    dispatch({type: 'FILTER_BY_GENRE_START', genre: g});
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

  const _getMovies = () => {
    genresState.genres.length > 0 && _setGenre();
    dispatch(getMovies());
  };

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorContainerStyle={styles.tabBar}
        indicatorStyle={styles.tabBarIndicator}
        renderLabel={({route, focused, color}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Icon
              color={focused ? primaryColor : '#CACACA'}
              name={route.icon}
              size={22}
            />
            <Text
              style={[
                styles.tabBarLabel,
                focused ? styles.tabBarLabelActive : {},
              ]}>
              {route.title}
            </Text>
          </View>
        )}
        tabStyle={genresState.genres.length > 0 ? {width: 'auto'} : {}}
        style={styles.tabBar}
      />
    );
  };

  const renderScene = ({route, index}) => {
    switch (route.key) {
      case 'null':
        return null;
      default:
        return (
          <TabList
            navigation={navigation}
            item={route}
            movies={movieState}
            onRefresh={_refreshData}
            onScroll={_handleEndOfScroll}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{index, routes: genresState?.genres}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
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
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 0.5,
  },
  tabBarIndicator: {
    backgroundColor: primaryColor,
  },
  tabBarLabel: {
    color: '#CACACA',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  tabBarLabelActive: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
