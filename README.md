
# Wishlist API

A wishlist API developed for the Javascript Bootcamp organised by Softbinator Technologies.


## Documentation

You are required to have a `.env` file in the same directory with `index.js` with the following structure:

```
DATABASE_URL="mysql://<mysql_user>:<mysql_password>@localhost:3306/<database_name>"

TOKEN_KEY=<token_key>

EMAIL=<gmail_email_address>
EMAIL_PASS=<gmail_app_password>
```

Then run the `npx prisma db push` command in the terminal, and `CREATE DATABASE <database_name>;` in MySQL Workbench.

You also need to create a gmail App specific password for the invite links to be sent through email.
