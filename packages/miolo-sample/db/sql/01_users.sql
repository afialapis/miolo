CREATE TABLE u_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username text,
    password text,
    name text,
    email text,
    active integer,

    admin boolean,

    last_login_date integer,
    last_login_ip text,
    login_count integer DEFAULT 0,

    last_conn_at integer,
    created_at integer,
    last_update_at integer
);


INSERT INTO u_user (username, password, name, email) VALUES ('devel@afialapis.com', '49e1db7b03b5a307e4374b40d3c9cc9a72b0e38dee90f6192f6ff9c029e36914e2784acb593afa4d6790ea4e4a9d9dfefe30fc1738e19fdb4d1dcd2f3c8d503c', 'Afialapis', 'devel@afialapis.com')
