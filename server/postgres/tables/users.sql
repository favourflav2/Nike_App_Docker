BEGIN TRANSACTION;

CREATE  table public.users (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) not null,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) not NULL,
    joined timestamp without time zone NOT NULL
);

COMMIT;