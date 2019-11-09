import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import { Link } from 'react-router-dom';


class UserDetails extends React.Component {
    componentDidMount() {
        return this.props.fetchUser(this.props.match.params.id);
    }

    render() {
        if (!this.props.user) {
            return <h3>404 USER NOT FOUND !</h3>;
        }

        const { name, lastname, gender, date, street, streetNumber, postNumber, country, municipality, town, telephone, email } = this.props.user;

        return (
            <div>
                <h1>USER:</h1>
                <h4>{name}</h4>
                <h4>{lastname}</h4>
                <h4>{gender}</h4>
                <h4>{date}</h4>
                <h4>{street}</h4>
                <h4>{streetNumber}</h4>
                <h4>{postNumber}</h4>
                <h4>{country}</h4>
                <h4>{municipality}</h4>
                <h4>{town}</h4>
                <h4>{telephone}</h4>
                <h4>{email}</h4>
                <Link to={`/portal/users/delete/${this.props.match.params.id}`} className="ui negative button">
                    Delete User
                </Link>
            </div>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return { user: state.users[ownProps.match.params.id]};
};

export default connect(mapStateToProps, { fetchUser })(UserDetails);