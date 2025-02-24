import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Button, Col, Container, Row, Spinner} from 'reactstrap'
import useToggle from '../../hooks/useToggle'
import { clearProfile, following, getProfile } from '../../redux/actions'
import { typeUpdateFollow, typeUpdateReaction } from '../../redux/constants'
import Post from '../HomePage/Post'
import './ProfilePage.scss'
function ProfilePage(){
    
    const dispatch = useDispatch();
    const {username} = useParams();

    useEffect(()=>{
        dispatch(getProfile.getProfileRequest(username));
        
        return ()=>{
            return dispatch(clearProfile())
        }
    }, [username, dispatch])

    const {author, posts, isLoading, isLoaded, isError} = useSelector(state => state.profile)
    const loginUser = useSelector(state => state.loginUser)
    
    const user = loginUser.user;
    const isLoadingUser = loginUser.isLoading
    const isVerifyUser = loginUser.isVerify
    const isErrorUser = loginUser.isError
    const token = loginUser.token
    const isLoggedIn = (isVerifyUser && token);


    const [isFollowing, handleToggleFollowing] = useToggle(author.username, user.following, isLoggedIn, following.followingRequest, {author: author.username}, typeUpdateFollow.profile)


    if (isLoading || !isLoaded || isLoadingUser || !isVerifyUser){
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }else if (isError || isErrorUser){
        return <p>There are some problems</p>
    }

    return (
        <div class="profile">
            <Container fluid="xl">
                <Row>
                    <Col
                        xl={{
                            offset: 1,
                            size: 10
                        }}
                    >
                        <div className="profile__header">
                            <div className="profile__header-avatar">
                                <div className="profile__header-avatar-container">
                                    <span className="profile__header-avatar-temp">
                                        <img
                                            className="profile__header-avatar-img"
                                            src={author.avatar}
                                            alt={'avatar of ' + author.displayName}
                                        />
                                    </span>
                                </div>
                                <div className="profile__header-avatar-btn">
                                    {
                                        (user.username === author.username) ?
                                            <Button color="primary" className="profile__header-avatar-btn-item">Edit profile</Button>
                                        :
                                        (isFollowing) ? <Button className="profile__header-avatar-btn-item" onClick={handleToggleFollowing} color="danger" block>Unfollow</Button>
                                            :
                                            <Button className="profile__header-avatar-btn-item" onClick={handleToggleFollowing} color="primary" block>Follow</Button>
                                    }
                                </div>
                            </div>
                            <div className="profile__header-info">
                                <h2 className="profile__header-info-username">{author.displayName}</h2>
                                <p className="profile__header-info-bio">{author.bio}</p>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Row className="profile__content">
                   <Col
                    xl={{
                        size: 3,
                        offset: 1
                    }}
                   >
                       <div className="profile__header">
                           Write something here
                       </div>
                   </Col>
                    <Col 
                        xl={{
                            size: 7
                    }}>
                        <div className="home__listPost">
                            {
                                posts.map((item, index)=>{
                                    return <Post key={index} data={{post: item, author: author}} typeUpdateReaction={typeUpdateReaction.personalPosts} />
                                })
                            }
                        </div>
                    </Col>
                </Row>


            </Container>
        </div>
    )
}

export default ProfilePage;