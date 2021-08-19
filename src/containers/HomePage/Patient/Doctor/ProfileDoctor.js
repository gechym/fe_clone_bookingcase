import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import userService from '../../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi';



class ProfileDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
           dataProfile : {}
        }
    }
    async componentDidMount(){
        let data = await this.getInforProdileDoctor(this.props.doctorId)        
        this.setState({
            dataProfile : data
        })
    }

    getInforProdileDoctor = async (id) => {
        let result = {}
        if(id){
            let res = await userService.getProfileDoctorById(id)
            if(res && res.errCode === 0){
               result = res.data
            }
        }
        return result
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps.language !== this.props.language){

        }
        if(prevProps.data !== this.props.doctorId){ 
            
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   

    renderTimeBoking = (dataTime)=> {
        console.log("render time booking",dataTime)
        if(dataTime && !_.isEmpty(dataTime)){
            let {language} = this.props
            let date = language === 'vi'
                ? 
                this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'))
                :
                this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).locale('en').format('dddd - DD/MM/YYYY'))
            let time = language === 'vi'
                ?
                dataTime.timeTypeData.valueVi
                :
                dataTime.timeTypeData.valueEn

            return(
                    <>
                        <div>{time} - {date}</div>     
                        <h6><FormattedMessage id="patient.booking-modal.book-free" /></h6>           
                    </>
            )
        }
        return(<></>)
    }

    render() {
        let { dataProfile } = this.state
        let {showDescriptionDoctorId} = this.props
        let nameVi = ''
        let nameEn = ''
        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        return (
            <div className="doctor-profile-container">
                   <div className="intro-doctor">
                        <div 
                            className="content-left" 
                            style={{backgroundImage:`url(${dataProfile && dataProfile.image && dataProfile.image})`}}
                        >

                        </div>

                        <div className="content-right">
                            <div className="up">
                                {
                                    this.props.language === 'vi' ? nameVi : nameEn
                                }
                            </div>
                            <div className="down">
                                {   
                                    showDescriptionDoctorId &&
                                    dataProfile && 
                                    dataProfile.Markdown &&
                                    dataProfile.Markdown.description  
                                    ? 
                                    <span>
                                        {dataProfile.Markdown.description}
                                    </span> 
                                    :
                                    this.renderTimeBoking(this.props.dataTime)
                                }
                                {   
                                    dataProfile &&
                                    dataProfile.Doctor_infor &&
                                    dataProfile.Doctor_infor.nameClinic &&
                                    <span>
                                        <FormattedMessage id="patient.extra-infor-doctor.text-address" /> : <b>{dataProfile.Doctor_infor.nameClinic }</b> <br/> 
                                         
                                        <FormattedMessage id="patient.booking-modal.address" /> : <b> {dataProfile.Doctor_infor.addressClinic}</b>
                                    </span>
                                }
                            </div>
                            <div className="price">
                            <FormattedMessage id="patient.extra-infor-doctor.price" /> : 
                                {
                                    this.props.language === 'vi' ? 
                                        <b>
                                            <NumberFormat
                                                value={dataProfile && dataProfile.Doctor_infor ? dataProfile.Doctor_infor.priceTypeData.valueVi  : '0'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                displayType="text"
                                                suffix=" VNĐ"
                                            />
                                        </b>
                                        : 
                                        <b>
                                            <NumberFormat
                                                value={dataProfile && dataProfile.Doctor_infor ? dataProfile.Doctor_infor.priceTypeData.valueEn  : '0'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                displayType="text"
                                                suffix=" $"
                                            />
                                        </b>
                                }
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
