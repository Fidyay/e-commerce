import { useParams, useHistory, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

const Payment = () => {
    const params = useParams()
    const product = useSelector(state => state.entities[params.id])
    const [paymentSubmitted, setPaymentSubmitted] = useState(false)
    const history = useHistory()
    const [creditCardNumber, setCreditCardNumber] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    if (!product) {
        return <Redirect to="/"/>
    }
    const price = product.price
    return (
        <div className="modal payment" tabIndex="-1">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Fake payment form</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                        history.push('/')
                    }}/>
                </div>
                <div className="modal-body">
                    <input type="text" value={creditCardNumber} placeholder="Credit card number" onChange={event => {
                        const number = event.target.value.trim()
                        if (number.length === 20) {
                            return
                        }
                        if (number.length < 4) {
                            if (!isNaN(Number(number))) {
                                setCreditCardNumber(number)
                                return
                            }
                        }
                        if (number.length === 4) {
                            if (!isNaN(Number(number))) {
                                setCreditCardNumber(`${number} `)
                                return
                            }
                        }
                        
                        if (number.length === 9) {
                            const parts = number.split(' ')
                            let setOrNot = true
                            parts.forEach(part => {
                                if (isNaN(Number(part.trim()))) {
                                    setOrNot = false
                                }
                            })
                            if (setOrNot) {
                                setCreditCardNumber(`${number} `)
                                return
                            }
                        }
                        if (number.length === 14) {
                            const parts = number.split(' ')
                            let setOrNot = true
                            parts.forEach(part => {
                                if (isNaN(Number(part.trim()))) {
                                    setOrNot = false
                                }
                            })
                            if (setOrNot) {
                                setCreditCardNumber(`${number} `)
                                return
                            }
                        }
                        if (number.length < 20) {
                            const parts = number.split(' ')
                            let setOrNot = true
                            parts.forEach(part => {
                                if (isNaN(Number(part.trim()))) {
                                    setOrNot = false
                                }
                            })
                            if (setOrNot) {
                                setCreditCardNumber(number)
                                return
                            }
                        }
                    }}/>
                    <input type="text" placeholder="Name on card"/>
                    <input type="text" value={expiryDate} placeholder="Expiry date" onChange={event => {
                        const date = event.target.value.trim()
                        if (date.length === 6) return
                        if (date.length < 2) {
                            if (!isNaN(Number(date))) {
                                setExpiryDate(date)
                                return
                            }
                        }
                        if (date.length === 2) { 
                            if (!isNaN(Number(date))) {
                                setExpiryDate(`${date}/`)
                                return
                            }
                        }
                        if (date.length < 6) {
                            const parts = date.split('/')
                            let setOrNot = true
                            parts.forEach(part => {
                                if (isNaN(Number(part))) {
                                    setOrNot = false
                                }
                            })
                            if (setOrNot) {
                                setExpiryDate(date)
                                return
                            }
                        }
                    }}/>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="modal-footer">
                    <button type="button" className={paymentSubmitted ? "btn btn-success" : "btn btn-primary"} disabled={paymentSubmitted ? true : false} onClick={() => setPaymentSubmitted(true)}>{paymentSubmitted ? 'Success' : `${price}$`}</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Payment