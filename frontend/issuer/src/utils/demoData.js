// Demo data for issuer app

export const DEMO_ISSUED_CREDENTIALS = [
  {
    id: 'cred-issued-1',
    credentialId: 'cred-issued-1',
    type: ['VerifiableCredential', 'EducationalCredential'],
    holder: 'did:ethr:0x1234567890123456789012345678901234567890',
    credentialSubject: {
      name: 'John Doe',
      degree: 'Bachelor of Science',
      institution: 'IIT Gandhinagar',
      date: '2024-01-15',
    },
    issuanceDate: '2024-01-15T10:00:00Z',
    status: 'active',
  },
  {
    id: 'cred-issued-2',
    credentialId: 'cred-issued-2',
    type: ['VerifiableCredential', 'ProfessionalCredential'],
    holder: 'did:ethr:0x1234567890123456789012345678901234567890',
    credentialSubject: {
      name: 'Jane Smith',
      title: 'Software Engineer',
      company: 'Tech Corp',
      date: '2024-06-01',
    },
    issuanceDate: '2024-06-01T10:00:00Z',
    status: 'active',
  },
]

export const DEMO_ISSUER_DID = 'did:ethr:0x9876543210987654321098765432109876543210'
export const DEMO_WALLET_ADDRESS = '0x9876543210987654321098765432109876543210'
