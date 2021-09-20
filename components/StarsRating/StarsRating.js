import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

export default function HoverRating() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  const [session] = useSession();
  const router = useRouter();

  const onRatingClickHandler = async () => {
    const user = session.user;
    const { id } = router.query;
    const data = { user, value };

    const res = await fetch(`/api/location/${id}/rating`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });


    // console.log(res);

    
  };
  console.log("----");
  console.log(value);
  console.log(hover);
  console.log("----");

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        // onClick={onRatingClickHandler}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}

      <button onClick={onRatingClickHandler}>rate!</button>
    </div>
  );
}
