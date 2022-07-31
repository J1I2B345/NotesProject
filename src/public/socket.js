const socket = io()

export const loadNotes= (cb) =>{
    socket.on('server:loadnotes', cb);
};

export const saveNote = (title, description) => {
    socket.emit('client:newnote', {title, description
    })
}

export const onNewNote = (cb) =>{
    socket.on('server:newnote', note => {
        cb(note)
    })
}

export const deleteNote= (id) =>{
    socket.emit('client:deletenote', id)
}

export const getNote= (id) =>{
    socket.emit('client:getnote', id)
}

export const fillForm= (cb) =>{
    socket.on('server:getnote', note =>
    cb(note))
}

export const updateNote= (_id, title, description) =>{
    socket.emit('client:updatenote', {
        _id,
        title,
        description
    })
}