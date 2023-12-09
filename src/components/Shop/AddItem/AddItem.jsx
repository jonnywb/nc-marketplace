import { postItem } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import styles from "./AddItem.module.css";
import { sectionHeader } from "../../styles/Section.module.css";
import { h2 } from "../../styles/Typography.module.css";

const AddItem = ({ categories }) => {
  const redirect = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemObj = new FormData(event.target);
    const newItem = {
      item_name: itemObj.get("item_name"),
      img_url: itemObj.get("img_url"),
      price: itemObj.get("price"),
      description: itemObj.get("description"),
      category_name: itemObj.get("category_name"),
    };

    postItem(newItem).then((newItem) => {
      redirect(`/items/${newItem.item_id}`);
    });
  };

  return (
    <section className={styles.section}>
      <div className={sectionHeader}>
        <h2 className={h2}>Post new item for sale</h2>
      </div>
      <form className={styles.form} method="POST" onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label className={styles.label}>Name:</label>
          <input
            id="add_item_name"
            className={styles.input}
            type="text"
            name="item_name"
            placeholder="Enter name of item"
            required
          />
          <label className={styles.label}>Image url:</label>
          <input
            id="add_item_url"
            className={styles.input}
            type="url"
            name="img_url"
            placeholder="Enter image url"
            required
          />
          <label className={styles.label}>Price:</label>
          <input className={styles.input} type="number" name="price" placeholder="Enter price" required />
          <label className={styles.label}>Description:</label>
          <input type="text" className={styles.input} name="description" placeholder="Enter description" />
          <label className={styles.label}>Category:</label>
          <select className={styles.select} name="category_name">
            {categories.map((category) => {
              const { category_name } = category;
              return (
                <option value={category_name} key={category_name}>
                  {category_name}
                </option>
              );
            })}
          </select>
        </div>
        <button className={styles.button}>Submit</button>
      </form>
    </section>
  );
};

export default AddItem;
