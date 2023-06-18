import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react'
import { HiMenu } from "react-icons/hi";
import React from 'react'

const MasterLayout = () => {
    return (
        <>
            <Flex direction="column" height="100vh">
                <Flex minWidth='full' bg="tertiary.500" alignItems='center' gap='2' p='2'>
                    <IconButton aria-label='Search database' colorScheme='primary' icon={<HiMenu />} />
                    <Box>
                        <Heading size='md'>Space Zone</Heading>
                    </Box>
                    <Spacer />
                    <ButtonGroup gap='2'>
                        <Button colorScheme='secondary'>Sign Up</Button>
                        <Button colorScheme='primary'>Log in</Button>
                    </ButtonGroup>
                </Flex>
                <Box flex="1" p={4}>
                    Body
                </Box>
            </Flex>
        </>
    )
}

export default MasterLayout