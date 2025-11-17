import { Container } from "./Container"
import ThemeComponent from "./ThemeComponent"

const ThemeContainer = ({toggleTheme} : {toggleTheme : () => void}) => {
    return (
        <Container>
            <ThemeComponent toggleTheme={toggleTheme}></ThemeComponent>
        </Container>
    )
}


export default ThemeContainer