import { getItem } from "../../utils/utils"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

const Item = () => {
    const {item_id} = useParams()
    const [currItem, setCurrItem] = useState({})

    useEffect(() => {
        getItem(item_id).then((item) => {
            setCurrItem(item)
        })
    }, [])

    const { item_name, img_url, description, price, category_name } = currItem
    return (
        <>
        <h2>Item</h2>
            <h3>{item_name}</h3>
            <img src={img_url} alt={description} />
            <p>{description}</p>
            <p>{price}</p>
            <p>{category_name}</p>
        </>
    )
}

export default Item