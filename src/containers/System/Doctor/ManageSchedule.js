import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from "react-toastify";
import moment from 'moment';
import {dateFormat} from '../../../utils/constant'
import userService from '../../../services/userService';




import './ManageSchedule.scss'
import _ from 'lodash';



class Doctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedDoctor : {},
            listDoctor : [],
            rangeTime : [],
            currentDate : ''
        }
    }
    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        
    };

    handleOnchangeDataPicker = (date) => {
        this.setState({
            currentDate : date[0]
        }, ()=> {
            console.log("check Date",this.state.currentDate)
        })
    }

    componentDidMount(){
        this.props.fetchAllDoctop()
        this.props.fetchAllTime()
    }

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map((item) => {
                if(item.id === time.id){
                    item.isSelected = !item.isSelected
                }
                return item
            })

            this.setState({
                rangeTime : rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let {rangeTime , selectedDoctor, currentDate} = this.state
        let result = []
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid select doctor!")
            return 
        }
        if(!currentDate){
            toast.error("Invalid date!")
            return
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix() // thay đổi định dạng ngày 

        let formatedDate = new Date(currentDate).getTime();

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter((item) => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0) {
                // let object = {}
                // object.doctorId = selectedDoctor.value
                // object.date = formatedDate
                // console.log(object)
                // object.time = 
                selectedTime.map((time) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = `${formatedDate}`
                    object.timeType = time.keyMap
                    
                    result.push(object)
                })
                

            }else{
                toast.error("Invalid select time schedule!")
                return 
            }
        }

        let res = await userService.saveBulkScheduleDoctor(
            {
                arrSchedule : result,
                doctorId : selectedDoctor.value,
                date : formatedDate
            }
        )
        if(res && res.errCode === 0) {
            toast.success("Tạo Lịch Khám Thành công")
        }else{
            toast.error("Server không phản hồi")
        }

    }

    builDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
               let object = {};
               let valueVi = `${item.lastName} ${item.firstName}`
               let valueEn = `${item.firstName} ${item.lastName}`
               object.label = language === 'vi' ? valueVi : valueEn
               object.value = item.id
               result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor : dataSelect
            })
        }
        if(prevProps.language !== this.props.language){// cập nhận select khi ngôn ngữ thay đổi
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor : dataSelect
            })
        }
        if(prevProps.allTime !== this.props.allTime){// cập nhận select khi ngôn ngữ thay đổi
            console.log('Check pops',this.props.allTime)
            let data = this.props.allTime

            if(data && data.length > 0) {
                data = data.map((item) => {
                    return {...item,isSelected : false}
                })
            }
            console.log("check alltime", data)
            this.setState({
                rangeTime : data
            })
        }
    }

    render() {
        let {rangeTime} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-schedule.choose"/></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                    // isMulti
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                                <DatePicker 
                                    onChange = {this.handleOnchangeDataPicker}
                                    value = {this.state.currentDate}
                                    className="form-control"
                                    minDate = {yesterday}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {
                                    rangeTime && rangeTime.length > 0 
                                    ? 
                                    rangeTime.map((item, index) => (
                                        language === 'vi' ? 
                                            <button 
                                                className={item.isSelected ?"btn btn-schedule active" : "btn btn-schedule" }
                                                onClick = {()=>this.handleClickBtnTime(item)}    
                                            >
                                                {item.valueVi}
                                            </button> 
                                                : 
                                            <button 
                                            className={item.isSelected ?"btn btn-schedule active" : "btn btn-schedule" }
                                                onClick = {()=>this.handleClickBtnTime(item)}            
                                            >
                                                {item.valueEn}
                                            </button> 
                                        )
                                    ) 
                                    : 
                                    'Lỗi'
                                }
                            </div>
                            <button 
                                className="btn btn-primary mt-3"
                                onClick= {(e) => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save"/>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors : state.admin.allDoctors,
        language: state.app.language,
        allTime : state.admin.allTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctop : () => dispatch(actions.fetchAllDoctop()),
        fetchAllTime : () => dispatch(actions.fetchAllTime())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
