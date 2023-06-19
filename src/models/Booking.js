export function constructBooking(userRef, spaceRef, status) {
    const booking = {
        userRef: userRef,
        spaceRef: spaceRef,
        status: status,
    }
    return booking
}