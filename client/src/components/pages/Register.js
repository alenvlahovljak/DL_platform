import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../../actions'
import Countries from '../../Countries'

class Register extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui mini error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    
    renderInput = ({ input, label, meta, type }) => {
        return (
            <div className="ui field">
                <label>{label}</label>
                <input {...input} type={type} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    
    renderGenderMenu = ({ input, label, meta, data }) => {
        return(
            <div className="ui field">
            <label>{label}</label>
            <select {...input} className="ui dropdown">
                <option disabled>Select your gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>
            {this.renderError(meta)}
            </div>
        );
    }

    renderDateMenu = ({ label, meta }) => {
        return (
            <div className="ui field">
                <label>{label}</label>
                <input
                    type="date"
                    name='dateOfBirth'
                />
                {this.renderError(meta)}
            </div>
        );
    }

    renderCountryMenu = ({ input, meta, label }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
        <div className={className}>
            <label>{label}</label>
            <select {...input} 
                name="country" 
                className="ui search dropdown">
                {Countries.map(c => {
                    return <option name="country" key={c.value} value={c.value}>{c.name}</option>
                    })}
            </select>             
        </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.createUser(formValues);

        console.log(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field 
                    name="name" 
                    component={this.renderInput} 
                    label="Name"
                    />
                <Field 
                    name="lastname"
                    component={this.renderInput}
                    label="Lastname"
                    />
                <Field 
                    name="password"
                    type="password"
                    component={this.renderInput}
                    label="Password"
                    />
                <Field 
                    name="gender"
                    component={this.renderGenderMenu}
                    
                    label="Gender"
                    />
                <Field 
                    name="date"
                    type="date"
                    component={this.renderInput}
                    label="Date of birth"
                    />
                <Field 
                    name="street"
                    component={this.renderInput}
                    label="Street Name"
                    />
                <Field 
                    name="streetNumber"
                    component={this.renderInput}
                    label="Street Number"
                    />
                <Field 
                    name="postNumber"
                    component={this.renderInput}
                    label="Post Number"
                    />
                <Field 
                    name="municipality"
                    component={this.renderInput}
                    label="Municipality"
                    />    
                <Field 
                    name="country"
                    component={this.renderCountryMenu}
                    label="Country"
                    /> 
                <Field 
                    name="town"
                    component={this.renderInput}
                    label="Town"
                    /> 
                <Field 
                    name="telephone"
                    type="number"
                    component={this.renderInput}
                    label="Telephone"
                    />     
                <Field 
                    name="email"
                    component={this.renderInput}
                    label="Email"
                    />
                <button className="ui primary button">Submit</button>
            </form>
        ); 
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.name) {
        errors.name = "Enter valid name";     
    }

    if (!formValues.lastname) {
        errors.lastname = "Enter valid lastname";     
    }

    if (!formValues.password) {
        errors.password = "Enter valid passord";     
    }

    if (!formValues.gender) {
        errors.gender = "Select valid gender";     
    }

    if (!formValues.date) {
        errors.date = "Select valid date";     
    }

    if (!formValues.street) {
        errors.street = "Enter valid street name";     
    }

    if (!formValues.streetNumber) {
        errors.streetNumber = "Enter valid street number";     
    }

    if (!formValues.postNumber) {
        errors.postNumber = "Enter valid post number";     
    }

    if (!formValues.municipality) {
        errors.municipality = "Enter valid municipality name";     
    }

    if (!formValues.country) {
        errors.country = "Enter valid country name";     
    }

    if (!formValues.town) {
        errors.town = "Enter valid town name";     
    }

    if (!formValues.telephone) {
        errors.telephone = "Enter valid telephone number";     
    }

    if (!formValues.email) {
        errors.email = "Enter valid email adress";     
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = "Enter valid email adress";
    }

    return errors;
};

const formWrapped = reduxForm({
    form: 'register',
    validate
})(Register);

export default connect(null, { createUser })(formWrapped);