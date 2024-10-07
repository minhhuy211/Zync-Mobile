import React, { useEffect, useState } from "react";

import {Provider} from "react-redux";
import store from "./app/store";
import Layout from "./app/navigation/Layout";
import Toast from "react-native-toast-message";

// Define an interface to type the response data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

  }, []);



  return (
    <Provider store={store}>
      <Layout/>
      <Toast position='bottom'/>
    </Provider>

  );
};

export default App;
