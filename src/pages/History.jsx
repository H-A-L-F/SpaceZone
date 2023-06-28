import React, { useEffect } from 'react'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { collection, doc, query, where } from 'firebase/firestore'
import { FB_DB } from '../lib/Firebase'
import { useUserAuth } from '../lib/AuthContext'
import { Flex, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import { FIRESTORE_FETCH_LOADING, FIRESTORE_FETCH_SUCCESS } from '../actions/UseSnapCollection'
import SpaceCardSkele from '../components/SpaceCardSkele'
import BookingCard from '../components/BookingCard'
import { STATUS_COMPLETED } from '../models/Booking'

const History = () => {
    const { user } = useUserAuth()

    const historiesState = useSnapCollection(query(collection(FB_DB, "booking"), where("userRef", "==", doc(FB_DB, "user", user.id)), where("status", "==", STATUS_COMPLETED)))

    console.log(user.path)

    useEffect(() => {
        console.log(historiesState)

    }, [historiesState])

    if(historiesState.status === FIRESTORE_FETCH_SUCCESS && historiesState.data.length <= 0) return <Heading color="primary.700">You have no booking history...</Heading>
    return (
        <Flex flexDir="column" color="primary.700" gap="4">
            <Heading>History</Heading>
            <Wrap spacing='30px'>
                {
                    historiesState.status === FIRESTORE_FETCH_LOADING ?
                        Array.from({ length: 12 }, (_, i) => i + 1).map((id) =>
                            <WrapItem key={id}>
                                <SpaceCardSkele />
                            </WrapItem>
                        ) :
                        historiesState.data.map((b) =>
                            <WrapItem key={b.id}>
                                <BookingCard booking={b} />
                            </WrapItem>
                        )
                }
            </Wrap>
        </Flex>
    )
}

export default History