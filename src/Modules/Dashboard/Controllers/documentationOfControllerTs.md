# Get User Dashboard Data

This complete path of this route is

`/dashboard`

this accepts authorization header with jwt token. which is checked on the way and we extract the user's clerk id from token and than extract other information from clerk id like email etc.

if there is no header than we return 401 error with unauthorized access header

In this route first we check if user with this clerk id already exists or not.

if exists than we check onboarding completed or not if yes than move further and fetch the data

and if onboarding is not complete than we return the response like this

```js
res.status(200).json({
  message: "Please Complete The Onboarding Form First!",
  onboarding: false,
});
```

but

if user not exists than we create the user.
