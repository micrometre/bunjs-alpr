Bun.serve({
  async fetch(req: Request) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Home page!");
    }
    if (url.pathname === "/video") {
      return new Response(Bun.file("./alprVideo.mp4"));
    }
    if (url.pathname === "/alpr" && req.method === "POST") {
      const reqBody = await req.json();
      const ret = [];
      const data = reqBody.results[0].plate;
      console.log(data);
      return new Response("Home page!");
    }
    return new Response("404!");
  },
  port: 5000,
});
