import { Instruction } from "@orca-so/common-sdk";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { LockSpl } from "../artifacts/lock-spl";

export type ChangeDestinationParams = {
    accounts: {
        authority: PublicKey;
        vaultAccount: PublicKey;
    };
    inputs: {
        newDestination: PublicKey;
    };
};

export async function changeDestination(
    program: Program<LockSpl>,
    params: ChangeDestinationParams
): Promise<Instruction> {
    const { accounts, inputs } = params;

    const ix = await program.methods.changeDestination(
        inputs.newDestination,
    )
        .accounts({
            ...accounts,
            systemProgram: SystemProgram.programId
        }).instruction();

    return {
        instructions: [ix],
        cleanupInstructions: [],
        signers: [],
    };
}
