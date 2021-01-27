import React from 'react'
import { connect } from 'react-redux'
import { deleteFollow, newFollow, getEvents, deleteEvent, editProfile, editPicture } from '../redux/actions'
import Wishlist from './Wishlist'
import EditEventForm from './EditEventForm'
import { NavLink } from 'react-router-dom'
import EditableLabel from 'react-inline-editing';
import moment from 'moment'
import { Icon, Item, Image, Transition, Button, Segment, Label, Form } from 'semantic-ui-react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import CakeIcon from '@material-ui/icons/Cake';
import SchoolIcon from '@material-ui/icons/School';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import GamesIcon from '@material-ui/icons/Games';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Typography from '@material-ui/core/Typography';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TodayIcon from '@material-ui/icons/Today';
import styled from "styled-components";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'



class UserProfile extends React.Component {


    state = {
        first_name: this.props.user[0].first_name,
        last_name: this.props.user[0].last_name,
        venmo_handle: this.props.user[0].venmo_handle,
        birthday: moment(this.props.user[0].birthday).format('MMM Do'),
        partner_name: this.props.user[0].partner_name,
        partner_birthday: moment(this.props.user[0].partner_birthday).format('MMM Do'),
        visible: true,
        src: null,
        crop: {
            unit: "%",
            width: 30,
            aspect: 1/1
        },
        croppedImageUrl: null,
        croppedImage: null,
        cropBtn: false,
        imageClicked: false
    }


    componentDidMount() {
        this.props.getEvents()
    }

