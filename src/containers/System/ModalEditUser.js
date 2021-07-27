import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalEditUser extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }


    componentDidMount() {
        let user = this.props.userEdit
        console.log(this.props.userEdit)
        if(user && user !== {}){
            this.setState({
                id:user.id,
                email : user.email,
                password : '**********',
                firstName : user.firstName,
                lastName : user.lastName,
                address : user.address
            })
        }
    }

    // componentDidUpdate(){
    //     console.log('updata prods')
    // }

    toggle = () => {
        this.props.toggerFromParent()
    }
    //GOOD CODE
    hanhdleOnchangeInput = async (e, id) => { // setstate khi người dùng nhập vào
        let copyState = {...this.state}
        copyState[id] = e.target.value
        await this.setState({
            ...copyState
        }, ()=> {
            // console.log('check' , this.state)
        })
        // console.log('check' , this.state)   
    }

    // check validate 
    checkValidateInput = () => {
        let arrInput = ['email','password','firstName','lastName','address']
        let check = true
        for(let i = 0 ; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                check = false
                console.log(this.state)
                alert('Không được để trống trường '+arrInput[i])
                return check
            }
        }
        return check
    }

    hanhdleNewUser = () => {
        let check =  this.checkValidateInput()
        
        if(check){
            let data = this.state
            delete data.password
            this.props.handleEditUser(data)
        }
    }


    render() {
        console.log('check props' ,this.props)
        console.log('check state', this.state)
        const {isOpenEdit} = this.props
        return (
            <div className="text-center" >
                <Modal  
                    isOpen={isOpenEdit} 
                    toggle={() => this.toggle()} 
                    className={'modal-user-container'}
                    size = 'md'
                >
                        <ModalHeader toggle={() => this.toggle()}>Edit user id#</ModalHeader>
                        <ModalBody>
                            <div className="modal-user-body">
                                <div className="input-container">
                                    <label>email {`(không sữa được)`}</label>
                                    <input
                                        value = {this.state.email}
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'email')}} 
                                        type="email"
                                        disabled
                                        
                                    />
                                </div>
                                <div className="input-container">
                                    <label>password {`(không sữa được)`}</label>
                                    <input
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'password')}} 
                                        type="password"
                                        value="**********"
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="modal-user-body">
                                <div className="input-container">
                                    <label>First name</label>
                                    <input
                                        value = {this.state.firstName}
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'firstName')}} 
                                        type="text"
                                    />
                                </div>
                                <div className="input-container">
                                    <label>Last name</label>
                                    <input
                                        value = {this.state.lastName}
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'lastName')}} 
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="modal-user-body">
                                <div className="input-container max-w">
                                    <label>address</label>
                                    <input
                                        value = {this.state.address}
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'address')}} 
                                        type="text"
                                    />
                                </div>
                            </div>
                            
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" className="px-3" onClick={() =>this.hanhdleNewUser() }>save</Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => this.toggle()}>close</Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
