import React, {useState} from "react";
import {View, FlatList, StyleSheet, Alert} from "react-native";
import {NotifyTitle} from "../../constants/notify/NotifyTitle";
import FilterButton from "./FilterButton";

interface ButtonTitle {
    key: NotifyTitle;
    title: NotifyTitle
}

const FilterButtonList = () => {
    const [selectedButton, setSelectedButton] = useState<NotifyTitle>(NotifyTitle.ALL);
    const renderTitles: ButtonTitle[] = Object.values(NotifyTitle).map((item) => ({
        key: item,
        title: item
    }));

    const handleClick = (title: NotifyTitle) => {
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