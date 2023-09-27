import Wrapper from "../sections/Wrapper";
import { useAppSelector } from "../redux-store/hook";
import Login from "../components/Login";

function Mylist() {
  const userInfo = useAppSelector((state) => state.app.userInfo);
  
  return <div className="list">
    <Login />
  </div>;
}

export default Wrapper(Mylist);
