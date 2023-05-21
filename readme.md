# WHOGET PLATFORM API

WhoGet app is a mobile application which help people get services from others easily. <br>
Users who sign up on this platform are able to make requests and get replies to their request by email, whatsapp or call. subscribers can also reply to other's questions. visitors can view requests but cannot reply nor can they make requests of their own.
* The front end is build with next js(for admin dashboard) and is hosted at https://whoget-admin.vercel.app/
* link to mobile app on play store to be added soon.
* The backend code is is hosted at https://whoget-api.onrender.com/
<!--* hit the provided endpionts by appending the endpoint on the table below to the hosted link above. <br>
___For example___ : https://whoget.onrender.com/api/asks to get json of all asks -->

### TABLE OF ENDPOINTS (and structure of models will be added bellow, soon)

<!---
| STATUS  | METHOD | ENDPOINT           | RESPONSE 
| --------|--------|--------------------|--------------
| UP      | GET    | `/api/`            | lists of all endpoints 
| UP      | GET    | `/api/users`       | gets all users
| UP      | GET    | `/api/users?`      | gets particular user by google uid or mongodb id
| UP      | PUT    | `/api/users`        | creates a new user
| UP      | GET    | `/api/asks?`        | get all asks {categories: string[], showHidden: boolean}
| UP      | POST   | `/api/asks`         | creates an ask
| UP      | PATCH  | `/api/users/:id`    | updates user info with given id
| UP      | PATCH  | `/api/asks/:id`     | updates ask with given id
| UP      | DELETE | `/api/asks/:id`     | deletes ask with given id

<br>

### USER MODEL

* `username`: String, required
* `uid`: String, required, unique
* `interests`: [String], required
* `status`: {banned: Boolean, bannedDate: String}, required, banned defaults to false
* `telephone`: Number, required, unique
* `email`: String, unique
* `whatsapp`: Number
* `photo`: String

### ASK MODEL

* `userInfo`: {user_id, username, photo}
* `message`: String, required
* `categories`: [String], required
* `image`: String,
* `expiry`: Number, required, default=3
* `status`: {hidden: Boolean, hiddenDate: String}, required, hidden defaults to false
-->