import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import userService from '../../../services/userService';
import { withRouter } from 'react-router';

import './Speciality.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import Slider from "react-slick";
                        

class Speciality extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataSpecialty : []
        }
    }

    async componentDidMount(){
        let res = await userService.getAllSpecialty()
        console.log('check log :', res)
        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty : res.data
            })
        }
    }

    handleViewDetailSpecialty = (user) => {
        this.props.history.push(`/detail-specialty/${user.id}`)
    }


    render() {
        let {dataSpecialty } = this.state
        return (
            <>
                <div className="section-share section-speciality">
                    <div className="section-container">
                        
                        <div className="section-header">
                            <span className="title-section"><FormattedMessage id="homepage.specialty" /></span>
                            <button className="button-section"><FormattedMessage id="homepage.more-info" /></button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {
                                    dataSpecialty && dataSpecialty.length > 0 && 
                                        dataSpecialty.map((item, index) => {
                                            return (
                                                <div className="section-customize" 
                                                    key={index}
                                                    onClick={() =>this.handleViewDetailSpecialty(item)}
                                                >
                                                    <div 
                                                        className="bg-img section-speciality"
                                                        style={{backgroundImage:`url(${item.image && item.image})`}}
                                                    ></div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
