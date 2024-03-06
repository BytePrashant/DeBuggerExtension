create database Todo

create table todo(
    todo_id serial primary key,
    description varchar(255)
)

create table client(
    user_id serial primary key,
    name varchar(255)
)