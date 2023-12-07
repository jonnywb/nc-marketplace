import { postItem } from "../../utils/utils"
import { useNavigate } from 'react-router-dom'

const AddItem = ({categories}) => {
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const itemObj = new FormData(event.target)
        const newItem = {
            item_name: itemObj.get('item_name'),
            img_url: itemObj.get('img_url'),
            price: itemObj.get('price'),
            description: itemObj.get('description'),
            category_name: itemObj.get('category_name')
        }
        postItem(newItem).then((newItem) => {
            console.log(newItem)
            const {item_id} = newItem
            const item = useNavigate()
            return item(`/items/${item_id}`)
        })
    }

    return (
        <form method='POST' onSubmit={handleSubmit}>
            <h3>Post new item for sale</h3>
            <label>Name: <input type="text" name="item_name" placeholder="Enter name of item" required /></label>
            <label>Image url: <input type="url" name="img_url" placeholder="Enter image url" required /></label>
            <label>Price: <input type="number" name="price" placeholder="Enter price" required /></label>
            <label>Description: <input type="text" name="description" placeholder="Enter description" /></label>
            <label>Category: <select name="category_name">{categories.map((category) => {
                const {category_name} = category
                return <option value={category_name} key={category_name}>{category_name}</option>
            })}</select></label>
            <button>Submit</button>
        </form>
    )
}

export default AddItem