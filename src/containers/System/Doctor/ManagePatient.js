import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment, { months } from 'moment';
import RemedyModal from './RemedyModal';
import _ from 'lodash';
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';









import './ManagePatient.scss'


class ManagePatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentDate : new Date(),
            listPantinet : [],
            isOpen: false,
            dataModal : {},
            isShowLoading : false
        }
    }
    async componentDidMount(){
        let {userInfo} = this.props
        let {currentDate} = this.state
        let formatedDate = moment(currentDate).add(0 , 'days').startOf('day').valueOf();
        if(userInfo.id){
            let res = await userService.getListPatientForDoctor(userInfo.id,formatedDate)
            this.setState({
                listPantinet : res.data
            })
            
        }

    }

    componentDidUpdate(){

    }

    handleCloseModal = () => {
        this.setState({
            isOpen : false
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            id : item.id,
            timeType : item.timeType,
            doctorId : item.doctorId,
            patientId : item.patientId,
            email : item.patientData.email,
            firstName : item.patientData.firstName
        }

        console.log(data)

        this.setState({
            isOpen : true,
            dataModal : data
        })
    }


    handleOnchangeDataPicker = async (date) => {
        this.setState({
            currentDate : date[0]
        })

        let {userInfo} = this.props
        let {currentDate} = this.state 
        let formatedDate = moment(currentDate).add(0 , 'days').startOf('day').valueOf();
        if(userInfo.id){
            let res = await userService.getListPatientForDoctor(userInfo.id,formatedDate)
            this.setState({
                listPantinet : res.data
            })
            
        }
    }

    // let formatedDate = new Date(currentDate).getTime();

    sendRemedy = async (dataFromModal) => {
        this.setState({
            isShowLoading : true
        })
        let {dataModal} = this.state
        console.log(dataFromModal)
        let res = await userService.postSendRemedy({
            ...dataFromModal,//email, imgbase64
            id : dataModal.id,
            timeType : dataModal.timeType,
            doctorId : dataModal.doctorId,
            patientId : dataModal.patientId,
            name : dataModal.firstName,
            language : this.props.language
        })

        if(res && res.errCode === 0){
            this.setState({
                isShowLoading : false
            })
            toast.success('gửi email thành công')

            let {userInfo} = this.props
            let {currentDate} = this.state
            let formatedDate = moment(currentDate).add(0 , 'days').startOf('day').valueOf();
            if(userInfo.id){
                let res = await userService.getListPatientForDoctor(userInfo.id,formatedDate)
                this.setState({
                    listPantinet : res.data,
                    isOpen : false
                })
                
            }
        }else{
            toast.error('gửi thất bại vui lòng kiểm tra lại')
        }

    }


    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        let {listPantinet} = this.state
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading your content...'
                >
            <div className="manage-patient-container">
                <RemedyModal 
                    isOpen={this.state.isOpen} 
                    handleCloseModal = {this.handleCloseModal} 
                    dataModal={this.state.dataModal}
                    sendRemedy = {this.sendRemedy}
                />
                
                <div className="mp-title">
                    QUẢN LÝ BỆNH NHÂN KHÁM BỆNH
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label htmlFor="">Chọn Ngày khám</label>
                            <DatePicker 
                                onChange = {this.handleOnchangeDataPicker}
                                value = {this.state.currentDate}
                                className="form-control"
                                minDate = {yesterday}
                            />
                    </div>
                    <div className="col-12 ta">
                        <table id="customers">
                            <tr>
                                <th>STT</th>
                                <th>Thời gian khám</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Lý do khám</th>
                                <th>Actions</th>
                            </tr>
                            {
                                listPantinet && listPantinet.length > 0 &&
                                listPantinet.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{item.timeTypeDataPatient.valueVi}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.genderData.valueVi}</td>
                                            <td>{item.reason}</td>
                                            <td>
                                                <button
                                                    onClick={e => this.handleBtnConfirm(item)} 
                                                    className="btn btn-primary">Xuất đơn thuốc
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
