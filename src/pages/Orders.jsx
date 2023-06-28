import React, { useEffect } from 'react'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { collection, deleteDoc, doc, query, updateDoc, where } from 'firebase/firestore'
import { FB_DB } from '../lib/Firebase'
import { useUserAuth } from '../lib/AuthContext'
import { Flex, Heading, Wrap, WrapItem, useToast } from '@chakra-ui/react'
import { FIRESTORE_FETCH_LOADING } from '../actions/UseSnapCollection'
import SpaceCardSkele from '../components/SpaceCardSkele'
import BookingCard from '../components/BookingCard'
import { STATUS_COMPLETED, STATUS_ONGOING, STATUS_PENDING } from '../models/Booking'

const Orders = () => {

    const toast = useToast()
    const { user } = useUserAuth()

    const ordersState = useSnapCollection(query(collection(FB_DB, "booking"), where("ownerRef", "==", doc(FB_DB, "user", user.id))))

    function handleConfirm(b) {
        const bookingRef = doc(FB_DB, "booking", b.id)
        const upState = b.status === STATUS_PENDING ? STATUS_ONGOING : STATUS_COMPLETED
        updateDoc(bookingRef, { status: upState })
            .then(() => {
                toast({
                    title: `Successfully confirmed booking!`,
                    status: "success",
                    position: "top-right",
                    isClosable: true,
                })
            })
            .catch((e) => {
                toast({
                    title: `Error: ${e.message}`,
                    status: "error",
                    position: "top-right",
                    isClosable: true,
                })
            })
    }

    function handleDelete(b) {
        const bookingRef = doc(FB_DB, "booking", b.id)
        deleteDoc(bookingRef)
            .then(() => {
                toast({
                    title: `Successfully confirmed booking!`,
                    status: "success",
                    position: "top-right",
                    isClosable: true,
                })
            })
            .catch((e) => {
                toast({
                    title: `Error: ${e.message}`,
                    status: "error",
                    position: "top-right",
                    isClosable: true,
                })
            })
    }

    return (
        <Flex flexDir="column" color="primary.700" gap="4">
            <Heading>Orders</Heading>
            <Wrap spacing='30px'>
                {
                    ordersState.status === FIRESTORE_FETCH_LOADING ?
                        Array.from({ length: 12 }, (_, i) => i + 1).map((id) =>
                            <WrapItem key={id}>
                                <SpaceCardSkele />
                            </WrapItem>
                        ) :
                        ordersState.data.map((b) =>
                            <WrapItem key={b.id}>
                                <BookingCard
                                    booking={b}
                                    confirm={b.status !== STATUS_COMPLETED}
                                    handleConfirm={() => handleConfirm(b)}
                                    handleDelete={() => handleDelete(b)}
                                />
                            </WrapItem>
                        )
                }
            </Wrap>
        </Flex>
    )
}

export default Orders