    ownBirthdayDisplay = () => {
        const { user, currentUser } = this.props
        if (user[0].birthday){
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        🎂 
                         <EditableLabel 
                            text={`${this.state.birthday}`}
                            inputWidth='75px'
                            inputHeight='25px'
                            inputMaxLength='50'
                            labelFontSize="20px"
                            onFocusOut={this.editedBirthday}
                        />
                    </div>
                )
            } else {
                return (
                    <p style={{fontSize: "20px", marginBottom: "5px"}}>🎂 {moment(user[0].birthday).format('MMM Do')}</p>
            )
            }
        }
    }

    partnerBirthdayDisplay = () => {
        const { user, currentUser } = this.props
        if(user[0].partner_name && user[0].partner_birthday) {
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${user[0].partner_name}`}
                        inputWidth='70px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerName}
                    /> - 🎂 
                    <EditableLabel 
                        text={`${this.state.partner_birthday}`}
                        inputWidth='70px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerBirthday}
                    /> </div>)
            }else {
               return ( <p style={{marginBottom: "3px"}}> 💞 {user[0].partner_name} -  🎂 {moment(user[0].partner_birthday).format('MMM Do')}</p>)
            }
        } else if (user[0].partner_name) {
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}> 💞 
                    <EditableLabel 
                        text={`${user[0].partner_name}`}
                        inputWidth='90px'
                        inputHeight='25px'
                        inputMaxLength='50'
                        labelFontSize="16px"
                        style={{float: "left"}}
                        onFocusOut={this.editedPartnerName}
                    /></div>)
         }
        }
    }
  
    followClick = () => {
        this.props.newFollow({
            follower_id: this.props.currentUser.id,
            followee_id: this.props.user[0].id
        })
    }

    unFollowClick = () => {
        this.props.deleteFollow(this.props.currentUser.id, this.props.user[0].id)
    }

    alreadyFollowed = () => {
        if (this.props.followedUsers){
            let idArray = this.props.followedUsers.map(user => user.id)
            return idArray.includes(this.props.user[0].id)
        }
    }

    deleteEvent = (e) => {
        let eventId = parseInt(e.target.id)
        this.props.deleteEvent(eventId)
    }  

    editedName = (text) => {
        let userId = this.props.user[0].id
        let firstName = text.split(" ")[0]
        let lastName = text.split(" ")[1]
        this.setState({
            first_name: firstName,
            last_name: lastName
        }, () => this.props.editProfile(userId, {first_name: firstName, last_name: lastName}))
    }

    editedBirthday = (text) => {
        let userId = this.props.user[0].id
        let month = text.split(" ")[0]
        let day = text.split(" ")[1].replace(/\D+/g, '')
        let year = this.props.user[0].birthday.split("-")[0]
        let newBirthday = `${month} ${day}, ${year}`
        let newBirthdayDate = new Date(newBirthday)
        this.setState({
            birthday: moment(newBirthdayDate).format('MMM Do'),
        }, () => this.props.editProfile(userId, {birthday: newBirthdayDate}))
    }

    editedPartnerName = (text) => {
        let userId = this.props.user[0].id
        console.log(text)
        this.setState({
            partner_name: text,
        }, () => this.props.editProfile(userId, {partner_name: text}))
    }

    editedPartnerBirthday = (text) => {
        let userId = this.props.user[0].id
        let month = text.split(" ")[0]
        let day = text.split(" ")[1].replace(/\D+/g, '')
        let year = this.props.user[0].partner_birthday.split("-")[0]
        let newBirthday = `${month} ${day}, ${year}`
        let newBirthdayDate = new Date(newBirthday)
        this.setState({
            partner_birthday: moment(newBirthdayDate).format('MMM Do'),
        }, () => this.props.editProfile(userId, {partner_birthday: newBirthdayDate}))
    }

    timelineIcons = (event) => {
        switch (true) {
            case event.title.toLowerCase().includes("birthday"):
                return <CakeIcon />
            case event.title.toLowerCase().includes("graduation"):
                return <SchoolIcon />
            case event.title.toLowerCase().includes("search"):
                return <SearchIcon />
            case event.title.toLowerCase().includes("move"):
                return <HomeIcon />
            case event.title.toLowerCase().includes("baby"):
                return <ChildFriendlyIcon />
            case event.title.toLowerCase().includes("wedding"):
                return <FavoriteIcon />
            case event.title.toLowerCase().includes("engagement"):
                return <FavoriteIcon />
            case event.title.toLowerCase().includes("anniversary"):
                return <FavoriteIcon />
            case event.title.toLowerCase().includes("tournament"):
                return <GamesIcon />
            case event.title.toLowerCase().includes("game"):
                return <GamesIcon />
            case event.title.toLowerCase().includes("match"):
                return <GamesIcon />
            case event.title.toLowerCase().includes("new"):
                return <NewReleasesIcon />
            case event.title.toLowerCase().includes("promotion"):
                return <NewReleasesIcon />
            case event.title.toLowerCase().includes("vacation"):
                return <BeachAccessIcon />
            default:
                return <TodayIcon />
        }
    }


    // {event.title.toLowerCase().includes("birthday") ? <CakeIcon /> : null}
    // {event.title.toLowerCase().includes("graduation") ? <SchoolIcon /> : null}
    // {event.title.toLowerCase().includes("search") ? <SearchIcon /> : null}
    // {event.title.toLowerCase().includes("move") ? <HomeIcon /> : null}
    // {event.title.toLowerCase().includes("baby") ? <ChildFriendlyIcon /> : null}
    // {event.title.toLowerCase().includes("wedding") ? <FavoriteIcon /> : null}
    // {event.title.toLowerCase().includes("engagement") ? <FavoriteIcon /> : null}
    // {event.title.toLowerCase().includes("anniversary") ? <FavoriteIcon /> : null}
    // {event.title.toLowerCase().includes("tournament") ? <GamesIcon /> : null}
    // {event.title.toLowerCase().includes("game") ? <GamesIcon /> : null}
    // {event.title.toLowerCase().includes("match") ? <GamesIcon /> : null}
    // {event.title.toLowerCase().includes("new") ? <NewReleasesIcon /> : null}
    // {event.title.toLowerCase().includes("promotion") ? <NewReleasesIcon /> : null}
    // {event.title.toLowerCase().includes("vacation") ? <BeachAccessIcon /> : null}

    eventDots = () => {
        const { currentUser, user, allEvents } = this.props
        if (user[0].own_events.length > 0) {
            console.log("in user profile", allEvents)
            let usersEvents = allEvents.filter(event => event.user_id === user[0].id)
            let sortedByDateEvents = usersEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
            return sortedByDateEvents.map(event => {
                return (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textSecondary" style={{paddingTop: "4px"}}>{moment(event.date).format('MMM Do')}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="white" style={{color: user[0].id === currentUser.id ? currentUser.first_color : user[0].first_color}}>
                               {this.timelineIcons(event)}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography 
                                style={{fontWeight: "bold", fontFamily: "serif", fontSize: "17px"}}>
                                    {event.title} 
                                    {user[0].id === currentUser.id ? 
                                    <> 
                                        <EditEventForm eventId={event.id}/>
                                        <Icon link={true} id={event.id} name="trash alternate outline" onClick={this.deleteEvent} /> 
                                    </> : null}
                            </Typography >
                            <Typography style={{fontFamily: "serif", fontSize: "15px"}}>{event.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                )
            })
        }
    }

    venmoDisplay = () => {
        const { user, currentUser } = this.props
        if (user[0].venmo_handle){
            if(user[0].id === currentUser.id) {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                         <img src="/images/venmologo.png" alt="venmo logo" style={{maxHeight: "14px", marginTop: "3px", marginRight: "3px"}}/>
                         <EditableLabel 
                            text={this.state.venmo_handle}
                            inputWidth='125px'
                            inputHeight='25px'
                            inputMaxLength='50'
                            labelFontSize="16px"
                            // onFocusOut={this.editedBirthday}
                        />
                    </div>
                )
            } else {
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src="/images/venmologo.png" style={{maxHeight: "14px", marginTop: "3px", marginRight: "3px"}} alt="venmo icon"/>
                        <p style={{fontSize: "16px", marginBottom: "5px"}}>{this.state.venmo_handle}</p>
                    </div>
            )
            }
        }
    }

    toggleVisibility = () => {
        this.setState((prevState) => ({visible: !prevState.visible}))
    }

    onUpload = (e) => {
        // this.setState({profile_picture: e.target.files[0]})
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({src: fileReader.result, cropBtn: true})
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    onImageLoaded = (image) => {
        this.imageRef = image
    }

    onCropChange = (crop) => {
        this.setState({crop})
    }

    onCropComplete = (crop) => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
            this.setState({ croppedImageUrl })
        }
    }

    getCroppedImg(image, crop) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );

        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })
    }


    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage }) 
    }

    submitCrop = (e) => {
        e.preventDefault()
        const userId = this.props.currentUser.id
        const formData = new FormData()
        formData.append('user[profile_picture]', this.state.croppedImage)
        this.props.editPicture(userId, formData)
        this.setState({
            cropBtn: false, 
            croppedImage: null, 
            src: null,
            imageClicked: false
        })
    }

    render(){
        console.log(this.state)
        const { user, currentUser } = this.props
        const { src, crop, croppedImageUrl, imageClicked } = this.state
    return(
        <WholeProfile>
            <Container>
                <Segment raised>
                
                {user[0].id === currentUser.id 
                    ? 
                    <>
                        <Image style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3%"}}  src={currentUser.profile_picture.url} circular size="small" alt={currentUser.first_name} onClick={(prevState) => this.setState({imageClicked: true})}/>
                        {imageClicked ? 
                            <Form.Field style={{margin: "3% 0% 3% 0%"}}>
                            <Form.Input
                                type="file"
                                accept="image/*"
                                multiple={false}
                                name="profile_picture" 
                                onChange={this.onUpload}
                                style={{width: "200px", fontSize: "12px"}}
                                />
                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        ruleOfThirds
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                    )}
                                {croppedImageUrl && (
                                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                )}
                            </Form.Field>
                        : null
                    }
                        
                        {this.state.cropBtn 
                        ? 
                        <Button onClick={this.submitCrop}>Done Cropping</Button>
                        :
                        null
                        }
                        
                        <EditableLabel 
                            text={`${user[0].first_name} ${user[0].last_name}`}
                            inputWidth='200px'
                            inputHeight='25px'
                            inputMaxLength='50'
                            labelFontWeight='bold'
                            labelFontSize="30px"
                            onFocusOut={this.editedName}
                        /> 
                    </>
                    :
                    <>
                        <Image style={{display: "block", marginLeft: "auto", marginRight: "auto", marginBottom: "3%"}}  src={user[0].profile_picture.url} circular size="small"/>
                        <p style={{fontSize: "30px", fontWeight: "bold", marginBottom: "5px"}}>{user[0].first_name} {user[0].last_name}</p> 
                    </>
                }

                {user[0].id !== currentUser.id && !this.alreadyFollowed() 
                    ? 
                    <Button color="pink" style={{marginBottom: "4px"}} compact onClick={this.followClick}>Follow</Button> 
                    : 
                    null
                }

                {this.alreadyFollowed() 
                    ? 
                    <Button compact style={{marginBottom: "4px"}} onClick={this.unFollowClick}>Unfollow</Button> 
                    :
                    null
                }

                {this.ownBirthdayDisplay()}
                {this.partnerBirthdayDisplay()}
                {this.venmoDisplay()}

                {user[0].id === currentUser.id 
                    ?
                    <Label style={{height: "fit-content", fontSize: "13px", marginTop: "5px"}}>click any field to edit</Label> 
                    :
                    null
                }
                
                {/* <Image 
                    inline={true} 
                    centered={true} 
                    style={{textAlign: "center"}} 
                    src={"https://p7.hiclipart.com/preview/141/282/535/5bbb8b02e74ba.jpg"} 
                    circular={true} 
                    size="mini"
                /> 
                {user[0].venmo_handle ? 
                    user[0].venmo_handle 
                    :
                    null} */}
                </Segment>
                <ButtonContainer>
                    <Button color="black" onClick={this.toggleVisibility} style={{margin: "7px"}}>
                                {this.state.visible ? "See Wishlist 🎁" : "See Timeline 🗓"}
                    </Button>
                </ButtonContainer>
            </Container>

            <ExtraStuffContainer>
                <Transition.Group animation="slide up" duration="500">
                    {this.state.visible && (
                        <StyledTimeline>
                            <React.Fragment>
                                <Timeline style={{minWidth: "600px"}} align="alternate">
                                    {this.eventDots()}
                                </Timeline>
                                {user[0].id === currentUser.id ? 
                                    <Item as={NavLink} to={`/events/new`} style={{textAlign: "center", paddingTop: "15%", paddingRight: "15%", paddingBottom: "2%"}}>
                                        <Item.Content style={{textAlign: "center", paddingLeft: ".5%"}}>
                                            <Icon size="big" color='grey' name='calendar plus outline' link={true} /> 
                                        </Item.Content>
                                    </Item>
                                    : null }
                            </React.Fragment>
                        </StyledTimeline>
                    )}
                </Transition.Group>

                <Transition.Group animation="slide up" duration="1000">
                    {!this.state.visible && (
                    <WishlistContainer>   
                            <Wishlist user={user[0]}/>
                    </WishlistContainer> 
                    )}
                </Transition.Group>
            </ExtraStuffContainer>  
    </WholeProfile>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.currentUser,
        followedUsers: state.followedUsers,
        allEvents: state.allEvents
    }
}

const mdp = (dispatch) => {
    return {
        newFollow: (followObj) => dispatch(newFollow(followObj)),
        deleteFollow: (followerId, followeeId) => dispatch(deleteFollow(followerId, followeeId)),
        getEvents: () => dispatch(getEvents()),
        deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
        editProfile: (userId, userObj) => dispatch(editProfile(userId, userObj)),
        editPicture: (userId, userObj) => dispatch(editPicture(userId, userObj))
    }
}

export default connect(msp, mdp)(UserProfile)

const Container = styled.div`
    text-align: center;
    padding-top: 12%;
    justify-content: center;
    min-width: 280px;
`;

const WishlistContainer = styled.div`
    text-align: center;
    padding: 0% 0%;
    padding-bottom: 5%;
    padding-top: 5%;
`;

const WholeProfile = styled.div`
    display: flex;
    margin-left: 14%;
    
`;

const StyledTimeline = styled.div`
    // display: block;
    padding-bottom: 5%
`;

const ExtraStuffContainer = styled.div`
    padding-top: 10%;
    margin-left: 15%;
`;

const ButtonContainer = styled.div`
    text-align: center;
`
