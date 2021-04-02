import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {greyColor, primaryColor} from '../constants';
import MyImage from './MyImage';

const CardMovies = ({item, index, onClick}) => {
  return (
    <TouchableOpacity style={styles.body} onPress={onClick}>
      <MyImage
        width={100}
        height={120}
        img={item?.poster_path}
        style={{borderRadius: 5}}
      />
      <View style={styles.right}>
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.lang}>
            {item?.release_date.split('-')[0]} -{' '}
            {item?.original_language.toUpperCase()}
          </Text>
          <Text numberOfLines={2}>{item?.overview}</Text>
        </View>
        <View>
          <View style={styles.rateView}>
            <Icon name={'star'} color={'#21D07A'} size={24} />
            <Text style={styles.rating}>{item?.vote_average}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  right: {
    marginHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lang: {
    color: 'rgba(179, 182, 183,0.8)',
    fontWeight: 'bold',
  },
  rateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: 'rgba(179, 182, 183,1)',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CardMovies;
