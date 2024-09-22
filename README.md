# JustBlogIt

JustBlogIt is a modern, real-time blogging platform where users can create posts, follow other users, and receive notifications on updates and interactions. The application features a responsive front-end built with Vite, React, and Tailwind CSS, and a powerful back-end leveraging Django, MySQL, and Redis for handling web-sockets and real-time notifications.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
  - [Front-End Setup](#front-end-setup)
  - [Back-End Setup](#back-end-setup)
  - [Database and WebSocket Configuration](#database-and-websocket-configuration)
  - [Docker Setup](#docker-setup)
- [Running the Application](#running-the-application)
- [commands and extras](#commands-and-extras)

## Features
- **User Authentication**: Secure login and registration system.
- **Create and Manage Blog Posts**: Users can create, edit, and delete blog posts.
- **Follow/Unfollow**: Users can follow and unfollow others, with real-time notifications.
- **Real-Time Notifications**: Notification system built on Django Channels and Redis.
- **Responsive UI**: Front-end designed using Tailwind CSS, offering an engaging user experience across devices.
- **RESTful API**: Well-structured API using Django Rest Framework for data management.
- **Dockerized Deployment**: Easily deploy the app using Docker.

## Technologies

**Front-End:**
- [Vite](https://vitejs.dev/) - Build tool for modern web development.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for designing responsive UI.

**Back-End:**
- [Django](https://www.djangoproject.com/) - High-level Python web framework.
- [MySQL](https://www.mysql.com/) - Relational database management system.
- [Redis](https://redis.io/) - In-memory data store for handling real-time notifications.

**Additional Tools:**
- [Docker](https://www.docker.com/) - Containerization platform.
- [ESLint](https://eslint.org/) - Linting utility for JavaScript code.
- [Django Rest Framework](https://www.django-rest-framework.org/) - Toolkit for building Web APIs.

## Setup Instructions

### Front-End Setup

1. **Clone the Front-End Repository:**
   ```bash
   git clone https://github.com/your-username/justblogit-ui.git
   cd justblogit-ui

###Install Front-End Dependencies:

```bash

npm install
Run the Development Server:

```bash
npm run dev
Build the Production Version:

```bash
npm run build
Preview the Production Build:

```bash
npm run preview
```

###Back-End Setup

Clone the Back-End Repository:

```bash
git clone https://github.com/your-username/justblogit-backend.git
cd justblogit-backend
Set Up a Python Virtual Environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

###Install Back-End Dependencies:

```bash
pip install -r requirements.txt
Set Up the Database:

Ensure MySQL is running, and configure your settings.py with the correct MySQL credentials.
Then, run the following commands:

```bash
py manage.py makemigrations
py manage.py migrate


###Run the Django Development Server:

```bash
py manage.py runserver


Database and WebSocket Configuration
MySQL Installation and Setup: Install MySQL if it's not already installed:

```bash
sudo apt install mysql-server


Start MySQL:

```bash
sudo systemctl start mysql


Redis Installation and Setup: Install Redis for real-time functionality:

```bash
sudo apt install redis-server
Start Redis:

```bash
sudo systemctl start redis-server


Docker Setup
Docker Deployment: This project is configured to run using Docker. To deploy the application via Docker:

Build and Run Docker Containers:

```bash
docker-compose up --build
Stop Docker Containers:

```bash
docker-compose down


Running the Application
Ensure MySQL and Redis are Running:

```bash
sudo systemctl start mysql
sudo systemctl start redis-server
Start the Front-End Development Server: Inside the justblogit-ui directory:

```bash
npm run dev
Start the Django Back-End: Inside the justblogit-backend directory:

```bash
python manage.py runserver
Access the Application:

Front-End: http://localhost:3000
Back-End: http://localhost:8000

Some official plugins available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh