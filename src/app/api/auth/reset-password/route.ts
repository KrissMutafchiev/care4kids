import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { userId, newPassword } = await req.json();

        if (!userId || !newPassword) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        await connect();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.isFirstLogin = false; // Mark first login as completed
        await user.save();

        return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Password reset failed" }, { status: 500 });
    }
}
