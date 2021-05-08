# tiny-garden-server


KEYS
```
USERNAME=examplemongodbadmin
PASSWORD=3xampl3m0ng0passw0rd
HOST=somecluster.mongodb.net
DATABASE=exampledb
```
CRUD Application Example

Uses Express.js and Mongoose to connect to a [Mongo Atlas](https://www.mongodb.com/cloud/atlas) database.

This is a Glitch adaptation of the [building a restful api with express and mongodb](https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh) tutorial on Dev.to.



API tests with Postman

`GET /api/book`


`POST /api/book`
```json
{
  "title":"War and Peace",
  "author":"Warren Peice?"
}
```

`POST /api/book`

```json
{
  "title":"One Day in the Life of Ivan Denisovich",
  "author":"Aleksandr Solzhenitsyn"
}
```

`GET /api/book`

JOBS


## Resources
- [building a restful api with express and mongodb](https://dev.to/aurelkurtula/building-a-restful-api-with-express-and-mongodb--3mmh)
