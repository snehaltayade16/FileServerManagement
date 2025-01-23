const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const fs = require("fs");

app.use(express.static(path.join(__dirname, 'dist')));

var restartServer = false;

app.get("/restart-server",(req,res)=>{

    if(!restartServer)
    {
        restartServer = true;

        res.send(JSON.stringify({"msg":"Restarting server..."}));
    }
    else
    {
        res.send(JSON.stringify({"msg":"Server already in restart mode, please wait"}));
        return;
    }

    setTimeout(function(){
        const { exec } = require('child_process');

        const command = 'pm2 restart UI-portal-backend --max-restarts 1';

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }

          if (stderr) {
            console.error(`Stderr: ${stderr}`);
          }

          console.log(`Command output: ${stdout}`);
        });
    },1000);
})

// Handle all routes by serving the Vue.js app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

