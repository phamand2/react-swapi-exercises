import React from 'react'
import { Menu } from "react-bulma-components";
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <Menu>
    <Menu.List>
      <Menu.List.Item>
        <Link to='/'>
          Home
        </Link>
      </Menu.List.Item>
    </Menu.List>
    </Menu>
  )
}

export default Nav
