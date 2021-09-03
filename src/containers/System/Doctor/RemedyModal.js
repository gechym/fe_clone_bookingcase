import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from '../../../utils'


class ModalEditUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            email : '',
            imgBase64 : ''
        }
        this.inputRef = React.createRef()
    }


    componentDidMount() {
        this.setState({
            email : this.props.dataModal.email
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.dataModal !== prevProps.dataModal){
            this.setState({
                email : this.props.dataModal.email
            })
        }
    }
    
    toggle = () => {
        this.props.handleCloseModal()
    }
    //GOOD CODE
    hanhdleOnchangeInput = async (e, id) => { // setstate khi người dùng nhập vào
        let copyState = {...this.state}
        copyState[id] = e.target.value
        await this.setState({
            ...copyState
        }, ()=> {
            // console.log('check' , this.state)
        })
        // console.log('check' , this.state)   
    }


    hanhdleNewUser = () => {
        let check =  this.checkValidateInput()
        
        if(check){
            let data = this.state
            delete data.password
            this.props.handleEditUser(data)
        }
    }

    sendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    removeImage = () => {
        this.setState({
            imgBase64 : ''
        })
        this.inputRef.current.value = ''
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if(file){
            let base64 = await CommonUtils.getBase64(file) // đưa lên db kiểu base64 và khí sv trả về thì buffer
            // const objectUrl = URL.createObjectURL(file)
            this.setState({
                // previewImageURL : objectUrl,
                imgBase64 : base64
            })
        }
    }


    onChangeInputEmail = (e , id) => {
        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }


    render() {
        let { dataModal } = this.props
        return (
            <div className="text-center" >
                <Modal  
                    isOpen={this.props.isOpen} 
                    toggle={() => this.toggle()} 
                    className={'modal-user-container'}
                    size = 'md'
                >
                        <ModalHeader toggle={() => this.toggle()}>Gửi hóa đơn khám bệnh</ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Email bệnh nhân</label>
                                    <input 
                                        className="form-control"
                                        type="email"
                                        value={this.state.email}
                                        onChange={e => this.onChangeInputEmail(e, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Chọn file hóa đơn</label>
                                    <input 
                                        className="form-control-file"
                                        type="file"
                                        onChange={e => this.handleOnchangeImage(e)}
                                        ref={this.inputRef}
                                    />
                                    <button  className="mt-1 btn btn-primary" onClick={e => this.removeImage()}>Xóa ảnh</button>
                                </div>
                            </div>                         
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" className="px-3" onClick={() => this.sendRemedy()}>save</Button>{' '}
                        <Button color="secondary" className="px-3" onClick={() => this.toggle()}>close</Button>
                        </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
