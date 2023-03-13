import express from "express"
import data from "./data/data.json"  assert { type: "json"}
import fs from "fs"
// import writefile from "fs"
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res) =>{
    res.json(data)
    console.log('read')
})

app.post('/data',(req, res) =>{
    data.push(req.body)
    fs.writeFile('./data/data.json', JSON.stringify(data),(err,resp) =>{
        if (err) {
            res.send('Data cant be written')
        }
        else {
            console.log('data Enttered : ', req.body)
            res.send('Data Successfully Entered')
        }
    })
});

app.put('/data/:name', (req, res) =>{
    let name = req.params.name
    data.forEach((item) => {
        if(item.name == name) {
            item.name = req.body.name
            item.location = req.body.location
            item.patient_count = req.body.patient_count
        }
    })
   
    fs.writeFile("./data/data.json", JSON.stringify(data), (err) =>{
        if(err){
            res.send("Data could not be Updated")
        }
        else{
        console.log('data updated : ',req.body)
        res.send('Data Successfully Updated')  
        }
    })

})

app.delete('/data/:name', (req, res) =>{
    let {name} = req.params;
    let item = data.filter(item => item.name !== name)
    fs.writeFile("./data/data.json", JSON.stringify(item),(err) =>{
        if(err) {
            res.send("Data cannot be deleted")
        }
        else{
            res.send("Data Deleted Successfully");
            console.log(`Data Deleted with name : ${name}`)
        }
    })
})

// read file using coremodule -fs
// fs.readFile('./data/data.json', 'utf8', (error, data) => {
//     if(error){
//        console.log(error);
//        return;
//     }
//     console.log(JSON.parse(data));
    
// })

// writefile using fs

// const path = './data/data.json';

// fs.writeFile(path, JSON.stringify(data, null, 2), (error) => {
//     if (error) {
//       console.log('An error has occurred ', error);
//       return;
//     }else{
//         console.log('Data written successfully to disk');
//     }
 
//   });

app.listen(port, () =>{
    console.log(`hello everyone welcome to port ${port} !`);
    // console.log(data)
})