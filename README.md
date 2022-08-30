# Project 4 API

## Description
An app that serves as a destination for all of a user's planning and wellness needs. Users can journal, make to-do lists, and track their habits in their accounts. 

## Client Repository
https://github.com/eshalali/project_4_client

## User Stories

* As a user, I want to be able to create an account
* As a user, I want to be able to sign in
* As a user, I want to be able to log out

* As a user, I want to be able to write journal entries
* As a user, I want to be able to edit journal entries
* As a user, I want to be able to see journal entries
* As a user, I want to be able to delete journal entries

* As a user, I want to be able to make a to-do list
* As a user, I want to be able to edit a to-do list
* As a user, I want to be able to see a to-do list
* As a user, I want to be able to delete a to-do list

* As a user, I want to be able to use a habit tracker API

* As a user, I want to be able to add events to a calendar
* As a user, I want to be able to edit events in a calendar
* As a user, I want to be able to see events in a calendar
* As a user, I want to be able to delete events from a calendar

## Wireframes
![WF1](./images/Page1.jpg)
![WF2](./images/Page2.jpg)
![WF3](./images/Page3.jpg)
![WF4](./images/Page4.jpg)

## ERDs
![ERDs](./images/Page5.jpg)

## API
### Full Calendar API
Full Calendar is a Calendar component for React that displays a variety of views. Users can add events to this and have them display on the calendar, making organization and tracking easy.

## Routes
### Journal AND ToDo
Action      | HTTP Verb  | Route              | Purpose
----------- | ---------- |------------------- | --------------------------------------- |
Index       | GET        | /journal/         | show all journal entries                 |
Show        | GET        | /journal/:id      | look at one journal entry                |
Edit        | GET        | /journal/:id/edit | edit one journal entry                   |
Update      | PATCH      | /journal/:id      | update one journal entry                 |
New         | GET        | /journal/create   | new journal entry                        |
Create      | POST       | /journal          | create journal entry,redirect to all     |
Delete      | DELETE     | /journal/:id      | delete a single journal entry            |
