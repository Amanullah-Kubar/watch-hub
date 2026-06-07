import { supabase } from "../../config/supabase";

export const handleLogin = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Login error:", error.message);
            return error;
        }
        return data;
    } catch (error) {
        alert(error);
        return error;
    }
};

export const handleSignup = async (email: string, password: string, name: string) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    displayName: name,
                }
            },
        });

        if (error) {
            console.error("Signup error:", error.message);
            return error;
        }
        return data;
    } catch (error) {
        alert(error);
        return error;
    }
};

export const handleGoogleLogin = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            console.error(error);
        }
    } catch (err) {
        console.error("CATCH:", err);
    }
};

export const handleLogout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
            return error;
        }
        return true;
    }
    catch (error) {
        alert(error);
        return error;
    }
};