const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// search for the cocktail from form
app.post('/cocktails', async (req, res) => 
  {
    // getting the name of the drink
    const drink = req.body.drink;
    // cocktail API URL
    const APIUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`; 

    // use axios to make API call
    const response = await axios.get(APIUrl);
    // getting data (drink name) from user
    const drinkData = response.data.drinks;
    
    // Check if the drink was found
    if (drinkData) 
      {
        // if so, show the first drink found
        res.render('cocktails', { drink: drinkData[0] });
      } 
    // otherwise, say that no drinks were found
    else 
      {
        res.send('No drinks found with that name.');
      }
      
  });

app.get('/', (req, res) => 
  {
    res.render('index');
});

app.listen(8080, () => 
  {
    console.log('Server is running on port 8080');
});
