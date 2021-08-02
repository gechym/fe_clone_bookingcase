import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions"; // '../store/actions'
import './Login.scss';
import  userService  from '../../services/userService';

import { Spinner } from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword : false,
            errMessage : '',
            isLoading : false
        }
    }

    handleLogin = async (email,password) => {
        this.setState({errMessage : '',isLoading:true})
        try {
            let data = await userService.handleLoginApi(email,password);
            console.log(data)
            var {errCode, errMessage, user} = data
            if(errCode !== 0 && data){
                this.setState({isLoading:false})
                this.setState({errMessage})
            }
            if(errCode === 0 && data){

                setTimeout(() => {
                    this.setState({isLoading:false})
                    this.props.userLoginSuccess(user)
                    console.log(user)
                },3000)
            }
            // console.log(data.data)
            // let {errCode, errMessage, user} = data.data
            // if(errCode !== 0){
            //     this.setState({errMessage})
            // }else{
            //     console.log(user)
            // }
        } catch (err) {
            if(err.response){
                if(err.response.data){
                    this.setState({isLoading:false})
                    this.setState({errMessage:err.response.data.message})
                }
            }
            // console.log(err.response)
            // console.log("test ", err)
            // // this.setState({errMessage:"lỗi"})
            // console.log(err)
        }
    }

    render() {
        const {username, password, isShowPassword} = this.state
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group form-input-name">
                             <label className="text-label">Username</label>
                             <input 
                                type="text" 
                                placeholder="Enter your username" 
                                className="input form-control" 
                                value={this.state.username}
                                onChange={e => this.setState({username:e.target.value,errMessage:''})}
                                name="email"
                            />
                        </div>
                        <div className="col-12 form-group form-input-password">
                             <label className="text-label">Password</label>
                             <div className="custom-input-password">
                                <input  
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password" 
                                    className="input form-control"
                                    value={this.state.password}
                                    onChange={e => this.setState({password:e.target.value,errMessage:''})}
                                    name="password"
                                />
                              
                                {
                                    isShowPassword ?  
                                        <i onClick={e => this.setState({isShowPassword: !isShowPassword})} className="fas fa-eye eye"></i> 
                                        : 
                                        <i onClick={e => this.setState({isShowPassword: !isShowPassword})} className="fas fa-eye-slash eye"></i>
                                }
                             </div>
                        </div>
                        <div className="col-12" style={{height:"40px",textAlign:"center",color:"red"}}>
                            
                            {
                                this.state.errMessage 
                                    ? 
                                    this.state.errMessage 
                                    :
                                        this.state.isLoading 
                                            ? 
                                            <Spinner type="grow" color="info" />
                                            :
                                            ''
                                      
                            }
                            
                        </div>
                        <div className="col-12">
                            <input 
                                className="input-login"  
                                type="button" 
                                value="Login" 
                                onClick={e => {
                                    this.handleLogin(username,password);
                                }}
                            />
                        </div>
                        <div className="col-12" className="or-sign">
                            <label className="label-login-or">Or sign in with:</label>
                            <div className="icons">
                                <i className="fab fa-facebook-f icon fb"></i>
                                <i className="fab fa-twitter tw"></i>
                                <i className="fab fa-google-plus-g icon gg"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess : (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
