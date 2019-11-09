import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions'; 
import { Link } from 'react-router-dom';

class UserList extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }
    
    renderList() {
        return this.props.users.map(user => {
            return (
                <div className="item" key={user.id}>
                <i className="large user icon" />
                <div className="content">
                    {user.name}
                    <div className="description">
                    {user.lastname}
                    </div>
                </div>
                    <Link style={{ textAlign: 'right' }} to={`/portal/users/details/${user.id}`} className="ui mini primary button">Show</Link>
                </div>
            )
        })
    }

    render() {
    return (
        <div>
            <h2>Users</h2>
            <div className="ui celled list">{this.renderList()}</div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { users: Object.values(state.users) }
}

export default connect(mapStateToProps, { fetchUsers })(UserList);