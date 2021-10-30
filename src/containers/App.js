import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'




// import Login from '../routes/Login';

import CustomScrollbars from '../../src/components/CustomScrollbars.js'
import Home from '../routes/Home';
import Login  from './Auth/Login';
import System from '../routes/System';
import Doctor from '../routes/Doctor';
import DetailDoctor from '../containers/HomePage/Patient/Doctor/DetailDoctor'
import HomePage from './HomePage/HomePage'
import VerifyEmail from './HomePage/Patient/VerifyEmail';
import DetailSpecialty from './HomePage/Patient/specialty/detailSpecialty';
import detailClinic from './HomePage/Patient/Clinic/detailClinic';
import TestVideo from './HomePage/Patient/test/TestVideo'



class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                {/* <BrowserRouter basename='http://localhost:3000'> */}
                    <Router history={history}>
                        <div className="main-container">
                            {/* {this.props.isLoggedIn && <Header />} */}
                                    <CustomScrollbars style={{width: "100%",height: "100vh"}}>
                                        <div className="content-container">
                                                <Switch>
                                                    <Route path={path.HOME} exact component={(Home)} /> // "/"
                                                    <Route path={path.LOGIN}  component={userIsNotAuthenticated(Login)} />//"/login"
                                                    <Route path={path.SYSTEM}  component={userIsAuthenticated(System)} />// "/system/.."
                                                    <Route path={'/doctor'}  component={userIsAuthenticated(Doctor)} />// "/system/.."
                                                    <Route path={path.HOMEPAGE} component={HomePage}/> // "/home"
                                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor}/>
                                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty}/>
                                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty}/>
                                                    <Route path={path.DETAIL_CLINIC} component={detailClinic}/>
                                                    <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail}/>
                                                    <Route path={'/test-video'} component={TestVideo}/>

                                                    <Route path="/:balala" component={() => { return (<Redirect to='/home' />) }} />
                                                </Switch>
                                        </div>
                                    </CustomScrollbars>

                            {
                            /* 
                                <ToastContainer
                                    className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                    autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                    pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                    closeButton={<CustomToastCloseButton />}
                                /> 
                            */
                            }

                                <ToastContainer
                                position="bottom-right"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                />
                                
                        </div>
                    </Router>
                {/* </BrowserRouter> */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);