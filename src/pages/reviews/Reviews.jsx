import {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import ReviewForm from "../../components/reviewForm/ReviewForm.jsx";
import api from "../../api/axiosConfig.js";

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef(null);
    const {imdbId} = useParams();

    useEffect(() => {
        getMovieData(imdbId);
    }, []);

    const adReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try{
            await api.post("/reviews", {
                reviewBody: rev.value,
                imdbId
            });
            const updatedReviews = [...reviews, {body: rev.value}];
            rev.value = "";
            setReviews(updatedReviews);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} loading="lazy" alt="" style={{borderRadius: '10px'}} />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmitReview={adReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {reviews?.map((review) => (
                        <>
                            <Row>
                                <Col>
                                    {review.body}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;