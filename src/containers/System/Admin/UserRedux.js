import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils'
import userService from '../../../services/userService';// 
import { Spinner } from 'reactstrap';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { before } from 'lodash';

import { ToastContainer, toast } from 'react-toastify';



class UserRedux extends Component {

    constructor(props){
        super(props)
        this.state = {
            genderArr : [],
            positionArr: [],
            roleArr:[],
            previewImageURL:'',
            isOpen: false,

            userId : '',
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            phonenumber : '',
            address: '',
            gender : '',
            role : '',
            position : '',
            avatar : '',

            action:'',
        }

    }


    async componentDidMount() {


        // Gọi API vs redux bằng các updateComponent cách 2
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()


        // //Gọi API vs Redux cách gọi 1
        // await this.props.getGenderStart()
        // await this.props.getPositionStart()
        // await this.props.getRoleStart()
        // // this.props.dispatch(actions.fetchGenderStart()) // gọi hàm kiểu khán
        // this.setState({
        //     genderArr : this.props.genderArrRedux,
        //     positionArr : this.props.positionArrRedux,
        //     roleArr : this.props.roleArrRedux,
        // })
        

        ////Gọi API vs react thông thường
        // try {
        //     let res = await userService.getAllCodeService('gender');
        //     if(res && res.errCode === 0) {
        //     let copyState = this.state
        //     copyState.genderArr = res.data
        //         this.setState({
        //             ...copyState
        //         })
        //     }
        // } catch (error) {
        //     console.log(error)            
        // }
    }


