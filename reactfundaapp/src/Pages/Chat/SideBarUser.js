import React, { Component } from "react";
import Service from "../../services/EmployeeService";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
class SideBarUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            searchUsers: '',
            photo: process.env.REACT_APP_PHOTO_URL,
        }
        this.interval = null;
    }
    sendData(id) {
        this.props.sendDataToParent(id);
        const login = JSON.parse(localStorage.getItem("userData"));
        this.ChatStatus(id, login.id);
    };
    ChatStatus(sent_from, sent_to) {
        Service.getChatStatus(sent_from, sent_to).then((res) => {
            // console.log("Sucess");
        });

    }
    handleSearch = (event) => {
        const query = event.target.value;
        this.setState({ searchUsers: query });
        // Filter data based on the search query
        const filteredData = this.state.user.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        this.setState({ user: filteredData });
    };
    async componentDidMount() {
        const login = JSON.parse(localStorage.getItem("userData"));
        this.UserGet(login.id);
        if (login.id) {
            this.interval = setInterval(() => this.UserGet(login.id), 5000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    onLogoutHandler = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
        toast.success("User Logout", { position: toast.POSITION.TOP_RIGHT });
    };
    async UserGet(id) {
        Service.getUser(id).then((res) => {
            if (res.data.status === 'success') {
                this.setState({ user: res.data.user, notrecordloading: true });
            } else {
                this.setState({ user: [], notrecordloading: false });
            }
        });
    }
    render() {
        var user_HTMLTABLE = "";
        if (this.state.notrecordloading) {
            user_HTMLTABLE =
                this.state.user.map((item, i) => {
                    return (
                        <li className="contacts-item friends" key={i} onClick={() => this.sendData(item.id)}>
                            <div className="contacts-link">
                                <div className={`avatar ${item.available === 'on' ? 'avatar-online' : 'avatar-busy'}`}>
                                    <img src={this.state.photo + item.avatar} alt={item.avatar} />
                                </div>
                                <div className="contacts-content">
                                    <div className="contacts-info">
                                        <h6 className="chat-name text-truncate">{item.name}</h6>
                                        <div className="chat-time">Just now</div>
                                    </div>
                                    {item.sent_messages_count.length > 0 ?
                                        <div className="contacts-texts">
                                            <p className="text-truncate">{item.sent_messages_count[0].last_message}</p>
                                            {item.sent_messages_count[0].count === '0' ? null : <div className="badge badge-rounded badge-primary ml-1">{item.sent_messages_count[0].count}</div>}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </li>
                    );
                });
        } else {
            user_HTMLTABLE = <div>Data Not Found...</div>
        }

        return (
            <aside className="sidebar">
                <div className="tab-content">
                    <div className="tab-pane active" id="chats-content">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar h-100" id="chatContactsList">
                                <div className="sidebar-header sticky-top p-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="font-weight-semibold mb-0">Chats</h5>
                                        <ul className="nav flex-nowrap">
                                            <li className="nav-item list-inline-item mr-0">
                                                <div className="dropdown">
                                                    <Link className="nav-link text-muted px-1" to={"/"} role="button" title="Details"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </Link>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <Link className="dropdown-item" to="/" role="button" data-toggle="modal"
                                                            data-target="#startConversation" onClick={this.onLogoutHandler}
                                                        >Logout</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sidebar-sub-header">
                                        <form className="form-inline">
                                            <div className="input-group">
                                                <input type="text" className="form-control search border-right-0 transparent-bg pr-0"
                                                    placeholder="Search users" value={this.state.searchUsers} onChange={this.handleSearch} />
                                                <div className="input-group-append">
                                                    <div className="input-group-text transparent-bg border-left-0" role="button">
                                                        <svg className="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <ul className="contacts-list" id="chatContactTab" data-chat-list="">
                                    {user_HTMLTABLE}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default SideBarUser;