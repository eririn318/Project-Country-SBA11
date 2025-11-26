import {Link} from 'react-router-dom'

export function BackButton() {
    return(
        <div className="border border-1 mb-5 rounded-sm w-13">
        <Link to='/'>
            Back
        </Link>
        </div>
    )
}