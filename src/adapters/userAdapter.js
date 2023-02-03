export const createAdaptedUser = (doc) => {
    const data = doc.data()

    const userAdapted = {
        id: doc.id,
        name: data.name,
        mail: data.mail,
        password: data.password
    }

    return userAdapted
}