import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import manageDoctor from '../containers/System/Admin/manageDoctor';
import ManageSpecialty from '../containers/System/Speciality/ManageSpecialty';
import ManageClinic from '../containers/System/clinic/ManageClinic';
// import {path} from "../utils"
// import DetailDoctor from '../containers/HomePage/Patient/Doctor/DetailDoctor'
import { withRouter } from 'react-router';


class System extends Component {
    render() {
        const { systemMenuPath,isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/manage-doctor" component={manageDoctor} />
                            <Route path="/system/manage-specialitis" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
