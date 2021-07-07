import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import NoImg from '../../images/no-img.png'


const Products = ({filter}) => {
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