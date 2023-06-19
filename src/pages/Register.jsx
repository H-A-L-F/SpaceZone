import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log(email)
    console.log(password)
  }

  return (
    <Flex flexDir="column" gap="6" paddingX="8" paddingY="6" h="full">
      <Heading color="primary.700">Register</Heading>
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
        <NavLink to="/auth/login">Already have an account? Login</NavLink>
      </Center>
      <Button onClick={handleSubmit} colorScheme='primary' variant='solid' w="sm" alignSelf="center">
        Submit
      </Button>
    </Flex>
  )
}

export default Register