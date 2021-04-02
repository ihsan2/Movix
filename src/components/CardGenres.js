import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {greyColor, primaryColor} from '../constants';

const CardGenres = ({item, index, icon, onClickGenres, genresSelected}) => {
  return (
    <TouchableOpacity style={styles.body} onPress={onClickGenres}>
      <View
        style={[
          styles.iconWrap,
          {backgroundColor: item === genresSelected ? primaryColor : greyColor},
        ]}>
        <Icon name={icon} size={26} color={'#fff'} />
      </View>
      <Text style={styles.text}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    maxWidth: 80,
    minWidth: 80,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CardGenres;
