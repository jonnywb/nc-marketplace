import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Account from "./components/Account/Account";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

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
