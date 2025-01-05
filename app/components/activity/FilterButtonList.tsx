import React, {useState} from "react";
import {View, FlatList, StyleSheet, Alert} from "react-native";
import {ActivityTitle} from "../../constants/notify/ActivityTitle";
import FilterButton from "./FilterButton";

interface ButtonTitle {
    key: ActivityTitle;
    title: ActivityTitle
}

const FilterButtonList = () => {
    const [selectedButton, setSelectedButton] = useState<ActivityTitle>(ActivityTitle.ALL);
    const renderTitles: ButtonTitle[] = Object.values(ActivityTitle).map((item) => ({
        key: item,
        title: item
    }));

    const handleClick = (title: ActivityTitle) => {
        setSelectedButton(title);
    };

    const ItemSeparator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={renderTitles} // Dữ liệu
            renderItem={({ item }) => <FilterButton title={item.title}
                                                    isSelected={item.title === selectedButton}
                                                    onClick={() => handleClick(item.title)}/>} // Hàm render item
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },

    separator: {
        width: 12,
    }
});

export default FilterButtonList;