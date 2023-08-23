import {useAppDispatch} from "./reduxHooks";
import {IUser} from "../types";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut as fsignOut,
    updateProfile
} from "firebase/auth";
import {clearUser, setUser} from "../store/Slices/userSlice";


export const useAuth = () => {
    const dispatch = useAppDispatch()
    const signUp = async (userData: IUser, password: string) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, userData.email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await updateProfile(user, {displayName: userData.name});
                dispatch(setUser({name: user.displayName!, email: user.email!, id: user.uid}))
            })
    }
    const signIn = async (user: IUser, password: string) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, user.email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUser({email: user.email!, name: user.displayName!, id: user.uid}))
            })
    }
    const signOut = async () => {
        const auth = getAuth();
        fsignOut(auth).then(() => {
            dispatch(clearUser())
        })
    }
    return {
        signIn,
        signUp,
        signOut
    }
}