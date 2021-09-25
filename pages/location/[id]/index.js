import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { getSession } from "next-auth/client";
import ImageCarousel from "../../../components/ImageCarousel/ImageCarousel";
import StarsRating from "../../../components/StarsRating/StarsRating";

export default function LocationInfo() {
  const router = useRouter();
  const { id } = router.query;

  const [locationData, setLocationData] = useState(null);
  const [session, setSession] = useState(null);
  const [comments, setComment] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const titleRef = useRef();
  const bodyRef = useRef();

  useEffect(async () => {
    const response = await fetch(`/api/location/${id}`);
    const data = await response.json();

    setLocationData(data.location);

    let sumOfRatings = 0;
    if (data.location.ratings.length === 0) {
      setAvgRating(0);
    } else {
      data.location.ratings.forEach((ratingObj) => {
        sumOfRatings += ratingObj.rating;
      });
      const calculatedAvgRating =
        (await Math.round((sumOfRatings / data.location.ratings.length) * 2)) /
        2;
      setAvgRating(calculatedAvgRating);
    }

    getSession().then((session) => {
      setSession(session);
    });

    const commentsResponse = await fetch(`/api/location/${id}/comment`);
    const commentsData = await commentsResponse.json();
    setComment(commentsData.comments);
    
  }, []);

  const onDeleteHandler = async () => {
    // check for created location user identity
    if (session.user.email !== locationData.email) {
      alert("not the user");
      return;
    }
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/location/${id}`, request);
    const data = await response.json();
    console.log(data);
    router.replace("/");
  };

  const onCommentCreate = async (e) => {
    e.preventDefault();

    const data = {
      title: titleRef.current.value,
      body: bodyRef.current.value,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`/api/location/${id}/comment`, request);
    console.log(response);
    // router.reload();
  };

  if (!locationData) {
    return <div>Loading...</div>;
  }

  let commentsForm = null;
  if (comments && comments.length) {
    commentsForm = (
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {" "}
            Title: {comment.title} Body: {comment.body} Author:{" "}
            {comment.author.firstName + " " + comment.author.lastName}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <React.Fragment>
      <div className="mx-20">
        <h1 className="text-center text-3xl font-bold">{locationData.name}</h1>
        <div>Location:{locationData.location}</div>
        <div>Price:{locationData.price}$</div>
        <div>Discription:{locationData.description}</div>

        <div>
          <Link href={`${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={onDeleteHandler}>Delete</button>
        </div>
      </div>
      <form onSubmit={onCommentCreate}>
        <input type="text" placeholder="title" ref={titleRef}></input>
        <input type="text" placeholder="body" ref={bodyRef}></input>
        <button>Submit</button>
      </form>
      <StarsRating currentRating={avgRating} />
      {locationData.images.length > 0 && (
        <ImageCarousel images={locationData.images} />
      )}
      {commentsForm}
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
}
