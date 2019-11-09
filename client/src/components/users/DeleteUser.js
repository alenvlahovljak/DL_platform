import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchUser, deleteUser } from '../../actions';
import { Link } from 'react-router-dom';

class UserDelete extends React.Component {

    componentDidMount() {
        return this.props.fetchUser(this.props.match.params.id);
    }
    


    renderActions() {
        const id = this.props.match.params.id;

        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteUser(id)} className="ui button negative">Delete</button>
                <Link to="/portal/users/list/:id" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    render() {
        return (
                <Modal 
                    title="Delete User"
                    content="Are you sure you want to delete this user?"
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { user: state.users[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchUser, deleteUser })(UserDelete);