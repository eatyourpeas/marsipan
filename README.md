
Marsipan
=======================



**Live Demo**: http://www.Marsipan.org.uk


A Project to support clinicians looking after peope with eating disorders

Managing eating disorders with in primary care or the acute hospital setting can be challenging. Marsipan was created to provide clinicians with guidance on the medical management. It contains practical advice, particularly on physical risk assessment and refeeding.

This project is written in Javascript with Node JS and the Express framework. It contains national reference data from UK-WHO growth charts which is licensed and should not be used without permission from the Medical Research Council.

It was built using the hackathon-starter template as a starting block. (https://github.com/sahat/hackathon-starter)

Table of Contents
-----------------



Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **config**/passport.js             | Passport Local and OAuth strategies, plus login middleware.  |
| **config**/secrets.js              | Your API keys, tokens, passwords and database URL.           |
| **controllers**/api.js             | Controller for /api route and all api examples.              |
| **controllers**/contact.js         | Controller for contact form.                                 |
| **controllers**/home.js            | Controller for home page (index).                            |
| **controllers**/user.js            | Controller for user account management.                      |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                 |
| **public**/**js**/main.js          | Place your client-side JavaScript here.                      |
| **public**/**css**/main.less       | Main stylesheet for your app.                                |
| **public/css/themes**/default.less | Some Bootstrap overrides to make it look prettier.           |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.      |
| **views/api**/                     | Templates for API Examples.                                  |
| **views/partials**/flash.jade      | Error, info and success flash notifications.                 |
| **views/partials**/header.jade     | Navbar partial template.                                     |
| **views/partials**/footer.jade     | Footer partial template.                                     |
| **views**/layout.jade              | Base template.                                               |
| **views**/home.jade                | Home page template.                                          |
| app.js                             | Main application file.                                       |
| setup.js                           | Tool for removing authentication providers and other things. |

**Note:** There is no preference how you name or structure your views.
You could place all your templates in a top-level `views` directory without
having a nested folder structure, if that makes things easier for you.
Just don't forget to update `extends ../layout`  and corresponding
`res.render()` paths in controllers.

List of Packages
----------------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.              |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| bitgo                           | Multi-sig Bitcoin wallet API.  |
| cheerio                         | Scrape web pages using jQuery-style syntax.                           |
| clockwork                       | Clockwork SMS API library.                                            |
| connect-assets                  | Compiles LESS stylesheets, concatenates & minifies JavaScript.        |
| connect-mongo                   | MongoDB session store for Express.                                    |
| csso                            | Dependency for connect-assets library to minify CSS.                  |
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4.0 middleware.                                               |
| cookie-parser                   | Express 4.0 middleware.                                               |
| express-session                 | Express 4.0 middleware.                                               |
| morgan                          | Express 4.0 middleware.                                               |
| multer                          | Express 4.0 middleware.                                               |
| compression                     | Express 4.0 middleware.                                               |
| errorhandler                    | Express 4.0 middleware.                                               |
| method-override                 | Express 4.0 middleware.                                               |
| serve-favicon                   | Express 4.0 middleware offering favicon serving and caching.          |
| express-flash                   | Provides flash messages for Express.                                  |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| github-api                      | GitHub API library.
|
| growthmethods                   | reference data and methods
|
| jade                            | Template engine for Express.                                          |
| lastfm                          | Last.fm API library.                                                  |
| instagram-node                  | Instagram API library.                                                |
| less                            | LESS compiler. Used implicitly by connect-assets.                     |
| lob                             | Lob API library                                                       |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| node-foursquare                 | Foursquare API library.                                               |
| node-linkedin                   | LinkedIn API library.                                                 |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-github                 | Sign-in with GitHub plugin.                                           |
| passport-google-oauth           | Sign-in with Google plugin.                                           |
| passport-twitter                | Sign-in with Twitter plugin.                                          |
| passport-instagram              | Sign-in with Instagram plugin.                                        |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin.                                         |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies.    |
| paypal-rest-sdk                 | PayPal APIs library.                                                  |
| request                         | Simplified HTTP request library.                                      |
| stripe                          | Offical Stripe API library.                                           |
| tumblr.js                       | Tumblr API library.                                                   |
| twilio                          | Twilio API library.                                                   |
| twit                            | Twitter API library.                                                  |
| lodash                          | Handy JavaScript utlities library.                                    |
| uglify-js                       | Dependency for connect-assets library to minify JS.                   |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**. |
| mocha                           | Test framework.                                                       |
| chai                            | BDD/TDD assertion library.                                            |
| supertest                       | HTTP assertion library.                                               |
| multiline                       | Multi-line strings for the generator.                                 |
| blessed                         | Interactive command line interface for the generator.                 |
| yui                             | Used by the Yahoo API example.                                        |



Contributing
------------

If something is unclear, confusing, or needs to be refactored, please let me know.
Pull requests are always welcome, but due to the opinionated nature of this
project, I cannot accept every pull request. Please open an issue before
submitting a pull request. This project uses
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with a
few minor exceptions. If you are submitting a pull request that involves
Jade templates, please make sure you are using *spaces*, not tabs.

License
-------

The MIT License (MIT)

Copyright (c) 2014-2015 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
