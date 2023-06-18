import { Box, Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'

const MasterLayout = () => {
    return (
        <>
            <Flex direction="column" height="100vh">
                <Flex minWidth='full' bg="tertiary.500" alignItems='center' gap='2' p='2'>
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