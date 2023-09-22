import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Service from "../../services/EmployeeService";
class ForgotPassword extends Component {
    state = {
        email: '',
        isLoading: false,
    };
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveForget = async (e) => {
        this.setState({ isLoading: true });
        var data = {
            email: this.state.email,
        };
        Service.ForgotPassword(data).then((res) => {
            if (res.data.status === 'success') {
                toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
                this.setState({
                    email: '',
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
            <div>
                <section className="w3l-forms-23">
                    <div className="forms23-block">
                        <div className="wrapper">
                            <div className="d-grid forms23-grids">
                                <div className="form23">
                                    <img src="assets/images/testi2.jpg" alt="" className="img-responsive" />
                                    <h6>Forgot Password</h6>
                                    <form method="post" onSubmit={this.saveForget}>
                                        <input type="email" name="email" className="input-form" placeholder="Enter The Email" required="" onChange={this.handleInput} value={this.state.email} />
                                        <button className="buttonload btn button-eff">Submit
                                            {isLoading ? (
                                                <i className="fa fa-refresh fa-spin"></i>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    <p>Already have an account? <Link to={'/signin'}>Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ForgotPassword;