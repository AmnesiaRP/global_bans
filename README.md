# REST API for GlobalBan project

## Installation

### Recommended

- node.js version 20
- npm version 9

### Install dependencies

```bash
npm install
```

### Environment file

Create a file named `.env` in the root directory of the project. The file should contain the following variables:

```env
APP_PORT=8080

DB_HOST=
DB_PORT=3306
DB_NAME=
DB_USER=
DB_PASS=
```

You have to fill in the values for the database connection. The database must be created beforehand.

### Initialize database

You can initialize the database by running the SQL script `./sql/install.sql`.

### Start the server

```bash
npm start
```



## API

### Authentication

The API uses the `Authorization` header to authenticate requests. The value of the header should be the API token of the server.

### Get a user's bans

Returns the user's bans with the given Steam ID.

```http request
GET /users/STEAM_0:x:xxxxxxxx HTTP/1.1
Authorization: <API token>
```
```json
{
  "steam_id": "STEAM_0:x:xxxxxxxx",
  "bans": [
    {
      "server": "Server 1",
      "reason": "Cheating is bad"
    },
    {
      "server": "Server 2",
      "reason": "Troll"
    }
  ]
}
```

### Add ban to a user

Adds a ban to the user with the given Steam ID.

```http request
POST /users/STEAM_0:x:xxxxxxxx/bans HTTP/1.1
Authorization: <API token>

{
  "reason": "Cheating is bad"
}
```
```json
{
  "steam_id": "STEAM_0:1:78946513",
  "server": "Server 1",
  "reason": "Cheating is bad"
}
```
