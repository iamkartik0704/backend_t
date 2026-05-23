1. install everything
just run `npm install`

2. env variables
create a file called `.env` in the root folder. DO NOT commit this.
you need these keys:
PORT=5000
MONGODB_URI=<your_mongo_connection_string>
JWT_SECRET=<put_some_random_secure_string_here>
SESSION_SECRET=<put_some_random_secure_string_here>
SUPERADMIN_EMAIL=<your_admin_email>
SUPERADMIN_PASSWORD=<your_admin_password>

3. database seed
there is no public signup route (so randoms can't make admin accounts).
you have to seed your own account first to log in.
- run `npm run build`
- run `node dist/scripts/seed.js`
(if you change your password in the .env later, run this again)

4. run the server
`npm run dev`
it should boot up on localhost:5000.

api endpoints to test in postman:
- POST /api/admin/auth/login (use the email/pass from your .env)
- POST /api/admin/auth/logout(use the email/pass from your .env)
- GET /api/admin/auth/me (needs the cookie from login)


