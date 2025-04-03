import {ProductCartContainer, Footer, Name, Price} from "./product-card.style";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";

import {useDispatch, useSelector} from "react-redux";

import {addItemToCart} from "../../store/cart/cart.action";
import {selectCartItems} from "../../store/cart/cart.selector";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Add to card
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;
