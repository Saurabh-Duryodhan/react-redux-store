import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import CustomizedBadges from './ShopingCartBadge';
import classes from './index.module.css'
import AvatarDropdown from './AvatarDropDown';

export const Header = () => {
    const isAuthenticated = useLoaderData()
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? classes.active : undefined} end>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/cart' className={({ isActive }) => isActive ? classes.active : undefined}><CustomizedBadges style={{ color: 'red' }} /></NavLink>
                    </li>
                    <li>
                        {
                            isAuthenticated ?
                                <AvatarDropdown /> :
                                (<>
                                    <button> <NavLink to='/login'>Login</NavLink></button>
                                </>)
                        }
                    </li>
                </ul>
            </nav >
            <Outlet />
        </>
    )
}

{/* <Avatar src='https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/John-Smith.The-New-World.webp'></Avatar> */ }