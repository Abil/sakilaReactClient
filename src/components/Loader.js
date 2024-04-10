import { useEffect, useState } from "react";
import { useNavigate /*, useLocation*/ } from "react-router-dom";
import LoadingGIF from "../images/loading.gif";

//MUI Imports
import { Grid } from "@mui/material";

export default function Loader({
  /*path = "login" */
  timeInSeconds = 3,
}) {
  const [count, setCount] = useState(Number(timeInSeconds));
  const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      // navigate(`/${path}`, {
      //   state: location.pathname,
      // });
      navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
    </Grid>
  );
}
