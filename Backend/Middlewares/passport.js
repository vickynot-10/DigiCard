import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import { UsersAuthModel } from "../Models/UsersAuth.js";
import {configDotenv} from 'dotenv'
configDotenv()

passport.use(new GoogleStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL
},async(token,tokenSecret,profile,done)=>{
    try{
        let user =await UsersAuthModel.findOne({ googleID : profile.id });
        if(!user){
            user = new UsersAuthModel({
                username: profile.displayName,
                mail: profile.emails[0].value,
                googleID : profile.id,
                subscription: 'free', 
            });
            await user.save();
        }
        return done(null,user)
    }catch(e){
        return(e.message , null)
    }
}
));

passport.serializeUser((user,done)=>{
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await UsersAuthModel.findOne( {_id : id} );
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  export default passport