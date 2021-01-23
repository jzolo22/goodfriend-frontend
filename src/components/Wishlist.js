import React from 'react'
import { Checkbox, List, Icon } from 'semantic-ui-react'
import styled from "styled-components";
import { connect } from 'react-redux'
import AddItem from './AddItem';
import { getItems, deleteItem } from '../redux/actions'


class Wishlist extends React.Component {

    state = {
        itemIds: []
    }

    componentDidMount() {
        this.props.getItems()
    }

    deleteItem = (e) => {
        this.props.deleteItem(parseInt(e.target.id))
    }

    wishlistItems = () => {
        if (this.props.items.length > 0) {
            const usersWishlistItems = this.props.items.filter(item => item.wishlist_id === this.props.user.wishlist.id)
            return usersWishlistItems.map(item => {
                    return (
                        <>
                            <Checkbox 
                                style={{display: "block"}}
                                label={<label>{item.name}{this.props.user.id === this.props.currentUser.id ?
                                    <Icon 
                                        link={true} 
                                        id={item.id} 
                                        name="trash alternate outline" 
                                        onClick={this.deleteItem} 
                                        inline
                                    /> 
                                : 
                                null }</label>} 
                                defaultChecked={item.purchased ? true : false}
                            />

                            {item.link ? 
                            <>
                                <List.Item
                                    content={<a target="_blank" rel="noreferrer" href={item.link}>~link~</a>}
                                />
                            </>
                            : null }
                        </>
                    )
            })
        }
    }


    render() {
        console.log(this.props)
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
        deleteItem: (id) => dispatch(deleteItem(id))
    }
}

export default connect(msp, mdp)(Wishlist)

const Container = styled.div`
    display: block;
    border: solid pink;
`;
