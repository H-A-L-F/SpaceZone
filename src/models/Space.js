export function constructSpace(name, desc, price, photoURL) {
    const space = {
        name: name,
        desc: desc,
        price: parseInt(price),
        photoURL: photoURL
    }
    return space
}