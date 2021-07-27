import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

import { Spinner } from 'reactstrap';




// service
import userService from '../../services/userService.js'

class UserManage extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrUsers : [],
            isOpenModalUser: false,
            isOpenModalEditUser : false,
            userEdit : {},
            isLoading : true
        }

        this.listenToEmiiter1()
    }

    listenToEmiiter1(){
        emitter.on('EVENT_CLEAR_MODAL_DATA1',() => {
            alert('test')
        })
    }



    toggleUserModal = () => {
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = (user = null) => {
        if(user){
            this.setState({
                isOpenModalEditUser : !this.state.isOpenModalEditUser,
                userEdit:user
            })
        }else{
            this.setState({
                isOpenModalEditUser : !this.state.isOpenModalEditUser
            })
        }
    }

   // xử lý về api 
    async componentDidMount() {
        setTimeout( async () =>{
            await this.loadingNewUser();
            this.setState({isLoading : !this.state.isLoading})
        },3000)

    }

    loadingNewUser = async () => { // Sử lý api Khi component được render 
            try {
                let response = await userService.getAllUser('ALL')
                const {errCode, errMessage, users} = response
                if(response || errCode === 0){
                    this.setState({
                        arrUsers : users
                    })  
                }
            } catch (error) {
                console.log(error)
            }
            
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data)
            if(response.errCode !== 0){
                alert(response.messageCode)
            }else{
                this.setState({
                    isOpenModalUser: false
                })
                await this.loadingNewUser()
                // emitter.emit("EVENT_CLEAR_MODAL_DATA",{fun : (fun) => {fun()}}) // cách tự chế :)
                emitter.emit("EVENT_CLEAR_MODAL_DATA") 
            }
        } catch (error) {
            alert('Mất kết nối với server')
            this.setState({
                isOpenModalUser: false
            })
            console.log(error)            
        }
    }

    deleteUser = async (id) => {
        try {
            let response = await userService.deleteUserService(id)
            this.loadingNewUser()
        } catch (error) {
            console.log(error)            
        }
    }

    handleEditUser = async (data) => {
        try {
            let res = await userService.editUserService(data)
            this.loadingNewUser()
            this.setState({
                isOpenModalEditUser : false
            })
            console.log(res)
        } catch (error) {
            this.setState({
                isOpenModalEditUser : false
            })
            alert('Server API error')
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggerFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenEdit = {this.state.isOpenModalEditUser}
                        toggerFromParent = {this.toggleUserEditModal}
                        userEdit = {this.state.userEdit}
                        handleEditUser = {this.handleEditUser}
                    />
                }
                {/* <ModalEditUser
                    isOpenEdit = {this.state.isOpenModalEditUser}
                    toggerFromParent = {this.toggleUserEditModal}
                    userEdit = {this.state.userEdit}
                /> */}
                <div className="title text-center">Manage user with VS code</div>
                <div className="users-table container mt-4">
                <button 
                    style={{width:"100px",margin:"5px 5px"}} 
                    className="btn btn-primary"
                    onClick={(e)=>this.toggleUserModal()}
                >
                    <i className="far fa-plus-square"></i> 
                    Add user
                </button>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th> 
                                <th>Fist name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>action</th>
                            </tr>
                            {   
                                this.state.isLoading 
                                ? 
                                <div style={{textAlign:"center"}}>
                                    <Spinner color="primary" />
                                </div>
                                :
                                arrUsers.map((user, index) => {
                                    return(
                                        <tr key={index }>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button 
                                                    style={{width:"50px",margin:"0px 5px"}} 
                                                    type="button" className="btn btn-primary"
                                                    onClick={e=> this.toggleUserEditModal(user)}
                                                > 
                                                    <i className="far fa-edit"></i>
                                                </button>
                                                <button 
                                                    style={{width:"50px"}} 
                                                    type="button" 
                                                    className="btn btn-success"
                                                    onClick={e => this.deleteUser(user.id)}
                                                >
                                                    <i className="far fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
