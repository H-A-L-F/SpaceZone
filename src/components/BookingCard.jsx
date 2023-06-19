import { Badge, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import SpaceCardSkele from './SpaceCardSkele'
import { STATUS_COMPLETED, STATUS_ONGOING, STATUS_PENDING } from '../models/Booking'

const BookingCard = ({ booking }) => {
    const [space, setSpace] = useState()

    useEffect(() => {
        getDoc(booking.spaceRef)
            .then((o) => {
                const data = { ...o.data(), id: o.id }
                setSpace(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [booking.spaceRef])

    function getColor() {
        if(booking.status === STATUS_PENDING) return "yellow"
        if(booking.status === STATUS_ONGOING) return "blue"
        if(booking.status === STATUS_COMPLETED) return "green"
    }

    function handleConfirm() {

    }

    if (!space) return <SpaceCardSkele />
    else return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
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
                </CardBody>

                <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        Confirm
                    </Button>

                </CardFooter>
            </Stack>
        </Card>
    )
}

export default BookingCard