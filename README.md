# Hulu Clone
- [Nike Clone - Full-Stack Application](https://bulu.onrender.com/Home)
This is a Full-Stack Nike Clone using React for the frontend and Nodejs for the backend. A user can login and or signup and even order a shoe using stripe.

# Description
My goal with this application was to showcase my use of tailwind and my ability to send requests to my backend and retrieve data.



This whole project was predicated on me just copying the data straight from nike. This was before I knew anything about web scraping. I copied the data and saved them to my database (PostgreSQL). I then saved the images to cloudinary, then copied that url and also saved it to my database. The thing that took me the most time was just styling my website, making sure everything looked good.

My backend was kind of difficult since I added stripe payments. Even though I used Express Router to handle all my requests to my database and frontend. I had to figure out how to save any shoe that was bought on the frontend with stripe to my backend. Ultimately, I was able to do this with some research. I found some documentation and videos about certain webhooks that allowed me to retrieve a stripe customer's data. From that I was then able to save the stripe payment to my database. I also added docker to my whole project. I have 3 containers: one for my backend, 1 for my database, and 1 for my frontend.





###### Docker
- Docker

###### Backend
- NodeJS

###### Database
- PosgreSQL

###### Frontend
- React

###### Stripe
- Stripe


### `npm start`

cd into client
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `docker compose up`

Launches up all the containers

### `npm run dev`
cd into server
Runs backend in the development mode
Open [http://localhost:5001](http://localhost:5001) to view it in the browser.

