import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { newUser } from '../redux/actions'
import { Form, Button, Checkbox, Message } from 'semantic-ui-react'
import moment from 'moment'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


class SignUpForm extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        birthday: "",
        address: "",
        partner_name: "",
        partner_birthday: "",
        venmo_handle: "",
        flowers: false,
        profile_picture: null,
        src: null,
        crop: {
            unit: "%",
            width: 30,
            aspect: 1/1
        },
        croppedImageUrl: null,
        croppedImage: null
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheckboxChange = (e) => {
        this.setState((prevState) => ({flowers: !prevState.flowers}))
    }
    
    onUpload = (e) => {
        // this.setState({profile_picture: e.target.files[0]})
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({src: fileReader.result})
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

    onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('user[first_name]', this.state.first_name)
        formData.append('user[last_name]', this.state.last_name)
        formData.append('user[username]', this.state.username)
        formData.append('user[password]', this.state.password)
        formData.append('user[birthday]', new Date (this.state.birthday))
        formData.append('user[address]', this.state.address)
        formData.append('user[partner_name]', this.state.partner_name)
        formData.append('user[partner_birthday]', new Date(this.state.partner_birthday))
        formData.append('user[venmo_handle]', this.state.venmo_handle)
        formData.append('user[flowers]', this.state.flowers)
        formData.append('user[profile_picture]', this.state.croppedImage)

        if (this.state.birthday) {
            const birthday = {
                user_id: "",
                title: `${this.state.first_name}'s birthday!`,
                date: new Date (this.state.birthday),
                annual: true
            }
            this.props.newUser(formData, this.props.history, birthday)
        } else {
            this.props.newUser(formData, this.props.history)
        }
  
    }

    render() {
        const { src, crop, croppedImageUrl } = this.state
        return(
            <div style={{marginTop: "15%", textAlign: "center"}}>

            <Form onSubmit={this.onSubmit} success>
                <Form.Group widths='equal' style={{margin: "1% 10% 0% 10%"}}>
                    <Form.Field required>
                        <Form.Input 
                            label='First Name' 
                            // placeholder='Will be looking for jobs after graduation!' 
                            name="first_name" 
                            value={this.state.first_name} 
                            onChange={this.onChange}
                            required/>
                    </Form.Field>
                    
                    <Form.Field required>
                        <Form.Input 
                            label='Last Name' 
                            // placeholder='Will be looking for jobs after graduation!' 
                            name="last_name" 
                            value={this.state.last_name} 
                            onChange={this.onChange}
                            required/>
                    </Form.Field>
                    <Form.Field >
                        <Form.Input 
                            label='Birthday' 
                            placeholder={moment(new Date()).format('MMMM DD, YYYY')} 
                            name="birthday" 
                            value={this.state.birthday} 
                            onChange={this.onChange}/>
                    </Form.Field>
                    <Form.Field >
                        <Form.Input 
                            label='Address' 
                            placeholder='if you like gifts by mail!' 
                            name="address" 
                            value={this.state.address} 
                            onChange={this.onChange}/>
                    </Form.Field>
                </Form.Group>

            <Form.Group inline widths="equal" style={{margin: "3% 12% 0% 12%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Venmo Handle' 
                        placeholder={`@${this.state.first_name}-${this.state.last_name}`} 
                        name="venmo_handle"
                        value={this.state.venmo_handle} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field >
                     <Checkbox 
                        label='Like receiving flowers?' 
                        name="flowers" 
                        value={this.state.flowers} 
                        onChange={this.onCheckboxChange}/>
                </Form.Field>
                
            </Form.Group>

            <Form.Group widths="equal" style={{margin: "3% 10% 0% 10%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Username' 
                        placeholder={this.state.first_name !== "" ? `${this.state.first_name.toLowerCase()}${this.state.last_name.toLowerCase()} perhaps?` : ""} 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.onChange}
                        required/>
                </Form.Field>
                <Form.Field >
                     <Form.Input
                        type="password" 
                        label='Password' 
                        placeholder='something nice and secure' 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.onChange}
                        required/>
                </Form.Field>
            </Form.Group>

            <Form.Group widths="equal" style={{margin: "3% 20% 3% 20%"}}>
                <Form.Field >
                     <Form.Input 
                        label='Partner Name' 
                        placeholder='plants & pets count too...' 
                        name="partner_name" 
                        value={this.state.partner_name} 
                        onChange={this.onChange}/>
                </Form.Field>
                <Form.Field >
                     <Form.Input 
                        label='Partner Birthday' 
                        placeholder={moment(new Date()).format('MMMM DD, YYYY')}
                        name="partner_birthday" 
                        value={this.state.partner_birthday} 
                        onChange={this.onChange}/>
                </Form.Field>
            </Form.Group>

            <Form.Field style={{margin: "3% 38% 3% 38%"}}>
                     <Form.Input 
                        required
                        label='Upload a profile picture' 
                        type="file"
                        accept="image/*"
                        multiple={false}
                        // placeholder='$ gifts are the best gifts' 
                        name="profile_picture" 
                        onChange={this.onUpload}
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
                {/* <Message success header="Success!" content="Head back to the login page to sign in"/> */}
                <Button type='submit'>Sign Up</Button>
            </Form>
            </div>
        )
    }
}

const mdp = (dispatch) => {
    return {
        newUser: (newUserObj, history, newEvent) => dispatch(newUser(newUserObj, history, newEvent))
        // addEvent: (eventObj) => dispatch()
    }
}

export default connect(null, mdp)(withRouter(SignUpForm))