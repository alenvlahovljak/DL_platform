
// NEBITNA KOMPONENTA !!!!!!!!!!
// ZANEMARI !!!!




// import React from 'react';
// import '../../styling/styles.css';
// import Countries from '../../Countries'
// import { createUser } from '../../actions';
// import { connect } from 'react-redux';
// import axios from 'axios';

// class RegisterFrom extends React.Component {

//     state = {
//         name: '',
//         nameError: '',
//         lastName: '',
//         lastNameError: '',
//         password: '',
//         passwordError: '',
//         gender: '',
//         genderError: '',
//         dateOfBirth: '',
//         dateError: '',
//         street: '',
//         streetError: '',
//         streetNumber: '',
//         streetNumError: '',
//         postNumber: '',
//         postNumError: '',
//         municipality: '',
//         munipError: '',
//         country: '',
//         countryError: '',
//         town: '',
//         townError: '',
//         telephone: '',
//         telError: '',
//         email: '',
//         emailError: '', 
//         hidden: true
//         };

//     validate = () => {
//         let isError = false;
//         const errors = {
//             nameError: '',
//             lastNameError: '',
//             passwordError: '',
//             genderError: '',
//             dateError: '',
//             streetError: '',
//             streetNumError: '',
//             postNumError: '',
//             munipError: '',
//             countryError: '',
//             townError: '',
//             telError: '',
//             emailError: ''

//         };

//         if (!this.state.name) {
//             isError = true;
//             errors.nameError = <div className="ui negative message">Enter valid name</div>;
//         }

//         if (!this.state.lastName) {
//             isError = true;
//             errors.lastNameError = <div className="ui negative message">Enter valid last name</div>;
//         }

//         if (!this.state.password && !this.state.password.length < 6) {
//             isError = true;
//             errors.passwordError = <div className="ui negative message">Enter valid password</div>;
//         }

//         if (!this.state.gender) {
//             isError = true;
//             errors.genderError = <div className="ui negative message">Select valid gender</div>;
//         }

//         if (!this.state.dateOfBirth) {
//             isError = true;
//             errors.dateError = <div className="ui negative message">Enter valid date</div>;
//         }

//         if (!this.state.street) {
//             isError = true;
//             errors.streetError = <div className="ui negative message">Enter valid street name</div>;
//         }

//         if (!this.state.streetNumber) {
//             isError = true;
//             errors.streetNumError = <div className="ui negative message">Enter valid street number</div>;
//         }

//         if (!this.state.postNumber) {
//             isError = true;
//             errors.postNumError = <div className="ui negative message">Enter valid post number</div>;
//         }

//         if (!this.state.municipality) {
//             isError = true;
//             errors.munipError = <div className="ui negative message">Enter valid municipality name</div>;
//         }

//         if (!this.state.country) {
//             isError = true;
//             errors.countryError = <div className="ui negative message">Enter valid country name</div>;
//         }

//         if (!this.state.town) {
//             isError = true;
//             errors.townError = <div className="ui negative message">Enter valid town name</div>;
//         }

//         if (!this.state.telephone) {
//             isError = true;
//             errors.telError = <div className="ui negative message">Enter valid tel number</div>;
//         }

//         if (!this.state.email && !this.state.email.includes('@')) {
//             isError = true;
//             errors.emailError = <div className="ui negative message">Enter valid email</div>;
//         }

//         this.setState({
//             ...this.state,
//             ...errors
//         });

//         return isError;
//     };

//     toggleShow = (e) => {
//         this.setState({ 
//             hidden: !this.state.hidden
//          });
//     }

//     onFormSubmit = (formValues) => {
//         formValues.preventDefault();

//         const err = this.validate();
//         if (!err) {
//             this.setState({
//                 name: '',
//                 nameError: '',
//                 lastName: '',
//                 lastNameError: '',
//                 gender: '',
//                 genderError: '',
//                 dateOfBirth: '',
//                 dateError: '',
//                 street: '',
//                 streetError: '',
//                 streetNumber: '',
//                 streetNumError: '',
//                 postNumber: '',
//                 postNumError: '',
//                 municipality: '',
//                 munipError: '',
//                 country: '',
//                 countryError: '',
//                 town: '',
//                 townError: '',
//                 telephone: '',
//                 telError: '',
//                 email: '',
//                 emailError: ''

