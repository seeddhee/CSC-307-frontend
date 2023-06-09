import Table from './Table'
import Form from './form'
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function MyApp() {
  const [characters, setCharacters] = useState([]);
  
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
 }

 async function makeDeleteCall(index){
   try {
      const response = await axios.delete(`http://localhost:8000/users/${index}`);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
}
function removeOneCharacter(id) {
   makeDeleteCall(id).then((result) => {
     if (result && result.status === 204) {
       const updatedCharacters = characters.filter((c) => c.id !== id);
       setCharacters(updatedCharacters);
     }
   });
 }
  
   
    function updateList(person) { 
      makePostCall(person).then( result => {
      if (result && result.status === 201)
         setCharacters([...characters, result.data] );
      });
   }


    async function makePostCall(person){
      try {
         const response = await axios.post('http://localhost:8000/users', person);
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

  

  

    useEffect(() => { //called when MyApp is mounted the data is fetched from backend once only when it is mounted
      fetchAll().then( result => {
         if (result)
            setCharacters(result);
       });
    }, [] );

    return (
        <div className="container">
   
           <Table characterData={characters} removeCharacter={removeOneCharacter} />
           <Form handleSubmit={updateList}></Form>
        </div>
      )
     
}

// used to perform side effects in your components





export default MyApp;

