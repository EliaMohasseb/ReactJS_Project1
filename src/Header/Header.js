import { Fragment } from 'react'
import classes from './Header.module.css'
import mealsImage from '../assets/logo.jpg'

const Header  = () =>{                  {/*A header fragment  */}
    return <Fragment>
        <header className={classes.header}>
        <h1>The Sample Times</h1>
    </header>
    <div className={classes['main-image']}>
        <img src={mealsImage} />
      </div>
    </Fragment>
}

export default Header