import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const SpaceCard = ({ space }) => {
    function convertRp(val) {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });

        return formatter.format(val);
    }

    return (
        <Card maxW='sm' bg="quartery.100" shadow="lg" color="primary.700">
            <CardBody>
                <Image
                    src={space.photoURL}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{space.name}</Heading>
                    <Text>
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
                    <Button variant='solid' colorScheme='primary'>
                        Buy now
                    </Button>
                    <Button variant='quarteryBtn'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default SpaceCard