import React, { useState } from 'react';

const Notes = (props) => {
    const {notes, userID, addNote, deleteNote, putNote} = props;

    // For adding note
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    // For updating note
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateNote, setUpdateNote] = useState('');
    const [updateId, setUpdateId] = useState('');

    const [isError, setIsError] = useState(false);
    const [Error, setError] = useState('');
    
    const handleAddNote = (e, userID, title, note) => {
        e.preventDefault();
        const checkNote = notes.every(n => {
          return n.title !== title;
        });
        if(title.length > 50) {
            setIsError(true);
            setError("Title should be less than 50 characters.");
        }
        else if (note.length > 255) {
            setIsError(true);
            setError("Note should be less than 256 characters.");
        }
        else if (!checkNote) {
          setIsError(true);
          setError("A note with that title already exists.");
        }
        else {
            setError(false);
            addNote(userID, title, note);
            e.target.title.value = "";
            e.target.note.value = "";
        }
        
        
    }

    const handleUpdateNote = (e, id, title, note) => {
        e.preventDefault();
        const checkNote = notes.every(n => {
          return n.title !== updateTitle;
        });
        if(title.length > 50) {
            setIsError(true);
            setError("Title should be less than 50 characters.");
        }
        else if (note.length > 255) {
            setIsError(true);
            setError("Note should be less than 256 characters.");
        }
        else if (!checkNote) {
          setIsError(true);
          setError("A note with that title already exists.");
        }
        else {
            setIsError(false);
            putNote(id, title, note);
        }
        
        e.target.title.value = "";
        e.target.note.value = "";
    }

    console.log(notes);
    return ( 
        
        <div class="notes">
        <div
                  class="modal fade"
                  id="addNoteModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="addNoteModal"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered" >
                    <div class="modal-content bg-dark text-blue">
                      <div class="modal-header">
                        <h5 class="modal-title" id="addNoteModalLabel">
                          Add Note
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body text-center">
                        <form onSubmit={(e) => handleAddNote(e, userID, title, note)}
                        >
                          <div class="text-start my-3 px-3">
                            <input class="form-control mb-3" type="text" name="title" placeholder='Title' required onChange={(e) => setTitle(e.target.value)}></input>
                            <textarea class="form-control mb-3" name="note" placeholder='Start typing' required onChange={(e) => setNote(e.target.value)}></textarea>
                            {isError && <div class="row px-3 text-start"><div class="col-12"><span class="errors fs-6 fw-bold">{Error}</span></div></div>}
                          </div>
                          
                          <button type="submit" class="btn btn-primary mb-3 hover-link">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div
                  class="modal fade"
                  id="updateNoteModal"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="updateNoteModal"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered" >
                    <div class="modal-content bg-dark text-blue">
                      <div class="modal-header">
                        <h5 class="modal-title" id="updateNoteModalLabel">
                          Edit Note
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body text-center">
                        <form onSubmit={(e) => handleUpdateNote(e, updateId, updateTitle, updateNote)}
                        >
                          <div class="text-start my-3 px-3">
                            <input class="form-control mb-3" type="text" name="title" placeholder='Title' value={updateTitle} required onChange={(e) => setUpdateTitle(e.target.value)}></input>
                            <textarea class="form-control mb-3" name="note" placeholder='Start typing' value={updateNote} required onChange={(e) => setUpdateNote(e.target.value)}></textarea>
                            {isError && <div class="row px-3 text-start"><div class="col-12"><span class="errors fs-6 fw-bold">{Error}</span></div></div>}
                          </div>
                          
                          <button type="submit" class="btn btn-success mb-3 hover-link">
                            Update
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button data-bs-toggle="modal"
                            data-bs-target="#addNoteModal"
                            onClick={(e) => {
                              setIsError(false);
                            }}
        type="button"
        class="btn btn-primary btn-floating btn-lg hover-link"
        id="btn-back-to-top"
        >
  <i class="fa-solid fa-plus text-white" ></i>
  </button>
        <div class="row justify-content-center align-items-center p-3 m-3">
        { notes.length == 0 && <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 px-3">
        <div class="card mb-4 bg-dark text-blue border-white my-5">
        <div class="card-body">
                    <p class="card-text fs-5">You dont have any notes currently.</p>
                </div>
        </div>
        </div>  }
        { notes.map((n) =>
        
         { 
            console.log(n.note.length);
            const noteTitle = n.title.length > 15 ? n.title.substring(0, 15) + "..." : n.title.substring(0, 15);
            const noteNote = n.note.length > 100 ? n.note.substring(0, 100) + "..." : n.note.substring(0, 100);
            const dt = n.creationTime.split(" at ");
            const time = dt[1].substring(0,5) + dt[1].substring(8,11);
            const udt = n.updationTime.split(" at ");
            const utime = udt[1].substring(0,5) + udt[1].substring(8,11);
            return (
        <div class="col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 px-3">
            <div class="card mb-4 bg-dark text-blue note-card border-white">
                <div class="card-header border-bottom">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-10">
                        <h2 >{noteTitle}</h2>
                        </div>
                        <div class="col-2">
                        <span class="float-end">
                        <i class="fa-solid fa-xmark hover-link h2" onClick={(e) => deleteNote(e, n._id)}></i>
                        </span>
                        </div>
                    </div>
                </div>
                <div class="card-body border-bottom">
                    <p class="card-text fs-5 hover-link" data-bs-toggle="modal"
                            data-bs-target="#updateNoteModal" onClick={(e) => {
                                setUpdateId(n._id)
                                setUpdateNote(n.note)
                                setUpdateTitle(n.title)
                                setIsError(false)
                            }}>{noteNote}</p>  
                </div>
                <div class="card-footer">
                    <div class="row justify-content-center">
                    <div class="col-6"><h5>{dt[0]}</h5>
                    </div>
                    <div class="col-6"><span class="text-end"><h5>{time}</h5></span>
                    </div>
                    <div class="col-12">
                    <h5>Last updated: {udt[0] + ", " + utime}</h5>
                    </div>
                    </div>
                    
                </div>
        </div>
        </div> 
        )}
        )}
        </div>
        </div>
        
    );
}
 
export default Notes;
