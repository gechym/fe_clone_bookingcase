import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';

import {LANGUAGES} from '../../utils/constant'
import {changeLanguageApp} from '../../store/actions/appActions'
import * as actions from '../../store/actions'


import { withRouter } from 'react-router';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // this.props.dispatch(actions.changeLanguageApp(language))
    }

    render() {
        console.log(this.props)
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars menu"></i>
                            <div className="header-logo" onClick={() => {
                                this.props.history.push(`/home`)
                            }}></div>
                        </div>
                        
                        <div className="center-content">
                            <div className="child-content">
                                <div> <b><FormattedMessage id="homeheader.speaciality"/></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-room"/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.select-doctor"/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                                <div className="sub-title"><FormattedMessage id="homeheader.check-health"/></div>
                            </div>
                        </div>
                        
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <b><FormattedMessage id="homeheader.support"/></b>
                            </div>
                            {
                                this.props.language === 'vi' 
                                        ? 
                                    <div className="language-vn active">
                                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)} >VN</span>
                                    </div> 
                                        : 
                                    <div className="language-vn">
                                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)} >VN</span>
                                    </div>
                            }
                            {
                                this.props.language === 'en' 
                                    ? 
                                    <div className="language-en active">
                                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)} >EN</span>
                                    </div> 
                                    : 
                                    <div className="language-en">
                                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)} >EN</span>
                                    </div>
                            }
                            {/* <div className="language-vn"><spam onClick={() => this.changeLanguage(LANGUAGES.VI)} >VN</spam></div>
                            <div className="language-en"><span onClick={() => this.changeLanguage(LANGUAGES.EN)} >EN</span></div> */}
                        </div>                
                    </div>
                </div>
                {
                    this.props.isShow 
                        &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1"/></div>
                            <div className="title2"><FormattedMessage id="banner.title2"/></div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input placeholder="find a doctor by speciality | medical speciality" type="text" name="" id="" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="option">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital-alt"></i>
                                    </div>
                                    <div className="text-child"><FormattedMessage id="banner.speciality-examination"/></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.remote-examination"/></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-notes-medical"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.general-examination"/></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-vials"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.medical-test"/></div>
                                </div>

                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-user-md"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.pure-health"/></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><i className="fas fa-address-book"></i></div>
                                    <div className="text-child"><FormattedMessage id="banner.dental-examination"/></div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </>
        );
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
        changeLanguageAppRedux : (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
