import { useRef, useState } from 'react'
import Carousel from 'react-tiny-slider'
import { TinySliderInstance } from 'tiny-slider'

import userService from '../../services/user'

import styles from './style.module.scss'

const Home = () => {
  const [content, setContent] = useState('')
  const carousel = useRef<TinySliderInstance>(null)

  userService
    .getPublicContent()
    .then((response) => {
      setContent(response.data)
    })
    .catch((err) => {
      setContent(
        (err.response && err.response.data) || err.message || err.toString()
      )
    })

  const reviews = [
    {
      id: 1,
      name: 'Tester1',
      review: 'lorem',
      rating: 3,
      occupation: 'Developer',
      image: 'https://source.unsplash.com/random'
    },
    {
      id: 2,
      name: 'Tester2',
      review: 'lorem',
      rating: 4,
      occupation: 'Developer',
      image: 'https://source.unsplash.com/random'
    },
    {
      id: 3,
      name: 'Tester3',
      review: 'lorem',
      rating: 5,
      occupation: 'Developer',
      image: 'https://source.unsplash.com/random'
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div>{content}</div>
      <div className={styles.content}>
        <div className={styles.image}>
          <h4>Weight Training</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            amet et nihil autem iure repellat rerum, itaque provident optio
            voluptate?
          </p>
          <h4>Weight Training</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            amet et nihil autem iure repellat rerum, itaque provident optio
            voluptate?
          </p>
          <h4>Weight Training</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            amet et nihil autem iure repellat rerum, itaque provident optio
            voluptate?
          </p>
        </div>
        <div className={styles.text}>
          <img
            src="https://images.unsplash.com/photo-1550345332-09e3ac987658?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHdvcmtvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="workout"
          />
        </div>
      </div>
      <div className={styles.reviews}>
        <div id="control-buttons">
          <div>-</div>
          <div>+ </div>
        </div>
        <div id="nav-controls" className="hidden">
          {reviews.map((review) => (
            <div key={review.id}> . </div>
          ))}
        </div>
        <Carousel
          swipeAngle={false}
          items={1}
          mouseDrag
          center
          autoplay
          arrowKeys={true}
          ref={carousel}
          autoplayButtonOutput={false}
          controls={true}
          controlsContainer={'#control-buttons'}
          nav={true}
          navAsThumbnails={true}
          navPosition="bottom"
          navContainer={'#nav-controls'}
        >
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewContent}>
              <div className={styles.reviewRating}>
                {/* {review.rating} */}
                heey
              </div>
              <div className={styles.reviewReview}>{review.review}</div>
              <div className={styles.reviewImage}>
                <img src={review.image} alt="profile" />
              </div>
              <div className={styles.reviewName}>{review.name}</div>
              <div className={styles.reviewOcc}>{review.occupation}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Home
