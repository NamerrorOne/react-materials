export const AuthComponent = ({login,logout} : {login: ()=>void, logout: () => void}) => {
    return (
        <div>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}