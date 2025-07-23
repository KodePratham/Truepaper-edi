import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'public', 'organizations.json')

export interface Organization {
  id: string
  organizationName: string
  password: string
  createdAt: string
}

export function readOrganizations(): Organization[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      return JSON.parse(data)
    }
    // Return default organizations if file doesn't exist
    return [
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
    ]
  } catch (error) {
    console.error('Error reading organizations:', error)
    return []
  }
}

export function writeOrganizations(organizations: Organization[]): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(organizations, null, 2))
  } catch (error) {
    console.error('Error writing organizations:', error)
    throw error
  }
}

export function findOrganization(organizationName: string, password?: string): Organization | undefined {
  const organizations = readOrganizations()
  if (password) {
    return organizations.find(org => 
      org.organizationName === organizationName && org.password === password
    )
  }
  return organizations.find(org => org.organizationName === organizationName)
}

export function addOrganization(organizationName: string, password: string): Organization {
  const organizations = readOrganizations()
  
  // Check if organization already exists
  if (findOrganization(organizationName)) {
    throw new Error('Organization name already exists')
  }

  const newOrganization: Organization = {
    id: Date.now().toString(),
    organizationName,
    password,
    createdAt: new Date().toISOString()
  }

  organizations.push(newOrganization)
  writeOrganizations(organizations)
  
  return newOrganization
}
