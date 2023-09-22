import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Service from "../../services/EmployeeService";
class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        isLoading: false,
    };
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    saveSignup = async (e) => {
        this.setState({ isLoading: true });
        var data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        Service.Signup(data).then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
                this.setState({
                    first_name: '',
                    last_name: '',
                    email: '',
                    message: '',
                    isLoading: false,

                });
                this.props.history.push('/Signin');
            } else {
                this.setState({ isLoading: false });
                toast.error(res.data.message, { position: toast.POSITION.TOP_RIGHT });
            }
        })
    }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="main-layout card-bg-1">
                <div className="container d-flex flex-column">
                    <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                        <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                            <h1 className="font-weight-bold">Sign up</h1>
                            <p className="text-dark mb-3">We are Different, We Make You Different.</p>
                            <form className="mb-3" method="post" onSubmit={this.saveSignup}>
                                <div className="form-group">
                                    <label for="name" className="sr-only">Name</label>
                                    <input type="text" className="form-control form-control-md" id="name" placeholder="Enter your name" name="name" required="" onChange={this.handleInput} value={this.state.name} />
                                </div>
                                <div className="form-group">
                                    <label for="email" className="sr-only">Email Address</label>
                                    <input type="email" className="form-control form-control-md" id="email" placeholder="Enter your email" name="email" required="" onChange={this.handleInput} value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <label for="password" className="sr-only">Password</label>
                                    <input type="password" className="form-control form-control-md" id="password" placeholder="Enter your password" name="password" required="" onChange={this.handleInput} value={this.state.password} />
                                </div>
                                <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold">Sign up
                                    {isLoading ? (
                                        <i className="fa fa-refresh fa-spin"></i>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </form>
                            <p>Already have an account? <Link to={'/signin'} className="font-weight-semibold">Sign in</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;