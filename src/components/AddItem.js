import React, { useState } from 'react'
import { addItem } from '../redux/actions'
import { Icon, Modal, Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from "styled-components";

const styledIcon = styled(Icon)`
    padding-left: 3px; 
    margin-top: 2%; 
    margin-bottom: 15;
`

function reducer(state, { field, value }) {
    
}

function AddItem ({user}) {

    const [wishlist_id, setWishlistId] = useState(user.wishlist.id)
    const [wishlist_id, setWishlistId] = useState(user.wishlist.id)
    const [wishlist_id, setWishlistId] = useState(user.wishlist.id)
    const [wishlist_id, setWishlistId] = useState(user.wishlist.id)

        return (
            <Modal 
                trigger={<styledIcon link={true} name="add" onClick={this.addItem} size="big"/>}
                as={Form}
                onSubmit={this.onSubmit}
                size="mini"
                style={{textAlign: "center"}}
                >
                <Modal.Content>
                    <Form.Input label="Name" type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/>
                    <Form.Input label="Link?" type="text" placeholder="link" name="link" value={this.state.link} onChange={this.onChange}/>
                </Modal.Content>
                <Modal.Actions style={{textAlign: "center"}}>
                    <Button type="submit" icon="add circle" content="Add!" />
                </Modal.Actions>
            </Modal>
        )
}


function mdp(dispatch) {
    return 
        {
            addItem: (itemObj) => dispatch(addItem(itemObj))
        };
}

export default AddItem;


