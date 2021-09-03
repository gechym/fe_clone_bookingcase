import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import userService from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import { Spinner } from 'reactstrap';
import './VerifyEmail.scss'


class VerifyEmail extends Component {
    constructor(props){
        super(props)
        this.state = {
            statusVerify : false,
            isload : true
        }
    }
    async componentDidMount(){
        if(this.props.location && this.props.location.search){
            // lấy query string từ url
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId')

            console.log(token, doctorId)

            let response = await userService.postVerifyBookAppointment({
                token : token,
                doctorId : doctorId
            })

            if(response && response.errCode === 0){
                this.setState({
                    statusVerify : true,
                    isload : false
                })
            }else{
                this.setState({
                    statusVerify : false,
                    isload : false
                })
            }

        }
        

    }

    componentDidUpdate(){

    }

    render() {
        return (
            <div className="message-container">
                <HomeHeader isShow={false}/>
                {   this.state.isload === true ? 
                    <Spinner style={{ width: '2rem', height: '2rem' }} color="warning" /> 
                        :
                    <>
                        {
                            this.state.statusVerify 
                                ? 
                                <div className="message-success">
                                    <h2>Lịch hẹn của bạn đã được xác nhận</h2>
                                    <h3>cảm ơn bạn đã sử dụng dịch vụ tại <b>BookingCase</b></h3>
                                </div> 
                                :
                                <div className="message-faild">
                                    <h2>Xác thực lỗi !!</h2>
                                    <h3>Bạn vui lòng kiểm tra lại Gmail, <br/> Nếu cần sự hổ trợ vui lòng inbox để nhân viên bên chúng tôi hỗ trợ quý khách, xin cảm ơn.</h3>
                                </div>
                        }
                    </>
                }


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
