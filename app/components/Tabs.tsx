import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

type TabsProps = {
  onTabChange: (value: any) => void;
  items: TabItem[];
  defaultIndex?: number;
  value: any;
};

type TabItem = {
  value: any;
  label: string;
}

const Tabs = ({ onTabChange, items, defaultIndex = 0 , value}: TabsProps) => {


  const handleTabPress = (tab: TabItem) => {
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {items.map((tab) => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, value === tab.value && styles.activeTab]}
          onPress={() => handleTabPress(tab)}
        >
          <Text
            style={[styles.tabText, value === tab.value && styles.activeTabText]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    paddingVertical: 12,
  },
  tabText: {
    color: "gray",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },

  activeTab: {
    borderBottomColor: "black",
  },
});

export default Tabs;
