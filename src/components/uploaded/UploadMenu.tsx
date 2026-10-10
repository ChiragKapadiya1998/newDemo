import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/assets';
import { Item } from '@/types';


const list: Item[] = [
  {
    title: 'Edit',
    icon: icons.chevron,
    red: false,
  },
  
  {
    title: 'Share',
    icon: icons.share,
    red: false,
  },
  {
    title: 'Delete Folder',
    icon: icons.trash,
    red: true,
  },
  {
    title: 'Download',
    icon: icons.download,
    red: false,
  },
  {
    title: 'Saved',
    icon: icons.bookmark,
    red: false,
  },
]
const MenuItem = ({ title, icon, red, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <Text style={styles.menuTxt}>{title}</Text>
      {icon ? (
        <Image source={icon} style={red ? styles.deleteIcon : styles.menuIcon} />
      ) : null}
    </TouchableOpacity>
  );
};

const UploadMenu = ({ onClose, anchor, spaceH }: any) => {
  const [menuH, setMenuH] = useState(0);
  const h = menuH || 260;
  const dotY = anchor.y + anchor.height / 2;
  const openDown = spaceH - dotY - 12 >= h;
  const place = openDown
    ? { top: dotY + 8 }
    : { bottom: spaceH - dotY + 8 };

  return (
    <View
      onLayout={e => {
        const next = Math.round(e.nativeEvent.layout.height);
        if (next && next !== menuH) {
          setMenuH(next);
        }
      }}
      style={[styles.menu, place]}
    >
      {list.map(item => {
        return (
          <MenuItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            red={item.red}
            onPress={onClose}
          />
        );
      })}
    </View>
  );
};

export default UploadMenu;

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 16,
    width: 230,
    zIndex: 50,
    elevation: 50,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    paddingVertical: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuTxt: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
  },
  deleteTxt: {
    color: '#FF453A',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  deleteIcon: {
    width: 22,
    height: 22,
    tintColor: '#FF453A',
    resizeMode: 'contain',
  },
});
