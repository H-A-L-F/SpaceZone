import React, { useEffect } from 'react'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { collection, doc, query, where } from 'firebase/firestore'
import { FB_DB } from '../lib/Firebase'
import { useUserAuth } from '../lib/AuthContext'
import { Flex, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import { FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/UseSnapCollection'
import SpaceCardSkele from '../components/SpaceCardSkele'
import BookingCard from '../components/BookingCard'
import { STATUS_COMPLETED, STATUS_ONGOING, STATUS_PENDING } from '../models/Booking'
import { useLoadingContext } from '../lib/LoadingContext'

const Bookings = () => {
    const { user } = useUserAuth()
    const {setLoading} = useLoadingContext() 

    const bookingsState = useSnapCollection(query(collection(FB_DB, "booking"), where("userRef", "==", doc(FB_DB, "user", user.id))))


    // useEffect(() => {
    //     if(!bookingsState.data) setLoading(true)
    //     else setLoading(false)

    // }, [bookingsState.data, setLoading])

    if(bookingsState.status === FIRESTORE_FETCH_SUCCESS && bookingsState.data.length <= 0) return <Heading color="primary.700">You have no booking...</Heading>
    return (
        <Flex flexDir="column" color="primary.700" gap="4">
            <Heading>Bookings</Heading>
            <Wrap spacing='30px'>
                {
                    bookingsState.status === FIRESTORE_FETCH_LOADING ?
                        Array.from({ length: 12 }, (_, i) => i + 1).map((id) =>
                            <WrapItem key={id}>
                                <SpaceCardSkele />
                            </WrapItem>
                        ) :
                        bookingsState.data.map((b) =>
                            <WrapItem key={b.id}>
                                <BookingCard booking={b} />
                            </WrapItem>
                        )
                }
            </Wrap>
        </Flex>
    )
}

export default Bookings