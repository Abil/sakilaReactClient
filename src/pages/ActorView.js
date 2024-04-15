import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

//MUI Components
import {
  Typography,
  Container,
  Button,
  TextField,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select from "@mui/material/Select";

const ActorView = () => {
  const [actor, setActor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [reload, setReload] = useState(false);

  const { actorId } = useParams();

  useEffect(() => {
    fetchActor();
  }, [reload]);

  const fetchActor = async () => {
    try {
      const response = await axios.get(`/actor/${actorId}`);
      setActor(response.data);
      setNewName(response.data.first_name);
      setNewLastName(response.data.last_name);
    } catch (error) {
      console.error("Error fetching actor:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/actor/${actorId}`, {
        first_name: newName,
        last_name: newLastName,
      });
      setEditMode(false);
      setReload(!reload);
    } catch (error) {
      console.error("Error updating actor:", error);
    }
  };

  return (
    <div>
      {actor ? (
        <div>
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder={actor.first_name}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder={actor.last_name}
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <Container
              maxWidth="sm"
              style={{
                marginTop: "100px",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6" align="center" gutterBottom>
                {`Name: ${actor.first_name} ${actor.last_name} `}
              </Typography>
              {/* <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={() => setEditMode(true)}
                style={{ marginTop: "20px" }}
              >
                Edit
              </Button> */}
            </Container>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ActorView;
