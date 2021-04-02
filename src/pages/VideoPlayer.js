import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';

const index = ({route, navigation}) => {
  const video = route.params?.video;
  const [isView, setView] = useState(true);

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setView(false);
    });
    const focus = navigation.addListener('focus', () => {
      setView(true);
    });
    return blur, focus;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isView ? (
        <View style={{height: '100%', width: '100%'}}>
          <WebView
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'black',
            }}
            allowsFullscreenVideo={true}
            allowFileAccess={false}
            mixedContentMode="always"
            mediaPlaybackRequiresUserAction={false}
            injectedJavaScript={`document.getElementsByTagName("video")[0].controlsList="nodownload";`}
            source={{
              uri: `https://www.youtube.com/embed/${video?.key}?rel=0&autoplay=1&showinfo=0&controls=1`,
            }}
            startInLoadingState={true}
          />
        </View>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
};

export default index;
