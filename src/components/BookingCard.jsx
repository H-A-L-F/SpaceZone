import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import SpaceCardSkele from './SpaceCardSkele'

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

    if (!space) return <SpaceCardSkele />
    else return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={space.photoURL}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>{space.name}</Heading>

                    <Text py='2'>
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