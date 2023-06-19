import { Badge, Box, Button, ButtonGroup, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { HiMenu } from "react-icons/hi";
import React from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../lib/AuthContext';
import { HiShoppingCart } from "react-icons/hi";

const MasterLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user, logout } = useUserAuth()
    const location = useLocation()
    const navigate = useNavigate()

    function handleLogout() {
        logout().then(() => {
            navigate("/auth/login")
        })
    }

    if (!user || !JSON.parse(window.localStorage.getItem('user'))) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    else return (
        <Flex direction="column" height="100vh">
            <Flex minWidth='full' bg="tertiary.500" alignItems='center' gap='2' p='2'>
                <IconButton onClick={onOpen} aria-label='Search database' colorScheme='primary' icon={<HiMenu />} />
                <Button variant='tertiaryBtn' onClick={() => navigate("/")}>
                    <Heading size='md'>Space Zone</Heading>
                </Button>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Center fontSize="lg" fontWeight="bold">
                        {user.username}
                    </Center>
                    <Button colorScheme='primaryBtn' variant='ghost'>
                        <HiShoppingCart size={28} />
                    </Button>
                    <Button onClick={handleLogout} colorScheme='primary'>Logout</Button>
                </ButtonGroup>
            </Flex>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="primary.500">
                    <DrawerHeader borderBottomWidth='1px'>Space Zone</DrawerHeader>
                    <DrawerBody>
                        <Button onClick={() => navigate("/booking")} variant="primaryBtn" w="full">
                            <NavLink to="/booking">Bookings</NavLink>
                            <Spacer />
                        </Button>
                        <Button onClick={() => navigate("/booking/order")} variant="primaryBtn" w="full">
                            <NavLink to="/booking/order">Orders</NavLink>
                            <Spacer />
                        </Button>
                        <Button onClick={() => navigate("/booking/history")} variant="primaryBtn" w="full">
                            <NavLink to="/booking/history">History</NavLink>
                            <Spacer />
                        </Button>
                        <Button onClick={() => navigate("/space/add")} variant="primaryBtn" w="full">
                            <NavLink to="/space/add">Add Space</NavLink>
                            <Spacer />
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Box flex="1" paddingX={8} paddingY={4}>
                <Outlet />
            </Box>
        </Flex>
    )
}

export default MasterLayout