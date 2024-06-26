import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

//Pages
import Home from "./pages/Home.js";
import Country from "./pages/Country.js";
import CountryView from "./pages/CountryView.js";
import City from "./pages/City.js";
import CityView from "./pages/CityView.js";
import Address from "./pages/Address.js";
import AddressView from "./pages/AddressView.js";
import Actor from "./pages/Actor.js";
import ActorView from "./pages/ActorView.js";
import ActorAward from "./pages/ActorAward.js";
import Film from "./pages/Film.js";
import FilmView from "./pages/FilmView.js";
import FilmActor from "./pages/FilmActor.js";
import FilmCategory from "./pages/FilmCategory.js";
import Inventory from "./pages/Inventory.js";
import InventoryView from "./pages/InventoryView.js";
import Rental from "./pages/Rental.js";
import Payment from "./pages/Payment.js";
import Advisor from "./pages/Advisor.js";
import AdvisorView from "./pages/AdvisorView.js";
import Investor from "./pages/Investor.js";
import InvestorView from "./pages/InvestorView.js";
import Customer from "./pages/Customer.js";
import CustomerView from "./pages/CustomerView.js";
import Staff from "./pages/Staff.js";
import StaffView from "./pages/StaffView.js";
import Store from "./pages/Store.js";
import Category from "./pages/Category.js";
import CategoryView from "./pages/CategoryView.js";
import Language from "./pages/Language.js";
import LanguageView from "./pages/LanguageView.js";
import Login from "./pages/auth/Login.js";
import Register from "./pages/auth/Register.js";
import Callback from "./pages/auth/Callback.js";

//Pages - Reports
import InventoryReport from "./pages/reports/Inventory.js";
import InventoryRatingReport from "./pages/reports/InventoryRating.js";
import InventoryCountReport from "./pages/reports/InventoryCount.js";
import InventoryUniqueCountReport from "./pages/reports/InventoryUniqueCount.js";
import CustomerReport from "./pages/reports/Customer.js";
import CustomerRentalReport from "./pages/reports/CustomerRentals.js";
import CustomerActiveCountReport from "./pages/reports/CustomerActiveCount.js";
import CustomerEmailCountReport from "./pages/reports/CustomerEmailCount.js";
import StoreReport from "./pages/reports/Store.js";
import InvestorAdvisorReport from "./pages/reports/InvestorAdvisor.js";
import ActorAwardReport from "./pages/reports/ActorAward.js";
import PaymentAverageReport from "./pages/reports/PaymentAverage.js";
import ReplacementCostReport from "./pages/reports/ReplacementCost.js";
import ReplacementCostCategoryReport from "./pages/reports/ReplacementCostCategory.js";

//Components
import ProtectedRoute from "./components/ProtectedRoute.js";
import Menu from "./components/nav/Menu.js";
import GeoNav from "./components/nav/GeoNav.js";
import ActorNav from "./components/nav/ActorNav.js";
import FilmNav from "./components/nav/FilmNav.js";
import ReportNav from "./components/nav/ReportNav.js";

//Context
import { useAuth } from "./context/auth";

//CSS
import "./App.css";

function App() {
  // context
  const [auth, setAuth] = useAuth();

  // axios config
  axios.defaults.baseURL = process.env.REACT_APP_API;
  axios.defaults.headers.common["Authorization"] = auth?.token;

  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<Callback />} />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportNav />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <InventoryReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory-rating"
            element={
              <ProtectedRoute>
                <InventoryRatingReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory-count"
            element={
              <ProtectedRoute>
                <InventoryCountReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="inventory-unique-count"
            element={
              <ProtectedRoute>
                <InventoryUniqueCountReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="customer"
            element={
              <ProtectedRoute>
                <CustomerReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="customer-rentals"
            element={
              <ProtectedRoute>
                <CustomerRentalReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="customer-active-count"
            element={
              <ProtectedRoute>
                <CustomerActiveCountReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="customer-email-count"
            element={
              <ProtectedRoute>
                <CustomerEmailCountReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="store"
            element={
              <ProtectedRoute>
                <StoreReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="investor-advisor"
            element={
              <ProtectedRoute>
                <InvestorAdvisorReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="actor-award"
            element={
              <ProtectedRoute>
                <ActorAwardReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="payment-average"
            element={
              <ProtectedRoute>
                <PaymentAverageReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="replacement-cost"
            element={
              <ProtectedRoute>
                <ReplacementCostReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="replacement-cost-category"
            element={
              <ProtectedRoute>
                <ReplacementCostCategoryReport />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/geo"
          element={
            <ProtectedRoute>
              <GeoNav />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Country />
              </ProtectedRoute>
            }
          />
          <Route
            path="country/:countryId"
            element={
              <ProtectedRoute>
                <CountryView />
              </ProtectedRoute>
            }
          />
          <Route
            path="city"
            element={
              <ProtectedRoute>
                <City />
              </ProtectedRoute>
            }
          />
          <Route
            path="city/:cityId"
            element={
              <ProtectedRoute>
                <CityView />
              </ProtectedRoute>
            }
          />

          <Route
            path="address"
            element={
              <ProtectedRoute>
                <Address />
              </ProtectedRoute>
            }
          />

          <Route
            path="address/:addressId"
            element={
              <ProtectedRoute>
                <AddressView />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/actor"
          element={
            <ProtectedRoute>
              <ActorNav />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Actor />
              </ProtectedRoute>
            }
          />

          <Route
            path="award"
            element={
              <ProtectedRoute>
                <ActorAward />
              </ProtectedRoute>
            }
          />

          <Route
            path=":actorId"
            element={
              <ProtectedRoute>
                <ActorView />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/film"
          element={
            <ProtectedRoute>
              <FilmNav />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Film />
              </ProtectedRoute>
            }
          />

          <Route
            path="actor"
            element={
              <ProtectedRoute>
                <FilmActor />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute>
                <FilmCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path=":filmId"
            element={
              <ProtectedRoute>
                <FilmView />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/advisor"
          element={
            <ProtectedRoute>
              <Advisor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/:advisorId"
          element={
            <ProtectedRoute>
              <AdvisorView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/investor"
          element={
            <ProtectedRoute>
              <Investor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investor/:investorId"
          element={
            <ProtectedRoute>
              <InvestorView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <ProtectedRoute>
              <CategoryView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/language"
          element={
            <ProtectedRoute>
              <Language />
            </ProtectedRoute>
          }
        />
        <Route
          path="/language/:languageId"
          element={
            <ProtectedRoute>
              <LanguageView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/:inventoryId"
          element={
            <ProtectedRoute>
              <InventoryView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rental"
          element={
            <ProtectedRoute>
              <Rental />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/:customerId"
          element={
            <ProtectedRoute>
              <CustomerView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/:staffId"
          element={
            <ProtectedRoute>
              <StaffView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <div>
              <h1>Page not found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
