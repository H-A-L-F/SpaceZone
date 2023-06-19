import { Badge, Box, Button, Card, CardBody, CardFooter, Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react'
import { getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import SpaceCardSkele from './SpaceCardSkele'
import { STATUS_COMPLETED, STATUS_ONGOING, STATUS_PENDING } from '../models/Booking'

const BookingCard = ({ booking, confirm, handleConfirm }) => {
    const [space, setSpace] = useState()
    const [booker, setBooker] = useState()

    useEffect(() => {
        getDoc(booking.userRef)
            .then((o) => {
                const data = { ...o.data(), id: o.id }
                setBooker(data)
            })
            .catch((e) => {
                console.log(e)
            })

        getDoc(booking.spaceRef)
            .then((o) => {
                const data = { ...o.data(), id: o.id }
                setSpace(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [booking.spaceRef, booking.userRef])

    function getColor() {
        if (booking.status === STATUS_PENDING) return "yellow"
        if (booking.status === STATUS_ONGOING) return "blue"
        if (booking.status === STATUS_COMPLETED) return "green"
    }

    function getText() {
        if (booking.status === STATUS_PENDING) return "Confirm"
        if (booking.status === STATUS_ONGOING) return "Finish"
    }

    if (!space) return <SpaceCardSkele />
    else return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bg="quartery.100"
            shadow="lg"
            color="primary.700"
        >
            <Image
                w="400px"
                h="250px"
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={space.photoURL}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>
                        {space.name}
                        <Badge ml='1' variant='solid' colorScheme={getColor()}>
                            {booking.status}
                        </Badge>
                    </Heading>

                    <Text py='2' maxW={48} noOfLines={3}>
                        {space.desc}
                    </Text>

                    <Spacer />

                    <Box bg="quartery.400" w="fit-content" fontWeight="bold" color="primary.700" borderRadius="md" px="2" alignItems="center">
                        {booker.username}
                    </Box>
                </CardBody>

                <CardFooter>
                    {
                        confirm &&
                        <Button onClick={handleConfirm} variant='solid' colorScheme='primary'>
                            {getText()}
                        </Button>
                    }
                </CardFooter>
            </Stack>
        </Card>
    )
}

export default BookingCard