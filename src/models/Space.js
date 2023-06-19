export function constructSpace(name, desc, price, photoURL, userRef) {
    const space = {
        name: name,
        desc: desc,
        price: parseInt(price),
        photoURL: photoURL,
        userRef: userRef
    }
    return space
}