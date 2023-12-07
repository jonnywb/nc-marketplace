import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Account from "./components/Account/Account";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="*" element={<Shop />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
