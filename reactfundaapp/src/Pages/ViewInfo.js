import React, { Component } from "react";
import { Link } from 'react-router-dom';
class ViewInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documentphoto: process.env.REACT_APP_DOCUMENT_PHOTO_URL,
            documentFilephoto: process.env.REACT_APP_DOCUMENT_FILE_URL,
            userphoto: process.env.REACT_APP_PHOTO_URL,
        }
    }
    render() {
        return (
            <div className="d-flex h-100 flex-column">
                <div className="chat-info-header px-2">
                    <div className="container-fluid">
                        <ul className="nav justify-content-between align-items-center">
                            <li className="text-center">
                                <h5 className="text-truncate mb-0">Profile Details</h5>
                            </li>
                            <li className="nav-item list-inline-item">
                                <div className="nav-link text-muted px-0" onClick={this.props.viewInfoDataClose} data-chat-info-close="">
                                    <svg className="hw-22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hide-scrollbar flex-fill">
                    <div className="text-center p-3">
                        <div className="avatar avatar-xl mx-5 mb-3">
                            <img className="avatar-img" src={this.state.userphoto + this.props.userviewinfo.avatar} alt="" />
                        </div>
                        <h5 className="mb-1">{this.props.userviewinfo.name} {this.props.userviewinfo.last_name}</h5>
                        <p className="text-muted d-flex align-items-center justify-content-center">
                            <svg className="hw-18 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>India</span>
                        </p>
                    </div>
                    <div className="chat-info-group">
                        <a className="chat-info-group-header" data-toggle="collapse" href="#profile-info" role="button"
                            aria-expanded="true" aria-controls="profile-info">
                            <h6 className="mb-0">User Information</h6>
                            <svg className="hw-20 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                        <div className="chat-info-group-body collapse show" id="profile-info">
                            <div className="chat-info-group-content list-item-has-padding">
                                <ul className="list-group list-group-flush ">
                                    <li className="list-group-item border-0">
                                        <p className="small text-muted mb-0">Phone</p>
                                        <p className="mb-0">+{this.props.userviewinfo.mobile_number}</p>
                                    </li>
                                    <li className="list-group-item border-0">
                                        <p className="small text-muted mb-0">Email</p>
                                        <p className="mb-0">{this.props.userviewinfo.email}</p>
                                    </li>
                                    <li className="list-group-item border-0">
                                        <p className="small text-muted mb-0">Address</p>
                                        <p className="mb-0">{this.props.userviewinfo.address}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="chat-info-group">
                        <a className="chat-info-group-header" data-toggle="collapse" href="#shared-media" role="button"
                            aria-expanded="true" aria-controls="shared-media">
                            <h6 className="mb-0">Last Media</h6>
                            <svg className="hw-20 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>

                        <div className="chat-info-group-body collapse show" id="shared-media">
                            <div className="chat-info-group-content">
                                <div className="form-row">
                                    {this.props.userviewinfo.chatDetails.map((chat, chatIndex) => (
                                        <>
                                            {chat.document.map((doc, docIndex) => (
                                                <div className="col-4 col-md-2 col-xl-4" key={chatIndex}>
                                                    {doc.type === 'files' ? <img key={docIndex} className="img-fluid rounded" src={this.state.documentphoto + doc.file} alt={doc.file} onClick={() => this.props.handlepopupfile(doc.id)} /> : null}
                                                </div>
                                            ))}
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-info-group">
                        <a className="chat-info-group-header" data-toggle="collapse" href="#shared-files" role="button"
                            aria-expanded="true" aria-controls="shared-files">
                            <h6 className="mb-0">Documents</h6>
                            <svg className="hw-20 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <div className="chat-info-group-body collapse show" id="shared-files">
                            <div className="chat-info-group-content list-item-has-padding">
                                <ul className="list-group list-group-flush">
                                    {this.props.userviewinfo.chatDetails.map((chat, chatIndex) => (
                                        <>
                                            {chat.document.map((doc, docIndex) => (
                                                <>
                                                    {doc.type === 'document' ?
                                                        <li className="list-group-item">
                                                            <div className="document">
                                                                <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                                                                    <svg className="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="document-body">
                                                                    <h6 className="text-truncate">
                                                                        <a href={this.state.documentFilephoto + doc.file} className="text-reset"
                                                                            title={doc.file}>{doc.file}</a>
                                                                    </h6>

                                                                    <ul className="list-inline small mb-0">
                                                                        <li className="list-inline-item">
                                                                            <span className="text-muted">79.2 KB</span>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <span className="text-muted text-uppercase">docs</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="document-options ml-1">
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button"
                                                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                                            </svg>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <Link className="dropdown-item" to={'/'}>Download</Link>
                                                                            <Link className="dropdown-item" to={'/'}>Delete</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        : null}
                                                </>
                                            ))}
                                        </>
                                    ))}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewInfo;