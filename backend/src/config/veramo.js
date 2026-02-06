// Veramo agent configuration
const { createAgent } = require('@veramo/core');
const { DIDManager } = require('@veramo/did-manager');
const { KeyManager } = require('@veramo/key-manager');
const { DIDResolverPlugin } = require('@veramo/did-resolver');
const { CredentialPlugin } = require('@veramo/credential-w3c');
const { KeyManagementSystem, SecretBox } = require('@veramo/kms-local');
const { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } = require('@veramo/data-store');
const { DataSource } = require('typeorm');

// Database setup for Veramo
const dbConnection = new DataSource({
    type: 'sqlite',
    database: './veramo-database.sqlite',
    synchronize: false,
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
});

let agent;

const initVeramo = async () => {
    try {
        await dbConnection.initialize();

        agent = createAgent({
            plugins: [
                new KeyManager({
                    store: new KeyStore(dbConnection),
                    kms: {
                        local: new KeyManagementSystem(
                            new PrivateKeyStore(dbConnection, new SecretBox('your-secret-key-32-characters-long'))
                        ),
                    },
                }),
                new DIDManager({
                    store: new DIDStore(dbConnection),
                    defaultProvider: 'did:ethr',
                    providers: {
                        // Add DID providers here
                    },
                }),
                new DIDResolverPlugin({
                    // Add resolvers here
                }),
                new CredentialPlugin(),
            ],
        });

        console.log('✅ Veramo agent initialized');
        return agent;
    } catch (error) {
        console.error('❌ Veramo initialization error:', error);
        throw error;
    }
};

const getAgent = () => agent;

module.exports = {
    initVeramo,
    getAgent,
};
