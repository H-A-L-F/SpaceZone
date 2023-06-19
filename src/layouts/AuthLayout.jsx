import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <Center h='100vh' w="100vw" color='white' m="auto">
            <Box bg="tertiary.200" w="2xl" h="xl" borderRadius="xl" shadow="xl">
                <Outlet />
            </Box>
        </Center>
    )
}

export default AuthLayout