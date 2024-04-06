import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; //Redux
import { useDispatch } from "react-redux"; //Redux
import { useAuth } from "../../context/auth";

//Redux Actions:
import { rLogout } from "../../store/actions/authActions.js";

const Menu = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const dispatch = useDispatch(); //Redux
  //Redux Auth
  const reduxAuth = useSelector((state) => state.auth);
  console.log("Auth details from Redux State: ", reduxAuth.user);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });

    //Redux Dispatch
    // dispatch({
    //   type: "LOGOUT",
    // });
    //Incase of using actions from a file
    dispatch(rLogout());

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
