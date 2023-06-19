import React from 'react'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { collection, doc, query, where } from 'firebase/firestore'
import { FB_DB } from '../lib/Firebase'
import { useUserAuth } from '../lib/AuthContext'

const Orders = () => {

    const { user } = useUserAuth()

    const userRef = doc(FB_DB, "user", user.id)
    const ordersState = useSnapCollection(query(collection(FB_DB, "booking"), where("ownerRef", "==", userRef)))

    return (
        <div>Orders</div>
    )
}

export default Orders