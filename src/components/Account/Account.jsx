import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const Account = () => {
  const { user } = useContext(UserContext);

  const handleSubmit = () => {}

  return (
    <section id="account">
      <h2>Account</h2>
      <h3>Hello {user}</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" />
        </label>
        <button>Log me in</button>
      </form>
    </section>
  );
};

export default Account;
