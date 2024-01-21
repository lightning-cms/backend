import {api} from "@/index";

api.get("/", (c) => {
  return c.json({
    msg: "API Route"
  })
});

// GET /v1/ - { "msg": "API Route" }