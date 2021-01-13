import React from 'react'
import { Menu, Input, MenuItem } from 'semantic-ui-react'

class NavBar extends React.Component {

    render() {
        return(
            <Menu fixed="top" inverted="true">
                <Menu.Item 
                name="goodFriend"
                >
                    goodfriend
                </Menu.Item>.
                <Menu.Item 
                name="Calendar"
                />

                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='first or last name' />
                </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default NavBar