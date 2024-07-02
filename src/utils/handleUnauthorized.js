import cookieManager from "./cookieManager";
import { LOGIN, EMAIL_VERIFICATION  } from "../routes";

// Helper function to handle 401 and 403 responses
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    cookieManager("delete", "JWTToken");
    throw window.location.replace(LOGIN);
  }
  if (response.status === 403) {
    throw window.location.replace(EMAIL_VERIFICATION);
  }
  return response;
};

export default handleUnauthorized;
