import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { format } from "date-fns";
class Chat extends Component {
    render() {
        let chat_HTMLTABLE = null;
        if (this.props.notrecordloading) {
            chat_HTMLTABLE =
                this.props.chat.length > 0 && this.props.chat.map((item, i) => {
                    const formattedTime = format(new Date(item.created_at), "h:mm a");
                    return (
                        <>
                            {/* <div className="message-divider sticky-top pb-2" data-label="Yesterday">&nbsp;</div> */}
                            {this.props.login.id === parseInt(item.sent_from) ?
                                <div className="message self" key={i}>
                                    <div className="message-wrapper">
                                        <div className="message-content">
                                            {this.props.editDivFlage === true ? (
                                                <>
                                                    {parseInt(this.props.editDivid) === parseInt(item.id) ? (
                                                        <>
                                                            <input type="hidden" value={this.props.editDivid} name="messageId" />
                                                            <textarea className="form-control emojionearea-form-control" id="messageInput" rows="1" placeholder="Type your message here..." name="editDivmessage" value={this.props.editDivmessage} onChange={this.props.onChangehandler}></textarea>
                                                            <button className="btn btn-primary text-light mb-1" onClick={this.props.onMessageHandlerUpdate}>Update</button>
                                                        </>
                                                    ) : (<span>{item.message}</span>)
                                                    }
                                                </>
                                            ) : <span>{item.message}</span>
                                            }
                                            <div className="form-row">
                                                {item.document.length > 0 && item.document.map((documentItem, k) => (
                                                    <div className="col" key={k}>
                                                        <div className="popup-media">
                                                            {documentItem.type === 'files' ? <img className="img-fluid rounded" src={this.props.documentphoto + documentItem.file} alt={documentItem.file} onClick={() => this.props.handlepopupfile(documentItem.id)} style={{ height: '100px' }} /> : null}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message-options">
                                        <div className="avatar avatar-sm">
                                            <img src={this.props.userphoto + this.props.login.avatar} alt={this.props.login.avatar} />
                                        </div>
                                        <span className="message-date">{formattedTime}</span>
                                        <div className="dropdown">
                                            <Link className="text-muted" to={'/'} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </Link>
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item d-flex align-items-center" onClick={() => this.props.handleCopyClick(item.message)}>
                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>Copy</span>
                                                </button>
                                                <button className="dropdown-item d-flex align-items-center" onClick={() => this.props.handleEditClick(item.id, item.message)}>
                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                    <span>Edit</span>
                                                </button>
                                                <button className="dropdown-item d-flex align-items-center text-danger" onClick={() => this.props.handleDeleteClick(item.id)}>
                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="message" key={i}>
                                    <div className="message-wrapper">
                                        <div className="message-content">
                                            <span>{item.message}</span>
                                            <div className="form-row">
                                                {item.document.length > 0 && item.document.map((documentItem, k) => (
                                                    <div className="col">
                                                        <div className="popup-media">
                                                            <img className="img-fluid rounded" src={this.props.documentphoto + documentItem.file} alt={documentItem.file} onClick={() => this.props.handlepopupfile(documentItem.id)} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message-options">
                                        <div className="avatar avatar-sm">
                                            <img src={this.props.userphoto + this.props.receviuser.avatar} alt={this.props.receviuser.avatar} />
                                        </div>
                                        <span className="message-date">{formattedTime}</span>
                                        <div className="dropdown">
                                            <Link className="text-muted" to={'/'} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <svg className="hw-18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                            </Link>
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item d-flex align-items-center" onClick={() => this.props.handleCopyClick(item.message)}>
                                                    <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>Copy</span>
                                                </button>
                                                {item.document.length > 0 && (
                                                    <button className="dropdown-item d-flex align-items-center" onClick={() => this.props.handleDownloadClick(item.id)}>
                                                        <svg className="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        <span>Download</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    );
                });
        } else {
            chat_HTMLTABLE = <div className="message self">
                <div className="message-wrapper">
                    <div className="message-content">
                        <span>message</span>
                    </div>
                </div>
                <div className="message-options">
                    <div className="avatar avatar-sm">
                        <img src="https://themes.mintycodes.com/quicky/assets/media/avatar/6.png" alt="6.png" />
                    </div>
                    <span className="message-date">9:12am</span>
                    <span className="message-status">Edited</span>
                </div>
            </div>
        }
        return (
            <div className="chat-content p-2" id="messageBody">
                <div className="container">
                    <div className="message-day">
                        {chat_HTMLTABLE}
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;