const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();
    const log =(`${now}: ${req.method} ${req.url}`)
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    })
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle : 'Maintenance'
//     })
// })


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : '-- Welcome',
        name : 'Vincent'
    })
    // res.send({
    //     name : 'Vincent',
    //     likes : {
    //         color : 'blue',
    //         music : 'rock'
    //     }
    // }
    // );
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About page',
        aboutMessage : 'About this page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    }
    )
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});