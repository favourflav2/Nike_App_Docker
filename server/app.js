import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import shoeData from "./routes/shoeRoutes.js";
import { env } from "custom-env";
import authRoutes from "./routes/authRoutes.js";
import Stripe from "stripe";
import pg from "pg";
import bodyParser from "body-parser";
env(true);

const app = express();
const stripe = new Stripe(process.env.STRIPE_KEY);
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const endPoint = `${process.env.ENDPOINT_SECRET}` 


// Middleware
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;
  let data;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endPoint);
    console.log("Webhook Verified");
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;

  // Handle the event

  if (eventType === "checkout.session.completed") {
    //console.log(data,"data")
    const userData = await stripe.customers.retrieve(data.customer);

    // Fetching the shoe data from my backend
    const text = "SELECT * FROM shoes";
    const shoeData = await pool.query(text);
    let shoeArray = shoeData.rows;

    if (userData) {
      //console.log(userData)

      let cart = JSON.parse(userData?.metadata?.cart);
      //* Metadata can only hold 500 charcters... so i only saved the id,count,size from my cart
      // So i map over my cart and match the corresponing item with my database and add back the missing the data
      let mergedArray = cart.map((item) => {
        const match = shoeArray.find((val) => val.id === item.id);
        return {
          ...item,
          name: match.name,
          gender: match.gender,
          img: match.img,
          price: match.price,
          type: match.type,
        };
      });
      const shippingDetails = data?.shipping_details?.address;
      const shippingDetailsName = data?.shipping_details.name;
      //console.log(data)

      // Checking its a logged in user .. if logged in user we will save data to the database
      if (userData?.metadata?.userId !== "guest") {
        try {
          let who_ordered = userData?.metadata?.userId;
          let date = userData?.metadata?.date;
          const ordersText =
            'INSERT INTO orders ("name","gender","img","price","type","size","count","who_ordered",date, city, address, zip_code, state, country ,who_ordered_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)';

          async function saveData() {
            for (const data of mergedArray) {
              await pool.query(ordersText, [
                data.name,
                data.gender,
                data.img,
                data.price,
                data.type,
                data.size,
                data.count,
                who_ordered,
                date,
                shippingDetails.city,
                shippingDetails.line1,
                shippingDetails.postal_code,
                shippingDetails.state,
                shippingDetails.country,
                shippingDetailsName,
              ]);
            }
          }
          saveData();
        } catch {
          console.log(e);
        }
      } else {
        console.log("guest checkout");
      }
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("hello backend");
});

app.use("/data", shoeData);
app.use("/auth", authRoutes);

console.log(process.env.NODE_ENV);



