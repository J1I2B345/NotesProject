import { saveNote, deleteNote,getNote, updateNote } from "./socket.js"

const notesList = document.querySelector('#notes')

let saveId= ''

const createDiv = (e) => {
    const div = document.createElement('div')
    div.innerHTML = `
            <div class="card card-body rounded-0 mb-2 animate__animated animate__fadeInUp"> 
                <div class= 'd-flex justify-content-between'>
                    <h1 > ${e.title} </h1> 
                    <div> 
                        <button class='btn btn-danger delete' data-id=${e._id}> Delete </button>
                        <button class='btn btn-secondary update' data-id=${e._id}> Update </button>
                    </div>
                </div>
                <p> ${e.description} </p>
            </div>`  
    notesList.appendChild(div)

    const btnDelete = div.querySelector('.delete')
    btnDelete.addEventListener('click', e=> deleteNote(btnDelete.dataset.id))    
    const btnUpdate = div.querySelector('.update')
    btnUpdate.addEventListener('click', e => getNote(btnUpdate.dataset.id))
}

export const renderNotes = notes => {
    notesList.innerHTML= ''
    notes.forEach( e => createDiv(e))
}


export const onHandleSubmit = (event) =>{
    event.preventDefault()
    if (saveId){
        updateNote(saveId, noteForm['title'].value,  noteForm['description'].value)
    } else {
        saveNote(noteForm['title'].value,  noteForm['description'].value)
    }
    saveId= '';
    noteForm['title'].value = '';
    noteForm['description'].value= '';
}

export const appendNewNote = (note) => {
    createDiv(note)
}

export const fillFormWithNote = (note)=>{
    
    noteForm['title'].value = note.title  
    noteForm['description'].value = note.description
    saveId = note._id


}