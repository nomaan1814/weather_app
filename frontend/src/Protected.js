import { Navigate } from "react-router-dom";
const Protected = ({ userInfo, children }) => {
 if (userInfo==null) {
 return <Navigate to="/login" />;
 }
 return children;
};
export default Protected;