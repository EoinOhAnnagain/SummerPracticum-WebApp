import PropTypes from 'prop-types'
import Button from './Button.js'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className = 'header'>
            <h1> { title }</h1>
            {location.pathname === '/' && (<Button color={showAdd ? 'red' : 'green'} text ={showAdd ? 'Hide' : 'Show'} onClick = {onAdd} />)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Dublin Bus',
  }
export default Header

Header.propTypes = {
    title : PropTypes.string,
}
