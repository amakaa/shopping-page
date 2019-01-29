const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';
const ADD_STOCK = 'products/product/ADD_STOCK';
const SUBTRACT_STOCK = 'products/product/SUBTRACT_STOCK';
const CLEAR_CART = 'products/product/CLEAR_CART';

const initialState = {
  loaded: false,
  loading: false,
  products: [],
  selectedProducts: [],
  error: '',
  everyItemInCart: [],
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: '',
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.result,
        selectedProducts: action.result,
        error: '',
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case ADD_STOCK:
      return {
        ...state,
        selectedProducts: [
          ...state.products.map(c => {
            return {...c};
          })
        ],
        everyItemInCart: [],
      }
    case SUBTRACT_STOCK:
      return {
        ...state,
        selectedProducts: [
          ...state.selectedProducts.map(c => {
            if (c._id === action.result.id) {
              return {
                ...c,
                stock: {
                  ...c.stock.remaining,
                  remaining: c.stock.remaining > 0 ? c.stock.remaining - 1 : c.stock.remaining,
                  added: c.stock.remaining > 0 ? (c.stock.added || 0) + 1 : c.stock.added,
                },
              }  
            }
            return {...c};
          })
        ],
        everyItemInCart: [
          ...state.everyItemInCart,
          ...state.selectedProducts.filter(c => c._id === action.result.id)
        ],
      }
      case CLEAR_CART:
        return {
          ...state,
          everyItemInCart: [],
          selectedProducts: [ ...state.products ],
        }
    default:
      return state;
  }
}

export function isLoading(state) {
  return state & state.loading;
}

export function getProducts(state) {
  return state && state.selectedProducts;
}

export function getEveryItemInCart(state) {
  return state && state.everyItemInCart;
}

export function getShoppingCart(state) {
  let cartItems = [];

  state.everyItemInCart.forEach(item => {
    if(!cartItems[item._id]) {
      cartItems[item._id] = [item];
    } else {
      cartItems[item._id] = [...cartItems[item._id], item];
    }
  })

  return cartItems;
}

export function clearCart(id) {
  return {
    type: CLEAR_CART,
  }
}

export function addProductStock(id) {
  return {
    type: ADD_STOCK,
    result: { id },
  }
}

export function subtractProductStock(id) {
  return {
    type: SUBTRACT_STOCK,
    result: { id },
  }
}

export function loadProducts() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.get('https://next.json-generator.com/api/json/get/4kiDK7gxZ', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
  };
}
