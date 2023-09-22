import React, { Component } from "react";
import NavBar from "./NavBar";
import LeftSideBar from "./LeftSideBar";
import { Redirect, Link } from 'react-router-dom';
import Service from "../../services/EmployeeService";
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            last_name: '',
            mobile_number: '',
            birth_date: '',
            website: '',
            address: '',
            email: '',
            avatar: '',
            errMsgName: '',
            errMsgLastName: '',
            errMsgMobileNumber: '',
            errMsgBirthDate: '',
            errMsgWebSite: '',
            errMsgAddress: '',
            errMsgEmail: '',
            image: '',
            userphoto: process.env.REACT_APP_PHOTO_URL,
        }
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onLogoutHandler = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isLoggedIn');
    };
    saveProfile = async (e) => {
        const login = JSON.parse(localStorage.getItem("userData"));
        var data = {
            name: this.state.name,
            last_name: this.state.last_name,
            mobile_number: this.state.mobile_number,
            birth_date: this.state.birth_date,
            website: this.state.website,
            email: this.state.email,
            address: this.state.address,
            id: login.id
        };
        Service.SaveUserProfile(data).then((res) => {
            if (res.data.status === 'success') {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(res.data.user));
                this.setState({
                    msg: res.data.message,
                    redirect: true,
                });
                window.location.reload(false);
                // this.props.history.push('/profile');
            } else if (res.data.status === "validtion") {
                this.setState({
                    errMsgName: res.data.firstnamemessage,
                    errMsgLastName: res.data.lastnamemessage,
                    errMsgMobileNumber: res.data.mobilenumbermessage,
                    errMsgBirthDate: res.data.birthdatemessage,
                    errMsgWebSite: res.data.websitemessage,
                    errMsgAddress: res.data.addressmessage,
                    errMsgEmail: res.data.emailmessage,
                });
                setTimeout(() => {
                    this.setState({ errMsgName: "", errMsgLastName: "", errMsgMobileNumber: "", errMsgBirthDate: "", errMsgWebSite: "", errMsgAddress: "", errMsgEmail: "" });
                }, 2000);
            } else {
                this.setState({
                    errMsg: res.data.message,
                });
                setTimeout(() => {
                    this.setState({ errMsg: "" });
                }, 2000);
            }
        })
    }
    async componentDidMount() {
        const login = JSON.parse(localStorage.getItem("userData"));
        if (!login) {
            return <Redirect to={'signin'} />;
        }
        this.setState({
            name: login.name,
            last_name: login.last_name,
            mobile_number: login.mobile_number,
            birth_date: login.birth_date,
            website: login.website,
            address: login.address,
            email: login.email,
        });
    }

    render() {
        const login = JSON.parse(localStorage.getItem("userData"));
        if (!login) {
            return <Redirect to={'signin'} />;
        }
        return (
            <div className="main-layout">
                <NavBar />
                <aside className="sidebar">
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile-content">
                            <div className="d-flex flex-column h-100">
                                <div className="hide-scrollbar">
                                    <div className="sidebar-header sticky-top p-2 mb-3">
                                        <h5 className="font-weight-semibold">Profile</h5>
                                        <p className="text-muted mb-0">Personal Information & Settings</p>
                                    </div>
                                    <div className="container-xl">
                                        <div className="row">
                                            <div className="col">
                                                <div className="card card-body card-bg-5">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <div className="avatar avatar-lg mb-3">
                                                            <img className="avatar-img" src={this.state.userphoto + login.avatar} alt={login.avatar} />
                                                        </div>

                                                        <div className="d-flex flex-column align-items-center">
                                                            <h5>{login.name} {login.last_name}</h5>
                                                        </div>

                                                        <div className="d-flex">
                                                            <button className="btn btn-outline-default mx-1" type="button" onClick={this.onLogoutHandler}>
                                                                <svg className="hw-18 d-none d-sm-inline-block" fill="none" viewBox="0 0 24 24"
                                                                    stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="card-options">
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted text-muted"
                                                                type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <svg className="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                                </svg>
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <Link className="dropdown-item" to={"/"}>Change Profile Picture</Link>
                                                                <Link className="dropdown-item" to={"/"}>Change Number</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card mt-3">
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Birthdate</p>
                                                                    <p className="mb-0">{this.state.birth_date}</p>
                                                                </div>
                                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Phone</p>
                                                                    <p className="mb-0">+{this.state.mobile_number}</p>
                                                                </div>
                                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Email</p>
                                                                    <p className="mb-0">{this.state.email}</p>
                                                                </div>
                                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item py-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Website</p>
                                                                    <p className="mb-0">{this.state.website}</p>
                                                                </div>
                                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                        <li className="list-group-item pt-2">
                                                            <div className="media align-items-center">
                                                                <div className="media-body">
                                                                    <p className="small text-muted mb-0">Address</p>
                                                                    <p className="mb-0">{this.state.address}</p>
                                                                </div>
                                                                <svg className="text-muted hw-20 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                                </svg>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <main className="main">
                    <div className="profile">
                        <div className="container-xl px-2 px-sm-3">
                            <div className="row">
                                <div className="col">
                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h6 className="mb-1">Account</h6>
                                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="firstName">First Name</label>
                                                        <input type="text" className="form-control form-control-md" id="firstName"
                                                            placeholder="Type your first name" name="name" onChange={this.handleInput} value={this.state.name} />
                                                        <span className="text-danger">{this.state.errMsgName}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Last Name</label>
                                                        <input type="text" className="form-control form-control-md" id="lastName"
                                                            placeholder="Type your last name" name="last_name" onChange={this.handleInput} value={this.state.last_name} />
                                                        <span className="text-danger">{this.state.errMsgLastName}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="mobileNumber">Mobile number</label>
                                                        <input type="text" className="form-control form-control-md" id="mobileNumber"
                                                            placeholder="Type your mobile number" name="mobile_number" onChange={this.handleInput} value={this.state.mobile_number} />
                                                        <span className="text-danger">{this.state.errMsgMobileNumber}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="birthDate">Birth date</label>
                                                        <input type="text" className="form-control form-control-md" id="birthDate" placeholder="dd/mm/yyyy"
                                                            name="birth_date" onChange={this.handleInput} value={this.state.birth_date} />
                                                        <span className="text-danger">{this.state.errMsgBirthDate}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="emailAddress">Email address</label>
                                                        <input type="email" className="form-control form-control-md" id="emailAddress"
                                                            placeholder="Type your email address" name="email" onChange={this.handleInput} value={this.state.email} />
                                                        <span className="text-danger">{this.state.errMsgEmail}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="webSite">Website</label>
                                                        <input type="text" className="form-control form-control-md" id="webSite"
                                                            placeholder="Type your website" name="website" onChange={this.handleInput} value={this.state.website} />
                                                        <span className="text-danger">{this.state.errMsgWebSite}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="Address">Address</label>
                                                        <input type="text" className="form-control form-control-md" id="Address"
                                                            placeholder="Type your address" name="address" onChange={this.handleInput} value={this.state.address} />
                                                        <span className="text-danger">{this.state.errMsgAddress}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-footer d-flex justify-content-end">
                                            <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                                            <button type="button" className="btn btn-primary" onClick={this.saveProfile}>Save Changes</button>
                                        </div>
                                    </div>


                                    <div className="card mb-3">
                                        <div className="card-header">
                                            <h6 className="mb-1">Password</h6>
                                            <p className="mb-0 text-muted small">Update personal &amp; contact information</p>
                                        </div>

                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="current-password">Current Password</label>
                                                            <input type="password" className="form-control form-control-md" id="current-password"
                                                                placeholder="Current password" autocomplete="on" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="new-password">New Password</label>
                                                            <input type="password" className="form-control form-control-md" id="new-password"
                                                                placeholder="New password" autocomplete="off" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="repeat-password">Repeat Password</label>
                                                            <input type="password" className="form-control form-control-md" id="repeat-password"
                                                                placeholder="Repeat password" autocomplete="off" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="card-footer d-flex justify-content-end">
                                            <button type="button" className="btn btn-link text-muted mx-1">Reset</button>
                                            <button type="button" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <LeftSideBar />
            </div>
        );
    }
}

export default Profile;