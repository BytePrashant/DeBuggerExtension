-- Todo DB
create database Todo

-- client table
create table client(
    user_id serial primary key,
    name varchar(255) not null
)

-- todo table
create table todo(
    todo_id serial primary key,
    description varchar(255)
)
