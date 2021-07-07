import { useHistory } from "react-router-dom"

const Navbar = ({userInput, onChangedUserInput}) => {
    const blur = (event) => {
        if (event.code !== 'Enter') return
        event.target.blur()
    }
    const history = useHistory()

    return (
        <header className="navbar navbar-light container-fluid d-flex" style={{backgroundColor: '#e3f2fd'}}>
            <h1 className="navbar-brand">E-Commerce - all products here are fake</h1>
            <div className="d-flex search-and-login">
                <div className="search me-3">
                    <input type="text" placeholder="Search" aria-label="Search" value={userInput} onChange={onChangedUserInput} onKeyDown={blur}/>
                </div>
                <button onClick={() => history.push('/createCard')} className="btn btn-outline-success" type="submit">Create product card</button>
            </div>                
        </header>
    )
}

export default Navbar