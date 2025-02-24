import { useEffect } from "react"
import { Col, Container, Row, Spinner } from "reactstrap"
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../../redux/actions/'
import {typeUpdateReaction} from '../../redux/constants'
import Post from './Post'
import './HomePage.scss'
function HomePage(){
    const dispatch = useDispatch();
    
    const {data, isLoading, isLoaded, isError} = useSelector((state) =>{
        return state.getPosts
    })

    

    useEffect(()=>{
        dispatch(getPosts.getPostsRequest());
    }, [dispatch])
    
    if (isLoading || !isLoaded){
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }else if (isError){
        return <p>There are some problems</p>
    }else{
        return (
            <div className="home">
                <Container>
                    <Row>
                        <Col xl="8" md="8" sm="12">
                            <div className="home__listPost">
                                {
                                    data.map((item, index)=>{
                                        console.log(item)
                                        return <Post key={index} data={item} typeUpdateReaction={typeUpdateReaction.posts}/>
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default HomePage