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

const InvestorView = () => {
  const [investor, setInvestor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newCompanyName, setCompanyName] = useState("");

  const [reload, setReload] = useState(false);

  const { investorId } = useParams();

  useEffect(() => {
    fetchInvestor();
  }, [reload]);

  const fetchInvestor = async () => {
    try {
      const response = await axios.get(`/investor/${investorId}`);
      setInvestor(response.data);
      setNewName(response.data.first_name);
      setNewLastName(response.data.last_name);
      setCompanyName(response.data.company_name);
    } catch (error) {
      console.error("Error fetching investor:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/investor/${investorId}`, {
        first_name: newName,
        last_name: newLastName,
        company_name: newCompanyName,
      });
      setEditMode(false);
      setReload(!reload);
    } catch (error) {
      console.error("Error updating investor:", error);
    }
  };

  return (
    <div>
      {investor ? (
        <div>
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder={investor.first_name}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder={investor.last_name}
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />

              <input
                type="text"
                placeholder={investor.last_name}
                value={newCompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
                {`Name: ${investor.first_name} ${investor.last_name} `}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                {`Company: ${investor.company_name} `}
              </Typography>

              <Button
                variant="contained"
                //color="primary"
                fullWidth
                onClick={() => setEditMode(true)}
                style={{ marginTop: "20px" }}
              >
                Edit
              </Button>
            </Container>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InvestorView;
