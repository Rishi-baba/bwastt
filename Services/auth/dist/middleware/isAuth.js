import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please Login - No auth header"
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Please Login - Token missing"
            });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SEC);
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                message: "Invalid token"
            });
            return;
        }
        req.user = decodedValue.user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Please Login - Jwt error"
        });
    }
};
/*
Short Notes — Async & Promise<void> (TypeScript)

async function always returns a Promise automatically.

If it returns nothing → type becomes Promise<void>.

void means: no value is returned.

Examples:

async function a() {}
// → Promise<void>

async function b() {
  return "Hi"
}
// → Promise<string>


You do NOT have to write : Promise<void> every time. TypeScript can infer it.

It is written manually only for clarity in bigger projects.

In Express middleware:

export const isAuth = async (
  req, res, next
): Promise<void> => {
  next()
}


Used because middleware:

runs async

does not return data

just calls next() or sends response.
*/ 
