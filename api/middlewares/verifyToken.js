import jwt from "jsonwebtoken";

export const verifyCustomerToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Customer is not authorized" });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.customer = decoded;
    next();
  });
};

export const verifySellerToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Seller is not authorized" });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.customer = decoded;
    next();
  });
};

// export const verifyCustomerToken = (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     if (!token) {
//       res.status(401);
//       throw new Error("Customer is not authorized or token is missing");
//     }
//   }
//   jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
//     if (err) {
//       res.status(401);
//       throw new Error("Customer is not authorized");
//     }
//     req.user = decoded.user;
//     next();
//   });
// };

// export const verifySellerToken = (req, res, next) => {
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   if (authHeader && authHeader.startsWith("Bearer")) {
//     token = authHeader.split(" ")[1];
//     if (!token) {
//       res.status(401);
//       throw new Error("Seller is not authorized or token is missing");
//     }
//   }
//   jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
//     if (err) {
//       res.status(401);
//       throw new Error("Seller is not authorized");
//     }
//     req.user = decoded.user;
//     next();
//   });
// };
