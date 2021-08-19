import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import userService from '../../../services/userService'

import './manageDoctor.scss'
import 'react-markdown-editor-lite/lib/index.css';
import { FormattedMessage } from 'react-intl';

const mdParser = new MarkdownIt(/* Markdown-it options */);
 
class ManageDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            contentHTML : '',
            contentMarkdown : '',
            description: '',
           
            selectedOption : '',

           
            listDoctor:[],
            
            
            // save to infor doctor table
            listPrice : [],
            listPayment : [],
            listProvince : [],
            selectedPrice : '',
            selectedProvince : '',
            selectedPayment : '',
            nameClinic : '',
            addressClinic : '',
            note: '',

           hasOlData : false
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctop()
        this.props.getRequiredDoctorInfor()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.builDataInputSelect(this.props.allDoctors,'USER')
            this.setState({
                listDoctor : dataSelect
            })
        }
        if(prevProps.language !== this.props.language){// cập nhận select khi ngôn ngữ thay đổi
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfor

            let dataSelect = this.builDataInputSelect(this.props.allDoctors,'USER')
            let dataSelectPrice = this.builDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment = this.builDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince = this.builDataInputSelect(resProvince,'PROVICE')

            this.setState({
                listDoctor : dataSelect,
                listPrice : dataSelectPrice,
                listPayment : dataSelectPayment,
                listProvince : dataSelectProvince
            })
        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfor
           
            let dataSelectPrice = this.builDataInputSelect(resPrice,'PRICE')
            let dataSelectPayment = this.builDataInputSelect(resPayment,'PAYMENT')
            let dataSelectProvince = this.builDataInputSelect(resProvince,'PROVICE')

            
            
            this.setState({
                listPrice : dataSelectPrice,
                listPayment : dataSelectPayment,
                listProvince : dataSelectProvince
            })

        }
    }

    handleOnchangeSelectDoctor = async (selectedOption, name) => {
        let stateName = name.name
        let copyState = {...this.state}
        copyState[stateName] = selectedOption

        this.setState({
            ...copyState
        })
    }


    builDataInputSelect = (inputData, type) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length > 0){
            if(type === "USER"){
                inputData.map((item, index) => {
                   let object = {};
                   let valueVi = `${item.lastName} ${item.firstName}`
                   let valueEn = `${item.firstName} ${item.lastName}`
                   object.label = language === 'vi' ? valueVi : valueEn
                   object.value = item.id
                   result.push(object)
                })
            }
            if(type === 'PRICE'){
                inputData.map((item, index) => {
                    let object = {};
                    
                    let valueVi = new Intl.NumberFormat('vnd', { style: 'currency', currency: 'VND' }).format(+item.valueVi)
                    let valueEn =item.valueEn + "$"
                    object.label = language === 'vi' ? valueVi : valueEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if(type === "PAYMENT" || type === 'PROVICE'){
                inputData.map((item, index) => {
                    let object = {};
                    let valueVi =item.valueVi
                    let valueEn =item.valueEn
                    object.label = language === 'vi' ? valueVi : valueEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }
        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ 
            selectedOption : selectedOption 
        });
        let res = await userService.getDetailDoctorByIdService(selectedOption.value)
        console.log(res)
        if(res && res.errCode == 0 && res.data && res.data.Markdown){


            // Doctor_infor:
            //     addressClinic: "Hà Đông"
            //     count: 0
            //     doctorId: 56
            //     id: 1
            //     nameClinic: "Phòng Khám VBS cs1 - Hà Đông"
            //     note: "Note"
            //     paymentId: "PAY3"
            //     paymentTypeData:
            //          valueEn: "All payment method"
            //          valueVi: "Tất cả"
            //     priceId: "PRI7"
            //     priceTypeData:
            //          valueEn: "40"
            //          valueVi: "500000"
            //     provinceId: "PRO1"
            //     provinceTypeData:
            //          valueEn: "Ha Noi"
            //          valueVi: "Hà Nội"


            // listPrice : [],
            // listPayment : [],
            // listProvince : [],
            // selectedPrice : '',
            // selectedProvince : '',
            // selectedPayment : '',
            // nameClinic : '',
            // addressClinic : '',
            // note: '',

            let addressClinic = '',nameClinic = '', note = '',
                selectedPrice = '',selectedProvince = '',selectedPayment = ''

            let { listPrice, listPayment, listProvince } = this.state
            
            console.log(listPrice, listPayment, listProvince)

            if(res.data.Doctor_infor){
                addressClinic = res.data.Doctor_infor.addressClinic
                nameClinic = res.data.Doctor_infor.nameClinic
                note = res.data.Doctor_infor.note

                selectedPrice = listPrice.find(item => item && item.value === res.data.Doctor_infor.priceId)
                selectedPayment = listPayment.find(item => item && item.value === res.data.Doctor_infor.paymentId)
                selectedProvince = listProvince.find(item => item && item.value === res.data.Doctor_infor.provinceId)
            }

            console.log(selectedPrice,selectedPayment,selectedProvince)

            let markdown =  res.data.Markdown
            this.setState({
                contentHTML : markdown.contentHTML,
                contentMarkdown : markdown.contentMarkdown,
                description : markdown.description,
                hasOlData : true,
                nameClinic : nameClinic,
                addressClinic : addressClinic,
                note: note,
                selectedPrice : selectedPrice,
                selectedProvince : selectedProvince,
                selectedPayment : selectedPayment

            })       
        }else{
            this.setState({
                contentHTML : '',
                contentMarkdown : '',
                description : '',
                selectedPrice : '',
                selectedProvince : '',
                selectedPayment : '',
                nameClinic : '',
                addressClinic : '',
                note: '',
                hasOlData : false
            }) 
        }
    };


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML : html,
            contentMarkdown : text,
        })
    }
    
    handleOnchangeTextarea = (e, id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        },()=> {
            console.log(this.state)
        })
    }

    handleSaveContentMarkdown = async () => {
        let {hasOlData} = this.state
        await this.props.saveDetailDoctor({
            doctorId : this.state.selectedOption.value,
            contentHTML : this.state.contentHTML,
            contentMarkdown : this.state.contentMarkdown,
            description : this.state.description,
            action : hasOlData === true ? "EDIT" : "CREATE",
            selectedPrice : this.state.selectedPrice.value,
            selectedProvince :this.state.selectedProvince.value ,
            selectedPayment : this.state.selectedPayment.value,
            nameClinic : this.state.nameClinic,
            addressClinic : this.state.addressClinic,
            note: this.state.note,
        })
        this.setState({
            contentHTML : '',
            contentMarkdown : '',
            selectedOption : '',
            description: '',
            selectedPrice : '',
            selectedProvince : '',
            selectedPayment : '',
            nameClinic : '',
            addressClinic : '',
            note: '',
        })
    }
    
    render() {   // Thằng này 
                 //là danh 
                 //sách bs
        const { selectedOption , hasOlData, selectedProvince, selectedPayment, selectedPrice } = this.state;
        return (
            <>
                
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor.title" /></div>
                    <div className="more-info">
                        <div className="content-right form-group">
                            <label><FormattedMessage id="admin.manage-doctor.choose"/></label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                                // isMulti
                                placeholder={'Chọn bác sĩ'}
                            />
                        
                        </div>
                        <div className="content-left form-group">
                            <label><FormattedMessage id="admin.manage-doctor.description-doctor"/></label>
                            <textarea
                                value={this.state.description}
                                className="form-control" rows="4"
                                onChange = {(e)=> this.handleOnchangeTextarea(e, 'description')}
                            >

                            </textarea>
                        </div>
                    </div>
                    <div className="mori-info-extra row">
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                            <Select
                                value={selectedPrice}
                                onChange={this.handleOnchangeSelectDoctor}
                                options={this.state.listPrice}
                                name={'selectedPrice'}
                                // isMulti
                                placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                            <Select              
                                value={selectedPayment}
                                onChange={this.handleOnchangeSelectDoctor}
                                options={this.state.listPayment}
                                name={'selectedPayment'}
                                // isMulti
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                            <Select
                                value={selectedProvince}
                                onChange={this.handleOnchangeSelectDoctor}
                                options={this.state.listProvince}
                                name="selectedProvince"
                                // isMulti
                                placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                            <input
                                className="form-control"
                                value={this.state.nameClinic}
                                onChange = {(e)=> this.handleOnchangeTextarea(e, 'nameClinic')}
                                className="form-control"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
                            <input 
                                className="form-control"
                                value={this.state.addressClinic}
                                onChange = {(e)=> this.handleOnchangeTextarea(e, 'addressClinic')}
                                className="form-control"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                            <input
                                value={this.state.note}
                                className="form-control"
                                onChange = {(e)=> this.handleOnchangeTextarea(e, 'note')}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <button 
                        className={hasOlData ?"btn btn-primary mt-3" : "btn btn-success mt-3"}
                        onClick = {()=> this.handleSaveContentMarkdown()}
                    >
                        {hasOlData ?<FormattedMessage id="admin.manage-doctor.update" /> :<FormattedMessage id="admin.manage-doctor.save" />}
                    </button>
                    <div className="manage-doctor-editor">
                        <MdEditor 
                            style={{ height: '400px' }} 
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} 
                            value = {this.state.contentMarkdown}
                        />
                    </div>
                    
                    {/* {hasOlData ? "" : "(Bác sĩ này chưa có thông tin chi tiết)"} */}
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors : state.admin.allDoctors,
        allRequiredDoctorInfor : state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctop : () => dispatch(actions.fetchAllDoctop()),
        saveDetailDoctor : (data) => dispatch(actions.saveDetailDoctor(data)),
        getRequiredDoctorInfor : () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
