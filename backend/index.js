
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;
// Enable CORS to get hit or request from other servers
app.use(cors());
// required to parse the html body in response
app.use(bodyParser.json());

// create connection with mongoDb

mongoose.connect('mongodb://localhost:27017/taskMgmt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



const taskSchema = mongoose.Schema({

    taskTitle : String,
    taskDetails : String,
    startDate : Date,
    endDate : Date,
    status : String
})
const Task = new mongoose.model("Task", taskSchema);
// const User = mongoose.model('User', userSchema);
// Routes for Products
// retrieving all products
app.get('/api/products', (req, res) => {
    Product.find().then(item => {
      console.log(item);
      res.status(201).json({ message: 'Products Fetched Successfully!', data: item });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });
  // retrieve single product
  app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    Product.find({_id:id}).then(item => {
      console.log(item);
      res.status(200).json({ message: 'Item fetched successfully', data: item, });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });
  // create a new task
  app.post('/api/tasks', (req, res) => {
    const newTask = new Task(req.body);
    newTask.save().then(item => {
      console.log(item);
      res.status(201).json({ message: 'Item added successfully' });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });
  // update new task
  app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.findByIdAndUpdate(id, req.body, { new: true }).then(item => {
      console.log(item);
      res.status(203).json({ message: 'Item Fetched Successfully', data:item });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });
  // delete a task
  app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.findByIdAndRemove(id).then(item => {
      res.status(203).json({ message: 'Deleted Successfully' });
    })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});