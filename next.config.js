
module.exports={
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/LogIn",
        destination: "/",
        parmanent: true,
      }
    ]

  }
}
