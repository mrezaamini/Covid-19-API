# Covid-19-API
Covid-19 statistics Restful API for , perfect example for praccticing and implementing an API with different roles, authentication and routes connected to a database (i used mongodb as database for this project)

## Table of Contents
- [Description](#description)
- [Available Scripts](#available-scripts)
- [Support + Feedback](#support--feedback)
- [Thank You](#thank-you)
- [License](#license)

## Description:
In this API you have 3 types of users: Public, Admin (admins that can change statics for a specific country) and Super admin (who can add countries and assign list of admins to it).
Different node modules are used here like Express, jwt(jsonwebtoken for authentications and giving users tokens),joi (for validating), nodemon( as dev-dependency), mongoose (for connecting to database) and bcrypt (for hashing password) that you can install them with npm install.

Pubilc APIs:
- Specific Country - GET : return todayCases, todayDeaths, todayRecovered, critical and last update date for specific country</br>
`http://localhost:3000/countries/france`
- All Countries - GET: returtn all countries statics (you can sort them with specified query)</br>
`http://localhost:3000/countries/?sort=todayCases`

Admin APIs:
- Update Country Information (todayCases, todayDeaths, todayRecovered, critical) - PUT : update statics for country that admin has the prmission for</br>
`http://localhost:3000/countries/france`

Super Admin APIs:
- Create new Admin (adminUsername, adminPassword) - POST: creating new admin user</br>
`http://localhost:3000/admin`

- Create new Country - POST: creating new country with no information (just the given name)</br>
`http://localhost:3000/countries/france`

- Update country permissions(counrtyName, adminIDs, add) - PUT : adding/removing admins from country permissions (with add=false you can remove admin's permission)</br>
`http://localhost:3000/countries/country`

In addition, there are APIs to check database, registering superAdmins and logging in.


## Available Scripts:

In the project directory, you can run:
#### `npm instal`

intall packages that project needs (start with this)!
#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) in your brower or use advanced softwares ( or websites ) like [POSTMAN](http://postman.com/) to try and test it.

(Note: for connecting to database you have to have [mongodb](https://www.mongodb.com) installed, And run mongod locally)


## Support + Feedback

Include information on how to get support.
- easily contact me via [email](aminiamini433@yahoo.fr)

## Thank You

Thanks for paying attention, and hope it would be useful!

## License
Link to [LICENSE](LICENSE) doc.
