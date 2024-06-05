import User from "@models/User";
import { ConnectToDB } from "@mongodb";
import { hash } from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await ConnectToDB();

    const body = await req.json();
    const { username, email, password } = body;
    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return new Response("User present", {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a User", {
      status: 500,
    });
  }
};
