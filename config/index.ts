interface IConfig {
    mongoURL: string;
    JWTSecret: string;
}

const config: IConfig = {
    mongoURL: "mongodb+srv://markfix:reEIXEY851X5VZqK@cluster0.v1o0o.gcp.mongodb.net/kotlinlocation",
    JWTSecret: "secret token"
}

export default config;