import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi'
import userService from '../../../../services/userService';
import { withRouter } from 'react-router';



import "./DoctorSchedule.scss"

class DoctorSchedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            allDays : []
        }
    }

    componentDidMount(){
        // console.log('Time vi', moment(new Date()).format('dddd - DD/MM - h:mm:ss '))
        // console.log('time en', moment(new Date()).locale('en').format('dddd - DD/MM - h:mm:ss '))
        
        // // tiến lên 1 ngày 
        // console.log("tiến 1 ngày" ,moment(new Date()).add(1, 'days').valueOf())
        // console.log("tiến 1 ngày" ,moment(new Date()).add(1, 'days').startOf('day').valueOf()) // chuyển qua timestane
        this.setArrDays()

    }

    setArrDays = () => {
        let arrDate = []
        // setTimeout(()=>{
            for(let i = 0 ; i < 7 ; i++) {
                let object = {}
                if(this.props.language === 'vi'){
                    object.label = moment(new Date()).add(i, 'days').format('dddd, DD/MM');
                    object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                    if(!object.label.includes("chủ nhật,")){
                        arrDate.push(object)
                    }
                }else{
                    object.label = moment(new Date()).locale('en').add(i, 'days').format('dddd, DD/MM');
                    object.value = moment(new Date()).add(i , 'days').startOf('day').valueOf()
                    if(!object.label.includes("Sunday,")){
                        arrDate.push(object)
                    }
                }
            }
            this.setState({
                allDays : arrDate
            })
        // },5000)
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

            // alert(date + " " + id)
            let res = await userService.getScheduleDoctorByDate(id,date)
            console.log(res)
        }else{
            alert('Tạch rồi')
        }
       
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.language !== this.props.language){
            this.setArrDays()
        }
    }

    render() {
        console.log('check state', this.state)
        console.log("check props", this.props)
        let { allDays } = this.state
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
                    THỜI GIAN
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
