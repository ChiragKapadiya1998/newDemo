import { View, FlatList, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UploadedHeader from '@/components/uploaded/UploadedHeader';
import UploadRow from '@/components/uploaded/UploadRow';
import UploadMenu from '@/components/uploaded/UploadMenu';
import { useGetExploreQuery } from '@/api/commonApi';
import { API } from '@/utils/apiConstant';
import { styles } from './style';
import { SCREENS } from '@/navigation/screenNames';

const toRow = (item: any) => {
  return {
    id: item.id,
    title: item.file_name,
    count: item.file_type,
    time: item.created_at ? String(item.created_at).slice(0, 10) : '',
    views: `${item.view_count || 0} views`,
    earn: `$${Number(item.total_earnings) || 0} earn`,
    thumb: item.thumbnail_url || (item.file_type === 'IMAGE' ? item.file_url : null),
    fileType: item.file_type,
  };
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const rootRef = useRef<any>(null);
  const [menu, setMenu] = useState<any>(null);
  const [boxH, setBoxH] = useState(0);
  const { data } = useGetExploreQuery({
    folder_id: API.folderId,
    limit: 30,
  });
  const list = (data?.data?.resources || []).map(toRow);

  const closeMenu = () => {
    setMenu(null);
  };

  const onMorePress = (id: any, anchor: any) => {
    if (menu?.id === id) {
      closeMenu();
      return;
    }
    rootRef.current?.measureInWindow((ox: number, oy: number) => {
      setMenu({
        id,
        x: anchor.x - ox,
        y: anchor.y - oy,
        width: anchor.width,
        height: anchor.height,
      });
    });
  };

  const renderItem = ({ item }: any) => {
    return (
      <UploadRow
        item={item}
        onMore={(anchor: any) => onMorePress(item.id, anchor)}
        onPress={() => {
          if (menu) {
            closeMenu();
            return;
          }
          if (item.fileType !== 'VIDEO') {
            return;
          }
          navigation.navigate(SCREENS.Video, { fileId: item.id });
        }}
      />
    );
  };

  console.log('list', list);
  return (
    <View
      ref={rootRef}
      style={styles.container}
      onLayout={e => setBoxH(e.nativeEvent.layout.height)}
    >
      <UploadedHeader onBack={() => navigation.goBack()} />
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        extraData={menu?.id}
      />
      {menu ? (
        <>
          <Pressable style={styles.menuLayer} onPress={closeMenu} />
          <UploadMenu anchor={menu} spaceH={boxH} onClose={closeMenu} />
        </>
      ) : null}
    </View>
  );
};

export default HomeScreen;
