import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            email : '',
            password:'',
            firstName :'',
            lastName:'',
            address:''
        }
        this.listenToEmiiter();
    }
        // cách thổ dân làm 
    // listenToEmiiter(){ // xử lý sự kiện xóa các input khi thằng cha đc update lại từ hàm create
    //     emitter.on('EVENT_CLEAR_MODAL_DATA',data => {
    //         data.fun(()=>{
    //             this.setState({
    //                 email : '',
    //                 password:'',
    //                 firstName :'',
    //                 lastName:'',
    //                 address:''
    //             })
    //         })
    //     })
    // }

    listenToEmiiter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',() => {
            this.setState({
                email : '',
                password:'',
                firstName :'',
                lastName:'',
                address:''
            })
        })
    }

    componentDidMount() {
    }

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

        //bad code

        // this.setState(state => {
        //     state[id] = e.target.value
        //     return {
        //         [id] : state[id]
        //     }
        // })
        // console.log(this.state)
    }

    // check validate 
    checkValidateInput = () => {
        let arrInput = ['email','password','firstName','lastName','address']
        let check = true
        for(let i = 0 ; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                check = false
                alert('Không được để trống trường '+arrInput[i])
                return check
            }
        }
        return check
    }

    hanhdleNewUser = async () => {
        let check =  this.checkValidateInput()
        if(check){
            await this.props.createNewUser(this.state)// truyền data về cho thằng cha để nó xử lý rồi render ra view
        }
    }

    



    render() {
        const {isOpen,createNewUser} = this.props
        return (
            <div className="text-center" >
                <Modal  
                    isOpen={isOpen} 
                    toggle={() => this.toggle()} 
                    className={'modal-user-container'}
                    size = 'md'
                >
                        <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                        <ModalBody>
                            <div className="modal-user-body">
                                <div className="input-container">
                                    <label>Email</label>
                                    <input 
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'email')}} 
                                        type="email"
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="input-container">
                                    <label>password</label>
                                    <input 
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'password')}} 
                                        type="password"
                                        value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="modal-user-body">
                                <div className="input-container">
                                    <label>First name</label>
                                    <input 
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'firstName')}} 
                                        type="text"
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="input-container">
                                    <label>Last name</label>
                                    <input 
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'lastName')}} 
                                        type="text"
                                        value={this.state.lastName}
                                    />
                                </div>
                            </div>
                            <div className="modal-user-body">
                                <div className="input-container max-w">
                                    <label>address</label>
                                    <input 
                                        onChange={(e)=>{this.hanhdleOnchangeInput(e,'address')}} 
                                        type="text"
                                        value={this.state.address}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
