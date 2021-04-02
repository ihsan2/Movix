import React, {useState} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CardMovies from '../components/CardMovies';
import {primaryColor} from '../constants';
import {scrollIsCloseToBottom} from '../helpers';

const TabList = ({navigation, movies, onScroll, onRefresh}) => {
  let movieState = movies;
  const [scrollOffset, setScrrollOffset] = useState(null);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={movieState.refreshing}
          onRefresh={onRefresh}
        />
      }
      onScroll={({nativeEvent}) => {
        const currentOffset = nativeEvent.contentOffset.y;
        setScrrollOffset(currentOffset);
        const direction = currentOffset > scrollOffset ? 'down' : 'up';

        if (direction === 'down' && scrollIsCloseToBottom(nativeEvent)) {
          onScroll();
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
          {movieState.movies.map((l, index) => (
            <CardMovies
              key={index}
              item={l}
              index={index}
              onClick={() => navigation.navigate('Detail', {item: l})}
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

export default TabList;
