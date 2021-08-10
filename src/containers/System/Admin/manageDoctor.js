import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select';
import userService from '../../../services/userService'

import './manageDoctor.scss'
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
 
class ManageDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
           contentHTML : '',
           contentMarkdown : '',
           selectedOption : '',
           description: '',
           listDoctor:[],
           hasOlData : false
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctop()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor : dataSelect
            })
        }
        if(prevProps.language !== this.props.language){// cập nhận select khi ngôn ngữ thay đổi
            let dataSelect = this.builDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor : dataSelect
            })
        }
    }

    builDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
               let object = {};
               let valueVi = `${item.lastName} ${item.firstName}`
               let valueEn = `${item.firstName} ${item.lastName}`
               object.label = language === 'vi' ? valueVi : valueEn
               object.value = item.id
               result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await userService.getDetailDoctorByIdService(selectedOption.value)
        console.log(res)
        if(res && res.errCode == 0 && res.data && res.data.Markdown){
            let markdown =  res.data.Markdown
            this.setState({
                contentHTML : markdown.contentHTML,
                contentMarkdown : markdown.contentMarkdown,
                description : markdown.description,
                hasOlData : true
            })       
        }else{
            this.setState({
                contentHTML : '',
                contentMarkdown : '',
                description : '',
                hasOlData : false
            }) 
        }
    };


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML : html,
            contentMarkdown : text,
        })
    }
    
    handleOnchangeTextarea = (e) => {
        this.setState({
            description : e.target.value
        })
    }

    handleSaveContentMarkdown = async () => {
        let {hasOlData} = this.state
        await this.props.saveDetailDoctor({
            doctorId : this.state.selectedOption.value,
            contentHTML : this.state.contentHTML,
            contentMarkdown : this.state.contentMarkdown,
            description : this.state.description,
            action : hasOlData === true ? "EDIT" : "CREATE"
        })
        this.setState({
            contentHTML : '',
            contentMarkdown : '',
            selectedOption : '',
            description: '',
        })
    }
    
    render() {
        const { selectedOption, hasOlData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">Thêm Thông tin</div>
                <div className="more-info">
                    <div className="content-right">
                        <Select
                            value={selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            // isMulti
                        />
                        <button 
                            className={hasOlData ?"btn btn-primary mt-3" : "btn btn-success mt-3"}
                            onClick = {()=> this.handleSaveContentMarkdown()}
                        >
                            {hasOlData ?"Cập nhật thông tin" : "Tạo thông tin"}
                        </button>
                    </div>
                    <div className="content-left">
                        <textarea
                            value={this.state.description}
                            className="form-control" rows="4"
                            onChange = {(e)=> this.handleOnchangeTextarea(e)}
                        >

                        </textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor 
                        style={{ height: '400px' }} 
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} 
                        value = {this.state.contentMarkdown}
                    />
                </div>
                
                {/* {hasOlData ? "" : "(Bác sĩ này chưa có thông tin chi tiết)"} */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors : state.admin.allDoctors 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctop : () => dispatch(actions.fetchAllDoctop()),
        saveDetailDoctor : (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
