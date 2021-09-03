import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { toast } from "react-toastify";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils'
import userService from '../../../services/userService';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import './ManageSpecialty.scss'

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            imageBase64 : '',
            descriptionHTML : '',
            descriptionMarkdown : '',
            previewImageURL:'',
            isOpen: false
        }
        this.inputRef = React.createRef()
    }
    async componentDidMount(){
        
    }

    componentDidUpdate(){

    }

    checkValidateInput = () => {
        let isValidate = true
        let arrInput = ["name","imageBase64","descriptionHTML","descriptionMarkdown"]

        for (let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValidate = false
                toast.info(`Không được để trống ${arrInput[i]}`)
                break
            }
        }
        return isValidate
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML : html,
            descriptionMarkdown : text,
        })
    }

    handleSaveSpecialty = async () => {
        let check = this.checkValidateInput()
        if(check){
            let res = await userService.postNewSpecialty({
                name : this.state.name,
                imageBase64 : this.state.imageBase64,
                descriptionHTML : this.state.descriptionHTML,
                descriptionMarkdown : this.state.descriptionMarkdown
            })
    
            if(res && res.errCode === 0){
                toast.success("Tạo Chuyên khoa Thành công")

                this.setState({
                    name : '',
                    imageBase64 : '',
                    descriptionHTML : '',
                    descriptionMarkdown : '',
                    previewImageURL:'',
                })

                this.inputRef.current.value = ''
            }else{
                toast.error("Server lỗi vui lòng thử lại")
            }
        }
    }

    removeImage = () => {
        this.setState({
            previewImageURL:'',
            isOpen: false,
            imageBase64 : ''
        })

        this.inputRef.current.value = ''
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file) // đưa lên db kiểu base64 và khí sv trả về thì buffer
            const objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageURL : objectUrl,
                imageBase64 : base64
            })
        }

    }

    onChangeInput = (e , id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">
                    QUẢN LÝ CHUYÊN KHOA
                </div>
                
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={(e)=>{this.onChangeInput(e,'name')}}
                            value={this.state.name}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <div 
                            className="preview-image"
                            style={{backgroundImage:`url(${this.state.previewImageURL})`}}
                            onClick={e => {
                                if(this.state.previewImageURL){
                                    this.setState({
                                        isOpen : true
                                    })
                                }
                            }}
                        >
                        </div>
                        <label htmlFor="upload-image-specialty">Ảnh chuyên khoa : </label>

                        <label className="label-upload" htmlFor="upload-image-specialty">
                            <FormattedMessage id="manage-user.upload"/> <i className="fas fa-upload"></i>
                        </label>
                        <input 
                            ref={this.inputRef} // Lấy ra phần tử kiểu kiểu như dom
                            onChange={(e)=>{this.handleOnchangeImage(e)}} 
                            id="upload-image-specialty" 
                            type="file"
                            className="form-control-file" 
                            hidden
                        />
                        <label 
                            className="label-upload" 
                            onClick={(e) => this.removeImage()}
                        >
                            <FormattedMessage id="manage-user.remove"/>
                        </label>
                    </div>
                    <div className="col-12">
                        <MdEditor 
                            style={{ height: '400px' }} 
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} 
                            value = {this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <div className="btn-add-new-speacialty">
                            <button onClick={()=>this.handleSaveSpecialty()} className="btn btn-primary">Add new</button>
                        </div>
                    </div>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
