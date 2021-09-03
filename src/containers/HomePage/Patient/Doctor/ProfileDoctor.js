import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import userService from '../../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi';
import { withRouter } from 'react-router';




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

    handleViewDetailSpecialty = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }

   

    renderTimeBoking = (dataTime)=> {
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

        console.log('check state profile doctor',dataProfile)

        return (
            <div className="doctor-profile-container">
                   <div className="intro-doctor">
                        <div 
                            className="content-left" 
                            style={{
                                backgroundImage:`url(${dataProfile && dataProfile.image && dataProfile.image})`,
                                position:'relative'
                            }}
                            >
                                {
                                showDescriptionDoctorId ? 
                                    <div 
                                        className="show-more" 
                                        style={{
                                            position: 'absolute',
                                            top: '109%',
                                            width: '100px',
                                            right: '-7px',
                                            color : '#49BCE2',
                                            cursor : 'pointer',
                                            'fontWeight':'700'
                                        }}
                                        onClick={e => this.handleViewDetailSpecialty(dataProfile.id)}
                                    >
                                        <span>Xem Thêm</span>
                                    </div>:''
                                }

                                {/* <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.945831162724!2d105.8019440077557!3d21.022816135625764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1629815154900!5m2!1sen!2s"
                                    width="600" height="250" 
                                    style={{border:'0',position: 'absolute',top: '109%',borderRadius:'10px'}} 
                                    allowfullscreen="" 
                                    loading="eager"
                                >
                                </iframe> */}
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
                                    <div>
                                        <span>
                                            {dataProfile.Markdown.description}
                                        </span> 
                                    </div>
                                    :
                                    this.renderTimeBoking(this.props.dataTime)
                                }
                                {   
                                    !showDescriptionDoctorId&&
                                    dataProfile &&
                                    dataProfile.Doctor_infor &&
                                    dataProfile.Doctor_infor.nameClinic &&
                                    <span>
                                        <FormattedMessage id="patient.extra-infor-doctor.text-address" /> : <b>{dataProfile.Doctor_infor.nameClinic }</b> <br/> 
                                         
                                        <FormattedMessage id="patient.booking-modal.address" /> : <b> {dataProfile.Doctor_infor.addressClinic}</b>
                                    </span>
                                }
                            </div>
                            {
                                !showDescriptionDoctorId ? 
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
                                    : 
                                <div>
                                    <span> <i class="fas fa-map-marker-alt" style={{color:'#ED4436'}}></i>  &nbsp;
                                        {
                                                    dataProfile && dataProfile.Doctor_infor 
                                                    && dataProfile.Doctor_infor.provinceTypeData ? 
                                                    <>
                                                        {
                                                            this.props.language === 'vi' ?
                                                            dataProfile.Doctor_infor.provinceTypeData.valueVi :
                                                            dataProfile.Doctor_infor.provinceTypeData.valueEn
                                                        }
                                                    </> :
                                                    ''
                                        }
                                    </span>
                                </div>
                                
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));
