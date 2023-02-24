import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

  const onChangeInput = (e) => {
    const { name, value } = e.target
  
    setFormData({ ...formData, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    axios.post('https://frontend-take-home.fetchrewards.com/form', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err, 'error in creating user'))
  }


  useEffect(() => {
    axios.get('https://frontend-take-home.fetchrewards.com/form')
    .then((res) => {
        setOccupations(res.data.occupations)
        setStates(res.data.states)
    }).catch(err => console.log(err, "error in getting states and occupations"));
}, []);


  return (
    <>
    <form onSubmit={submitHandler}>
      <h1>User Registration</h1>

      <div>
        <label>Full Name: </label>
        <input required name = 'name' type = 'text' onChange = {onChangeInput}></input>
      </div>

      <div>
        <label>Email: </label>
        <input required name = 'email' type = 'email' onChange = {onChangeInput}></input>
      </div>

      <div>
        <label>Password: </label>
        <input required name = 'password' type = 'password' onChange = {onChangeInput}></input>
      </div>

      <div>
        <label>Occupation: </label>
        <select required name = 'occupation' value={formData.occupation} onChange = {onChangeInput}>
          {occupations.map((occupation) => {
            return(
              <option key={occupation} >{occupation}</option>
          )
          })}
        </select>
      </div>

      <div>
        <label>State: </label>
        <select required name = 'state' value = {formData.state} onChange = {onChangeInput}>
        {states.map((state) => {
            return(
              <option  key = {state.abreviation} >{state.name}</option>
          )
          })}
        </select>
      </div>
          <button>Create User</button>
    </form>
    </>
  );
}

export default App;
