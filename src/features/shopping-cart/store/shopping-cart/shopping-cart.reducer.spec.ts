/* eslint-disable @typescript-eslint/no-explicit-any */
import { addToCartSuccess, clearCart, decrementFromCart, incrementFromCart, removeFromCart, updateCart } from "./shopping-cart.actions";
import { shoppingCartReducer, initialState } from "./shopping-cart.reducer";

describe("ShoppingCartReducer", () => {
  it("should return the default state", () => {
    const action = {} as any;
    const result = shoppingCartReducer(initialState, action);

    expect(result).toBe(initialState);
  })

  it("should increment the quantity of a product in the cart", () => {
    const action = addToCartSuccess({ id: "1", quantity: 0, listing: { id: "1", stock: 1 } as any });
    const result = shoppingCartReducer(initialState, action);
    expect(result.products["1"]).toBe(1);
  });

  it("should increment the quantity of a product in the cart", () => {
    const mockInitialState = { products: { "1": 4 }, loading: false, error: null };
    const action = incrementFromCart({ id: "1" });
    const result = shoppingCartReducer(mockInitialState, action);
    expect(result.products["1"]).toBe(5);
  });

  it("should decrement the quantity of a product in the cart", () => {
    const mockInitialState = { products: { "1": 4 }, loading: false, error: null };
    const action = decrementFromCart({ id: "1" });
    const result = shoppingCartReducer(mockInitialState, action);
    expect(result.products["1"]).toBe(3);
  });

  it("should remove a product from the cart", () => {
    const mockInitialState = { products: { "1": 4 }, loading: false, error: null };
    const action = removeFromCart({ id: "1" });
    const result = shoppingCartReducer(mockInitialState, action);
    expect(result.products["1"]).toBeUndefined();
  });

  it("should update the whole cart", () => {
    const mockInitialState = { products: { "1": 4 }, loading: false, error: null };
    const action = updateCart({ products: { "2": 1 } });
    const result = shoppingCartReducer(mockInitialState, action);
    expect(result.products["1"]).toBeUndefined();
    expect(result.products["2"]).toBe(1);
  });

  it("should clear the cart", () => {
    const mockInitialState = { products: { "1": 4 }, loading: false, error: null };
    const action = clearCart();
    const result = shoppingCartReducer(mockInitialState, action);
    expect(result.products).toEqual({});
  });

});