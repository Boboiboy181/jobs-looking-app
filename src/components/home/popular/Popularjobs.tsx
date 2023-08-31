import React from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';

import styles from './popularjobs.style';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';

const Popularjobs = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            contentContainerStyle={{columnGap: SIZES.medium}}
            keyExtractor={(item) => item?.job_id}
            renderItem={({ item }) => <PopularJobCard item={item} />}
            horizontal={true}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
