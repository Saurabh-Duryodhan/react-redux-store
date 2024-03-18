import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Form, NavLink } from 'react-router-dom';
import classes from './index.module.css'
const AvatarDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar
                onClick={handleClick}
                alt="Avatar"
                src="/path/to/avatar.jpg"
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink style={{textDecoration: 'none', fontFamily: 'revert'}} to='/profile' className={({ isActive }) => isActive ? classes.active : undefined}>
                        Profile
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>
                    <Form method='POST' action='/logout'>
                        <button style={{fontFamily: 'monospace', color: 'black', background: 'transparent', border: 'none'}}>Logout</button>
                    </Form>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AvatarDropdown;