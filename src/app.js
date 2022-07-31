import express from 'express'
import path from 'path'

const serverExpress= express()


serverExpress.use(express.static(path.join(__dirname, 'public')))

export default serverExpress


