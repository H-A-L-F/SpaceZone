import { Button, Flex, FormControl, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

const AddSpace = () => {
    const [name, setName] = useState()
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('1,000,000')

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