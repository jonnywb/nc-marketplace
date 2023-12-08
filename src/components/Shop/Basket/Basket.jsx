import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import { deleteFromBasket, getBasketItems, postToBasket } from "../../utils/utils"
import ShopCard from "../ShopCard/ShopCard"

const Basket = ({basket, setBasket}) => {
    const { user } = useContext(UserContext)
    
    
    useEffect(() => {
        if (user.username) {
            getBasketItems(user.username).then((items) => {
                setBasket(items) 
            })
        }
    }, [])

    const handleRemove = (event) => {
        const id = event.target.getAttribute('item_id')
        deleteFromBasket(user.username, id)
        const newBasket = [...basket]
        setBasket(newBasket.filter(item => item.item_id !== id))
    }

    return (
        <>
        <h2>Basket</h2>
        <ul className="item-list">
        {basket.map((item) => {
            const {item_id} = item
            return (
                <div key={item_id}>
                <ShopCard item={item} />
                <button item_id={item_id} onClick={handleRemove}>Remove</button>
                </div>
            )
        })}
      </ul>
      </>
    )
}

export default Basket