import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  removeItem: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, removeItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto h-[70%]">
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                <div className="flex-1 ml-3">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <button onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between mb-3">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">₹{total}</span>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
