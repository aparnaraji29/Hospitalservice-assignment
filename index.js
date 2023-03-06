import express from "express"
import data from "./data/data.json"  assert { type: "json"}
import fs from "fs"
import writefile from "fs"
const app = express();
const port = 3000;

app.get('/', (req,res) =>{
    res.json(data)
})

app.post('/create', (req,res) =>{
    res.json(data)
})

app.put('/update', (req,res) =>{
    res.json(data)
})

app.delete('/remove', (req,res) =>{
    res.json(data)
})

// read file using coremodule -fs
fs.readFile('./data/data.json', 'utf8', (error, data) => {
    if(error){
       console.log(error);
       return;
    }
    console.log(JSON.parse(data));
    
})

// writefile using fs

const path = './data/data.json';

fs.writeFile(path, JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }else{
        console.log('Data written successfully to disk');
    }
 
  });

app.listen(port, () =>{
    console.log(`hello everyone welcome to port ${port} !`);
    // console.log(data)
})