create table todos (
  id serial,
  name text,
  done boolean,
  created int DEFAULT EXTRACT (EPOCH FROM NOW())
);
ALTER TABLE todos ADD CONSTRAINT todos_id UNIQUE (id);


create table users (
  id serial,
  username text,
  password text,
  name text,  
  created int DEFAULT EXTRACT (EPOCH FROM NOW())
);
ALTER TABLE users ADD CONSTRAINT users_id UNIQUE (id);


INSERT INTO users (username, password, name) VALUES ('todoer', 'todoer', 'The Todoer');