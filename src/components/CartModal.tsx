import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useAuth } from "@clerk/clerk-react";

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartModalProps {
    open: boolean;
    items: CartItem[];

    onClose: () => void;
    onIncrease: (id: string) => void;
    onDecrease: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function CartModal({
    open,
    onClose,
    onIncrease, // these will implement here 
    onDecrease,// these will implement here 
    onRemove,// these will implement here 
}: CartModalProps) {
    const {isLoaded,userId}  = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);


    const fetchCart = async () => {
        const {data, error} = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId);
            
        if (error) {
            console.error('Error fetching cart:', error);
        }
        setItems(data as CartItem[]);
        return data as CartItem[];

    }

    useEffect(() => {
        fetchCart();
    }, []);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            <aside
                className={`fixed top-0 right-0 h-screen w-full sm:w-[430px]
                bg-white shadow-2xl z-50
                transition-transform duration-500
                ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}

                <div className="flex items-center justify-between p-6 border-b">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Shopping Cart
                        </h2>

                        <p className="text-sm text-gray-500">
                            {items.length} items
                        </p>
                    </div>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                {/* Body */}

                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {items.length === 0 && (

                        <div className="h-full flex flex-col items-center justify-center text-center">

                            <img
                                src="/empty-cart.svg"
                                className="w-48"
                            />

                            <h3 className="mt-6 text-xl font-semibold">
                                Your cart is empty
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Add a beautiful watch.
                            </p>

                        </div>

                    )}

                    {items.map(item => (

                        <div
                            key={item.id}
                            className="flex gap-4"
                        >

                            <img
                                src={item.image}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">

                                <h4 className="font-semibold">
                                    {item.name}
                                </h4>

                                <p className="mt-2 font-medium">
                                    Rs. {item.price.toLocaleString()}
                                </p>

                                <div className="flex items-center gap-3 mt-4">

                                    <button
                                        onClick={() => onDecrease(item.id)}
                                    >
                                        <Minus size={16} />
                                    </button>

                                    {item.quantity}

                                    <button
                                        onClick={() => onIncrease(item.id)}
                                    >
                                        <Plus size={16} />
                                    </button>

                                </div>

                            </div>

                            <button
                                onClick={() => onRemove(item.id)}
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>

                    ))}

                </div>

                {/* Footer */}

                <div className="border-t p-6">

                    <div className="flex justify-between text-lg font-semibold">

                        <span>Subtotal</span>

                        <span>
                            Rs. {subtotal.toLocaleString()}
                        </span>

                    </div>

                    <button
                        className="mt-6 w-full bg-black text-white py-4"
                    >
                        Checkout
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-3 w-full border py-4"
                    >
                        Continue Shopping
                    </button>

                </div>

            </aside>
        </>
    );
}