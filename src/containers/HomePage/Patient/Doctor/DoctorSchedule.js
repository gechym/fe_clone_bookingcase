import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi'
import userService from '../../../../services/userService';
import { withRouter } from 'react-router';



import "./DoctorSchedule.scss"
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            allDays : [],
            allAvailabelTime : []
        }
    }

    async componentDidMount(){
        // console.log('Time vi', moment(new Date()).format('dddd - DD/MM - h:mm:ss '))
        // console.log('time en', moment(new Date()).locale('en').format('dddd - DD/MM - h:mm:ss '))
        
        // // tiến lên 1 ngày 
        // console.log("tiến 1 ngày" ,moment(new Date()).add(1, 'days').valueOf())
        // console.log("tiến 1 ngày" ,moment(new Date()).add(1, 'days').startOf('day').valueOf()) // chuyển qua timestane
        let allDays = this.getAllDays()
        if(this.props.match && this.props.match.params && this.props.match.params.id){
             let doctorId = this.props.match.params.id
             let res = await userService.getScheduleDoctorByDate(doctorId,allDays[0].value)
             this.setState({
                allDays : allDays,
                allAvailabelTime : res.data
            })
        } 
        this.setState({
            allDays : this.getAllDays()
        })


    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getAllDays = () => {
        let arrDate = []
            for(let i = 0 ; i < 7 ; i++) {
                let object = {}
                if(this.props.language === 'vi'){
                    if( i === 0) {

                        object.label ='Hôm nay - ' + moment(new Date()).add(i, 'days').format('DD/MM')
                        object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                        
                        // if(!object.label.includes("chủ nhật,")){// case trường hợp không chọn ngày chủ nhật
                        //     arrDate.push(object)
                        // }
                    }else{
                        object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
                        object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                    }
                    arrDate.push(object)
                }else{
                    if( i === 0) {
                        object.label ='Today - ' + moment(new Date()).locale('en').add(i, 'days').format('DD/MM')
                        object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                    }else{
                        object.label = this.capitalizeFirstLetter(moment(new Date()).locale('en').add(i, 'days').format('dddd - DD/MM'))
                        object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                    }
                    arrDate.push(object)
                    // if(!object.label.includes("Sunday,")){ case thường hợp không chọn ngày chủ nhật 
                    //     arrDate.push(object)
                    // }
                }
            }

            return arrDate
    }

    handleOnchangeSelect = async (e) => {
        // if(this.props.match && this.props.match.params && this.props.match.params.id){
        //     let doctorId = this.props.match.params.id
        //     alert(`${doctorId},${e.target.value}`)
        // }else{
        //     alert("failded")
        // }//                            TEST thooi

        if(this.props.doctorIdFromParant && this.props.doctorIdFromParant !== -1){
            let date = e.target.value
            let id = this.props.doctorIdFromParant
            let res = await userService.getScheduleDoctorByDate(id,date)
            console.log("check :",res)

            if(res && res.errCode === 0){
                this.setState({
                    allAvailabelTime : res.data ? res.data : []
                })
            }
        }else{
            alert('Tạch rồi')
        }
       
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.language !== this.props.language){
            this.setState({
                allDays : this.getAllDays()
            })
        }
    }

    render() {
        console.log('check state', this.state)
        console.log("check props", this.props)
        let { allDays, allAvailabelTime } = this.state
        return ( 
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select
                        onChange = {(e)=> this.handleOnchangeSelect(e)}
                    >
                        {
                            allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                <option 
                                    key={index}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>)
                            })
                        }
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="text-calendar">
                        <i class="fas fa-calendar-alt"></i>
                        <span><FormattedMessage id="patient.detail-doctor.schedule"/></span>
                    </div>
                    <div className="time-content">
                        {
                            allAvailabelTime && allAvailabelTime.length > 0 ? 
                            allAvailabelTime.map((item, index) => {
                                let timeDisplay = this.props.language === 'vi' 
                                        ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                return(<button key={index}>{timeDisplay}</button>)
                            }) : <FormattedMessage id="patient.detail-doctor.no-doctor"/>
                        }
                        
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
