import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './tabs.style';
import { SIZES } from '../../../constants';

type TabsProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type TabButtonProps = {
  name: string;
  activeTab: string;
  onHandleSelectTab: () => void;
};

const TabButton = ({ name, activeTab, onHandleSelectTab }: TabButtonProps) => (
  <TouchableOpacity
    style={styles(name, activeTab).btn}
    onPress={onHandleSelectTab}
  >
    <Text style={styles(name, activeTab).btnText}>{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <View style={styles().container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSelectTab={() => setActiveTab(item)}
          />
        )}
        horizontal
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  );
};

export default Tabs;
