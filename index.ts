
const path = "./package.json";
const file = Bun.file(path);

await file.exists(); // boolean;
console.log(await file.exists())

const ret: any[] = [];
Bun.serve({
  async fetch(req: Request) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
            return new Response(Bun.file("./public/index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }
    if (url.pathname === "/video") {
      return new Response(Bun.file("./alprVideo.mp4"));
    }
    if (url.pathname === "/alpr" && req.method === "POST") {
      const reqBody = await req.json();
      const data = reqBody.results[0].plate;
      ret.push(data);
      console.log(ret);
      return new Response(ret);
    }
    if (url.pathname === "/plates"){
      return new Response(ret);
    }
    return new Response("404!");
  },
  port: 5000,
});
