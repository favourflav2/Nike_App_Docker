-- Deploy fresh database 
-- Order matter here if your tables depend on each other

\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/shoes.sql'
\i '/docker-entrypoint-initdb.d/tables/likeShoe.sql'
\i '/docker-entrypoint-initdb.d/tables/orders.sql'
\i '/docker-entrypoint-initdb.d/tables/shoeImages.sql'
