import styles from "./Info.module.css";

const Info = ({ user }) => {
  const { username, avatar_url, kudos, items_in_basket, items_ordered } = user;
  return (
    <>
      <h3>Welcome, {username}!</h3>
      <img className={styles.profileImg} src={avatar_url} alt="your avatar" />
      <p>Kudos: {kudos}</p>
      <p>Your basket: {items_in_basket}</p>
      <p>Orders: {items_ordered}</p>
    </>
  );
};

export default Info;
