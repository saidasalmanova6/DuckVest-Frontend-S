import { Navigate, Route, Routes, useNavigate } from "react-router"
import axios from 'axios';
import Sidebar from "./components/Sidebar"
import Portfolio from "./pages/Portfolio"
import { useContext, useEffect, useState } from "react"
import Account from "./pages/Account"
import Watchlist from "./pages/Watchlist"
import Achievements from "./pages/Achievements"
import MainLayout from "./layout/MainLayout"
import AdminLayout from "./layout/AdminLayout"
import Register from "./pages/Register"
import Trade from "./pages/Trade"
import { Toaster } from "react-hot-toast";
import { DataContext } from "./DataContext/Context";
import Loader from "./components/Loader";
import Orders from "./pages/Orders";

function App() {
  let [inp1, setInp1] = useState()
  let [inp2, setInp2] = useState()
  let [error, setError] = useState(false)
  let {portfolio,setId,selectedStock,setSelectedStock,allStock,investor, setInvestor} = useContext(DataContext)

  const navigate = useNavigate();
  function sell(id) {
    setSelectedStock(allStock.find(item => item.stockID == id))
    navigate("/Trade")
  }
  function login() {
    if (!inp1 || !inp2) {
      setError(true)
      return
    }
    axios.post(`http://localhost:4040/investors/login-user=${inp1}&pwd=${inp2}`)
      .then(item => {
        const id = item.data
        if (item.data.statusCode != 404) {
          setId(item.data)
          localStorage['userId'] = item.data
          axios.get(`http://localhost:4040/investors/get-account-information-id=${item.data}`)
            .then(data => {
              setInvestor(data.data)
              navigate(`/Portfolio/${data.data.username}`)
            })
        }
      }).catch(() => setError(true))
  }
  if (!investor || !selectedStock || !portfolio) {
    console.log('gozle')
    return <Loader />
  }
  return (
    <>
      <Toaster position="top-right" reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: {
            font: '400 16px "Inter"',
            background: '#333',
            color: '#fff',
          },
          success: {
            icon: '✅',
          },
          error: {
            icon: '❌',
            style: {
              background: 'red',
            },
          },
        }} />
      <Routes>
        <Route path="/" element={<Navigate to={`/Login`} />} />
        <Route path="/" element={<MainLayout investor={investor} />} >
          <Route path="/Portfolio/:username" element={<Portfolio sell={sell} />} />
          <Route path="/Account/:username" element={<Account />} />
          <Route path="/Watchlist/:username" element={<Watchlist sell={sell} />} />
          <Route path="/Achievements" element={<Achievements />} />
          <Route path="/Trade" element={<Trade/>} />
          <Route path="/Orders" element={<Orders/>} />
        </Route>
        <Route path="/Login" element={<AdminLayout />} >
          <Route index element={<Register error={error} setInp1={setInp1} setInp2={setInp2} login={login} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
