# WHOGET PLATFORM API

WhoGet app is a mobile application which help people get services from others easily. <br>
Users who sign up on this platform are able to make requests and get replies to their request by email, whatsapp or call. subscribers can also reply to other's questions. visitors can view requests but cannot reply nor can they make requests of their own.
* The front end is build with react native and is hosted at https://whoget-admin.vercel.app/
<!-- * The backend code is is hosted at https://whoget.onrender.com/ -->
* hit the provided endpionts by appending the endpoint on the table below to the hosted link above. <br>
___For example___ : https://whoget.onrender.com/asks to get json of all asks 

### TABLE OF ENDPOINTS


| STATUS  | METHOD | ENDPOINT       | RESPONSE 
| --------|--------|----------------|----------
| TESTING | GET    | `/`            | list of all endpoints 
| TESTING | GET    | `/users`       | json of all users 
| TESTING | POST   | `/user`        | creates a new user
| TESTING | GET    | `/ask`         | json of all asks
| TESTING | POST   | `/ask`         | creates an ask
| TESTING | PATCH  | `/user/:id`    | updates user info with given id
| TESTING | PATCH  | `/ask/:id`     | updates ask with given id
| TESTING | DELETE | `/ask/:id`     | deletes ask with given id

<br>

### USER MODEL

* `username`: String, required
* `role`: ["admin", "standard"], default="standard"
* `interests`: [String], required
* `status`: {banned: Boolean, bannedDate: String}, required, banned defaults to false
* `telephone`: Number, required
* `email`: String
* `whatsapp`: Number

### ASK MODEL

* `userId`: String, required
* `message`: String, required
* `categories`: [String], required
* `image`: String,
* `expiry`: Number, required, default=3
* `status`: {hidden: Boolean, hiddenDate: String}, required, hidden defaults to false