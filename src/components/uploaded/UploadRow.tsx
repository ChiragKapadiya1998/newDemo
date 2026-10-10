import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { icons, images } from '@/assets';

const UploadRow = ({ item, onMore, onPress }: any) => {
  const multi = parseInt(item.count, 10) > 1;
  const thumb = item.thumb ? { uri: item.thumb } : images.thumbnail;
  const moreRef = useRef<any>(null);

  const onMorePress = () => {
    moreRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
      onMore({ x, y, width, height });
    });
  };

  console.log('thumb', thumb);
  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.rowHit}>
        <View style={multi ? styles.thumbWrap : styles.thumbSingle}>
          {multi ? (
            <View style={[styles.thumb, styles.thumbBack]}>
              <Image source={thumb} style={styles.thumbBackImg} />
            </View>
          ) : null}
          {multi ? (
            <View style={[styles.thumb, styles.thumbMid]}>
              <Image source={thumb} style={styles.thumbMidImg} />
            </View>
          ) : null}
          <View style={styles.thumb}>
            <Image source={thumb} style={multi ? styles.thumbImg : styles.thumbSingleImg} />
          </View>
        {multi ?  <View style={styles.badge}>
            <Text style={styles.badgeTxt}>{item.count}</Text>
          </View>:null}
        </View>

        <View style={styles.infoWrap}>
          <View style={styles.info}>
            <View style={styles.titleWrap}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <TouchableOpacity ref={moreRef} onPress={onMorePress} style={styles.moreBtn}>
                <Image source={icons.liquidglass} style={styles.moreIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subTxt}>
              {item.time} — {item.views}
            </Text>
            <Text style={styles.earnTxt}>{item.earn}</Text>
          </View>


        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UploadRow;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
    flex: 1,
    paddingHorizontal: 16.5,
  },
  rowHit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbWrap: {
    width: 106,
    height: 109,
    alignItems: 'center',
  },
  thumbSingle: {
    width: 98,
    height: 101,
  },
  infoWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  thumb: {
    width: 98,
    height: 101,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  thumbImg: {
    width: 78,
    height: 80,
    // marginTop: -24,
    borderRadius: 22,
  },
  thumbSingleImg:{
    width: 98,
    height: 101,
    borderRadius: 22,
  },
  thumbMidImg: {
    width: 68,
    height: 71,
    // marginTop: -24,
    borderRadius: 22,
    opacity:0.6
  },
  thumbBackImg: {
    width: 57,
    height: 60,
    // marginTop: -24,
    borderRadius: 22,
    opacity:0.4
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:1
  },
  thumbMid: {
    left: 18,
    bottom: -4,
  },
  thumbBack: {
    left: 38,
    bottom: -8,
  },
  badge: {
    position: 'absolute',
    left: 12,
    bottom: 25,
    backgroundColor: '#000',
    borderRadius: 27,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center"
  },
  badgeTxt: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  subTxt: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  earnTxt: {
    color: '#3DDC97',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
  },
  moreBtn: {
    left: 12,
    alignItems: "flex-start"
  },
  moreIcon: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
  },
});
