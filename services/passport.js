const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");


passport.use(
    new GoogleStrategy({
            clientID: Keys.Client_ID,
            clientSecret: Keys.Client_Secret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
                    googleID: profile.id
                })
                .then((existingUser) => {
                    if (existingUser) {
                        console.log("User Exists");
                        done(null, existingUser)
                    } else {
                        new User({
                                googleID: profile.id
                            }).save()
                            .then((user) => {
                                done(null, user)
                            })
                    }
                })
        }
    )
)