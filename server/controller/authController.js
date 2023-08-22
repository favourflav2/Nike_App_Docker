import pg from "pg";
import { env } from "custom-env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
env(true);

const stripe = new Stripe(process.env.STRIPE_KEY);
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export async function signUp(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // First we check if email is already in login table
    const loginText = "SELECT * FROM login WHERE email = $1";
    const loginEmail = [email];
    const checkLoginTable = await pool.query(loginText, loginEmail);

    // If theres an email in login already we return an error
    if (checkLoginTable.rows.length) {
      return res.status(400).json({ msg: "This email is already being used" });
    }

    // If theres no email match we can push email and hashed password into login table
    const hash = await bcrypt.hash(password, 10);
    const text = "INSERT INTO login (hash,email) VALUES ($1,$2) RETURNING *";
    const pushedIntoLogin = await pool.query(text, [hash, email]);

    // Once the email and hashed password has been pushed into login table we now push the req.body info into users tables
    const userText = "INSERT INTO users (first_name,last_name,email,joined) VALUES ($1, $2, $3, $4) RETURNING *";
    const userValues = [firstName, lastName, email, new Date()];
    const user = await pool.query(userText, userValues);

    // Token
    const token = jwt.sign({ email: email, id: user.rows[0].id }, process.env.SECRET, { expiresIn: "3h" });

    //Send Token and User to frontend
    res.status(200).json({ user: user.rows[0], token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    // First we check if the email we get from the frontend is in the login table
    const loginCheck = "SELECT * FROM login WHERE email = $1";
    const loginCheckValues = [email];
    const loginTable = await pool.query(loginCheck, loginCheckValues);

    // If theres user/email in the login table that mathes the one form the frontend we return an error
    if (!loginTable.rows[0]) {
      return res.status(400).json({ msg: "Theres no users with that email" });
    } else {
      // If the emails match we need to check the hashed passwords to see if they match with bcrypt compare
      const isMatch = await bcrypt.compare(password, loginTable.rows[0].hash);

      if (!isMatch) {
        return res.status(400).json({ msg: "The password you entered does not match" });
      }

      const text = "SELECT * FROM users WHERE email = $1";
      const value = [email];
      const user = await pool.query(text, value);
      const token = jwt.sign({ email: email, id: user.rows[0].id }, process.env.SECRET, { expiresIn: "3h" });
      res.status(200).json({ user: user.rows[0], token });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function likeShoe(req, res) {
  try {
    const { name, type, gender, img, price } = req.body;

    // We get everything from the like shoes table where who liked is equal to the logged in users id
    const text = "SELECT * FROM like_shoes WHERE who_liked = $1";
    const likedShoeTable = await pool.query(text, [req.userId]);

    // Now we use findIndex over the array we get from the likeShowTable query... if the item in our db is equal to the item we have in our frontend we will remove the item
    // if The item from out frontend is not in our database we will add it
    const index = likedShoeTable.rows.findIndex((val) => val.name === name);
    if (index === -1) {
      const query = {
        text: "INSERT INTO like_shoes (name,price,img,gender,type,who_liked) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        values: [name, price, img, gender, type, req.userId],
      };
      const insertData = await pool.query(query);
    } else {
      const query = {
        text: "DELETE FROM like_shoes WHERE name = $1",
        values: [name],
      };
      const del = await pool.query(query);
    }

    const everything = await pool.query(text, [req.userId]);
    return res.status(200).json(everything.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function getLikedShoes(req, res) {
  try {
    const text = "SELECT * FROM like_shoes WHERE who_liked = $1";
    const likeData = await pool.query(text, [req.userId]);
    res.status(200).json(likeData.rows);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}

export async function stripe_Payment_Guest(req, res) {
  try {
    const { cart, date, id} = req.body;
    
      // meta data can only be length of 500 characters
      const updateToSmallCart = cart.map(item =>{
        return {
          id:item.id,
          count:item.count,
          size:item.size
        }
      })
    
      // Creating a customer
     const customer = await stripe.customers.create({
        metadata: {
          userId: id ? id : "guest",
          cart:JSON.stringify(updateToSmallCart),
          date:date
        },
      });
    

    // Fetching the shoe data from my backend
    const text = "SELECT * FROM shoes";
    const shoeData = await pool.query(text);
    let shoeArray = shoeData.rows;

    //! Hackers can change the price coming from the frontend... so we have get the coresponding shoe and update the price to the price from our database
    // So what we do is map over our cart and update the price
    const updatedCartForStripe = cart.map((item) => {
      let res = shoeArray.filter((value) => item.id === value.id);
      if (res.length > 0) {
        item.price = Number(res[0].price);
      }
      return item;
    });

    // Line Items
    const line_items = updatedCartForStripe.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.img],
            description: item.size,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price.toFixed(2) * 100,
        },
        quantity: item.count,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.NODE_ENV === "production" ? "https://nike-eccomerce-wtls.onrender.com/success" : "http://localhost:3000/success"}`,
      cancel_url:`${process.env.NODE_ENV === "production" ? "https://nike-eccomerce-wtls.onrender.com/error" : "http://localhost:3000/error"}`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ msg: e.message });
  }
}


export async function getOrders(req,res){
  try{
    const text = 'SELECT * FROM orders WHERE who_ordered = $1'
    const result = await pool.query(text,[req.userId])

    res.status(200).json(result.rows)

  }catch(e){
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
}






