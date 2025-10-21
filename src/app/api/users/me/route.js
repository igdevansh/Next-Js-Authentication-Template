import { getDatafromToken } from "@/helpers/getDatafromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request) {
    try {
        const userId = await getDatafromToken(request);
        const user = await User.findOne({ _id: userId });
        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}