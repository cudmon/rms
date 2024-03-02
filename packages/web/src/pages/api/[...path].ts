import Cookies from "cookies";
import httpProxy from "http-proxy";

const API_URL = process.env.API_URL;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: any, res: any) => {
  return new Promise((resolve, reject) => {
    const cookies = new Cookies(req, res);

    const needIntercept = (() => {
      const pathname = new URL(req.url, BASE_URL).pathname;

      console.log(pathname);

      return (
        pathname === "/api/auth/login" || pathname === "/api/auth/table-login"
      );
    })();

    req.url = req.url.replace(/^\/api/, "");

    req.headers.cookie = "";

    const token = cookies.get("token");

    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }

    proxy.once("error", reject);

    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: needIntercept,
    });

    if (needIntercept) {
      console.log("Hell yeah");
      proxy.once("proxyRes", (proxyRes: any, req: any, res: any) => {
        let body = "";

        proxyRes.on("data", (chunk: any) => {
          body += chunk;
        });

        proxyRes.on("end", () => {
          try {
            const data = JSON.parse(body);

            if (data.token) {
              const cookies = new Cookies(req, res);

              cookies.set("auth-token", data.token, {
                httpOnly: true,
                sameSite: "lax",
              });

              return res.status(200).json({ loggedIn: true });
            }

            return res.status(401).json({ loggedIn: false });
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  });
};

export default handler;