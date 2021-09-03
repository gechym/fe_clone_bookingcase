import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomeHeader';
import './detailClinic.scss'
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import userService from '../../../../services/userService';
import _ from 'lodash';



class DetailClinic extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctor : [],
            dataDetailClinic : {},
            // listProvice : [],
            isShow : true
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await userService.getDetailClinicById(id)
            // let arrProvice = await userService.getAllCodeService('PROVINCE')

            
            if(res && res.errCode === 0) {
                let data = res.data
                let arrDoctor =[]

                if(data && !_.isEmpty(data)){
                    let arr = data.doctorClinic
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailClinic : res.data,
                    arrDoctor : arrDoctor,
                    // listProvice :  arrProvice.data
                })
            }
        }
    }

    // handleOnchange = async (e) => {
    //     this.setState({
    //         arrDoctor : [],
    //     })

    //     if(this.props.match && this.props.match.params && this.props.match.params.id){
    //         // fix tạm
    //         let id = this.props.match.params.id
    //         let res = await userService.getDetailSpecialtyById(id,e.target.value)
    //         if(res && res.errCode === 0) {
    //             let data = res.data 
    //             let arrDoctor =[]

    //             if(data && !_.isEmpty(data)){
    //                 let arr = data.doctorClinic
    //                 if(arr && arr.length > 0){
    //                     arr.map(item => {
    //                         arrDoctor.push(item.doctorId)
    //                     })
    //                 }
    //             }
    //             this.setState({
    //                 arrDoctor : arrDoctor,
    //             })
    //         }
    //     }
    // }

    componentDidUpdate(){
    
    }

    render() {
        let { arrDoctor, dataDetailClinic, listProvice, isShow} = this.state
        return (
            <>  
                <HomeHeader isShow={false}/>
                <div className="detail-specialty-container">
                    <div className="desription-specialty" 
                         style={{
                            backgroundImage:`url(${dataDetailClinic && dataDetailClinic.image })`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <div className="linear-gradient">
                            {
                                dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                                <div style={{height:`${isShow ?'200px':''}`}} dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML}}></div>
                            }
                            <div className="show-more-description">
                                <button
                                    onClick={e=>this.setState({isShow: !isShow})}
                                >
                                    {`${isShow ?'Xem Thêm':'Thu gọn'}`}
                                </button>

                            </div>
                        </div>
                    </div>
                    {/* <div className="all-province">
                        <select
                            onChange={e=>this.handleOnchange(e)}
                        >
                        <option value="" selected disabled hidden>Tỉnh thành</option>
                        <option value="ALL">Tất cả</option>
                            {
                                listProvice && listProvice.length > 0 ? 
                                listProvice.map((item,index) => {
                                    if(this.props.language === 'vi'){
                                        return <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                    }else{
                                        return <option key={index} value={item.keyMap}>{item.valueEn}</option>
                                    }
                                }) : ''
                            }
                        </select>
                    </div> */}
                    {
                        arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map(item=>{
                            return(
                                <div className="each-doctor">
                                    <div className="each-left">
                                        <ProfileDoctor 
                                            doctorId = {item}
                                            showDescriptionDoctorId = {true}
                                        />
                                    </div>
                                    <div className="each-right">
                                        <DoctorSchedule doctorIdFromParant={item}/>
                                        <DoctorExtraInfor doctorIdFromParant={item}/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
