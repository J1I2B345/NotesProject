import Note from './models/Note'


export default (io) => {
    io.on('connection', (socket) => {
        
        const emitNotes = async() =>{
            try{
                const notes = await Note.find()
                io.emit('server:loadnotes', notes)
            } catch(e){
                console.log(e.message)    
            }
        }
        emitNotes()

        //para guardar notas en mongoDB
        socket.on('client:newnote', async (data) =>{
        
            try{
            const newNote = new Note(data)
            const savedNote = await newNote.save()
            io.emit('server:newnote', savedNote)
            } catch(e){
                console.log(e.message)
            }
        })

        socket.on('client:deletenote', async(id)=>{
            try{
                await Note.findByIdAndDelete(id)
                emitNotes()
            } catch(e){
                console.log(e.message)
            }
        })

        socket.on('client:getnote', async(id)=>{
            try{
                const noteToUpdate = await Note.findById(id)
                socket.emit('server:getnote', noteToUpdate)
            } catch(e){
                console.log(e.message)
            }
        })

        socket.on('client:updatenote', async(note)=>{
            try{ 
                await Note.findByIdAndUpdate(note._id, {
                    title: note.title,
                    description: note.description
                })    
                emitNotes()}
            catch(e){
                console.log(e.message)
            }         
        })

    })
}