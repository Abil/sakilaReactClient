import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; //Redux

import { useAuth } from "../../context/auth";

//Actions created using authSlice created using ReduxToolkit
//Can also be called inside Thunk(FRF) functions which will inturn be dispacthed
import { setUser, setToken } from "../../store/slices/authSlice.js";

//Example:
//export const logout = () => (dispatch) => {
// Perform logout operation, then dispatch setUser and setToken actions to clear the state
// For example:
// axios.post("/logout").then(() => {
//   dispatch(setUser(null));
//   dispatch(setToken(""));
// });
//};

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //Redux

  const [auth, setAuth] = useAuth();

  //Redux
  const { user: userR, token: tokenR } = useSelector((state) => {
    console.log("State: ", state);
    return state.auth;
  });
  console.log("User from Redux Toolkit: ", userR);
  //Note that when you refresh the state will set back to initial state,
  //when the app loads you need to always reload localstorage data into the stae again

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });

    ///Redux calling slice actions directly
    dispatch(setUser(null));
    dispatch(setToken(""));
    ///
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {!auth?.user ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/report">Reports</NavLink>
            </li>
            <li>
              <NavLink to="/geo">Geo</NavLink>
            </li>
            <li>
              <NavLink to="/actor">Actor</NavLink>
            </li>
            <li>
              <NavLink to="/film">Film</NavLink>
            </li>
            <li>
              <NavLink to="/inventory">Inventory</NavLink>
            </li>
            <li>
              <NavLink to="/rental">Rental</NavLink>
            </li>
            <li>
              <NavLink to="/payment">Payment</NavLink>
            </li>
            <li>
              <NavLink to="/advisor">Advisor</NavLink>
            </li>
            <li>
              <NavLink to="/investor">Investor</NavLink>
            </li>
            <li>
              <NavLink to="/customer">Customer</NavLink>
            </li>
            <li>
              <NavLink to="/staff">Staff</NavLink>
            </li>
            <li>
              <NavLink to="/store">Store</NavLink>
            </li>
            <li>
              <NavLink to="/category">Category</NavLink>
            </li>
            <li>
              <NavLink to="/language">Language</NavLink>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Menu;
