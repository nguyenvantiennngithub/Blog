import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {signOut} from '../../../../redux/actions/'
import './Avatar.scss'

function Avatar(){
    var [isShowDropDown, setIsShowDropDown] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.loginUser);
    console.log(user)
    const handleToggleDropDown = function (){
        setIsShowDropDown(!isShowDropDown);
    }

    const handleSignOut = function(){
        dispatch(signOut());
        navigate('/login')
    }
    return (
        <div>
           <div className="avatar">
               <div 
                    className="avatar__image" 
                    style={{backgroundImage: `url(${user && user.avatar})`}}
                    onClick={handleToggleDropDown}>
               </div>
               
               {isShowDropDown && 
               <div className="avatar__dropdown">    
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text bold" to={"/user/" + user.username}>{user && user.displayName}</Link>
                    </div>
                    <hr style={{margin: '4px'}}/>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/dashboard">dashboard</Link>
                    </div>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/">Hihihi</Link>
                    </div>
                    <hr style={{margin: '4px'}}/>
                    <div className="avatar__dropdown-item">
                        <Link className="avatar__dropdown-item-text" to="/">Hihihi</Link>
                    </div>
                    <div className="avatar__dropdown-item" onClick={handleSignOut}>
                        <span className="avatar__dropdown-item-text">Sign out</span>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Avatar;