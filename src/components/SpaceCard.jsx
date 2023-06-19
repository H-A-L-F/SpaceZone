import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import { addDoc, collection, doc } from 'firebase/firestore';
import React from 'react'
import { FB_DB } from '../lib/Firebase';
import { STATUS_PENDING, constructBooking } from '../models/Booking';

const SpaceCard = ({ space }) => {

    const toast = useToast()

    function convertRp(val) {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        return formatter.format(val);
    }

    function handleBook() {
        const userRef = space.userRef
        const spaceRef = doc(FB_DB, "space", space.id)
        const status = STATUS_PENDING
        const bookingRef = collection(FB_DB, "booking")
        const booking = constructBooking(userRef, spaceRef, status)

        addDoc(bookingRef, booking)
            .then(() => {
                toast({
                    title: `Successfully booked space!`,
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

    function handleUnBook() {

    }

    return (
        <Card maxW='sm' bg="quartery.100" shadow="lg" color="primary.700">
            <CardBody>
                <Image
                    w="full"
                    h="200px"
                    objectFit='cover'
                    src={space.photoURL}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{space.name}</Heading>
                    <Text noOfLines={3}>
                        {space.desc}
                    </Text>
                    <Text fontSize='2xl'>
                        {convertRp(space.price)}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button onClick={handleBook} variant='solid' colorScheme='primary'>
                        Book now
                    </Button>
                    <Button variant='quarteryBtn'>
                        Unbook
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default SpaceCard