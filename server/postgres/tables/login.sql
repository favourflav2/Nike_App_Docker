BEGIN TRANSACTION;

CREATE TABLE public.login (
    "id" serial NOT NULL,
    email text NOT NULL UNIQUE,
    "hash" character varying(100) NOT NULL
);

COMMIT;