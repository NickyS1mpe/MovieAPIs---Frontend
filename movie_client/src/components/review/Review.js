import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

function Review({ getMovieData, movie, reviews, setReviews }) {
  const revText = useRef();
  let parmas = useParams();
  const movieId = parmas.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReviews = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movie.imdbId,
      });

      const updatedReviews = [...reviews, { body: rev.value }];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt=""></img>
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReviews}
                    revText={revText}
                    labelText="Write a Review"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((review) => {
            return (
              <div key={review.body}>
                <Row>
                  <Col>{review.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default Review;
