WaveType 🌊
WaveType helps you type faster on notebooks!
With catchy music and lyrics, it makes learning fun and engaging. 
Dive into lessons, groove to the beat, and watch your typing skills soar!
Say goodbye to boring typing practice – WaveType makes it an exciting journey!🎧

Future Features
Music and lyrics-based typing practice
Fun and engaging learning environment
Designed for notebook keyboards
Improves typing speed and accuracy

-----------------------------------------

# WaveType Express Application Documentation

## Overview

This Express application serves as a web platform for displaying information about different topics and managing user data. It utilizes EJS templates for rendering views and interacts with a MongoDB database for user management. Additionally, it integrates with the Musixmatch API to fetch lyrics for specified artists and tracks.



## Usage

1. Access the application through a web browser at `https://wavetype-v1-0-vb.onrender.com`.

## Routes

- **GET `/`**: Home page displaying the main content.
- **GET `/about`**: About page with information about the platform.
- **GET `/contact`**: Contact page for reaching out to the platform administrators.
- **GET `/wavetype/:keyword`**: Page for displaying information based on the provided keyword.
- **GET `/users/view`**: View all users registered in the system.
- **GET `/users/view/:slug`**: View details of a specific user identified by the slug.
- **GET `/users/view/:slug/edit`**: Edit details of a specific user identified by the slug.
- **POST `/users/:slug`**: Update details of a specific user identified by the slug.
- **GET `/users/view/:slug/delete`**: Delete a specific user identified by the slug.
- **GET `/users/new`**: Form for creating a new user.
- **POST `/users`**: Create a new user.
- **POST `/search`**: Perform a search for lyrics based on the provided artist and track information.

## Middleware

- **Logger Middleware**: Logs information about incoming requests.
- **Static Files Middleware**: Serves static files located in the 'public' directory.
- **Body Parser Middleware**: Parses incoming request bodies.

## Views

- **EJS Templates**: Utilizes EJS for rendering dynamic HTML pages.
- **Layouts**: Consistent header and footer layouts across pages.

## API Integration

- **Musixmatch API**: Integrates with the Musixmatch API to fetch lyrics based on artist and track information.

## Error Handling

- Error handling using try/catch.

## kbrd.js

- Used for functionality of typewriter
- Functionalities include: API call to MusixMatch, Searching for lyrics of different artists, typing on digital keyboard, viewing typing errors and stats

## Important!!! WaveType is still work in progress 

