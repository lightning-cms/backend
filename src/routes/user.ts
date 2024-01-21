import {api} from "@/index.ts";
import {getAuth} from "@hono/clerk-auth";
import UserModel, {type User} from "@/models/User.ts";

const user = api.route("/user")

user.get('/', async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    c.status(401);
    return c.json({success: false})
  }

  c.status(200);

  const userExists = await UserModel.findOne({_id: auth.userId})
  let user: User | undefined;
  if (!userExists) {
    const newUser = new UserModel({
      _id: auth.userId
    })
    await newUser.save();
    user = newUser;
  } else user = userExists

  return c.json({success: true, user})
})