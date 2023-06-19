import { Box, Button, ButtonGroup, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Spacer, useDisclosure } from '@chakra-ui/react'
import { HiMenu } from "react-icons/hi";
import React from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../lib/AuthContext';

const MasterLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user, logout } = useUserAuth()
    const location = useLocation()
    const navigate = useNavigate()

    if (!user && !JSON.parse(window.localStorage.getItem('user'))) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    function handleLogout() {
        logout().then(() => {
            navigate("/auth/login")
        })
    }

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
                    <Button onClick={handleLogout} colorScheme='primary'>Logout</Button>
                </ButtonGroup>
            </Flex>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="primary.500">
                    <DrawerHeader borderBottomWidth='1px'>Space Zone</DrawerHeader>
                    <DrawerBody>
                        <Button variant="primaryBtn" w="full">
                            <NavLink to="/space/add">Add Space</NavLink>
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box flex="1" p={4}>
                <Outlet />
            </Box>
        </Flex>
    )
}

export default MasterLayout