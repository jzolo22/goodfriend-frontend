import React from 'react'
import { Checkbox, List, Icon, Image } from 'semantic-ui-react'
import styled from "styled-components";
import { connect } from 'react-redux'
import AddItem from './AddItem';
import { getItems, deleteItem, purchaseItem, returnItem } from '../redux/actions'



class Wishlist extends React.Component {

    state = {
        itemIds: [],
    }

    componentDidMount() {
        this.props.getItems()
    }

    deleteItem = (e) => {
        this.props.deleteItem(parseInt(e.target.id))
    }

    checkItem = (e) => {
        let id = parseInt(e.target.id)
        if (e.target.value === "false") {
            this.props.purchaseItem(id)
        } else {
            this.props.returnItem(id)
        }
    }

    wishlistItems = () => {
        if (this.props.items.length > 0) {
            const usersWishlistItems = this.props.items.filter(item => item.wishlist_id === this.props.user.wishlist.id)
            usersWishlistItems.sort((a, b) => a.purchased - b.purchased)
            return usersWishlistItems.map(item => {
                    return (
                        <>
                            <Checkbox 
                                id={item.id}
                                style={{display: "block"}}
                                label={
                                    <label 
                                            style={{ textDecoration : item.purchased ? 'line-through' : 'none' }}>
                                                {item.name}
                                            {this.props.user.id === this.props.currentUser.id 
                                            ?
                                                <Icon 
                                                    link={true} 
                                                    id={item.id} 
                                                    name="trash alternate outline" 
                                                    onClick={this.deleteItem} 
                                                    inline
                                                /> 
                                            : 
                                            null }
                                    </label>} 

                                onClick={this.checkItem}
                                checked={item.purchased ? true : false}
                                value={item.purchased ? true : false}
                            />

                            {item.link ? 
                            <>
                                <List.Item
                                    content={<a target="_blank" rel="noreferrer" href={item.link}>~link~</a>}
                                />
                            </>
                            : null }
                            {item.image_link ? <Image src={item.image_link} size="small"/> : null}
                        </>
                    )
            })
        }
    }


    render() {

        return (
            <Container>
                <h3>Wishlist</h3>
                {this.wishlistItems()}

                {this.props.user.id === this.props.currentUser.id ? 
                    <AddItem user={this.props.user}/> : null }
            </Container>
        )
    }
}

const msp = (state) => {
    return {
        items: state.items,
        currentUser: state.currentUser
    }
}

const mdp = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        deleteItem: (id) => dispatch(deleteItem(id)),
        purchaseItem: (id) => dispatch(purchaseItem(id)),
        returnItem: (id) => dispatch(returnItem(id))
    }
}

export default connect(msp, mdp)(Wishlist)

const Container = styled.div`
    display: block;
    border: solid pink;
`;
