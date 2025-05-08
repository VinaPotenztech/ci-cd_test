import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import pkg from 'postman-collection';
const { Collection, Item, Request, Header, Script } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000'; // Change this to your API base URL
const BASE_PREFIX = '/ats/api'; // Prefix used when mounting routers

// Extract method and path from router files
const extractRoutesFromFile = async (filePath) => {
  const code = await fs.readFile(filePath, 'utf-8');
  const regex = /router\.(get|post|put|delete|patch)\(['"`](.*?)['"`]/g;

  const routes = [];
  let match;
  while ((match = regex.exec(code)) !== null) {
    routes.push({ method: match[1].toUpperCase(), path: match[2] });
  }

  console.log(`📦 Extracted routes from ${filePath}:`, routes);
  return routes;
};

// Generate Postman collection with API key test
const generatePostmanCollection = (routes) => {
  const collection = new Collection({
    info: { name: 'API Key Validation Tests' },
  });

  routes.forEach(({ method, path: routePath }) => {
    const fullPath = `${BASE_URL}${BASE_PREFIX}${routePath}`;

    const request = new Request({
      url: fullPath,
      method,
      header: [
        new Header({
          key: 'x-api-key',
          value: 'VALID_API_KEY',
          description: 'Your API Key',
        }),
      ],
    });

    const testScript = `
      pm.test("Should not return 401 Unauthorized", function () {
        pm.response.to.not.have.status(401);
      });
    `;

    const item = new Item({
      name: `${method} ${BASE_PREFIX}${routePath}`,
      request,
      event: [{ listen: 'test', script: new Script({ exec: testScript }) }],
    });

    collection.items.add(item);
  });

  return collection;
};

// Main function to generate the Postman collection
const main = async () => {
  console.log('📂 Current dir (__dirname):', __dirname);

  // Match all route files under the 'routes' directory
  const routeFiles = await glob(path.join(__dirname, 'routes/**/*.js'));
  console.log('🔍 Matched route files:', routeFiles);

  // If no route files are found, warn and exit
  if (!routeFiles.length) {
    console.warn('⚠️ No route files found.');
    return;
  }

  // Extract routes from all matched route files
  const allRoutes = [];
  for (const file of routeFiles) {
    const routes = await extractRoutesFromFile(file);
    allRoutes.push(...routes);
  }

  // Generate the Postman collection
  const collection = generatePostmanCollection(allRoutes);

  // Write the generated collection to a file
  await fs.writeFile(
    'postman-api-key-tests.json',
    JSON.stringify(collection.toJSON(), null, 2),
  );

  console.log('✅ Generated Postman collection: postman-api-key-tests.json');
};

// Execute the main function
main().catch(console.error);
