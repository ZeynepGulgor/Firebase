const express = require('express')
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express()

const { admin } = require('./firebaseConfig')
const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000

app.use('/api/note', require('./routes/api/notes'))


app.post('/', (req, res) => {
  console.log(req.body)
  const data={
    temp:req.body.temp,
    name:req.body.name,
    heartrate:req.body.heartrate
  }
  db.collection('users').doc(req.body.name).set(data).then(()=>{
    console.log('it works')
  })
})

app.get('/', (req, res) => {
 
  db.collection('users').doc('Zeynep').get().then((snap)=>{
  res.send(snap.data())
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})