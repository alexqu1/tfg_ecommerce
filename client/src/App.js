import './App.css';
import Post from "./Post";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import UltimosPost from "./pages/UltimosPost";
import ContactaPage from "./pages/ContactaPage";
import PanelAdmin from "./pages/PanelAdmin";

import MyAdvertisementsPage from "./pages/MyAdvertisementsPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/panelAdmin" element={<PanelAdmin/>} />

          <Route path="/ultimosPost" element={<UltimosPost/>} />
          <Route path="/contactaPage" element={<ContactaPage/>} />
          <Route path="/MyAdvertisementsPage" element={<MyAdvertisementsPage/>} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
