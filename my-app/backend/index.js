  const fetchDataFromDatabase = require('./db');

  // Utilisez fetchDataFromDatabase avec un callback
  fetchDataFromDatabase(function call(err, data, CatData) {
      if(err) {
          console.error(err);
          // Gérer l'erreur selon vos besoins
          return;
      }
  
      global.fooditems = data;
      global.FoodCategory = CatData;
  });

  global.foodData = require('./db')(function call(err, data, CatData) {
    // console.log(data)
    if(err) console.log(err);
    global.foodData = data;
    global.foodCategory = CatData;
  })
  
  const express = require('express');
  const app = express();
  const port = 3001;
  
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });
  
  app.use(express.json())
  app.use('/api',require("./Routes/CreatUser")); 
  app.use('/api',require("./Routes/DisplayData"));
  app.use('/api',require("./Routes/OrderData"));
  app.get('/', (req, res) => {
      res.send('Hello World!');
  });
  app.listen(port, () => {
      console.log(`Example app listening on http://localhost:${port}`);
  });
  
  