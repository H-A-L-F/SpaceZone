import { Box, Flex, Heading, SkeletonCircle, SkeletonText, Wrap, WrapItem } from '@chakra-ui/react'
import { collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { FB_DB } from '../lib/Firebase'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { FIRESTORE_FETCH_LOADING } from '../actions/UseSnapCollection'
import SpaceCard from '../components/SpaceCard'
import SpaceCardSkele from '../components/SpaceCardSkele'

const Home = () => {
  const spacesState = useSnapCollection(collection(FB_DB, "space"))

  return (
    <Flex flexDir="column" color="primary.700" gap="4">
      <Heading>Browse Spaces</Heading>
      <Wrap spacing='30px'>
        {
          spacesState.status === FIRESTORE_FETCH_LOADING ?
            Array.from({ length: 12 }, (_, i) => i + 1).map((id) =>
              <WrapItem key={id}>
                <SpaceCardSkele />
              </WrapItem>
            ) :
            spacesState.data.map((s) =>
              <WrapItem key={s.id}>
                <SpaceCard space={s} />
              </WrapItem>
            )
        }
      </Wrap>
    </Flex>
  )
}

export default Home