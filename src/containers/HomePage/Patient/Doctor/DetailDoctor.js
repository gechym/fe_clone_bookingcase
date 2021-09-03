import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import HomeHeader from "../../HomeHeader"
import HomeFooter from "../../Section/HomeFooter"
import userService from '../../../../services/userService'
import DoctorSchedule from './DoctorSchedule';

import "./DetailDoctor.scss"
import DoctorExtraInfor from './DoctorExtraInfor';

class DetailDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            detailDoctor : {},
        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let res = await userService.getDetailDoctorByIdService(id)
            if(res && res.errCode === 0) {
                this.setState({
                    detailDoctor : res.data
                })
            }
        }
    }

    

    render() {
        // console.log(this.props.match.params.id)
        // console.log(this.props)
        // console.log('check state', this.state)
        let {detailDoctor} =  this.state
        let nameVi = ''
        let nameEn = ''
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <>
                <HomeHeader isShow = {false}/>
                 
                <div className="doctor-detail-container">
                   <div className="intro-doctor">
                        <div 
                            className="content-left" 
                            style={{backgroundImage:`url(${detailDoctor && detailDoctor.image && detailDoctor.image})`}}
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
                                    detailDoctor &&
                                    detailDoctor.Markdown &&
                                    detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                        
                   </div>
                   <div className="schedule-doctor">
                       <div className="content-left">
                            <DoctorSchedule 
                                doctorIdFromParant={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}
                            />

                       </div>
                       <div className=" content-right">
                           <DoctorExtraInfor doctorIdFromParant={detailDoctor && detailDoctor.id ? detailDoctor.id : -1}/>
                       </div>
                      
                   </div>
                   <div className="info-detail-doctor">
                       {
                           detailDoctor &&
                           detailDoctor.Markdown &&
                           detailDoctor.Markdown.contentHTML && 
                           <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                       }
                   </div>
                   <div className="comment-doctor">
                       
                   </div>
                   
                </div>
                <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
