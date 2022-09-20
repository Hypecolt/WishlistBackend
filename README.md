
# Wishlist API

A wishlist API developed for the Javascript Bootcamp organised by Softbinator Technologies.


## Documentation

For the first setup it is required to run the `npx prisma db push` command in the terminal.

You are required to have a `.env` file in the same directory with `index.js` with the following structure:

```
DATABASE_URL="mysql://<mysql_user>:<mysql_password>@localhost:3306/<database_name>"

TOKEN_KEY=<token_key>

EMAIL=<gmail_email_address>
EMAIL_PASS=<gmail_app_password>
```

You also need to create a gmail App specific password for the invite links to be sent through email.