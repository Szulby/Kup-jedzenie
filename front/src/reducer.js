export default function reducer(state, action) {
    let newState = state.cart.slice()
    const id = state.cart.findIndex(i => i.id === action.payload)
    switch (action.action) {
        case 'add_item':
            if (!state.cart.length) {
                newState.push({
                    id: action.payload,
                    count: 1
                })
            } else {
                if (id !== -1) {
                    newState = [
                        ...state.cart.slice(0, id),
                        { ...state.cart[id], count: state.cart[id].count + 1 },
                        ...state.cart.slice(id + 1)
                    ];
                } else {
                    newState.push({
                        id: action.payload,
                        count: 1
                    })
                }
            }
            break
        case 'remove_item':
            newState = state.cart.filter(item => item.id !== action.payload)
            break
        case 'increase':
            newState = [
                ...state.cart.slice(0, action.payload),
                { ...state.cart[action.payload], count: state.cart[action.payload].count + 1 },
                ...state.cart.slice(action.payload + 1)
            ];
            break
        case 'decrease':
            if (state.cart[id].count === 1) {
                newState = [
                    ...state.cart.slice(0, id),
                    ...state.cart.slice(id + 1)
                ];
            } else {
                newState = [
                    ...state.cart.slice(0, id),
                    { ...state.cart[id], count: state.cart[id].count - 1 },
                    ...state.cart.slice(id + 1)
                ];
            }
            break
        case 'clear_cart':
            newState = []
            break
        case 'set_token':
            localStorage.setItem('token', action.payload)
            return { ...state, token: action.payload }
        case 'remove_token':
            localStorage.setItem('token', '')
            return { ...state, token: '' }
        default:
            break
    }
    localStorage.setItem('store', JSON.stringify(newState))
    return { ...state, cart: newState }
}