import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AuthenticatedStackParams } from "../navigation/AuthenticatedNavigator";
import { View, Text } from "react-native";

const MediaReview = ({
  route,
  navigation,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<AuthenticatedStackParams, "MediaReview">;
}) => {
  return (
    <View>
      <Text>âsssss</Text>
    </View>
  );
};

export default MediaReview;
