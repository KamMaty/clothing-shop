import {CheckoutContainer, CheckoutHeader, HeaderBlock, CheckoutTotal} from "./checkout.styles";

import {useSelector} from "react-redux";
import {selectCartItems, selectCartValue} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartValue = useSelector(selectCartValue);
    
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}

            <CheckoutTotal>Total value: {cartValue}$</CheckoutTotal>
        </CheckoutContainer>
    );
};

export default Checkout;
