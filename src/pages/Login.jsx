import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../lib/AuthContext'
import { useLoadingContext } from '../lib/LoadingContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useUserAuth()
    const navigate = useNavigate()
    const {setLoading} = useLoadingContext()

    const handleSubmit = () => {
        setLoading(true)

        login(email, password)
            .then(() => {
                navigate("/")
                setLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setLoading(false)
            })
    }

    return (
        <Flex flexDir="column" gap="6" paddingX="8" paddingY="6" h="full">
            <Heading color="primary.700">Login</Heading>
            <Box marginTop="2" />
            <FormControl isRequired>
                <FormLabel color="primary.700" >Email</FormLabel>
                <Input
                    color="primary.700"
                    colorScheme='primary'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel color="primary.700" >Password</FormLabel>
                <Input
                    color="primary.700"
                    colorScheme='primary'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
            </FormControl>
            <Spacer />
            <Center color="primary.700" alignSelf="center" w="sm">
                <NavLink to="/auth/register">Dont't have an account? Register</NavLink>
            </Center>
            <Button onClick={handleSubmit} colorScheme='primary' variant='solid' w="sm" alignSelf="center">
                Submit
            </Button>
        </Flex>
    )
}

export default Login