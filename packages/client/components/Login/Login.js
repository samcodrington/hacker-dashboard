import { actionCreators, selectors } from '../../HackerStore';
import { Redirect } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../Forms/LoginForm';
import './Login.less';

const { getLoginLoading, getAuthenticated, getIsLoginError, getApplicationsStatus } = selectors;
const { login } = actionCreators;

class Login extends Component {

    constructor(props) {
        super(props);

        this.renderLoginForm.bind(this);
        this.getRedirectPath.bind(this);
    }

    handleLogin(values) {
        this.props.login(values);
    }

    getRedirectPath() {
        const locationState = this.props.location.state;

        if (locationState && locationState.from.pathname) {
            return locationState.from.pathname;
        }

        return '/';
    }

    renderLoginForm() {
        const { applicationsStatus, loginLoading, loginError } = this.props;
        return (
            <div className="login-form-wrapper">
                <img src={require('../../assets/img/qhacks-tricolor-logo.svg')}
                     className="qhacks-logo-login"/>
                <LoginForm onSubmit={this.handleLogin.bind(this)}
                           applicationsStatus={applicationsStatus}
                           loginLoading={loginLoading}
                           loginError={loginError}/>
            </div>
        );
    }

    renderLoginDisplay() {
        return (
            <div className="login-picture">
                <div className="login-picture-overlay">
                    <div>
                        <Header as="h1"
                                className="fontWeight-normal"
                                inverted
                                size="huge">
                            Dream it. Build it.
                        </Header>
                        <Header as="h2"
                                className="fontWeight-lighter"
                                inverted
                                size="medium">
                            QHacks 2018, Queen's University
                        </Header>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { authenticated } = this.props;

        if (authenticated) {
            return (
                <Redirect to={{
                    pathname: this.getRedirectPath(), state: {
                        from: this.props.location
                    }
                }}/>
            );
        }

        return (
            <div className="login-container">
                {this.renderLoginForm()}
                {this.renderLoginDisplay()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        authenticated: getAuthenticated(state),
        loginLoading: getLoginLoading(state),
        loginError: getIsLoginError(state),
        applicationsStatus: getApplicationsStatus(state)
    };
}

export default connect(mapStateToProps, { login })(Login);
