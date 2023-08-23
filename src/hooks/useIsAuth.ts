import {useAppSelector} from "./reduxHooks";

export const useIsAuth = () => {
    const user = useAppSelector(state => state.user.user)
    return {
        isAuth: !!user.email,
        ...user,
    }
}