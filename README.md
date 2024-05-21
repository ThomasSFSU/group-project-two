# group-project-two
A modern e-commerce solution.

## Main Page
![Main Page Design](/mockups/HomepageScreenshot.png)

## Documentation

### Overview
Our project, a website named Kommerse Magazine, utilizes a wide array of web technologies to deliver a stylish and robust ecommerce platform. It is built in Node.js, leverages the Express.js Framework, incorporates SQLite for database functionality, and makes use of Embedded Javascript Templates (EJS) to server side render pages before sending them to the client. Additionally, we incorporate custom middleware, implement routers, and integrate node modules to deliver highly effective features – increasing value for users and ensuring that their data is secure. The overall design follows the Model View Controller (MVC) structure which segments the data, views, and controllers into separate areas of the app.
The structure and architecture for Kommerse Magazine consists of many folders and files for different functions and uses the ExpressJS framework. Firstly, the views folder consists of what the user will see on the client side. Within this folder are plain HTML files, and EJS templates which are shown to the user. Also present in this folder is the 404 page, which is served in case a file cannot be found and tells the user that the site has had an issue and prompts them to return back to the home page. The index file is the home page of the site, and features a banner showing a sale message and call to action.  Finally, the login and sign-up files contain forms which let the user enter their information to log into the site with their existing account or to create a new account. In a future iteration of this project, adding an action-directed flow from a login attempt with an invalid username to the sign up page would be a useful way to guide users and improve user retention.

### Architecture
Our Embedded Javascript Templates (EJS files) are basically flavored HTML files that have the ability to use JavaScript to insert values and logic on the server, rather than delegating such responsibilities to the client or using fetch requests. The EJS files we have are named catalog, checkout, console, dashboard, payment, and product. These files contain a mix of HTML code for structure and JavaScript code for functionality/dynamic data addition. Some examples include displaying the user’s username or a specific product’s name, price, and description. The templates can also show a user their email, their profile picture, or virtually any other data which the server needs to provide.

The public folder contains the files that are used to give our website life. This folder contains our CSS files, various product images, profile pictures, and other images for the core background, banners, and models. There is also a scripts folder, which contains some functionality of our checkout page and return page.

Our routes folder is very crucial in this project, as it helps to manage the user’s requests and actions. Routes manage the user’s requests by forwarding and calling to various methods or functions from different controllers after the user clicks on certain buttons throughout the site. These various files also can respond to the user or client by redirecting to the login page, if they are not signed in and trying to use some of the functions of the site without having an account.

We have a middleware folder that contains the logevents JavaScript file that basically does what it says. The file’s functionality is to log the user’s actions throughout the site, containing the exact time, day, and year they made a request of the site. The addition of a logger would be vital in a production environment as this would allow for our team to respond appropriately to security threats.

We then have a controller folder, which contains various controllers such as login, register, and db. The login controller handles the account functions, checking if the user’s username and password exists in the database, and checks if the password matches after fully logging them into that account associated with the username. The register controller handles the creation of new accounts. The database controller effectively encapsulates all of the needed database functionality within a single object-oriented design. Custom functions within this controller enable CRUD operations on data stored within the database.


We then have a json file that is named package.json, which contains the different types of modules or packages we use throughout the project. One of the packages we use is bcrypt, which is a package that gives us the ability to hash the user’s passwords which improves the security of our user’s account. The body-parser package is a middleware that is crucial as it accesses and parses the user’s body requests or input before moving into other processes in the site. Date-fns for example is used in logEvents, which allows for the formatting of the dates and time of the user’s actions throughout the site, in which we use the format of yyyyMMdd (which is the integers of the year, month and day in that specific order) and HH:mm::ss (hour integers, minute and seconds in that order). 


The ejs npm package allows us to use JavaScript inside our HTML files, as discussed above. The express npm package allows us to use express, which is an unopinionated framework to allow flexibility and use of routers and custom middleware throughout the site. The sqlite3 npm allows us to use SQLite for our database. The stripe node module allows the usage of the Stripe API, which we integrated to create and process payments from the customer. Stripe allows us to offload some of the high security issues around payment processing all while giving us a really simple and friendly payment interface. The uuid module helps create unique identifiers which help boost security, as it ensures that the id that is generated will be unique.

