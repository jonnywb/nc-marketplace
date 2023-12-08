import { postItem } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./addItem.css";

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
    <section id="add-item">
      <div className="section-header">
        <h2>Post new item for sale</h2>
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Name:</label>
          <input id="add_item_name" type="text" name="item_name" placeholder="Enter name of item" required />
          <label>Image url:</label>
          <input id="add_item_url" type="url" name="img_url" placeholder="Enter image url" required />
          <label>Price:</label>
          <input type="number" name="price" placeholder="Enter price" required />
          <label>Description:</label>
          <input type="text" name="description" placeholder="Enter description" />
          <label>Category:</label>
          <select name="category_name">
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
        <button className="form-submit">Submit</button>
      </form>
    </section>
  );
};

export default AddItem;
