
# Nest.js Boilerplate with PostgreSQL

This project serves as a comprehensive Nest.js boilerplate, featuring essential modules for authentication, user management, and a versatile shared module. The shared module encompasses functionalities for seamless email handling and efficient file uploads to the third-party service, Cloudinary. The boilerplate is equipped with a seeder and migration system for streamlined database management. In addition, Swagger documentation is implemented for seamless API exploration and testing.


## Getting Started
- Clone this repository.
- Install dependencies using npm install.
- Set up your environment variables.
- Start the application using npm start.

## How to run project

Run my-project with npm

```bash
  npm run install
  npm run start:dev

```
Run seeder 

```bash
  npm run seed:admin
  npm run seed:user

```
Run migrations 

```bash
  npm run migration:generate
  npm run migration:run
  npm run migration:revert

```
    
## Module

- Auth: Handles authentication and authorization logic.
- User: Manages user information and interactions.
- Shared: Includes email handling and facilitates file uploads to Cloudinary.


## Features
- Cloudinary Integration: Effortlessly upload and manage files on the third-party service Cloudinary.
- Email Services: Utilizes Node Mailer and SendGrid for seamless email sending functionality.
- Encryption and Decryption: Utilizing the Node.js Crypto module for secure data handling.
- Role-Based Authentication: Allows different levels of access based on user roles.
- Seeder and Migration: Streamline database management.
- Swagger: Facilitates API exploration and testing.
- Forgot Password Flow: Ensures a seamless process for password recovery.

The project utilizes a PostgreSQL database for robust data management.
## Authors

- [abduljsdev](https://github.com/abduljsdev)

