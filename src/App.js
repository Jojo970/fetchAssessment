import React, {useState, useEffect} from 'react';
import axios from 'axios';
import validator from 'validator';
import "./App.css"


function App() {
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    occupation : '',
    state: '',
  });
  const [didSubmit, setDidSubmit] = useState(false)


  const [formDataFilled, setFormDataFilled] = useState({ // used just in case user mitigates HTML required tag
    name : true,
    email : true,
    password : true,
    occupation : false,
    state: false,
  });

  var allValuesFilled = true

  const checkInput = (name) => {
    console.log(name)
    const val = validator.isEmpty(formData.name);
    console.log(val)
    setFormDataFilled({...formDataFilled, [name]:val})
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target
  
    setFormData({ ...formData, [name]: value })
  }

  const changeCombined = (e) => {
    const { name, value } = e.target
    checkInput(name)
    onChangeInput(e)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    
    for (const [key, value] of Object.entries(formDataFilled)) { // just in case user is able to bypass HTML required tag through Google Console
      if (value) {
        allValuesFilled = false
        break
      }
      allValuesFilled = true
    }
    if (allValuesFilled) {
      axios.post('https://frontend-take-home.fetchrewards.com/form', formData)
      .then(res => setDidSubmit(true))
      .catch(err => console.log(err, 'error in creating user'))
    }
  }

  useEffect(() => { // get initial data
    axios.get('https://frontend-take-home.fetchrewards.com/form')
    .then((res) => {
        setOccupations(res.data.occupations)
        setStates(res.data.states)
    }).catch(err => console.log(err, "error in getting states and occupations"));
}, []);


  return (
    <body>
    
    <form onSubmit={submitHandler}>
      {didSubmit? (<div>
        <div> </div>
        <h1>Sign Up Successful!</h1>
        
      </div>) : (
        <div>
          <div>
      <h1>User Registration</h1>
          </div>
      
      <div>
        {allValuesFilled? (<span></span>) : (
          <span>All values must be filled</span>
        )}
      </div>

      <div>
        <label>Full Name: </label>
        <input required name = 'name' type = 'text' onChange = {changeCombined} ></input>
      </div>

      <div>
        <label>Email: </label>
        <input required name = 'email' type = 'email' onChange = {changeCombined}></input>
      </div>

      <div>
        <label>Password: </label>
        <input required name = 'password' type = 'password' onChange = {changeCombined}></input>
      </div>

      <div>
        <label>Occupation: </label>
        <select required name = 'occupation' value={formData.occupation} onChange = {changeCombined}>
          {occupations.map((occupation) => {
            return(
              <option key={occupation} >{occupation}</option>
          )
          })}
        </select>
      </div>

      <div>
        <label>State: </label>
        <select required name = 'state' value = {formData.state} onChange = {changeCombined}>
        {states.map((state) => {
            return(
              <option  key = {state.abreviation} >{state.name}</option>
          )
          })}
        </select>
      </div>
      <div>
          <button>Create User</button>
      </div>
          </div>
      )}
    </form>
    </body>
  );
}

export default App;
