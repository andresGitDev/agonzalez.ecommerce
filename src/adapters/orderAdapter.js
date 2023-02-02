export const createAdaptedOrder = (name,phone,email,direction,cart,totalPay) => {

    const orderAdapter = {
        buyer: {
            name,
            phone,
            email,
            direction
        },
        items: cart,
        totalPay
    }

    return orderAdapter
}