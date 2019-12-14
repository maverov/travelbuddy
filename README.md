# TravelBuddy

<img width="1096" alt="screen shot 2018-10-26 at 9 56 34 pm" src="https://user-images.githubusercontent.com/41349472/47598483-35f7e780-d96a-11e8-98e3-53f2c6bdf20b.png">

## Live Demo

To see the app in action, go to [https://tbuddy-app.herokuapp.com/](https://tbuddy-app.herokuapp.com/)

## Features

<img width="1098" alt="screen shot 2018-10-26 at 9 59 59 pm" src="https://i.ibb.co/wcmVJcF/screencapture-tbuddy-app-herokuapp-2019-12-14-09-33-03.png">

* Authentication:
  
  * User login functionality with username, email and password
  
  * Additional personal user information can be added to user profile such as age, interest, etc.

  * Admin sign-up with admin code

* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload trip photos
  
  * Search existing trips

* Manage user account with basic functionalities:

  * Profile page setup with sign-up


* Responsive web design

### Custom Enhancements

* Update trip details when editing trips

* Update personal information on profile page
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

```sh
git clone https://github.com/maverov/travelbuddy.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [helmet](https://helmetjs.github.io/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [nodemailer](https://nodemailer.com/about/)
* [moment](https://momentjs.com/)
* [cloudinary](https://cloudinary.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [Cloud9](https://aws.amazon.com/cloud9/?origin=c9io)
## License

#### [MIT](./LICENSE)
