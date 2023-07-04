import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { BN, Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";
import { TOKEN_PROGRAM_ID } from "spl-token";

export type UnlockParams = {
    accounts: {
        authority: PublicKey;
        destinationTokenAccount: PublicKey;
        vaultAccount: PublicKey;
        vaultTokenAccount: PublicKey;
    };
    inputs: {};
};

export async function unlock(
    program: Program<LockSpl>,
    params: UnlockParams
): Promise<Instruction> {
    const { accounts, } = params;

    const ix = await program.methods.unlock()
        .accounts({
            ...accounts,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            clock: SYSVAR_CLOCK_PUBKEY,
        }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
