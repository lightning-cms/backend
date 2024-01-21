import {Hono} from "hono";
import fs from "fs";
import colors from 'colors'

const app = new Hono();

const loadFiles = (dir: string) => {
  const files: {
    name: string;
    path: string;
  }[] = [];
  const find = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const file of find) {
    if (file.isDirectory()) loadFiles(`${dir}/${file.name}`);
    else
      files.push({
        name: file.name,
        path: `${dir}/${file.name}`,
      });
  }

  return files;
};

const routes = loadFiles(`${import.meta.dir}/routes`);

routes.map(async (route) => {
  await import(route.path);
  console.log(`${colors.blue('Loaded route:')} ${colors.white(route.path.split('/').slice(7).join("/").replace(/.ts/g, ""))}`)
});


const api = app.route("/v1");

export default {
  port: 3001,
  fetch: app.fetch,
};

export {api};
