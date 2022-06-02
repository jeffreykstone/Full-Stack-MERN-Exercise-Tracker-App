import { Link } from 'react-router-dom'
import { TbBarbell } from 'react-icons/tb'

function Navigation() {
    return (
        <nav>
            <Link to={"/"}>Home</Link>
            <TbBarbell className={"barbell"}/>
            <Link to={"/add-exercise"}>Add New</Link>
        </nav>
    )
}

export default Navigation