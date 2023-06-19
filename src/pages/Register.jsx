import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../lib/AuthContext'
import { FB_AUTH } from '../lib/Firebase'

const Register = () => {
  const [email, setEmail] = useState("")
  const [uname, setUname] = useState("")
  const [password, setPassword] = useState("")
  const { signUp, setName, saveUser, signInAndCreateUserDocument } = useUserAuth()

  const navigate = useNavigate();

  const handleSubmit = () => {
    signUp(email, password)
      .then((user) => {
        saveUser(FB_AUTH.currentUser.uid, email, password, uname)
        setName(uname)
          .then(() => {
            navigate('/')
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

    // if (signInAndCreateUserDocument(email, password, uname)) navigate('/')
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
        <FormLabel color="primary.700" >Username</FormLabel>
        <Input
          color="primary.700"
          colorScheme='primary'
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          placeholder='Username'
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