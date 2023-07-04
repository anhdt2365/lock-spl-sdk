import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { BN, Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";
import { TOKEN_PROGRAM_ID } from "spl-token";

export type LockParams = {
    accounts: {
        authority: PublicKey;
        authorityTokenAccount: PublicKey;
        vaultAccount: PublicKey;
        vaultTokenAccount: PublicKey;
        mint: PublicKey;
    };
    inputs: {
        index: number;
        destination: PublicKey;
        amount: string;
        releaseTimestamp: string;
    };
};

export async function lock(
    program: Program<LockSpl>,
    params: LockParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.lock(
        inputs.index,
        inputs.destination,
        new BN(inputs.amount),
        new BN(inputs.releaseTimestamp),
    )
        .accounts({
            ...accounts,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
            clock: SYSVAR_CLOCK_PUBKEY,
        }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
