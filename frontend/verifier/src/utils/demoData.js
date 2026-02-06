// Demo data for verifier app

export const DEMO_VERIFICATION_RESULT = {
  verified: true,
  credential: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'EducationalCredential'],
    issuer: {
      id: 'did:ethr:0x9876543210987654321098765432109876543210',
    },
    credentialSubject: {
      id: 'did:ethr:0x1234567890123456789012345678901234567890',
      name: 'John Doe',
      degree: 'Bachelor of Science',
      institution: 'IIT Gandhinagar',
      date: '2024-01-15',
    },
    issuanceDate: '2024-01-15T10:00:00Z',
  },
  issuer: 'did:ethr:0x9876543210987654321098765432109876543210',
  issuanceDate: '2024-01-15T10:00:00Z',
  errors: [],
}

export const DEMO_CREDENTIAL_JSON = JSON.stringify(DEMO_VERIFICATION_RESULT.credential, null, 2)
