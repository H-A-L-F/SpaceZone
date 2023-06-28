import { Box, Flex, Heading, SkeletonCircle, SkeletonText, Wrap, WrapItem } from '@chakra-ui/react'
import { collection, doc, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { FB_DB } from '../lib/Firebase'
import { useSnapCollection } from '../lib/UseSnapCollection'
import { FIRESTORE_FETCH_LOADING } from '../actions/UseSnapCollection'
import SpaceCard from '../components/SpaceCard'
import SpaceCardSkele from '../components/SpaceCardSkele'
import { useUserAuth } from '../lib/AuthContext'

const ManageSpace = () => {
    const { user } = useUserAuth()

    const spacesState = useSnapCollection(query(collection(FB_DB, "space"), where("userRef", "==", doc(FB_DB, "user", user.id))))

    return (
        <Flex flexDir="column" color="primary.700" gap="4">
            <Heading>Manage My Spaces</Heading>
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
                                <SpaceCard space={s} manage={true}/>
                            </WrapItem>
                        )
                }
            </Wrap>
        </Flex>
    )
}

export default ManageSpace