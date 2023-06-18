import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Spacer, useDisclosure } from '@chakra-ui/react'
import { HiMenu } from "react-icons/hi";
import React from 'react'

const MasterLayout = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex direction="column" height="100vh">
            <Flex minWidth='full' bg="tertiary.500" alignItems='center' gap='2' p='2'>
                <IconButton onClick={onOpen} aria-label='Search database' colorScheme='primary' icon={<HiMenu />} />
                <Box>
                    <Heading size='md'>Space Zone</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='secondary'>Sign Up</Button>
                    <Button colorScheme='primary'>Log in</Button>
                </ButtonGroup>
            </Flex>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="primary.500">
                    <DrawerHeader borderBottomWidth='1px'>Space Zone</DrawerHeader>
                    <DrawerBody>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box flex="1" p={4}>
                {children}
            </Box>
        </Flex>
    )
}

export default MasterLayout