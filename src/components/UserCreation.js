import React, {useState, useEffect} from 'react';
import axios from 'axios';


const UserCreation = () => {
  const [apiObj, setApiObj] = useState({});
  const [formData, setFormData] = useState({
    fullName : '',
    email : '',
    password : '',
    occupation : '',
    state: '',
  });

  useEffect(() => {
    axios.get('https://frontend-take-home.fetchrewards.com/form')
    .then((res) => {
        setApiObj(res)
        console.log(res, apiObj)
    }).catch(err => console.log(err, "error in getting states and occupations"));
}, []);


  return (
    <>
    <form>
      
    </form>
    </>
  )
}

export default UserCreation