    // Gọi API vs Redux cách gọi 2
    componentDidUpdate(prveProps,prevState,snapshot){
        if(prveProps.genderArrRedux !== this.props.genderArrRedux){
                let arrGenderRedux = this.props.genderArrRedux
            this.setState({
                genderArr : arrGenderRedux,
                gender : arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : ''
            })
        }
        if(prveProps.positionArrRedux !== this.props.positionArrRedux){
                let arrPositionRedux = this.props.positionArrRedux
            this.setState({
                positionArr : arrPositionRedux,
                position : arrPositionRedux && arrPositionRedux.length > 0 ? arrPositionRedux[0].keyMap : ''
            })
        }
        if(prveProps.roleArrRedux !== this.props.roleArrRedux){
                let arrRoleRedux =  this.props.roleArrRedux
            this.setState({
                roleArr : arrRoleRedux,
                role : arrRoleRedux && arrRoleRedux.length > 0 ? arrRoleRedux[0].keyMap : ''
            })
        }

        if(prveProps.listUsers !== this.props.listUsers){
            let arrGenderRedux = this.props.genderArrRedux
            let arrPositionRedux = this.props.positionArrRedux
            let arrRoleRedux =  this.props.roleArrRedux
            this.setState({
                email : '',
                password : '',
                firstName : '',
                lastName : '',
                phonenumber : '',
                address: '',
                gender : arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : '',
                role : arrPositionRedux && arrPositionRedux.length > 0 ? arrPositionRedux[0].keyMap : '',
                position : arrRoleRedux && arrRoleRedux.length > 0 ? arrRoleRedux[0].keyMap : '',
                avatar : '',
                previewImageURL:'',
                action : CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file) // đưa lên db kiểu base64 và khí sv trả về thì buffer
            const objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageURL : objectUrl,
                avatar : base64
            })
        }

    }

    onChangeInput = (e , id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleSaveUser =  () => {
        let {action} = this.state
        if(action === CRUD_ACTIONS.CREATE){
            let check = this.checkValidateInput()
            if(check){
                console.log('check data input' ,this.state)
    
                 this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId : this.state.position,
                    phonenumber: this.state.phonenumber,
                    avatar:this.state.avatar
                })
                //  this.props.fetchUserRedux() 
            }
        }
        if(action === CRUD_ACTIONS.EDIT){
            let check = this.checkValidateInput()
            if(check){
                this.props.editAUser({
                    id : this.state.userId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId : this.state.position,
                    phonenumber: this.state.phonenumber,
                    avatar : this.state.avatar
                })
            }
        }

    }
        //// xử lý bất đồng bộ bằng asycn await cách 1 
    // handleSaveUser = async () => {
    //     let check = this.checkValidateInput()
    //     if(check){
    //         console.log('check data input' ,this.state)

    //         await this.props.createNewUser({
    //             email: this.state.email,
    //             password: this.state.password,
    //             firstName: this.state.firstName,
    //             lastName: this.state.lastName,
    //             address: this.state.address,
    //             gender: this.state.gender,
    //             roleId: this.state.role,
    //             positionId : this.state.position,
    //             phonenumber: this.state.phonenumber
    //         })
    //         await this.props.fetchUserRedux()
    //     }

    // }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if(user.image){
            // const imageBuffer = Buffer.from(JSON.stringify(user.image)) 
            // imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`
            imageBase64 = new Buffer(user.image, 'base64').toString('binary'); // giải mã từ Buffer -> về ảnh ra view
        }
        this.setState({
            email : user.email,
            password : 'HARDCODE',
            firstName : user.firstName,
            lastName : user.lastName,
            phonenumber : user.phonenumber,
            address: user.address,
            gender : user.gender,
            role :user.roleId,
            position :user.positionId,
            avatar : '',
            previewImageURL :imageBase64,
            action : CRUD_ACTIONS.EDIT,
            userId : user.id
        },()=>{
            console.log(this.state)
        })
    }


    checkValidateInput = () => {
        let isValidate = true
        let arrInput = ["email","password","firstName","lastName","phonenumber","address"]

        for (let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValidate = false
                alert(`Không được để trống ${arrInput[i]}`)
                break
            }
        }

        return isValidate
            
    }

    removeImage = () => {
        this.setState({
            previewImageURL:'',
            isOpen: false,
            avatar : ''
        })
    }




    render() {
        const { genderArr, positionArr, roleArr, isOpen ,
                email,
                password,
                firstName,
                lastName,
                phonenumber,
                address,
                gender,
                role,
                position,
                avatar,
        } = this.state
        const {language, isLoading} = this.props
        return (
            <div className="user-redux-container">
                <div className="user-redux-content">
                    <div className="title" >Manage User Redux</div>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12"><FormattedMessage id="manage-user.add"/></div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.email"/></label>
                                    <input
                                        onChange={(e) => {this.onChangeInput(e,'email')}}
                                        value={email} 
                                        className="form-control" 
                                        type="email" 
                                        disabled ={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.password"/></label>
                                    <input
                                        onChange={(e) => {this.onChangeInput(e,'password')}}
                                        value={password} 
                                        className="form-control" 
                                        type="password" 
                                        disabled ={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.first-name"/></label>
                                    <input
                                        onChange={(e) => {this.onChangeInput(e,'firstName')}}
                                        value={firstName} 
                                        className="form-control" 
                                        type="text" 
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.last-name"/></label>
                                    <input
                                        onChange={(e) => {this.onChangeInput(e,'lastName')}}
                                        value={lastName} 
                                        className="form-control" 
                                        type="text" 
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.phonenumber"/></label>
                                    <input
                                        onChange={(e) => {this.onChangeInput(e,'phonenumber')}}
                                        value={phonenumber} 
                                        className="form-control" 
                                        type="text" 
                                    />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.address"/></label>
                                    <textarea 
                                        onChange={(e) => {this.onChangeInput(e,'address')}}
                                        value={address} 
                                        class="form-control" 
                                        rows="4"
                                    ></textarea>
                                </div>
                                <div className="col-12"></div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.gender"/></label>
                                    <select 
                                        className="form-control"
                                        onChange={(e) => {this.onChangeInput(e,'gender')}}
                                        value={gender}
                                    >
                                        {
                                            genderArr && genderArr.length > 0
                                            ? genderArr.map((item, index) =><option value={item.keyMap} key={index}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>) : ''
                                        }
                                                                               
                                    </select>
                                </div>

                                
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.position"/></label>
                                    <select 
                                        name="" 
                                        className="form-control"
                                        value={position}
                                        onChange={(e) => {this.onChangeInput(e,'position')}}
                                    >
                                    {
                                            positionArr && positionArr.length > 0
                                            ? positionArr.map((item, index) =><option value={item.keyMap} key={index}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>) : ''
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.roleID"/></label>
                                    <select 
                                        name="" 
                                        className="form-control"
                                        onChange={(e) => {this.onChangeInput(e,'role')}}
                                        value={role}
                                    >
                                        {
                                            roleArr && roleArr.length > 0
                                            ? roleArr.map((item, index) =><option value={item.keyMap} key={index}>{language === LANGUAGES.VI ?item.valueVi : item.valueEn}</option>) : ''
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label htmlFor="" className="mt-2"><FormattedMessage id="manage-user.image"/></label>
                                    <div className="preview-image-container">
                                        <input
                                            hidden 
                                            id="previewImage" 
                                            className="form-control" 
                                            type="file" 
                                            onChange={(e) => this.handleOnchangeImage(e)}
                                        />
                                        <div 
                                            className="preview-image"
                                            style={{backgroundImage:`url(${this.state.previewImageURL})`}}
                                            onClick={e => {
                                                if(this.state.previewImageURL){
                                                    this.setState({
                                                        isOpen : true
                                                    })
                                                }
                                            }}
                                        >
                                        </div>
                                        <div>
                                            <label className="label-upload" htmlFor="previewImage">
                                            <FormattedMessage id="manage-user.upload"/> <i className="fas fa-upload"></i>
                                            </label>
                                            &#160;
                                            <label 
                                                className="label-upload" 
                                                onClick={(e) => this.removeImage()}
                                            >
                                                <FormattedMessage id="manage-user.remove"/>
                                            </label>
                                        </div>
                                        
                                    </div>
                                        
                                </div>
                                <div className="col-12">
                                    <button 
                                        disabled={isLoading ? true : false}
                                        className={this.state.action === CRUD_ACTIONS.EDIT ? 'mt-4 btn btn-warning' : 'mt-4 btn btn-primary'}
                                        onClick= { () => {
                                            this.handleSaveUser()
                                        }}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit"/> : <FormattedMessage id="manage-user.save"/>}
                                    </button>
                                    {
                                        isLoading ?<Spinner size="sm" color="primary" /> : ''
                                    }
                                </div>
                                <div className="col-12">
                                    <TableManageUser
                                        handleEditUserFromParentKey = {this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {isOpen && (
                        <Lightbox
                            mainSrc={this.state.previewImageURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderArrRedux:state.admin.gender,
        positionArrRedux:state.admin.position,
        roleArrRedux:state.admin.roleId,
        isLoading : state.admin.isLoading,
        listUsers : state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux : (language) => dispatch(changeLanguageApp(language)),
        // testAppRedux : () => dispatch(test()),

        getGenderStart : () => dispatch(actions.fetchGenderStart()),

        getPositionStart : () => dispatch(actions.fetchPositionStart()),

        getRoleStart : () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux : () => dispatch(actions.fetchAllUsersStart()),

        editAUser : (data) => dispatch(actions.editAUser(data)),

        loadTopDoctor : () => dispatch(actions.fetchTopDoctop())// chưa xài
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
