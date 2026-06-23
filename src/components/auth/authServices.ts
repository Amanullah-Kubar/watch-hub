import type { SignInResource, SignUpResource } from "@clerk/types";
import { supabase } from "../../config/supabase";

export const login = async (
    signIn: SignInResource,
    email: string,
    password: string
) => {
    return await signIn.create({
        identifier: email,
        password,
    });
};

export const signup = async (
    signUp: SignUpResource,
    name: string,
    email: string,
    password: string,
    phone: string
) => {
    const result = await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
        unsafeMetadata: {
            fullName: name,
            phone,
        },
    });

    await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
    });
    return result;
};
export const saveProfile = async (
    userId: string,
    email: string,
    phone: string,
    fullName: string
) => {
    const { data, error } = await supabase
        .from("profiles")
        .upsert({
            id: userId,
            email,
            phone,
            full_name: fullName,
        });

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};
export const googleLogin = async (
    signIn: SignInResource
) => {

    return await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
    });

    
};

export const getErrorMessage = (err: any) => {
    return (
        err?.errors?.[0]?.longMessage ??
        err?.errors?.[0]?.message ??
        err?.message ??
        "Authentication failed"
    );
};