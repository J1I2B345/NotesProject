import Note from './models/Note'


export default (io) => {
    io.on('connection', (socket) => {
        
        const emitNotes = async() =>{
        const notes = await Note.find()
        io.emit('server:loadnotes', notes)
        }
        emitNotes()

        //para guardar notas en mongoDB
        socket.on('client:newnote', async (data) =>{
        
            const newNote = new Note(data)
            const savedNote = await newNote.save()
            
            io.emit('server:newnote', savedNote)
        })

        socket.on('client:deletenote', async(id)=>{
            await Note.findByIdAndDelete(id)
            emitNotes()
        })

        socket.on('client:getnote', async(id)=>{
            const noteToUpdate = await Note.findById(id)
            socket.emit('server:getnote', noteToUpdate)
        })

        socket.on('client:updatenote', async(note)=>{
            await Note.findByIdAndUpdate(note._id, {
                title: note.title,
                description: note.description
            })    
            emitNotes()         
        })

    })
}