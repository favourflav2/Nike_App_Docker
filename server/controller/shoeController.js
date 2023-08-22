import pg from 'pg'
import { env } from "custom-env";
env(true);
const { Pool } = pg;

const pool = new Pool({
    connectionString:process.env.POSTGRES_URI
})




export async function getAllShoes(req,res){
    try{
        const allShoes = await pool.query('SELECT shoes.name,shoes.id,shoes.type,shoes.price,shoes.gender,shoes.desc,shoes.img,shoe_images.image1, shoe_images.image2, shoe_images.image3 FROM shoes JOIN shoe_images ON shoe_images.name = shoes.name')
        
        //console.log(allShoes.rows)
        res.status(200).json(allShoes.rows)

    }catch(e){
        console.log(e)
        res.status(400).json({msg:e.message})
    }
    
}
export async function insertShoes(req,res){
    try{
        const text = 'INSERT INTO shoes ("name","price","desc","gender","img","type") VALUES ($1,$2,$3,$4,$5,$6)'
        const desc = "From the beach to gardening to lounging around the house, the Victori One is all about lightweight comfort that’s easy to wear. Soft foam in the strap and midsole gives you a more comfortable feel, while the grip pattern helps hold your feet in place as you walk. Time to celebrate the moment in off-pitch style."
        const img = 'https://res-console.cloudinary.com/ds4wntnyf/thumbnails/v1/image/upload/v1691814665/dmljdG9yaS1vbmUteC1uaWtlLXVuaXRlZC13b21lbnMtc2xpZGVzLWRMVGh6eF9oNHk0dHU=/template_primary/Y190aHVtYix3XzU5MixoXzU5Mg=='
        const values = ['Nike Victori One x Nike United',40,desc,'women',img,'shoes']
        const insertShoes = await pool.query(text,values)

        res.status(200).json("inserted shoe")

    }catch(e){
        console.log(e)
        res.status(400).json({msg:e.message})
    }
}

export async function insertShoesImages(req,res){
    try{
        const text = 'INSERT INTO shoe_images ("name","image1","image2","image3") VALUES ($1,$2,$3,$4)'
        
        const values = ['Nike Victori One x Nike United',

        //Image 1
        'https://res-console.cloudinary.com/ds4wntnyf/thumbnails/v1/image/upload/v1691814665/dmljdG9yaS1vbmUteC1uaWtlLXVuaXRlZC13b21lbnMtc2xpZGVzLWRMVGh6eF9oNHk0dHU=/template_primary/Y190aHVtYix3XzU5MixoXzU5Mg==',

        // Image 2
        'https://res-console.cloudinary.com/ds4wntnyf/thumbnails/v1/image/upload/v1691814767/dmljdG9yaS1vbmUteC1uaWtlLXVuaXRlZC13b21lbnMtc2xpZGVzLWRMVGh6eF9wb28zeGw=/template_primary/Y190aHVtYix3XzU5MixoXzU5Mg==',

        // Image 3
        'https://res-console.cloudinary.com/ds4wntnyf/thumbnails/v1/image/upload/v1691814870/dmljdG9yaS1vbmUteC1uaWtlLXVuaXRlZC13b21lbnMtc2xpZGVzLWRMVGh6eF9vcGxpaXo=/template_primary/Y190aHVtYix3XzU5MixoXzU5Mg=='
    ]
        const insertShoes = await pool.query(text,values)

        
        res.status(200).json("Inserted")

    }catch(e){
        console.log(e)
        res.status(400).json({msg:e.message})
    }
}

export async function updateImages(req,res){
    try{
        const text = 'UPDATE shoes SET img = $1 WHERE "name" = $2'
        const values = [
            //img
            'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814177/calm-womens-slides-7XtJSh_oiqw80.jpg',

            // name
            'Nike Calm'
        ]
        const update = await pool.query(text,values)
        res.status(200).json({insert:"updated one shoe"})

    }catch(e){
        console.log(e)
        res.status(404).send(e.message)
    }
}

export async function updateShoe_Images(req,res){


    try{
        const text = 'UPDATE shoe_images SET image1 = $1, image2 = $2, image3 = $3 WHERE "name" = $4'
        const values = [
            //img1
            'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814824/victori-one-x-nike-united-womens-slides-dLThzx_bx9feu.jpg',

            //img2
            'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814767/victori-one-x-nike-united-womens-slides-dLThzx_poo3xl.jpg',
            //img3
            'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814870/victori-one-x-nike-united-womens-slides-dLThzx_opliiz.jpg',
            // name
            'Nike Victori One x Nike United'
        ]
        const update = await pool.query(text,values)
        res.status(200).json({insert:"true"})

    }catch(e){
        console.log(e)
        res.status(404).send(e.message)
    }
}

