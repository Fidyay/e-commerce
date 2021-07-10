import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import NoImg from '../../images/no-img.png'
import { addCards } from './productsSlice.js'
import { useContext } from 'react'
import { Context } from '../../index.js'


const Products = ({filter}) => {
    const dispatch = useDispatch()
    const {firestore} = useContext(Context)
    firestore.collection('products').onSnapshot(querySnapshot => {
        const entities = []
        querySnapshot.forEach((doc) => {
            entities.push(doc.data());
        })
        dispatch(addCards(entities))
    })

    const products = useSelector(state => state)
    const filteredProducts = products.ids.map(id => {
        const product = products.entities[id]
        if (product.title.includes(filter) || product.info.includes(filter)) {
            return product
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