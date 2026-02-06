// Demo data for offline/demo mode

export const DEMO_DID = 'did:ethr:0x1234567890123456789012345678901234567890'
export const DEMO_SEED_PHRASE = 'abandon ability able about above absent absorb abstract absurd abuse access accident'

export const DEMO_CREDENTIALS = [
  {
    id: 'cred-demo-1',
    credentialId: 'cred-demo-1',
    type: ['VerifiableCredential', 'EducationalCredential'],
    issuer: {
      id: 'did:ethr:0x9876543210987654321098765432109876543210',
    },
    credentialSubject: {
      id: DEMO_DID,
      name: 'John Doe',
      degree: 'Bachelor of Science',
      institution: 'IIT Gandhinagar',
      date: '2024-01-15',
    },
    issuanceDate: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    id: 'cred-demo-2',
    credentialId: 'cred-demo-2',
    type: ['VerifiableCredential', 'ProfessionalCredential'],
    issuer: {
      id: 'did:ethr:0x9876543210987654321098765432109876543210',
    },
    credentialSubject: {
      id: DEMO_DID,
      name: 'John Doe',
      title: 'Software Engineer',
      company: 'Tech Corp',
      date: '2024-06-01',
    },
    issuanceDate: '2024-06-01T10:00:00Z',
    status: 'active',
  },
]

export const isDemoMode = () => {
  return localStorage.getItem('identix_demo_mode') === 'true'
}

export const enableDemoMode = () => {
  localStorage.setItem('identix_demo_mode', 'true')
  localStorage.setItem('identix_did', DEMO_DID)
  localStorage.setItem('identix_seed_phrase', DEMO_SEED_PHRASE)
}

export const disableDemoMode = () => {
  localStorage.removeItem('identix_demo_mode')
}
