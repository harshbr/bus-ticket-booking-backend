# Bus Booking System API

This is a RESTful API for a bus booking system built with Node.js, Express.js, and MongoDB. It includes user authentication, bus management, and booking functionalities.

## Features

- User signup and login with JWT authentication
- Bus management (CRUD operations)
- Booking and cancellation of bus seats

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/harshbr/bus-ticket-booking-backend.git
   ```
2. Navigate to the project folder:
   ```sh
   cd bus-ticket-booking-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running the Application

Start the server:

```sh
npm start
```

The API will be available at `http://localhost:5000`.

## API Endpoints

### Authentication Routes

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| POST   | `/signup`  | Register a new user    |
| POST   | `/signin`  | Login user and get JWT |
| GET    | `/getuser` | Get all users          |

### Bus Management Routes

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| POST   | `/addbus`         | Add a new bus   |
| GET    | `/getbus`         | Get all buses   |
| GET    | `/getbusById/:id` | Get a bus by ID |
| PUT    | `/update/:id`     | Update a bus    |
| DELETE | `/delete/:id`     | Delete a bus    |

### Booking Routes

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/busbook`           | Book a bus seat      |
| PUT    | `/cancelbooking/:id` | Cancel a bus booking |

## Dependencies

- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- jsonwebtoken for authentication
- email-validator for email validation

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
