import "./App.module.css";
import Header from "../Header/Header";
import Shop from "../Shop/Shop";
import Account from "../Account/Account";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../../contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<Shop />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
