// This is a serverless function for Vercel deployment

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
    const { organizationName, password } = req.body;
    
    if (!organizationName || !password) {
      return res.status(400).json({ error: 'Organization name and password are required' });
    }

    // Check if organization name already exists
    const existingOrg = organizations.find(org => org.organizationName === organizationName);
    if (existingOrg) {
      return res.status(409).json({ error: 'Organization name already exists' });
    }

    const newOrg = {
      id: Date.now().toString(),
      organizationName,
      password,
      createdAt: new Date().toISOString()
    };
    organizations.push(newOrg);
    res.status(201).json({ success: true, id: newOrg.id });
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
