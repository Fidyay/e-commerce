import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import NoImg from '../../images/no-img.png'
import { addCards, addImages, addComments } from './productsSlice.js'
import { useContext } from 'react'
import { Context } from '../../index.js'



const Products = ({filter}) => {
    const dispatch = useDispatch()
    const {firestore} = useContext(Context)
    const products = useSelector(state => state)
    firestore.collection('products').onSnapshot(querySnapshot => {
        const entities = []
        querySnapshot.forEach((doc) => {
            const obj = doc.data()
            if (!products.ids.includes(obj.id)) {
                entities.push({...obj, comments: []});
            }
        })
        dispatch(addCards(entities))
    })

    firestore.collection('productImgs').onSnapshot(querySnapshot => {
        const imgObjects = []
        querySnapshot.forEach((doc) => {
            const obj = doc.data()
            if(obj) {
                if (products.ids.includes(obj.id) && !products.entities[obj.id]['img']) {
                    imgObjects.push(obj);
                }
            }
            
        })
        const updateObjects = imgObjects.map(obj => {
            if (obj && obj.id && obj.img) {
                return {
                    id: obj.id,
                    changes: {img: obj.img}
                }
            }
            
        })
        dispatch(addImages(updateObjects))
    })
    firestore.collection('comments').onSnapshot(querySnapshot => {
        const commentsObjects = []
        querySnapshot.forEach((doc) => {
            const obj = doc.data()
            if(obj) {
                if (products.ids.includes(obj.id) && (products.entities[obj.id]['comments'].length < obj.comments.length)) {
                    commentsObjects.push(obj);
                }
            }
            
        })
        const updateObjects = commentsObjects.map(obj => {
            if (obj && obj.id && obj.comments) {
                return {
                    id: obj.id,
                    changes: {comments: obj.comments}
                }
            }
            
        })
        dispatch(addComments(updateObjects))
    })

   
    const filteredProducts = products.ids.map(id => {
        const product = products.entities[id]
        if (product.title && product.info) {
            if (product.title.toLowerCase().includes(filter.toLowerCase()) || product.info.toLowerCase().includes(filter.toLowerCase())) {
                return product
            }
        }
        
        return null
    })

    const renderedProducts = filteredProducts.map(product => {
        if (!product) {
            return null
        }
        const img = product.img ? product.img : NoImg
        let info = ''
        product.info.split(' ').forEach(word => {
            if (`${info} ${word}`.length <= 80) {
                info += ` ${word}`
            }
        })
        return (
            <div className="card" key={product.id}>
                <div className="card-img-top" style={{backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}/>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{info}</p>
                  <Link className="btn btn-primary card-link" to={`product/${product.id}`}>See more</Link>
                </div>
        </div>
        )
        
    })

    return (
        <div className='main'>{renderedProducts}</div>
    )
}

export default Products