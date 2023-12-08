import { getItem, postToBasket } from "../../utils/utils"
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../contexts/UserContext"

const Item = () => {
    const redirect = useNavigate();
    const {item_id} = useParams()
    const [currItem, setCurrItem] = useState({})
    const { user } = useContext(UserContext)

    useEffect(() => {
        getItem(item_id).then((item) => {
            setCurrItem(item)
        })
    }, [])

    const handleAddToBasket = () => {
      postToBasket(user.username, {item_id})
      .then(() => {
        redirect(`/basket`)
      })
    }

    const allowBasket = () => {
        return <button onClick={handleAddToBasket}>Add to basket</button>
    }

    const { item_name, img_url, description, price, category_name } = currItem
    return (
        <>
        <h2>Item</h2>
            <h3>{item_name}</h3>
            <img src={img_url} alt={description} />
            <p>{description}</p>
            <p>{price}</p>
            <p>{category_name}</p>
            {user.username && allowBasket()}
        </>
    )
}

export default Item