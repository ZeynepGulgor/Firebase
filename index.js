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
    item:req.body.item,
    id:req.body.id
  }
  db.collection('deneme').doc(req.body.id).set(data).then(()=>{
    console.log('oldu bu is')
  })
})

app.get('/', (req, res) => {
 
  db.collection('deneme').doc('1').get().then((snap)=>{
  res.send(snap.data())
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})