BEGIN TRANSACTION;

create table public.orders (
 order_id serial not null PRIMARY KEY,
 "name" varchar(100) not NULL,
 gender text not NULL,
 img text not NULL,
 price NUMERIC(5,2) not NULL,
 "type" VARCHAR(100) not NULL,
 "size" VARCHAR(100) not null,
 count VARCHAR(100) not null,
 who_ordered uuid not null REFERENCES users(id),
 "date" timestamp without time zone NOT NULL,
 city text DEFAULT 'N/A',
 "address" text DEFAULT 'N/A',
 zip_code text DEFAULT 'N/A',
 "state" text DEFAULT 'N/A',
 country text DEFAULT 'N/A',
 who_ordered_name VARCHAR(100) DEFAULT 'N/A'
);

COMMIT;