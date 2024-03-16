-- Todo DB
create database Todo

-- client table
create table client(
    user_id serial primary key,
    username varchar(255) not null
)

-- todo table
create table todo(
    todo_id serial primary key,
    user_id INT REFERENCES client(user_id),
    description varchar(255)
)
