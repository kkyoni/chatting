import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import SideBarUser from "./Chat/SideBarUser";
import LeftSideBar from "./Chat/LeftSideBar";
import Service from "../services/EmployeeService";
import NavBar from "./Chat/NavBar";
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ViewInfo from "./ViewInfo";
import DocumentImages from "./PopUpModel/DocumentImages";
import Chat from "./Chat";
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chat: [],
            blockdata: [],
            userviewflage: false,
            userviewinfo: { chatDetails: [] },
            receviuser: {},
            message: null,
            editDivmessage: null,
            receivedId: null,
            chatdivflag: false,
            editDivid: null,
            editDivFlage: false,
            selectedImages: [],
            selectedImagesUrl: [],
            modelpopupFile: null,
            modelpopup: false,
            type: null,
            notrecordloading: false,
            documentphoto: process.env.REACT_APP_DOCUMENT_PHOTO_URL,
            documentFilephoto: process.env.REACT_APP_DOCUMENT_FILE_URL,
            userphoto: process.env.REACT_APP_PHOTO_URL,
        }
        this.fileInputRef = React.createRef();
        this.fileDocumentInputRef = React.createRef();
        this.interval = null;
    }

    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onMessageHandler = () => {
        let blockFlag;
        if (this.state.blockdata['blockUser'] === true) {
            blockFlag = 1;
            if (this.state.blockdata['send_block'] === true) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Block it!',
                    cancelButtonText: 'No, cancel!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        const login = JSON.parse(localStorage.getItem("userData"));
                        console.log("this.state.receivedId", this.state.receivedId);
                        Service.getBlockUserDelete(login.id, this.state.receivedId).then(response => {
                            if (response.data.status === "success") {
                                blockFlag = 0;
                                this.MessageSend(blockFlag);
                                Swal.fire('Success!', response.data.block_messge, 'success');
                            } else {
                                Swal.fire('Error', 'There was an error.', 'error');
                            }
                        }).catch(error => {
                            Swal.fire('Error', 'There was an error.', 'error');
                        });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Your item is safe :)', 'error');
                    }
                });
            } else {
                this.MessageSend(blockFlag);
            }
        } else {
            blockFlag = 0;
            this.MessageSend(blockFlag);
        }
    };

    onMessageHandlerUpdate = () => {
        var data = { id: this.state.editDivid, message: this.state.editDivmessage };
        Service.EditChat(data).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ editDivFlage: false });
                toast.success("Edit Message", { position: toast.POSITION.TOP_RIGHT });
            } else {
                this.setState({ editDivFlage: false });
                toast.error("Edit Message", { position: toast.POSITION.TOP_RIGHT });
            }
        });
    }

    handleDeleteAllChatUser = (rece_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Block it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const login = JSON.parse(localStorage.getItem("userData"));
                Service.getDeleteAllChatUser(login.id, rece_id).then(response => {
                    if (response.data.status === "success") {
                        Swal.fire('Success!', response.data.block_messge, 'success');
                    } else {
                        Swal.fire('Error', 'There was an error.', 'error');
                    }
                }).catch(error => {
                    Swal.fire('Error', 'There was an error.', 'error');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    }

    handleBlockUser = (rece_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Block it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const login = JSON.parse(localStorage.getItem("userData"));
                Service.getBlockUser(login.id, rece_id).then(response => {
                    if (response.data.status === "success") {
                        Swal.fire('Success!', response.data.block_messge, 'success');
                    } else {
                        Swal.fire('Error', 'There was an error.', 'error');
                    }
                }).catch(error => {
                    Swal.fire('Error', 'There was an error.', 'error');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    };

    MessageSend = async (blockFlage) => {
        const { selectedImages, type } = this.state;
        const login = JSON.parse(localStorage.getItem("userData"));
        const formData = new FormData();
        if (selectedImages.length > 0) {
            for (let i = 0; i < selectedImages.length; i++) {
                formData.append('image[]', selectedImages[i]);
            }
            formData.append('type', type);
        }
        formData.append('message', this.state.message);
        formData.append('sent_from', login.id);
        formData.append('sent_to', this.state.receivedId);
        formData.append('block_flage', blockFlage);
        Service.SaveMessage(formData).then((res) => {
            if (res.data.status === 'status') {
                this.setState({ message: '', selectedImages: [], selectedImagesUrl: [], type: null });
            } else {
                this.setState({ message: '', selectedImages: [], selectedImagesUrl: [], type: null });
            }
        })
    }

    viewInfoDataClose = () => {
        this.setState({ userviewflage: false });
    }

    viewInfoData(rece_id) {
        const login = JSON.parse(localStorage.getItem("userData"));
        Service.getViewInfo(login.id, rece_id).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ userviewinfo: res.data.userviewinfo, userviewflage: true });
            } else {
                this.setState({ userviewinfo: {}, userviewflage: true });
            }
        });
    };

    handleChildData = (data) => {
        this.setState({ receivedId: data });
        if (this.state.receivedId) {
            Service.getReceviceInfo(this.state.receivedId).then((res) => {
                if (res.data.status === 'success') {
                    this.setState({ receviuser: res.data.receviuser });
                } else {
                    this.setState({ receviuser: {} });
                }
            });
            const login = JSON.parse(localStorage.getItem("userData"));
            this.ChatList(login.id, data)
            this.interval = setInterval(() => this.ChatList(login.id, this.state.receivedId), 5000);
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async ChatList(user_id, rece_id) {
        Service.getChat(user_id, rece_id).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ chatdivflag: true, chat: res.data.chat, notrecordloading: true, blockdata: res.data.block_data });
            } else {
                this.setState({ chat: [], notrecordloading: false, chatdivflag: true, blockdata: res.data.block_data });
            }
        });
    }

    handleGalleryLinkClick = () => { this.fileInputRef.current.click(); };

    handleDocumentLinkClick = () => { this.fileDocumentInputRef.current.click(); }

    handleFileInputChange = (e) => {
        const files = e.target.files;
        const selectedImages = [...this.state.selectedImages];
        for (let i = 0; i < files.length; i++) {
            selectedImages.push(files[i]);
        }
        const selectedImageURLs = Array.from(files).map(file => URL.createObjectURL(file));
        this.setState({ selectedImages: selectedImages, selectedImagesUrl: selectedImageURLs, type: 'files' });
    };

    handleDocumentInputChange = (e) => {
        const files = e.target.files;
        const selectedImages = [...this.state.selectedImages];
        for (let i = 0; i < files.length; i++) {
            selectedImages.push(files[i]);
        }
        const selectedImageURLs = Array.from(files).map(file => URL.createObjectURL(file));
        this.setState({ selectedImages: selectedImages, selectedImagesUrl: selectedImageURLs, type: 'document' });
    };

    handleRemoveImage = (index) => {
        const updatedImages = [...this.state.selectedImages];
        updatedImages.splice(index, 1);
        const updatedImagesUrl = [...this.state.selectedImagesUrl];
        updatedImagesUrl.splice(index, 1);
        this.setState({ selectedImages: updatedImages, selectedImagesUrl: updatedImagesUrl });
    };

    handleCopyClick = (copy) => { this.setState({ message: copy }); }

    handleDownloadClick = (id) => {
        Service.getDownload(id).then((res) => { console.log("in", res); });
    }

    handleDeleteClick = (id) => {
        Service.getDeleteChat(id).then((res) => {
            if (res.data.status === 'success') {
                alert("Sucess");
            } else {
                alert("Error");
            }
        });
    }

    handleEditClick = (id, chatMessage) => { this.setState({ editDivmessage: chatMessage, editDivid: id, editDivFlage: true }); }

    handlepopupfile = (id) => {
        Service.getPopupmodelFile(id).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ modelpopupFile: res.data.data.file })
                this.setState({ modelpopup: true })
            } else {
                alert("Error");
            }
        });
    }

    handleClose = () => { this.setState({ modelpopup: false }) }

    render() {
        const login = JSON.parse(localStorage.getItem("userData"));
        if (!login) { return <Redirect to={'signin'} />; }
        return (
            <div className="main-layout">
                <NavBar />
                <SideBarUser sendDataToParent={this.handleChildData} />
                {this.state.chatdivflag ?
                    <main className="main main-visible">
                        <div className="chats">
                            <div className="chat-body">
                                <div className="chat-header">
                                    <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none" type="button" data-close="">
                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </button>
                                    <div className="media chat-name align-items-center text-truncate">
                                        <div className={`avatar ${this.state.receviuser.available === 'on' ? 'avatar-online d-none d-sm-inline-block mr-3' : 'avatar-busy d-none d-sm-inline-block mr-3'}`}>
                                            <img src={this.state.userphoto + this.state.receviuser.avatar} alt={this.state.receviuser.avatar} />
                                        </div>
                                        <div className="media-body align-self-center ">
                                            <h6 className="text-truncate mb-0">{this.state.receviuser.name} {this.state.receviuser.last_name}</h6>
                                            <small className="text-muted">{`${this.state.receviuser.available === 'on' ? 'Online' : 'Offline'}`}</small>
                                        </div>
                                    </div>
                                    <ul className="nav flex-nowrap">
                                        <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                                            <div className="dropdown">
                                                <Link className="nav-link text-muted px-1" to={"/"} role="button" title="Details" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </Link>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <div className="dropdown-item align-items-center d-flex" onClick={() => this.viewInfoData(this.state.receivedId)} data-chat-info-toggle="">
                                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>View Info</span>
                                                    </div>
                                                    <button className="dropdown-item align-items-center d-flex" onClick={() => this.handleDeleteAllChatUser(this.state.receviuser.id)}>
                                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        <span>Delete</span>
                                                    </button>
                                                    <button className="dropdown-item align-items-center d-flex text-danger" onClick={() => this.handleBlockUser(this.state.receviuser.id)}>
                                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                                        </svg>
                                                        <span>Block</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item list-inline-item d-sm-none mr-0">
                                            <div className="dropdown">
                                                <Link className="nav-link text-muted px-1" to={"/"} role="button" title="Details" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">

                                                    <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>

                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <Chat
                                    notrecordloading={this.state.notrecordloading}
                                    chat={this.state.chat}
                                    editDivFlage={this.state.editDivFlage}
                                    editDivid={this.state.editDivid}
                                    editDivmessage={this.state.editDivmessage}
                                    onChangehandler={this.onChangehandler}
                                    onMessageHandlerUpdate={this.onMessageHandlerUpdate}
                                    handlepopupfile={this.handlepopupfile}
                                    handleEditClick={this.handleEditClick}
                                    handleCopyClick={this.handleCopyClick}
                                    handleDeleteClick={this.handleDeleteClick}
                                    handleDownloadClick={this.handleDownloadClick}
                                    login={login}
                                    documentphoto={this.state.documentphoto}
                                    userphoto={this.state.userphoto}
                                    receviuser={this.state.receviuser}
                                />

                                <div className="selected-images" style={{ background: '#e5e9f2' }}>
                                    {this.state.selectedImagesUrl.map((imageURL, index) => (
                                        <>
                                            {this.state.type === 'files' ? <><img key={index} src={imageURL} alt={`Selected ${index}`} style={{ width: '100px', height: '100px' }} />
                                                <i className="fa fa-times-circle" onClick={() => this.handleRemoveImage(index)}></i></> : null}
                                            {this.state.type === 'document' ? <><img key={index} src={'https://png.pngtree.com/png-vector/20190129/ourmid/pngtree-document-vector-icon-png-image_355823.jpg'} alt={`Selected ${index}`} style={{ width: '100px', height: '100px' }} />
                                                <i className="fa fa-times-circle" onClick={() => this.handleRemoveImage(index)}></i></> : null}
                                        </>
                                    ))}
                                </div>
                                {/* Chat Footer Start */}
                                <div className="chat-footer">
                                    <div className="attachment">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm" type="button" data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                            <div className="dropdown-menu">
                                                <div>
                                                    <div className="dropdown-item" onClick={this.handleGalleryLinkClick}>
                                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Gallery</span>
                                                        <input type="file" ref={this.fileInputRef} style={{ display: 'none' }} multiple onChange={this.handleFileInputChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="dropdown-item" onClick={this.handleDocumentLinkClick}>
                                                        <svg className="hw-20 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Document</span>
                                                        <input type="file" ref={this.fileDocumentInputRef} style={{ display: 'none' }} multiple onChange={this.handleDocumentInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea className="form-control emojionearea-form-control" id="messageInput" rows="1"
                                        placeholder="Type your message here..." name="message" value={this.state.message} onChange={this.onChangehandler}></textarea>
                                    <div className="btn btn-primary btn-icon send-icon rounded-circle text-light mb-1" role="button" onClick={this.onMessageHandler}>
                                        <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Chat Footer End */}
                            </div>
                            {/* Chat Info Start  */}
                            {this.state.userviewflage ?
                                <div className="chat-info chat-info-visible">
                                    {/* {viewInfo_HTMLTABLE} */}
                                    <ViewInfo userviewinfo={this.state.userviewinfo} viewInfoDataClose={this.viewInfoDataClose} handlepopupfile={this.handlepopupfile} />
                                </div>
                                : null}
                            {/* Chat Info End */}
                        </div>
                    </main>
                    :
                    <main className="main">
                        <div className="chats">
                            <div className="d-flex flex-column justify-content-center text-center h-100 w-100">
                                <div className="container">
                                    <div className="avatar avatar-lg mb-2">
                                        <img className="avatar-img" src={this.state.userphoto + login.avatar} alt={login.avatar} />
                                    </div>
                                    <h5>Welcome, {login.name} {login.last_name}</h5>
                                    <p className="text-muted">Please select a chat to Start messaging.</p>
                                </div>
                            </div>
                        </div>
                    </main>
                }
                <div className={this.state.modelpopup === false ? "backdrop" : "backdrop backdrop-visible"}></div>
                {this.state.modelpopup ? (
                    <DocumentImages documentPhoto={this.state.documentphoto + this.state.modelpopupFile} handleClose={this.handleClose} />
                ) : null}
                <LeftSideBar />
            </div>
        );
    }
}

export default Home;