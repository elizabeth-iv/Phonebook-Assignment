const { response } = require('express')
const express = require('express')
const morgan = require("morgan")
const app = express()
//step 7
app.use(morgan("tiny"))

let persons = [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    
]
app.use(express.json())

//Step 1
app.get('/api/persons', (request, response) => {
response.json(persons)  
})

//Step 2
app.get('/info', (req, res) => {
    res.send('<h1>Phonebook has info for 4  people</h1>\<h1>Wed, 21 Oct 2015 18:27:50 GMT</h1>')
  })
//Step 3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
//Step 4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
//Step 5/6
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.content) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    const person = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    persons = persons.concat(note)
  
    response.json(note)
  })

//Step 8
morgan.token('person', (request, response) => {
    if (request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    else{
        return null
    }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const PORT = 7001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)