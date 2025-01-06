import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
const NavigatorTabIcon = ({
                     name = "",
                     color = "#000",
                     focused = false,
                     size = 32,
                 }) => {
    return <Icon name={name} size={size} color={color} />;
};

 export default NavigatorTabIcon