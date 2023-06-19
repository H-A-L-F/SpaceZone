export function constructBooking(userRef, spaceRef, status) {
    const booking = {
        userRef: userRef,
        spaceRef: spaceRef,
        status: status,
    }
    return booking
}

export const STATUS_PENDING = "pending"
export const STATUS_ONGOING = "ongoing"
export const STATUS_COMPLETED = "completed"