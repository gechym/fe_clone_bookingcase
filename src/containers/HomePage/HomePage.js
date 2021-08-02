import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Speciality from './Section/Speciality.js';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/handbook';
import Abount from './Section/Abount';
import HomeFooter from './Section/HomeFooter';

import './HomePage.scss'

class HomePage extends Component {

    constructor(props){
        super(props)
    }

    settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        
        // autoplay: true,
        // speed: 2000,
        // autoplaySpeed: 2000,
        // cssEase: "linear"
      };

    render() {
        return (
            <>
                <HomeHeader/>
                <Speciality settings={this.settings}/>
                <MedicalFacility settings= {this.settings}/>
                <OutStandingDoctor settings= {this.settings}/>
                <HandBook settings= {this.settings}/>
                <Abount/>
                <HomeFooter/>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
