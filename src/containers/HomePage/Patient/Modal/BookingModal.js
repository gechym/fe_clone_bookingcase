import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Button, Modal} from 'reactstrap';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import moment, { months } from 'moment';
import userService from '../../../../services/userService';
import _ from 'lodash';
import * as actions from '../../../../store/actions'
import { toast } from "react-toastify";
import { Spinner } from 'reactstrap';




class BookingModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            genderArr : [],

            fullName : '',
            phoneNumber :'',
            email: '',
            address: '',
            reason: '',
            birthday : '',
            gender : '',
            doctorId: '',
            timeType: '',
            date: '',
            timeText: '',
            doctorName : '',
            isLoanding : false,
            errMessage : ''
        }
    }

    buildDoctorName = (dataTime) => {
        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === 'vi' ? 
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} ` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name    
        }

        return ''
    }

    async componentDidMount(){
        this.props.getGenderStart()

        let doctorId = this.props.dataTime.doctorId
        let timeType = this.props.dataTime.timeType
        let date = this.props.dataTime.date
        this.setState({
            doctorId : doctorId,
            timeType : timeType,
            date : date,
        })
        
    }

    componentDidUpdate(prveProps,prevState){
        if(prveProps.genderArrRedux !== this.props.genderArrRedux){
            let arrGenderRedux = this.props.genderArrRedux
            this.setState({
                genderArr : arrGenderRedux,
                gender : arrGenderRedux && arrGenderRedux.length > 0 ? arrGenderRedux[0].keyMap : ''
            })
        }

        if(prveProps.dataTime !== this.props.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                let date = this.props.dataTime.date
                this.setState({
                    doctorId : doctorId,
                    timeType : timeType,
                    date : date,
                    timeText :  this.props.language === 'vi' ?
                                this.props.dataTime.timeTypeData.valueVi :
                                this.props.dataTime.timeTypeData.valueEn
                })
            }
        }
    }

    toggle = () => {
       this.props.toggerFromParent();
    }

    handleOnChangeInput = (e,id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleOnchangeDataPicker = (date) => {
        this.setState({
            birthday : new Date(date[0]).getTime()
            // birthday : moment(date[0]).add(0, 'days').format('DD/MM/YYYY')

        })
    }

    checkValidateInput = () => {
        let isValidate = true
        let arrInput = ["fullname","phoneNumber","email","address","reason","birthday","gender","doctorId"]

        for (let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValidate = false
                this.setState({
                    errMessage:`Không được để trống ${arrInput[i]}`
                })
                break
            }
        }
        return isValidate
    }


    handleConfirmBooking = async () => {
        let check = this.checkValidateInput()
        let doctorName = this.buildDoctorName(this.props.dataTime)

        if(check){
            let data = {
                fullName : this.state.fullname,//
                phoneNumber : this.state.phoneNumber,
                email: this.state.email,//
                address: this.state.address,
                reason: this.state.reason,
                birthday : this.state.birthday,
                gender : this.state.gender,
                doctorId: this.state.doctorId,//
                timeType : this.state.timeType,
                date : this.state.date,
                doctorName : doctorName,//
                timeText : this.state.timeText,//
                language : this.props.language//
            }
            this.setState({
                isLoanding : true
            }) 
            let res = await userService.postPatientBookAppointment(data)
            if(res && res.errCode === 0){
                this.setState({
                    isLoanding : false
                })            
                this.props.toggerFromParent();
                toast.success("Hệ thống ghi nhận lịch hẹn vui lòng kiểm tra email")

            } else if(res.errCode === -2){
                toast.info("Hệ thống ghi nhận lịch hẹn này đã tồn tại, mời bạn chọn khung giờ")
                this.setState({
                    isLoanding : false
                })  
                this.props.toggerFromParent();

            }else{
                this.setState({
                    isLoanding : false
                })  
                this.props.toggerFromParent();
                toast.error("Tạo lịch hẹn thất bại, vui lòng kiểm tra lại hoặc inbox nhân viên hổ trợ !!")
            }
        }
    }

    render() {
        let {dataTime, language} = this.props
        let doctorId = ''
        if(dataTime && !_.isEmpty(dataTime)){
            doctorId = dataTime.doctorId
        }

        let { genderArr, gender, isLoanding, errMessage } = this.state



        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen} 
                    size = "lg"
                    centered
                    backdrop={true}
                    className={'booking-modal-container'}
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-heard">
                            <span className="left"><FormattedMessage id="patient.booking-modal.title"/></span>
                            <span 
                                className="right"
                                onClick ={()=>this.toggle()}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body container">
                            <div className="doctor-infor">
                                <ProfileDoctor 
                                    doctorId = {doctorId}
                                    showDescriptionDoctorId = {false}
                                    dataTime = {this.props.dataTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.fullName"/></label>
                                    <input 
                                        className="form-control"
                                        onChange={(e)=>{this.handleOnChangeInput(e, 'fullname')}} 
                                        type="text" 
                                        value={this.state.fullname}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phone"/></label>
                                    <input 
                                        className="form-control"
                                        onChange={(e)=>{this.handleOnChangeInput(e, 'phoneNumber')}} 
                                        type="text" 
                                        value={this.state.phoneNumber}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.email"/></label>
                                    <input 
                                        className="form-control"
                                        onChange={(e)=>{this.handleOnChangeInput(e, 'email')}} 
                                        type="text" 
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.address"/></label>
                                    <input 
                                        className="form-control"
                                        onChange={(e)=>{this.handleOnChangeInput(e, 'address')}} 
                                        type="text" 
                                        value={this.state.address}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason"/></label>
                                    <input 
                                        className="form-control"
                                        onChange={(e)=>{this.handleOnChangeInput(e, 'reason')}} 
                                        type="text" 
                                        value={this.state.reason}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                    <DatePicker 
                                        onChange = {this.handleOnchangeDataPicker}
                                        value = {this.state.birthday}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender"/></label>
                                    <select 
                                        className="form-control"
                                        onChange={(e) => {this.handleOnChangeInput(e,'gender')}}
                                        value={gender}
                                    >
                                        {
                                            genderArr && genderArr.length > 0
                                            ? genderArr.map((item, index) =><option value={item.keyMap} key={index}>{language === "vi" ?item.valueVi : item.valueEn}</option>) : ''
                                        }
                                                                               
                                    </select>
                                </div>
                                <div className="col-12 form-group">
                                    <label>{errMessage ? errMessage : '' }</label>
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn btn-booking-confirm" onClick={()=>this.handleConfirmBooking()}>
                                {isLoanding && isLoanding ?<Spinner animation="border" variant="primary" /> : <FormattedMessage id="patient.booking-modal.confirm"/>}
                            </button>
                            <button className="btn btn-booking-cancel" onClick={this.toggle}><FormattedMessage id="patient.booking-modal.cancel"/></button>
                        </div>
                    </div>
                    
                </Modal>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderArrRedux:state.admin.gender,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart : () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
