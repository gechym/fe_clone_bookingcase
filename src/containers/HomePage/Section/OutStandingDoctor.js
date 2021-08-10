import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';


// import { Redirect } from 'react-router-dom';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OutstandingDoctor.scss'

class OutstandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state ={
            arrDoctors : []
        }
    }

    componentDidMount(){
        this.props.loadTopDoctor()
    }   

    componentDidUpdate(prveProps,prevState,snapshot){
        if(prveProps.topDoctors !== this.props.topDoctors){
            this.setState({
                arrDoctors : this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor(user){
        this.props.history.push(`/detail-doctor/${user.id}`)
        // return <Redirect to={`/detail-doctor/${user.id}`} />
    }
       

    render() {
        let arrDoctors = this.state.arrDoctors
        let {language} = this.props
        console.log(arrDoctors)
        return (
                <div className="section-share section-OutstandingDoctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="homepage.out-standing-doctor"/>
                            </span>
                            <button className="button-section"><FormattedMessage id="homepage.more-info"/></button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                
                                {
                                    arrDoctors && arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                        let imageBase64 = ''
                                        if(item.image){
                                           imageBase64 = new Buffer(item.image, 'base64').toString('binary'); // giải mã từ Buffer -> về ảnh ra view
                                        }
                                        return(
                                            <div className="section-customize boder-customize" 
                                                onClick={() =>this.handleViewDetailDoctor(item) }
                                            >
                                                <div className="outer-bg">
                                                    <div 
                                                        className="bg-img section-Outstandingdoctor" 
                                                        style={{backgroundImage:`url(${imageBase64 && imageBase64})`}}>
                                                    </div>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === 'vi' ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors : state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor : () => dispatch(actions.fetchTopDoctop())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
