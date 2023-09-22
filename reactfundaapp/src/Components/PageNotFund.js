import React, { Component } from "react";
import { Link } from 'react-router-dom';
class PageNotFund extends Component {
    render() {
        return (
            <div>
                <div className="w3l-error-main">
                    <div className="error">
                        <div className="wrapper">
                            <div id='error-page'>
                                <div id='error-inner'>
                                    <h2>The page you were looking for was moved or doesn't exit.</h2>
                                    <div className="pesan-eror">404</div>
                                    <p className="balik-home"><Link to='/'>Let's get you back</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFund;