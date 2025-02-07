import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStote from "./utils/appStore";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";
import Chats from "./Chats";

function App() {
  return (
    <>
      <Provider store={appStote}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:toTargetId" element={<Chats />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
