import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'

const MasterLayout = () => {
    return (
        <>
            <Flex direction="column" bg="quartery.500" height="100vh">
                <Flex minWidth='full' bg="tertiary.500" alignItems='center' gap='2'>
                    <Box p='2'>
                        <Heading size='md'>Chakra App</Heading>
                    </Box>
                    <Spacer />
                    <ButtonGroup gap='2'>
                        <Button colorScheme='teal'>Sign Up</Button>
                        <Button colorScheme='teal'>Log in</Button>
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