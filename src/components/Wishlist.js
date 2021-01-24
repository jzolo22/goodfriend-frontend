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
                            <OuterContainer>
                                <StyledImage 
                                    src={item.image_link ? item.image_link : "https://www.nashvillewraps.com/blog/wp-content/uploads/2014/02/Wedding-editorial1.jpg"} 
                                    alt={item.name} 
                                /> 

                                <Overlay>
                                    <ImageInfo>
                                        {/* <p style={{color: "white", fontWeight: "bold"}}>{item.name}</p> */}
                                        <a style={{color: "white", fontWeight: "bold", fontSize: "15px"}} target="_blank" rel="noreferrer" href={item.link}>{item.name}</a><br />
                                        {this.props.user.id === this.props.currentUser.id ?
                                            <Icon 
                                                link={true} 
                                                id={item.id} 
                                                name="trash alternate outline" 
                                                onClick={this.deleteItem} 
                                                inline
                                            /> : null}
                                    </ImageInfo>
                                </Overlay>

                            </OuterContainer>
                               
                                
                        </>
                    )
            })
        }
    }


    render() {
        console.log(this.props)
        return (
            <>
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
    justify-content: center;
    align-items: center;
    border: solid #8a5a44 5px;
    background-image: url("https://www.publicdomainpictures.net/pictures/30000/velka/cork-board.jpg") ;
    flex-wrap: wrap;
    margin-bottom: 0%;
    min-height: 250px;
`;

const StyledImage = styled.img`
    border: solid #8a5a44 2px;
    margin: 5px;
    margin-top: 7px;
    margin-bottom: 7px;
    max-width:345px;
    max-height:142.5px;
    width: auto;
    height: auto; 
    
    // transform: rotate(-7deg);
`;


const OuterContainer = styled.div`
    position: relative;
    // border: white solid;
    // border-radius: 5px;
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 95%;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.5s;
    transform: translateY(5px);
    transition: transform 0.5s;
        :hover {
            opacity: 1;
            transform: translateY(0)

        }
`

const ImageInfo = styled.div`

`