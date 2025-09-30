import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet
        </p>
        <Button size="lg" asChild>
          <Link to="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const totalMRP = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const discount = totalMRP - totalPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.seller}</p>
                      {item.selectedSize && (
                        <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-sm text-muted-foreground">
                          Color: {item.selectedColor}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                      <div className="text-sm text-muted-foreground line-through">
                        ₹{item.mrp * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Price Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Price Details</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-accent">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className="text-accent">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <Button size="lg" className="w-full" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              You will save ₹{discount} on this order
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
