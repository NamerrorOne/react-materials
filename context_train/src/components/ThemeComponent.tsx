const ThemeComponent = ({toggleTheme} : {toggleTheme : ()  => void}) => {
    return (
        <>
            <button onClick={toggleTheme}>Change theme!</button>
        </>
    )
}

export default ThemeComponent