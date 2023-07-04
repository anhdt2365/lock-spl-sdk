# lock-spl-sdk

## How to use

### 1. Lock
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, LockSplClient, LOCK_KYC_PROGRAM_ID_TESTNET } from "@renec-foundation/lock-spl-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(LOCK_KYC_PROGRAM_ID_TESTNET));

const lockSplClient = await LockSplClient.getClient(ctx);

const mint = new PublicKey("mint-address");
// BE manage the vaultIndex for each user with a particular Mint
const vaultIndex = 1;
const lockAmount = 100 * LAMPORTS_PER_SOL;
// GMT Tuesday, July 4, 2023 3:00:13 PM
const timestamp = "1688482813"

const tx = await lockSplClient.lock(
    wallet.publicKey,
    mint,
    vaultIndex,
    lockAmount.toString();
    timestamp
);

const txSignature = await tx.buildAndExecute();

const vaultDataGetByUser = await lockSplClient.getVaultByUserIndex(wallet.publicKey, mint, vaultIndex);
console.log("vaultDataGetByUser", vaultDataGetByUser);
```

+ Output
```
vaultDataGetByUser: {
    bump: 255,
    tokenBump: 255,
    index: 1,
    destination: PublicKey [PublicKey(EPitmoo9Q8SEJmxneECDbbUvidkCvx3Y28dDS6fmMMog)] {
        _bn: <BN: c6fa1374119338ace09fffba0660c6dbd813dd37cf70d12aa3689a014b547ec3>
    },
    mint: PublicKey [PublicKey(3h7cRsBqpVrdAs17wSqwAATBTZF3iGL3rBDcDWSxkoMP)] {
        _bn: <BN: 27fe14c407762aefde4e9227c639073f34530ae60c64a48b4214d283321a2f1e>
    },
    amount: <BN: 174876e800>,
    releaseTimestamp: <BN: 64a4349b>,
    claimed: false
}
```


### 2. Change Destination
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, LockSplClient, LOCK_KYC_PROGRAM_ID_TESTNET } from "@renec-foundation/lock-spl-sdk";


...

// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(LOCK_KYC_PROGRAM_ID_TESTNET));

const lockSplClient = await LockSplClient.getClient(ctx);
const tx = await lockSplClient.changeDestination(
        mint,
        vaultIndex,
        newUser.publicKey,
    );

const txSignature = await tx.buildAndExecute();
```


### 3. Unlock
```javascript
import {
  PublicKey,
  Connection,
  Keypair,
  Commitment,
} from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { Context, LockSplClient, LOCK_KYC_PROGRAM_ID_TESTNET } from "@renec-foundation/lock-spl-sdk";


...


// yourKey = Keypair.fromSecretKey(Uint8Array.from([124, 149, 222, 31, 236, 142, 29, 95...]));

const commitment: Commitment = "confirmed";
const connection = new Connection(const.RPC_ENDPOINT_URL, { commitment });
const wallet = new Wallet(yourKey);
const provider = new AnchorProvider(connection, wallet, { commitment });

const ctx = Context.withProvider(provider, new PublicKey(LOCK_KYC_PROGRAM_ID_TESTNET));

const lockSplClient = await LockSplClient.getClient(ctx);

const userPublicKey = new PublicKey("user-public-key-need-to-unlock");
const tx = await lockSplClient.unlock(
        userPublicKey
        mint,
        vaultIndex,
    );

const txSignature = await tx.buildAndExecute();
```