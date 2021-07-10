import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Context } from "../../index.js"
import firebase from "firebase/app"
import {useAuthState} from 'react-firebase-hooks/auth'

const Navbar = ({userInput, onChangedUserInput}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const blur = (event) => {
        if (event.code !== 'Enter') return
        event.target.blur()
    }
    const history = useHistory()
    const createCard = () => {
        history.push('/createCard')
    }

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }


    return (
        <header className="navbar navbar-light container-fluid d-flex" style={{backgroundColor: '#e3f2fd'}}>
            <h1 className="navbar-brand">E-Commerce - all products here are fake</h1>
            <div className="d-flex search-and-login">
                <div className="search me-3">
                    <input type="text" placeholder="Search" aria-label="Search" value={userInput} onChange={onChangedUserInput} onKeyDown={blur}/>
                </div>
                <button onClick={user ? createCard : login} className="btn btn-outline-success" type="submit">{user ? 'Create product card' : 'Login'}</button>
            </div>                
        </header>
    )
}

export default Navbar