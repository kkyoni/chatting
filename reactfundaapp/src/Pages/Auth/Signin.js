import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Service from "../../services/EmployeeService";
toast.configure()
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSignInHandler = () => {
    this.setState({ isLoading: true });
    var data = {
      email: this.state.email,
      password: this.state.password,
    };
    Service.Login(data).then((res) => {
      if (res.data.status === 200) {
        console.log("Login==>:", res.data)
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        this.setState({
          isLoading: false,
          msg: res.data.message,
          redirect: true,
        });
        toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
        // window.location.reload(false);
      } else {
        toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT });
        this.setState({
          isLoading: false,
          errMsg: res.data.message,
        });
        setTimeout(() => {
          this.setState({ errMsg: "" });
        }, 2000);
      }
    })
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Redirect to="/" />;
    }
    const isLoading = this.state.isLoading;

    return (
      <div className="main-layout card-bg-1">
        <div className="container d-flex flex-column">
          <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4">
              <h1 className="font-weight-bold">Sign in</h1>
              <p className="text-dark mb-3">We are Different, We Make You Different.</p>
              <div className="mb-3">
                <div className="form-group">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input type="email" className="form-control form-control-md" id="email" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChangehandler} />
                  <span className="text-danger">{this.state.msg}</span>
                  <span className="text-danger">{this.state.errMsgEmail}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input type="password" className="form-control form-control-md" id="password" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChangehandler} />
                  <span className="text-danger">{this.state.errMsgPwd}</span>
                  <p className="text-danger" style={{ color: "red" }}>{this.state.errMsg}</p>
                </div>
                <div className="form-group d-flex justify-content-between">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" checked="" id="checkbox-remember" />
                    <label className="custom-control-label text-muted font-size-sm" htmlFor="checkbox-remember">Remember me</label>
                  </div>
                  <Link className="font-size-sm" to={"/forgot-password"}>Reset password</Link>
                </div>
                <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" onClick={this.onSignInHandler} > Sign in
                  {isLoading ? (
                    <i className="fa fa-refresh fa-spin"></i>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
              <p>Don't have an account? <Link className="font-weight-semibold" to={'/signup'}>Sign up</Link>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;