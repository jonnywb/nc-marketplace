import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ShopCard.module.css";
import { primary, secondary } from "../../styles/Button.module.css";

const ShopCard = ({ item, remove }) => {
  const { item_name, img_url, description, price, item_id } = item;
  const redirect = useNavigate();

  const renderButton = () => {
    if (remove) {
      return (
        <button className={secondary} item_id={item_id} onClick={remove}>
          Remove
        </button>
      );
    }

    return (
      <button
        className={secondary}
        onClick={() => {
          redirect(`/items/${item_id}`);
        }}
      >
        See more
      </button>
    );
  };

  return (
    <li className={styles.item}>
      <h3 className={styles.head}>{item_name}</h3>
      <div
        onClick={() => {
          redirect(`/items/${item_id}`);
        }}
        className={styles.imgDiv}
      >
        <img className={styles.img} src={img_url} />
      </div>
      <p className={styles.desc}>{description}</p>
      <p className={styles.price}>£{(price / 100).toFixed(2)}</p>
      {renderButton()}
    </li>
  );
};

export default ShopCard;