The mockup folder contains our ideas for the site for how it should be formatted, which contains hand-drawn images for various parts of the site. These were the original ideas for how the site was going to be designed and how the layout is going to be, but we made alterations to  some alternative looks because our ideas dynamically shifted as we saw the project take form.

### Challenges
During the creation of the site, there were many challenges that popped up, and one challenge was to get familiar with new additions all while trying to stay congruent with the overall theme of the site. The theme and some styling files were already made, and trying to build one overall CSS file that won’t conflict with the behaviors of another one made it quite the challenge, as our newly added CSS files would sometimes override existing styles. Adapting to this challenge took a lot of careful thought.

Another notable challenge was trying to solve the issue of authentication for our users. It became a bit more of a challenge as we opted not to use the passport module, and instead created a custom strategy for authentication. We needed to store the username and password inside a database when signing up. However, we had to consider the case that the username conflicts with an existing user in the database. To account for this, on creating an account we fist search the database and halt the registration process if the new username already exists. If there is no such username, the registration process continues. Thinking of these edge-cases helped ensure that there was no user or client that contained the same username, which can possibly cause another problem for the database as it may cause one username to have more than one password, or many other possible accessibility issues may arise. 

After creating users, we considered the process of logging into existing accounts. The first step is to check if the username first exists in the database, and then compare the given password from the user and check if the password matches the password that is already in the database. When a complication such as an incorrectly entered password, the authentication step fails and the user must reenter their credentials. This also required the usage of asynchronous JavaScript, which is the next major challenge we took on.

The functionality of asynchronous JavaScript helps in many ways, for example in our website we would hash the client’s password when they are registering for the first time. Asynchronous JavaScript plays a big role in our site’s functionality, as it is used in many other site features. The overall concept was difficult since we needed to deeply study about how async functions respond to inputs. Most of the time, code executes line by line and it is a lot easier to spot when things tend to go wrong or what causes a program to yield a different response than expected. Certain asynchronous code may execute in a fashion that is non-linear, making the flow of tasks or operations tricky to reason about. This also led us to build in robust error handling throughout the project.
 
Building the cart proved to be quite the task as well. Before building the cart, there had to be a table created that tied the cart to the specific user and the items they would like to buy. This relational database approach was very interesting and wound up working well, though at first it seemed very confusing. The carts table also then references other tables, such as the products table that contained our products and their specific ID, and the user table to get the specific user ID to tie the cart made for them. Next up was the logic behind the cart’s functions, which tested the knowledge gained from the past tutorials. It tested our knowledge of the various SQL commands gained from tutorials, and involved a considerable amount of study. Commands to the database were further complicated since which SQL to run depends on the existing state of the database. For example the UPDATE command would really come into play when we would update the quantity of items that the user would like to buy, such that if they would want to purchase two of the same item or product. This means that if they wanted two jetpacks, we would have to increment product_quantity in the carts table of our database by one. If the user decides to change their mind and doesn't want two afterwards we would have to decrement or subtract product_quantity by one instead. Knowing which command to use ended up making sense, but pushed the limits of our comprehension at the time.

### Conclusion
Overall, this project really put everything we covered throughout the semester into one complete website. This project applied all the lectures starting from the very first lesson about file pathing or refresher of tree data structure and how it connects with file structures, all the way to creating a database to create an e-commerce website as we needed to utilize all the tools from throughout the semester in order to make this website come to life. This ecommerse project was a great way to learn about web development in a hands-on way!


## Design Notes

We are aiming to create an e-commerce platform capable of showcasing products and
allowing users to create accounts, log in, shop for products, add them to their carts, and check
out.

The theme we are going for is minimalistic, stylish, and designed around ease of use to
maximize user retention. The products will be displayed in an attractive way and images within
product cards will enlarge when hovered over to make the page feel more interactive. We are
aiming for a dark themed background, and simple sans serif font to make the page easy on the
eyes and easy to read.

The various functionality elements will be developed incrementally in modular fashion. This will
allow our team to maximize our individual efforts.

## Mockups
### Login
![Login Page Mockup](/mockups/LoginMockup.png)
### Main Page
![Main Page Mockup](/mockups/MainPageMockup.png)
### Profile Page
![Profile Page Mockup](/mockups/profilePageMockup.png)
### Checkout Page
![Checkout Page Mockup](/mockups/CheckoutPageMockup.png)

## Creators
Cedric Blanco, Thomas Brock, Preet Vithani
