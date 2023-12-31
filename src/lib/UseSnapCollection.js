import { onSnapshot } from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { firestoreFetchError, firestoreFetchLoading, firestoreFetchSuccess, FIRESTORE_FETCH_IDLE, FIRESTORE_FETCH_LOADING } from "../actions/UseSnapCollection";
import reducer from "../reducers/UseSnapCollection";

export function useSnapCollection(ref) {
    const initialState = {
        status: ref ? FIRESTORE_FETCH_LOADING : FIRESTORE_FETCH_IDLE,
        data: undefined,
        error: undefined,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch(firestoreFetchLoading);
        return onSnapshot(ref,
            (response) => {
                const data =
                    response.docs
                        ? getCollectionData(response)
                        : getDocData(response)
                dispatch(firestoreFetchSuccess(data))
            },
            (error) => {
                dispatch(firestoreFetchError(error))
            }
        );
    }, []);

    return state;
}

function getDocData(doc) {
    return doc ? { id: doc.id, ...doc.data() } : []
}

function getCollectionData(collection) {
    return collection.docs.map(getDocData);
}