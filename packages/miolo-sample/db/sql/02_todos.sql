create table todo (
  --sqlite
  --id INTEGER PRIMARY KEY AUTOINCREMENT, 
  id serial,
  description text,
  done boolean,
  --sqlite
  --created_at INTEGER DEFAULT (strftime('%s', 'now')),
  --last_update_at INTEGER DEFAULT (strftime('%s', 'now')),
  created_At int default extract(epoch from now()),
  last_update_At int default extract(epoch from now()),
  created_by int,
  last_update_by int
);

INSERT INTO todo (description, done) VALUES ('Buy milk', false);
INSERT INTO todo (description, done) VALUES ('Buy eggs', true);
INSERT INTO todo (description, done) VALUES ('Buy bread', false);
INSERT INTO todo (description, done) VALUES ('Buy butter', true);
INSERT INTO todo (description, done) VALUES ('Buy cheese', false);
