import { loadNotes, onNewNote, fillForm } from "./socket.js"
import { onHandleSubmit, renderNotes, appendNewNote, fillFormWithNote} from "./ui.js"


onNewNote(appendNewNote)
loadNotes(renderNotes)
fillForm(fillFormWithNote)

const noteForm = document.querySelector('#noteForm')

noteForm.addEventListener('submit', onHandleSubmit)

