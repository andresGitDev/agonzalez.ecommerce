export const createAdaptedProduct = (doc) => {
    const data = doc.data()

    const productAdapted = {
        id: doc.id,
        name: data.name,
        img: data.img,
        price: data.price,
        cateogory: data.category,
        description: data.description,
        stock: data.stock
    }

    return productAdapted
}