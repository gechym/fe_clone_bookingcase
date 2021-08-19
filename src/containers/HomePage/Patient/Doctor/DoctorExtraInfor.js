import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import moment, { months } from 'moment';
import localization from 'moment/locale/vi'
import userService from '../../../../services/userService';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import "./DoctorExtraInfor.scss"
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShowDetailInfor : true,
            extraInfor :''
        }
    }

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let doctorId = this.props.match.params.id
            let res = await userService.getExtraInforDoctorById(doctorId)
            
        // "data": {
        //     "id": 2,
        //     "doctorId": 58,
        //     "priceId": "PRI1",
        //     "provinceId": "PRO3",
        //     "paymentId": "PAY3",
        //     "addressClinic": "Đà nẳng 1",
        //     "nameClinic": "Phòng Khám Hai Ba Trưng 566 ",
        //     "note": "Khám oke nha",
        //     "count": 0,
        //     "createdAt": "2021-08-12T13:28:42.000Z",
        //     "updatedAt": "2021-08-12T13:28:42.000Z",
        //     "priceTypeData": {
        //         "valueEn": "10",
        //         "valueVi": "200000"
        //     },
        //     "provinceTypeData": {
        //         "valueEn": "Da Nang",
        //         "valueVi": "Đà Nẵng"
        //     },
        //     "paymentTypeData": {
        //         "valueEn": "All payment method",
        //         "valueVi": "Tất cả"
        //     }
            if(res && res.errCode === 0){
                this.setState({
                    extraInfor : res.data                    
                })
            }
       } 
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let {language} = this.props
        return ( 
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ?  extraInfor.nameClinic : ''}
                    </div>
                    <div className="detail-address">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {
                        isShowDetailInfor === false ? 
                        <div>
                            {
                                        isShowDetailInfor ? '' : 
                                        <span><FormattedMessage id="patient.extra-infor-doctor.price" /> :
                                            {
                                            
                                            language === 'vi' ? 
                                            <b>
                                                <NumberFormat
                                                value={extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVi : '0'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                displayType="text"
                                                suffix=" VNĐ"
                                                />
                                            </b>
                                                :
                                            <b>
                                                <NumberFormat
                                                value={extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueEn : '0'}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                displayType="text"
                                                suffix="$"
                                                />
                                            </b>
                                            } 
                                        </span> 
                            } 
                             <span
                                className="hide-price"
                                onClick={()=> this.setState({isShowDetailInfor : true})}
                             >(<FormattedMessage id="patient.extra-infor-doctor.detail" />)</span>  
                        </div> 
                        :
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                            </div>
                            <div className="detail-infor-price">
                                <div className="price-up">
                                    {/* <span className="left">Giá:</span> */}
                                    <span className="right">
                                    {
                                            language === 'vi' ? 
                                                <NumberFormat
                                                    value={extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVi : '0'}
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    displayType="text"
                                                    suffix="VNĐ"
                                                />
                                                :
                                                <NumberFormat
                                                    value={extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueEn : '0'}
                                                    thousandSeparator="."
                                                    decimalSeparator=","
                                                    displayType="text"
                                                    suffix=" $"
                                                />
                                    } 
                                    </span>
                                </div>
                                <div className="price-down">
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className="text-payment">
                                (
                                    <FormattedMessage id="patient.extra-infor-doctor.payment" />  : 
                                    {
                                        language === 'vi' ?
                                        extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVi : ''
                                        :
                                        extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueEn : ''

                                    }   
                                )
                            </div>
                            <div className="hide-price"
                                onClick={()=> this.setState({isShowDetailInfor : false})}
                            >
                                <FormattedMessage id="patient.extra-infor-doctor.hide-price" /> 
                            </div>
                        </>
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor));

