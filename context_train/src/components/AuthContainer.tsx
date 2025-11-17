import { AuthComponent } from "./AuthComponent";
import { Container } from "./Container";

const AuthContainer = ({ login,logout} : { login: () => void, logout: ()=> void}) => {
    return (
        <Container>
        <AuthComponent login={login} logout={logout}></AuthComponent>
    </Container>
    )
}

export default AuthContainer;