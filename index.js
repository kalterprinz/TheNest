const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');
const VenueModel = require('./Venue');
var cors = require ('cors')

const app = express();
const port = 3001;
app.use(cors())

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1/csven',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is connected'))
.catch(err=> console.log(err));

app.get('/', (req, res)=>{
    VenueModel.find()
        .then(venues=> res.json(venues))
        .catch(err=> console.json(err))
})

app.get('/user/:id', (req, res)=>{
    const id = req.params.id
    UserModel.findOne({_id: id})
        .then(post=> res.json(post))
        .catch(err=> console.json(err))
})


app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await UserModel.findOne({ name });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});

app.post('/signup', (req, res) => {
    UserModel.create(req.body)
        .then(user => {
            console.log("User created successfully:", user);
            res.json(user);
        })
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "Failed to create user" });
        });
});

app.put('/updateuser/:id',(req,res)=>{
    const id =req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name,
        college: req.body.college,
        password: req.body.password,
    }).then(user=> res.json(user))
    .catch(err=> console.json(err))
})

app.delete('/deleteuser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(response => res.json(response))
    .catch(err=>res.json(err))
})

app.get('/getname/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const name = user.name; // Assuming the field containing the name is 'name'
            res.json({ name });
        })
        .catch(err => console.log(err));
});

app.get('/getvenue/:name', (req, res) => {
    const name = req.params.name;
    VenueModel.find({ name: name })
        .then(posts => res.json(posts))
        .catch(err => console.log(err));
});

app.post('/createvenue', async (req, res) => {
    const { event, name, where, startTime, endTime } = req.body;

    // Convert start time and end time to Date objects
    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);

    // Validate end time is not earlier than start time
    if (newEndTime <= newStartTime) {
        return res.status(400).json({ message: "End time cannot be earlier than or equal to start time." });
    }

    try {
        // Check for time conflicts
        const existingVenues = await VenueModel.find({ where });
        const conflict = existingVenues.some(venue => {
            const venueStartTime = new Date(venue.start_time);
            const venueEndTime = new Date(venue.end_time);

            return (
                (newStartTime >= venueStartTime && newStartTime < venueEndTime) ||
                (newEndTime > venueStartTime && newEndTime <= venueEndTime) ||
                (newStartTime <= venueStartTime && newEndTime >= venueEndTime)
            );
        });

        if (conflict) {
            return res.status(400).json({ message: "Time conflict detected. Please choose different time slots." });
        }

        // No conflict, create the new venue
        const venue = await VenueModel.create({ event, name, where, start_time: startTime, end_time: endTime });
        res.status(201).json(venue);
    } catch (error) {
        console.error("Error creating venue:", error);
        res.status(500).json({ error: "Failed to create venue" });
    }
});

app.get('/getven/:id', (req, res)=>{
    const id = req.params.id
    VenueModel.findById({_id: id})
        .then(post=> res.json(post))
        .catch(err=> console.json(err))
})

app.put('/updatevenue/:id', async (req, res) => {
    const id = req.params.id;
    const { event, where, start_time, end_time } = req.body;

    // Convert start time and end time to Date objects
    const startTimeUTC = new Date(start_time);
    const endTimeUTC = new Date(end_time);

    // Validate end time is not earlier than start time
    if (endTimeUTC <= startTimeUTC) {
        return res.status(400).json({ message: "End time cannot be earlier than or equal to start time." });
    }

    try {
        // Check for time conflicts
        const existingVenues = await VenueModel.find({ _id: { $ne: id } }); // Exclude current venue from the check
        const conflict = existingVenues.some(venue => {
            const venueStartTime = new Date(venue.start_time);
            const venueEndTime = new Date(venue.end_time);

            return (
                (startTimeUTC >= venueStartTime && startTimeUTC < venueEndTime) ||
                (endTimeUTC > venueStartTime && endTimeUTC <= venueEndTime) ||
                (startTimeUTC <= venueStartTime && endTimeUTC >= venueEndTime)
            );
        });

        if (conflict) {
            return res.status(400).json({ message: "Time conflict detected. Please choose different time slots." });
        }

        // No conflict, update the venue
        const updatedVenue = await VenueModel.findByIdAndUpdate(id, { event, where, start_time: startTimeUTC, end_time: endTimeUTC }, { new: true });
        if (!updatedVenue) {
            return res.status(404).json({ message: "Venue not found." });
        }

        res.json(updatedVenue);
    } catch (error) {
        console.error("Error updating venue:", error);
        res.status(500).json({ error: "Failed to update venue" });
    }
});



app.delete('/deletevenue/:id',(req,res)=>{
    const id = req.params.id;
    VenueModel.findByIdAndDelete({_id:id})
    .then(response => res.json(response))
    .catch(err=>res.json(err))
})

app.listen(port,()=>{
    console.log('Example app listening on port ${port}')
})