import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API} from '../helpers';
import {api_key, primaryColor, image_url} from '../constants';
import MyImage from '../components/MyImage';

const Detail = ({navigation, route}) => {
  const item = route.params?.item;
  const [info, setInfo] = useState(item);
  const [load, setLoad] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    _getDetail();
    _getVideo();
  }, []);

  const _getDetail = () => {
    setLoad(true);
    API()
      .request.get(
        `https://api.themoviedb.org/3/movie/${item.id}?api_key=${api_key}&language=en-US`,
      )
      .then(resp => {
        setInfo(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoad(false));
  };

  const _getVideo = () => {
    API()
      .request.get(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${api_key}&language=en-US`,
      )
      .then(resp => {
        setVideo(resp.data.results[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {load ? (
        <View style={styles.load}>
          <ActivityIndicator color={primaryColor} size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 51, 54, 1)',
          }}>
          <ImageBackground
            style={styles.backimg}
            source={{
              uri: `${image_url}${info?.poster_path}`,
            }}>
            <StatusBar
              barStyle={'light-content'}
              translucent={true}
              backgroundColor={'rgba(52, 51, 54, 0.2)'}
            />
            <LinearGradient
              colors={[
                'rgba(52, 51, 54, 0.1)',
                'rgba(52, 51, 54, 0.65)',
                'rgba(52, 51, 54, 1)',
              ]}
              style={styles.gradient}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-left"
                  size={28}
                  color={'#fff'}
                  style={styles.back}
                />
              </TouchableOpacity>

              <View style={styles.viewMain}>
                <MyImage
                  width={100}
                  height={130}
                  style={styles.posterImage}
                  img={item?.poster_path}
                />
                <View style={{flex: 1}}>
                  <View style={styles.viewName}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <View style={styles.viewYear}>
                      <Text style={styles.release}>
                        {moment(info?.release_date).format('MMM YYYY')}
                      </Text>
                      <View style={styles.viewDot} />
                      <Text style={styles.release}>{info?.runtime} mins</Text>
                    </View>
                  </View>
                  <View style={styles.rateView}>
                    <Icon name={'star'} color={'#21D07A'} size={24} />
                    <Text style={[styles.release, {marginLeft: 5}]}>
                      {info?.vote_average}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.playSection}
                onPress={() => navigation.navigate('Video', {video: video})}>
                <Icon name={'play'} color={'#fff'} size={30} />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.aboutSection}>
            <View>
              <Text style={styles.overviewTitle}>Overview</Text>
              <Text style={styles.overviewText}>{info?.overview}</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.overviewTitle}>Genre</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {info?.genres?.map((item, index) => (
                  <View style={styles.genreCard} key={index}>
                    <Text style={{color: '#fff'}}>{item?.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  load: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backimg: {
    height: 280,
  },
  gradient: {
    height: 280,
    marginTop: 32,
  },
  back: {
    marginLeft: 16,
    marginTop: 16,
  },
  viewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 20,
    left: 40,
  },

  viewYear: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(198, 207, 207, 0.5)',
    marginLeft: 5,
    marginRight: 5,
  },
  posterImage: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  viewName: {
    marginLeft: 10,
    marginRight: 40,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  release: {
    color: '#C6CFCF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  aboutSection: {marginTop: 36, marginHorizontal: 16, marginBottom: 16},
  overviewTitle: {fontSize: 20, color: '#fff', fontWeight: 'bold'},
  overviewText: {color: '#fff', marginTop: 5},
  genreCard: {
    backgroundColor: 'rgba(244, 244, 244, 0.4)',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 10,
  },
  playSection: {
    position: 'absolute',
    right: 30,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
