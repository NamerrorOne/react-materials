import { Container } from "./Container"

export const Header = ({user, theme} : {user: string, theme:string}) => {

        return (
            <>
                <Container>
                    current user : {user || "unatuth"}
                    <br></br>
                    current theme: {theme}
                </Container>
            </>
        )
}