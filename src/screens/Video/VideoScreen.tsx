import { View, Text, Image, TouchableOpacity, StatusBar, useWindowDimensions, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import { icons, images } from '@/assets';
import { streamUrl } from '@/utils/apiConstant';
import { styles } from './style';

const formatTime = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  const rs = r < 10 ? `0${r}` : `${r}`;
  return `${m}:${rs}`;
};

const VideoScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { width, height } = useWindowDimensions();
  const player = useRef<any>(null);
  const fileId = route.params?.fileId;
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const [volWidth, setVolWidth] = useState(0);
  const portrait = height >= width;
  const stageStyle = portrait
    ? {
        width: height,
        height: width,
        position: 'absolute' as const,
        left: (width - height) / 2,
        top: (height - width) / 2,
        transform: [{ rotate: '90deg' }],
      }
    : null;

  const seek = (next: number) => {
    const max = duration || 0;
    const value = Math.min(max, Math.max(0, next));
    player.current?.seek(value);
    setPosition(value);
    if (!max || value < max) {
      setPlaying(true);
    }
  };

  const onBarPress = (e: any) => {
    if (!barWidth || !duration) {
      return;
    }
    seek((e.nativeEvent.locationX / barWidth) * duration);
  };

  const onVolPress = (e: any) => {
    if (!volWidth) {
      return;
    }
    const next = Math.min(1, Math.max(0, e.nativeEvent.locationX / volWidth));
    setVolume(next);
    setMuted(next === 0);
  };

  const left = Math.max(0, duration - position);
  const ratio = duration ? position / duration : 0;
  const vol = muted ? 0 : volume;

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <View style={[styles.stage, stageStyle]}>
        {fileId ? (
          <Video
            ref={player}
            source={{ uri: streamUrl(fileId) }}
            style={styles.player}
            resizeMode="cover"
            paused={!playing}
            muted={muted}
            volume={vol}
            onLoad={(e: any) => setDuration(e.duration || 0)}
            onProgress={(e: any) => setPosition(e.currentTime || 0)}
            onEnd={() => setPlaying(false)}
          />
        ) : null}
        <View style={styles.overlay}>
          <View style={styles.top}>
            <View style={styles.topLeft}>
              <TouchableOpacity style={styles.circle} onPress={() => navigation.goBack()}>
                <Image source={images.bgwhite} style={styles.circleBg} />
                <Image source={icons.close} style={styles.topIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circle}>
                <Image source={images.bgwhite} style={styles.circleBg} />
                <Image source={icons.settings} style={styles.topIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.volPill}>
              <Image source={images.volume} style={styles.volBg} resizeMode="stretch" />
              <TouchableOpacity
                activeOpacity={1}
                style={styles.volHit}
                onPress={onVolPress}
                onLayout={e => setVolWidth(e.nativeEvent.layout.width)}>
                <View style={styles.volTrack}>
                  <View style={[styles.volFill, { width: `${vol * 100}%` }]} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMuted(!muted)}>
                <Image
                  source={icons.sound}
                  style={[styles.volIcon, muted ? styles.volMuted : null]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.center}>
            <TouchableOpacity onPress={() => seek(position - 10)}>
              <Image source={icons.skipbackward} style={styles.skipBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPlaying(!playing)}>
                <Image source={icons.pause} style={styles.pauseBtn} />
             
            </TouchableOpacity>
            <TouchableOpacity onPress={() => seek(position + 10)}>
              <Image source={icons.skipforeward} style={styles.skipBtn} />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={images.progressbar}
            style={styles.bottom}
            imageStyle={styles.bottomImage}
            resizeMode="stretch">
            <View style={styles.bottomRow}>
              <Text numberOfLines={1} style={styles.time}>{formatTime(position)}</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.barHit}
                onPress={onBarPress}
                onLayout={e => setBarWidth(e.nativeEvent.layout.width)}>
                <View style={styles.bar}>
                  <View style={[styles.fill, { width: barWidth * ratio }]} />
                </View>
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.time}>-{formatTime(left)}</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default VideoScreen;
