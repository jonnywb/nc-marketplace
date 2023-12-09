import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserByUsername } from "../utils/utils";
import styles from "./Account.module.css";
import { outerAccount, account, orders, accountHeader } from "../styles/section.module.css";
import { message, h2 } from "../styles/Typography.module.css";
import Orders from "./Orders/Orders";
import Info from "./Info/Info";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getUserByUsername(usernameInput)
      .then((user) => {
        setUser(user);
        localStorage.setItem("username", user.username);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
    setUsernameInput("");
  };

  const handleChange = (event) => {
    setUsernameInput(event.target.value);
  };

  if (isError) {
    return (
      <>
        <p className={message}>Username not found</p>
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
    return (
      <>
        <section className={outerAccount}>
          <div className={accountHeader}>
            <h2 className={h2}>Account</h2>
          </div>
          <div className={account}>
            <Info user={user} />
          </div>
          <div className={orders}>
            <Orders user={user} />
          </div>
        </section>
      </>
    );
  }

  return (
    <section className={styles.login}>
      <h2 className={h2}>Log In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.input}
          name="username"
          value={usernameInput}
          onChange={handleChange}
          placeholder="username..."
        />

        <button className={styles.button}>Log me in</button>
      </form>
    </section>
  );
};

export default Account;
