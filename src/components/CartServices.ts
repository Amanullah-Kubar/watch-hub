import { supabase } from "../config/supabase";

export const getCart = async (userId: string) => {
    const { data, error } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error.message);
        return null;
    }

    return data;
};

export const createCart = async (userId: string) => {
    const { data, error } = await supabase
        .from("carts")
        .insert({
            user_id: userId,
        })
        .select()
        .single();

    if (error) {
        console.error(error.message);
        return null;
    }

    return data;
};

export const getOrCreateCart = async (userId: string) => {
    let cart = await getCart(userId);

    if (!cart) {
        cart = await createCart(userId);
    }

    return cart;
};