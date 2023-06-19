import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const SpaceCardSkele = () => {
    return (
        <Box padding='6' boxShadow='lg' w='2xl' bg="quartery.100" color="primary.700">
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    )
}

export default SpaceCardSkele