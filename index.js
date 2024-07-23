const express = require('express');
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: 'Alice', age: 20, enroll: true },
    { id: 2, name: 'Bob', age: 21, enroll: false },
    { id: 3, name: 'Charlie', age: 22, enroll: false },
];

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    else res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        enroll: (req.body.enroll === 'true'),
    };

    students.push(student);
    res.send(student);
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if(!student) res.status(404).send('Student not found');
    else {
        const index = students.indexOf(student);
        students.splice(index, 1);
        res.send(student);
    }
});

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`Listening on port ${port}...`));