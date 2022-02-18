# Derive
A simple tool to make Solana Wallet UX better. This tool allows you to derive a new Secret Key from a web wallet.
The web wallet signs a message with its Secret Key and uses that as the "initialization vector/seed" for a new Solana Keypair.

As long as the signed message stays the same, the new Secret Key will be the same.

```ts
// this snippet assumes you are using the WalletAdapter
const MESSAGE = "Your Application/Function Specific Seed";

const newKeypair: Keypair = deriveKeypair(MESSAGE, wallet.adapter, {
    separateDomain: this, // Adds a domain/origin namespace to the message.
});
```

## Why
Many Wallet based UIs require many signatures to accomplish a single action, in Solana this is due to a few things:

1. Network Latency means a new blockhash sometimes needs to be fetched and the transaction re-signed.
2. You need the result of a previous transaction in order to sign the next transaction.
3. A library/sdk you are using is not constructed to allow many instructions in one transaction.

### Caveats
Your application's use of this package will vary depending on your application's use case. 
For example, if your contract takes the current signer as the authority on some on chain contract or object you must have an ownership transfer functionality so that when the Derived Signer is no longer needed you can transfer Authority to the public key fo the current wallet.
