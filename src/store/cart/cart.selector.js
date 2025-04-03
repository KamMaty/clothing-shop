import {createSelector} from "reselect";
import {createAction} from "../../utils/reducer/reducer.utils";

const selectCartReducer = state => state.cart

export const selectCartItems = createSelector([selectCartReducer], cart => cart.cartItems);

export const selectIsCartOpen = createSelector([selectCartReducer], cart => cart.isCartOpen);

export const selectCartCount = createSelector([selectCartItems], cartItems => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
));

export const selectCartValue = createSelector([selectCartItems], cartItems => cartItems.reduce(
        (value, cartItem) => value + cartItem.quantity * cartItem.price,
        0
    )
);
