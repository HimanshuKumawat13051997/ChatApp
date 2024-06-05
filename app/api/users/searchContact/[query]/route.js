import User from "@models/User";
import { ConnectToDB } from "@mongodb";

export const GET = async (req, { params }) => {
  try {
    await ConnectToDB();

    const { query } = params;
    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    return new Response(JSON.stringify(searchedContacts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to Get", {
      status: 500,
    });
  }
};
