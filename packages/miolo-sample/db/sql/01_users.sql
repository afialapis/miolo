CREATE TABLE account (
    --sqlite
    --id INTEGER PRIMARY KEY AUTOINCREMENT, 
    id serial,
    username text,
    password text,
    name text,
    email text,
    active integer,
    
    google_id text,
    google_picture text,

    last_login_date integer,
    last_login_ip text,
    login_count integer DEFAULT 0,

    last_conn_at integer,
    created_at integer,
    last_update_at integer
);


INSERT INTO account 
  (username, password, name, email) 
VALUES 
  ('miolo-sample@miolo-sample.com',
   '3dc91ce0dd374a6daf9ccaa4f64c5e0972eb2e7c9857a6aa524174897c0f7c55a3853e696ef8b4c3156f5fd39d65a49496a929f278ae96577e948fb85546e222', 
   'miolo-sample', 
   'miolo-sample@miolo-sample.com')
;
