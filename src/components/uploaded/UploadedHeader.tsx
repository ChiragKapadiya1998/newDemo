import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { icons } from '@/assets';

const UploadedHeader = ({ onBack }: any) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Uploaded</Text>
    </View>
  );
};

export default UploadedHeader;

const styles = StyleSheet.create({
  header: {
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 16.5,
    marginTop: 6,
    marginBottom:28
  },
  headerTitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  backBtn: {
    position: 'absolute',
    left: 16.5,
    zIndex: 1,
  },
  backIcon: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
});
