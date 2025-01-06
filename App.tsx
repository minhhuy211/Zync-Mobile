import React, {useEffect, useState} from "react";
import AuthenticatedNavigator from "./app/navigation/AuthenticatedNavigator";
import "./app/i18n/i18next";
import Layout from "./app/navigation/Layout";
import {Provider} from "react-redux";
import store from "./app/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const App: React.FC = () => {


  useEffect(() => {

  }, []);



  return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Layout />
        </GestureHandlerRootView>
        <Toast position="bottom" />
      </Provider>
  );
};

export default App;
