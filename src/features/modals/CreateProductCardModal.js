import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from "../../index.js"
import { nanoid } from "@reduxjs/toolkit"


const CreateProductCardModal = () => {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)

    const [img, setImg] = useState('')
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState('')
    const [price, setPrice] = useState('')
    const [clickedSubmit, setSubmit] = useState(false)
    const history = useHistory()

    return (              
        <div className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create product card</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                    history.push('/')
                }}/>
              </div>
              <div className="modal-body">
                <div className="choose-photo" style={clickedSubmit ? (!img ? {border: '1px solid #eb343a'} : {border: '1px solid #dee2e6'}) : {border: '1px solid #dee2e6'}}>
                  <label htmlFor="photo" style={ img ? {backgroundImage: `url(${img})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'} : {background: '#fff'}}>
                    {img ? null : 'Choose photo'}  
                  </label>
                  <input id="photo" type="file" accept=".jpg, .png, .jpeg, .svg" onChange={(event) => {
                    if(event.target.files[0]) {
                      const reader = new FileReader()
                      reader.readAsDataURL(event.target.files[0])
                      reader.onload = () => {
                        setImg(reader.result)
                      }
                    }    
                  }}/>
                </div>
                <input style={clickedSubmit ? (!title ? {border: '1px solid #eb343a'} : {border: '1px solid #dee2e6'}) : {border: '1px solid #dee2e6'}} type="text" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)}/>
                <textarea style={clickedSubmit ? (!info ? {border: '1px solid #eb343a'} : {border: '1px solid #dee2e6'}) : {border: '1px solid #dee2e6'}} rows="10" placeholder="Type info about your product" value={info} onChange={event => setInfo(event.target.value)}/>
                <input style={clickedSubmit ? (!price ? {border: '1px solid #eb343a'} : {border: '1px solid #dee2e6'}) : {border: '1px solid #dee2e6'}} type="text" placeholder="Price" value={price} onChange={event => {
                    if (!isNaN(Number(event.target.value))) {
                        setPrice(event.target.value)
                    }
                    }}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() =>{
                  const id = nanoid()
                  if (title && info && price && img) {
                    firestore.collection('products').doc(id).set({
                      title, info, price, id, comments: []
                    }).catch((error) => {
                      console.error("Error writing document: ", error);
                  });
                  firestore.collection('productImgs').doc(id).set({
                      id, img
                    }).catch((error) => {
                      console.error("Error writing document: ", error);
                  });
                    history.push('/')
                    return
                  }
                  setSubmit(true)
                  }}
                  disabled={user ? false : true}
                  >Submit</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default CreateProductCardModal