//             });
//         } 

//             const user = {
//             [formValues.target.name]: formValues.target.value
//         };

//         axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
//             .then(res => {
//                 console.log(res);
//                 console.log(res.data);
//             });

//              console.log(this.state)
//         }
    

//     onInputChange = e => {
//        this.setState({ [e.target.name]: e.target.value })
       
//     }

//     render() {
//         return (
//             <form id="border1" onSubmit={this.onFormSubmit} className="ui form">
                
//                 <div className="border">            
                      
//                 <div id="container" className="ui container">

//                 <div className="space">
                
//                 <div className="field">
//                 <h4>Name</h4>
//                 <input
//                     type="text"
//                     name='name'
//                     value={this.state.name}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your name...'
//                     />
//                     <div>{this.state.nameError}</div>
//                 </div>
                

//                 <div className="field">
//                 <h4>Last name</h4>
//                  <input
//                     type="text"
//                     name='lastName'
//                     value={this.state.lastName}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your last name'
//                 />
//                 <div>{this.state.lastNameError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Password</h4>
//                 <input
//                     type={this.state.hidden ? "password" : "text"}
//                     name='password'
//                     value={this.state.password}
//                     onChange={this.onInputChange}
//                     placeholder='Enter new password...'
//                     />
//                     <button className="ui mini black button" type="button" onClick={this.toggleShow}>Show / Hide</button>
//                     <div>{this.state.passwordError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Gender</h4>
//                 <select name='gender' value={this.state.gender} onChange={this.onInputChange} className="ui dropdown">
//                     <option value="" disabled>Select your gender</option>
//                     <option value={this.state.value} >Male</option>
//                     <option value={this.state.value} >Female</option>
//                 </select>
//                 <div>{this.state.genderError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Date of birth</h4>
//                 <input
//                     className="dob"
//                     type="date"
//                     name='dateOfBirth'
//                     value={this.state.dateOfBirth}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your date of birth'
//                 />
//                 <div>{this.state.dateError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Street</h4>
//                 <input
//                     type="text"
//                     name='street'
//                     value={this.state.street}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your street'
//                 />
//                 <div>{this.state.streetError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Street number</h4>
//                 <input
//                     type="number"
//                     name='streetNumber'
//                     value={this.state.streetNumber}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your street number'
//                 />
//                 <div>{this.state.streetNumError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Post number</h4>
//                 <input
//                     type="text"
//                     name='postNumber'
//                     value={this.state.postNumber}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your post number'
//                 />
//                 <div>{this.state.postNumError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Municipality</h4>
//                 <input
//                     type="text"
//                     name='municipality'
//                     value={this.state.municipality}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your municipality'
//                 />
//                 <div>{this.state.munipError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Country</h4>
//                 <select name="country" value={this.state.value} onChange={this.onInputChange} className="ui search dropdown">
//                     {Countries.map(c => {
//                         return <option name="country" key={c.value} value={c.value}>{c.name}</option>
//                     })}
//                 </select>             
//                 <div>{this.state.countryError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Town</h4>
//                 <input
//                     type="text"
//                     name='town'
//                     value={this.state.town}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your town'
//                 />
//                 <div>{this.state.townError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Telephone</h4>
//                 <input
//                     type="text"
//                     name='telephone'
//                     value={this.state.telephone}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your telephone'
//                 />
//                 <div>{this.state.telError}</div>
//                 </div>

//                 <div className="field">
//                 <h4>Email</h4>
//                 <input
//                     type="email"
//                     name='email'
//                     value={this.state.email}
//                     onChange={this.onInputChange}
//                     placeholder='Enter your email'                
//                 />
//                 <div>{this.state.emailError}</div>
//                 </div>

//                 <div className="field">                
//                 <button className="ui primary button">Register</button>
//                 </div>
//                 </div>
//                 </div>

//              </div>             
//             </form>

//         )
//     }
// }


// export default connect(
//     null, 
//     { createUser }
// )(RegisterFrom);