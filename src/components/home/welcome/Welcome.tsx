import React, { useState } from 'react';
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  GestureResponderEvent,
} from 'react-native';

import styles, { tab, tabText } from './welcome.style';
import { Link, useRouter } from 'expo-router';
import { SIZES, icons } from '../../../constants';

const jobTypes = [
  'Full-time',
  'Part-time',
  'Remote',
  'Internship',
  'Freelance',
];

const Welcome = () => {
  const router = useRouter();
  const [activeJobTypes, setActiveJobTypes] = useState(jobTypes[0]);
  const [searchValue, setSearchValue] = useState('');

  const onSearchHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setSearchValue(e.nativeEvent.text);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Gia Hai</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={searchValue}
            onChange={onSearchHandler}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setActiveJobTypes(item);
                // router.push(`/search/${item}`);
              }}
              style={tab(activeJobTypes, item)}
            >
              <Text style={tabText(activeJobTypes, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Welcome;
