import { PublicKey } from "@solana/web3.js";
export declare const VAULT_SEED = "vault";
export declare const VAULT_TOKEN_SEED = "vault_token";
export interface PDAInfo {
    key: PublicKey;
    bump: number;
}
export declare class PDA {
    readonly programId: PublicKey;
    constructor(programId: PublicKey);
    vault: (mint: PublicKey, index: anchor.BN) => PDAInfo;
}
