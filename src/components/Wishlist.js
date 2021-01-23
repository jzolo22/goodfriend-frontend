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
                                {/* {this.props.user.id === this.props.currentUser.id 
                                ?
                                    <Icon 
                                        link={true} 
                                        id={item.id} 
                                        name="trash alternate outline" 
                                        onClick={this.deleteItem} 
                                        inline
                                /> : null} */}
                               

                            {item.link ? 
                            <>
                                {/* <List.Item
                                    content={<a target="_blank" rel="noreferrer" href={item.link}>~link~</a>}
                                /> */}
                            </>
                            : null }
                            {item.image_link ? 
                                <StyledImage src={item.image_link} /> 
                                : 
                                <StyledImage src={"https://www.nashvillewraps.com/blog/wp-content/uploads/2014/02/Wedding-editorial1.jpg"} /> 
                                
                            }
                        </>
                    )
            })
        }
    }


    render() {
        console.log(this.props)
        return (
            <>
                <h3>Wishlist</h3>
                <Container>
                    {this.wishlistItems()}
                </Container>

                {this.props.user.id === this.props.currentUser.id ? 
                        <AddItem user={this.props.user}/> : null }
            </>
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
    display: flex;
    padding: 5px;
    justify-content: space-around;
    border: solid black 2px;
    background-color: black;
    flex-wrap: wrap;
    margin-bottom: 0%;
`;

const StyledImage = styled.img`
    border: solid black 2px;
    margin: 5px;
    margin-top: 7px;
    margin-bottom: 7px;
    size: 30%;
    max-width:230px;
    max-height:95px;
    width: auto;
    height: auto; 
        :hover {
            opacity: 1;
        }
`;
