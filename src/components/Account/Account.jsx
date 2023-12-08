import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserByUsername } from "../utils/utils";
import "./account.css";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getUserByUsername(usernameInput)
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setIsError(true);
      });
    setUsernameInput("");
  };

  const handleChange = (event) => {
    setUsernameInput(event.target.value);
  };

  if (isError) {
    return (
      <>
        <p className="err-msg">Username not found</p>
        <button
          onClick={() => {
            setIsError(false);
          }}
        >
          Take me back!
        </button>
      </>
    );
  }

  if (user) {
    const { username, avatar_url, kudos, items_in_basket, items_ordered } = user;
    return (
      <section id="account">
        <h2>Account</h2>
        <h3>Welcome, {username}!</h3>
        <img src={avatar_url} alt="your avatar" />
        <p>Kudos: {kudos}</p>
        <p>Your basket: {items_in_basket}</p>
        <p>Orders: {items_ordered}</p>
      </section>
    );
  }

  return (
    <section id="login">
      <h2>Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={usernameInput} onChange={handleChange} placeholder="username..." />

        <button>Log me in</button>
      </form>
    </section>
  );
};

export default Account;
