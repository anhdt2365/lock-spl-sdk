import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TransactionBuilder } from "@orca-so/common-sdk";
import { Context, PDA } from "..";
import { VaultData } from "../types";
export declare class LockSplClient {
    ctx: Context;
    pda: PDA;
    constructor(ctx: Context, pda: PDA);
    static getClient(ctx: Context): Promise<LockSplClient>;
    lock(user: PublicKey, mint: PublicKey, index: string, amount: anchor.BN, releaseTimestamp: anchor.BN): Promise<TransactionBuilder>;
    changeDestination(mint: PublicKey, index: string, newDestination: PublicKey): Promise<TransactionBuilder>;
    unlock(user: PublicKey, mint: PublicKey, index: string): Promise<TransactionBuilder>;
    getVaultByUserIndex(user: PublicKey, mint: PublicKey, index: string): Promise<VaultData>;
    getOneVault(vault: PublicKey): Promise<VaultData>;
}
