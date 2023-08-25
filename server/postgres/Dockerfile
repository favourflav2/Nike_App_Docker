FROM postgres:latest

# We add the tables folder we created with our table queries
# /docker-entrypoint-initdb.d/tables/ ... this is according to postgres image documentaion to extend this image so it is standard naming
ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD deploy_schema.sql /docker-entrypoint-initdb.d/