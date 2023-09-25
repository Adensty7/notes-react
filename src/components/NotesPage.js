import React , { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Notes from './Notes';
import Navbar from './Navbar';

const NotesPage = () => {
    const cookies = new Cookies();

    const UserID = cookies.get('UserID');

    setTimeout(() => {
      window.location.reload(false);
    }, 300000);
    
    // cookies.remove('UserID');

    if (UserID === undefined){
      window.location.href = "/login";
    }

    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignOut = async() => {
        cookies.remove('UserID'); 
        window.location.reload(false);
    }

    useEffect(() => {
      document.title = "My Notes"
      axios.get("/notes/user/" + UserID)
      .then((res) => {
        //console.log(res.data);
        setNotes(res.data);
        setLoading(true);
      });
  }, [notes])

  const addNote = (userID, title, note) => {
    let options = {  
      year: "numeric", month: "long",  
      day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" 
    };   
    const date = new Date().toLocaleString("en-us", options)
    // console.log(date); 
    axios.post("https://adensty-todoapp-react-db-api.onrender.com/notes", {
        "userId": userID,
        "title": title,
        "note": note,
        "creationTime": date,
        "updationTime": date
      })
      .then((res) => {
        console.log(res);
      })
  }

  const deleteNote = (e, id) => {
    e.preventDefault();
      axios.delete("https://adensty-todoapp-react-db-api.onrender.com/notes/" + id)
      .then((res) => {
        console.log(res);
      })
  }

  const putNote = (id, title, note) => {
    let options = {  
      year: "numeric", month: "long",  
      day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" 
    };   
    const date = new Date().toLocaleString("en-us", options)
    // console.log(date); 
      axios.put("https://adensty-todoapp-react-db-api.onrender.com/notes/" + id, {
        "title": title,
        "note": note,
        "updationTime": date
      })
      .then((res) => {
        console.log(res);
      })
  }

    
    return ( 
        <div>
            {loading && <Navbar userID={UserID} handleSignOut={handleSignOut}  /> }
            {loading && <Notes notes={notes} userID={UserID} addNote={addNote} deleteNote={deleteNote} putNote={putNote} /> }
        </div>
     );
}
 
export default NotesPage;
