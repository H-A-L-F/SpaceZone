import { Button, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Textarea, space, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FB_DB, FB_STORAGE } from '../lib/Firebase'
import { addDoc, collection, doc } from 'firebase/firestore'
import { constructSpace } from '../models/Space'
import { useUserAuth } from '../lib/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddSpace = () => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('1,000,000')
    const [imageUpload, setImageUpload] = useState()

    const { user } = useUserAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const handleNameChange = (e) => {
        const inputValue = e.target.value
        setName(inputValue)
    }

    const handleDescChange = (e) => {
        const inputValue = e.target.value
        setDesc(inputValue)
    }

    const format = (val) => `$` + val
    const parse = (val) => val.replace(/^\$/, '')

    const handleSubmit = () => {
        if (!imageUpload) return

        const imageRef = ref(FB_STORAGE, `images/${imageUpload.name}`)

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const userRef = doc(FB_DB, "user", user.id)
                const spaceRef = collection(userRef, "space")
                addDoc(spaceRef, constructSpace(name, desc, price, url))
                    .then(() => {
                        toast({
                            title: `Successfully added space!`,
                            status: "success",
                            position: "top-right",
                            isClosable: true,
                        })
                        navigate("/")
                    })
                    .catch((e) => {
                        toast({
                            title: `Error: ${e.message}`,
                            status: "error",
                            position: "top-right",
                            isClosable: true,
                        })
                    })
            })
        })
    }

    return (
        <Flex flexDir="column" color="primary.700" gap="4">
            <Heading>Add New Space</Heading>
            <FormControl isRequired>
                <FormLabel>Space name</FormLabel>
                <Input
                    value={name}
                    onChange={handleNameChange}
                    placeholder='Space name'
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Space description</FormLabel>
                <Textarea
                    value={desc}
                    onChange={handleDescChange}
                    placeholder='Enter a space description'
                    size='sm'
                    borderColor="primary.700"
                    focusBorderColor='tertiary.500'
                    _hover={{ borderColor: 'tertiary.500' }}
                />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Space description</FormLabel>
                <NumberInput
                    onChange={(valueString) => setPrice(parse(valueString))}
                    value={format(price)}
                    max={10 * 1000000}
                    min={1 * 1000000}
                    step={1 * 1000000}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
            <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                    setImageUpload(e.target.files[0])
                }}
            />

            <Flex mt="8">
                <Spacer />
                <Button onClick={handleSubmit} colorScheme='primary' variant='solid'>
                    Submit
                </Button>
            </Flex>
        </Flex>
    )
}

export default AddSpace