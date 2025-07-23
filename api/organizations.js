// This is a serverless function for Vercel/Netlify deployment
// For GitHub Pages, you'll need to use a different hosting solution

let organizations = [
  {
    "id": "1753243673939",
    "organizationName": "Test Org",
    "password": "123456",
    "createdAt": "2025-07-23T04:07:53.939Z"
  },
  {
    "id": "1753244560331",
    "organizationName": "Nayan",
    "password": "123456",
    "createdAt": "2025-07-23T04:22:40.331Z"
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    res.status(200).json(organizations);
  } else if (req.method === 'POST') {
    const newOrg = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    organizations.push(newOrg);
    res.status(201).json(newOrg);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const index = organizations.findIndex(org => org.id === id);
    if (index !== -1) {
      organizations[index] = { ...organizations[index], ...req.body };
      res.status(200).json(organizations[index]);
    } else {
      res.status(404).json({ error: 'Organization not found' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    organizations = organizations.filter(org => org.id !== id);
    res.status(200).json({ message: 'Organization deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
