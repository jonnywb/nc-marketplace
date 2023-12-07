import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <Link className='link' to="/">Shop</Link>
            <Link className='link' to="/account">Account</Link>
            <Link className='link' to="/basket">Basket</Link>
        </nav>
    )
}

export default Nav