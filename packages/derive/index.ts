import {Adapter} from "@solana/wallet-adapter-base";
import {Keypair} from "@solana/web3.js";
import {Buffer}from "buffer";
import {sha3_512} from "js-sha3";
/**
 * Creates a new Keypair from a signed message created by the current web wallet
 *
 * @remarks
 * If you as the application developer are not disciplined with the message parameter, then the derived wallet can be lost forever.
 *
 * @param message - This is the plaintext seed that is signed by the current web wallet.
 * @param walletAdapter - This is the current web wallet that can sign the message without exposing the keypair.
 * @param opts - Options and tweaks to the input for application specific behavior.
 * @returns Keypair
 *
 * @beta
 */
export async function deriveSigner(message: string, walletAdapter: Adapter, opts: DerivedSignerOpts): Promise<Keypair> {
    // @ts-ignore
    const signature = await walletAdapter.signMessage(
        Buffer.from(message),
    );
    const hash = sha3_512.arrayBuffer(signature);
    const digest = Buffer.from(hash.slice(0, 32));

    return Keypair.fromSeed(digest);
}

/**
 * Options for creating a new Derived Keypair
 */
type DerivedSignerOpts = {
    /**
     * Adds a random seed to the message to prevent reuse. Only use this if you know what you are doing.
     */
    ephemeral?: boolean;
    /**
     * Adds the current web origin to the message to prevent accidental environment confusion.
     */
    separateDomain?: string;
}
