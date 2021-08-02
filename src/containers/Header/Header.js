import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';

import { FormattedMessage } from 'react-intl';
import {LANGUAGE} from '../../utils/constant.js'
import {changeLanguageApp} from '../../store/actions/appActions'

import './Header.scss';

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        console.log("check user info",this.props)
        
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="language">
                    <span className="user"><FormattedMessage  id="homeheader.welcome"/>, {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span 
                        className={`language-vi ${this.props.language === 'vi' ? 'active' :''}`} onClick={() => this.changeLanguage('vi')}
                    >VN</span>
                    <span 
                        className={`language-en ${this.props.language === 'en' ? 'active' :''}`} onClick={() => this.changeLanguage('en')}
                    >EN</span>

                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux : (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
