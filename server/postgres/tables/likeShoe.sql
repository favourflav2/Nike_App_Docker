BEGIN TRANSACTION;

CREATE TABLE public.like_shoes (
    "name" VARCHAR(100) not null,
     "id" serial NOT NULL PRImary KEY,
    price NUMERIC(5,2) not NULL,
    "desc" text not NULL,
    img text not null,
    gender text not null,
    "type" VARCHAR(100) not null,
    who_liked uuid not null REFERENCES users(id)
);

COMMIT;