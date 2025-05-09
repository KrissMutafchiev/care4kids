"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ResetPassword() {
    const { data: session } = useSession();
    //const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleReset = async () => {

        
        // if (!newPassword) {
        //     setError("Password cannot be empty");
        //     return;
        // }
        //const  userId = 'ObjectId(67daf8f67fdd4b9d189e8c4d)'
        const newPassword = 'care_4_k1ds_adm1n'

        
        const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId:'67daf8f67fdd4b9d189e8c4d', newPassword }),
        });

        const result = await response.json();

        if (!response.ok) {
            setError(result.error);
        } else {
            setSuccess("Password updated! Redirecting...");
           // setTimeout(() => router.push("/dashboard"), 2000);
        }
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleReset}>Update Password</button>
        </div>
    );
}
