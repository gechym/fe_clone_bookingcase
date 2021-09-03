import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}





class TableManageUser extends Component {
    constructor(props){
        super(props)
        this.state = {
           userRedux : []
        }
    }

    componentDidMount(){
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
               userRedux : this.props.listUsers 
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log('user delete' , item)
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.userRedux
        return (
            <>
                <table id="customersTableManage">
                    <tbody>
                        <tr>
                            <th>Email</th> 
                            <th>Fist name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.length > 0 &&
                            
                            arrUsers.map((item, index) => {
                                return(
                                    <tr key={index }>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button 
                                                style={{width:"50px",margin:"0px 5px"}} 
                                                className="btn btn-primary"
                                                onClick  = {() => this.handleEditUser(item)}
                                            > 
                                                <i className="far fa-edit"></i>
                                            </button>
                                            <button 
                                                style={{width:"50px"}} 
                                                className="btn btn-success"
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange} 
                />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers : state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux : () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux : (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
