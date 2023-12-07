import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import Account from "./components/Account/Account";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Shop />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
