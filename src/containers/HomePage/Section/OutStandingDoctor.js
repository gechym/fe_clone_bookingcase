import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './OutstandingDoctor.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
                        

class OutstandingDoctor extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
                <div className="section-share section-OutstandingDoctor">
                    <div className="section-container">
                        
                        <div className="section-header">
                            <span className="title-section">Bác sĩ chuyên khoa</span>
                            <button className="button-section">Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center boder-customize">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className="section-customize boder-customize">
                                    <div className="outer-bg">
                                        <div className="bg-img section-Outstandingdoctor"></div>
                                    </div>
                                    <div className="position text-center">
                                        <div>Giáo sư tiến sĩ ABC.Dimaria Owakuma</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
