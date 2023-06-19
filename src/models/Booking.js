export function constructBooking(userRef, ownerRef, spaceRef, status) {
    const booking = {
        userRef: userRef,
        ownerRef: ownerRef,
        spaceRef: spaceRef,
        status: status,
    }
    return booking
}

export const STATUS_PENDING = "pending"
export const STATUS_ONGOING = "ongoing"
export const STATUS_COMPLETED = "completed"