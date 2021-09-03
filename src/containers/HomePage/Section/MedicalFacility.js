import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';
import Slider from "react-slick";
import userService from '../../../services/userService';


class MedicalFacility extends Component {

    constructor(props){
        super(props);

        this.state = {
            dataClinics : []
        }  
    }

    async componentDidMount(){
        let res = await userService.getAllClinic();
        if(res && res.errCode === 0) {
            this.setState({
                dataClinics : res.data 
            })
        }
    }

    handleViewClinic(id){
        this.props.history.push(`/detail-clinic/${id}`)
    }

    render() {
        let {dataClinics} = this.state
        console.log('check dataclinic', dataClinics)
        return (
            <>
                <div className="section-share section-medical-facility">
                    <div className="section-container">
                        
                        <div className="section-header">
                            <span className="title-section">Cở sở y tế nổi bật</span>
                            <button className="button-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {
                                    dataClinics && dataClinics.length > 0 &&
                                    dataClinics.map(item => {
                                        return(
                                            <div className="section-customize" >
                                                <div onClick={e => this.handleViewClinic(item.id)} className="bg-img section-medical-facility" style={{backgroundImage:`url(${item && item.image })`}}></div>
                                                <div>{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                                
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
