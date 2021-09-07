# Indie

Indie is an Steam clone for Indie developers and shoppers alike. Users have the ability to add and publish games as a publisher or add games to their library as a shopper. Indie is a fullstack React App made with Redux as the state manager and with a backend of NodeJS, Express, Sequelize, PostgresSQL and other technologies.

-   Visit [Indie](https://indie-games-app.herokuapp.com/) Live Today
    

Table of Contents

1. [Features](https://github.com/MaxwellWehner/Indie#features)

2. [Installation](https://github.com/MaxwellWehner/Indie#installation)

3. [Technical Implementation Details](https://github.com/MaxwellWehner/Indie#technical-implementation-details)

4. [Future Features](https://github.com/MaxwellWehner/Indie#future-features)

5. [Contact](https://github.com/MaxwellWehner/Indie#contact)

## Technologies

-   [![](https://camo.githubusercontent.com/37b03eda8464fa74e1a7343cbac75fc9d3803a68a3a0d5b6fad3162437dc59cb/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4a6176615363726970742d4637444631453f6c6f676f3d4a617661536372697074266c6f676f436f6c6f723d333333333333)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [![](https://camo.githubusercontent.com/5a611392726e9c4479fb9e8d838bc0cee31474cea29e4b3b3faf33e378803033/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d506f737467726553514c2d3333363739313f6c6f676f3d506f737467726553514c266c6f676f436f6c6f723d7768697465)](https://www.postgresql.org/)
-   [![](https://camo.githubusercontent.com/e94d5356dbffad915213783a815cfefb9fdf394b5e2f442732893fe0a6dccf26/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666c6174266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)](https://nodejs.org/)
-   [![](https://camo.githubusercontent.com/be0341460963bc4ff9b532f9c172cc1a7c68eb299f7aea5d690ed0a24047b1e2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666c6174266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642)](https://reactjs.org/)
-   [![](https://camo.githubusercontent.com/967e65f67e4a1a9185c7f6d5fdb0cf3588aed0b70538a57cd36f34a1c9ba56f2/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d2532333539336438382e7376673f7374796c653d666c6174266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465)](https://redux.js.org/)
-   [![](https://camo.githubusercontent.com/f70d9d9438b04e316fbba35c08d92860203762cec6212ef53ddd02d930014866/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d435353332d3135373242363f6c6f676f3d43535333)](https://developer.mozilla.org/en-US/docs/Web/CSS)
-   [![](https://camo.githubusercontent.com/e7b9aa5f16dc14657a53a83625343b3786e69a35644c48c8c1c3bf040d17f609/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4865726f6b752d3433303039383f7374796c653d666c6174266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465)](https://www.heroku.com/home)
-   [Express](https://expressjs.com/)
-   [Sequelize](https://sequelize.org/)

## Features

### Log In and Sign Up

Shopper Sign-Up

![https://i.imgur.com/cb2HUjQ.jpg](https://i.imgur.com/cb2HUjQ.jpg)
Publisher Sign-Up

![https://i.imgur.com/NQn3QkN.jpg](https://i.imgur.com/NQn3QkN.jpg)
Log-In Modal

![https://i.imgur.com/YM7yOid.jpg](https://i.imgur.com/YM7yOid.jpg)



### Home

The Indie Home Page displays all the games along with a few in a click through carousal 
![https://i.imgur.com/CPRIPnv.jpg](https://i.imgur.com/CPRIPnv.jpg)

### View A Games Details

View of single games and more info about it 
Also where shopper can add the current game to their library
![https://i.imgur.com/qrz6H0c.jpg](https://i.imgur.com/qrz6H0c.jpg)

### Create A Game

As a publisher create a new game page for the sight 
![https://i.imgur.com/egMCOkv.jpg](https://i.imgur.com/egMCOkv.jpg)

### Edit A Game

Edit a game that you published 
![https://i.imgur.com/qzCsEpM.jpg](https://i.imgur.com/qzCsEpM.jpg)
### View All Your Published Games

View all the games you published with links to add more games and to edit/delete game you've already published
![https://i.imgur.com/azT6VUV.jpg](https://i.imgur.com/azT6VUV.jpg)
### View All The Games In Your Library

As a shopper you can view all the games in your library
With links to return the game and to hide it for later
![https://i.imgur.com/eZ7wFS5.jpg](https://i.imgur.com/eZ7wFS5.jpg)


## Installation

To build/run project locally, please follow these steps:

1.  Clone this repository

```
git clone https://github.com/jujmart/TechKnowBuild.git
```

2.  Install npm dependencies for the `/frontend`

```
cd frontend
npm install
```
3.  Install npm dependencies for the `/backend`

```
cd backend
npm install
```

4.  In the `/backend`  directory, create a `.env` based on the `.env.example` with proper settings
    
5.  Setup your PostgreSQL user and password and ensure it matches your `.env` file

6.  In the `/backend` folder, create the database by running in the terminal:

```
npx dotenv sequelize db:create
```

7.  In the `/backend` folder, migrate tables to the database by running in the terminal:

```
npx dotenv sequelize db:migrate
```

8.  In the `/backend`folder, seed the database by running in the terminal:

```
npx dotenv sequelize db:seed:all
```

9.  Start the flask backend in the `/backend` directory

```
npm start
```

10.  Start the frontend in the `/frontend` directory

```
npm start
```

## Technical Implementation Details


### Adding Multiple User Types

During this project, I found it difficult at first having one users table with publishers and shoppers intertwined. Because publishers and shoppers required different amounts and types of info, it was only natural to split them up. However that lead to some other problems with having to possibly query multiple tables when needing to know if a user was a publisher or shopper. That's where the users.UserType comes in. This allowed for quick look up to determine what type a user was and then I was able to do a separate query on the correct table to save time. 

![https://i.imgur.com/5n6Thkv.jpg](https://i.imgur.com/5n6Thkv.jpg)


## Future Features

1.  **Search** - search through games that you want to be able to add to your library
    
2.  **Reviews**- If you own a game be able to leave a review of it and also be able to see all user reviews on any game
    
3.  **Cart** - Instead of adding a game directly to your library, add it to a cart for later purchase.
    

## Contact

### Maxwell Wehner

[LinkedIn](https://www.linkedin.com/in/justice-martin-34043340/) 

[GitHub](https://github.com/MaxwellWehner)

Gmail: maxwehnerwork@gmail.com
