"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockSplClient = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const web3_js_1 = require("@solana/web3.js");
const __1 = require("..");
class LockSplClient {
    constructor(ctx, pda) {
        this.ctx = ctx;
        this.pda = pda;
    }
    static getClient(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(ctx.program.programId);
            return new LockSplClient(ctx, pda);
        });
    }
    lock(user, mint, index, amount, releaseTimestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = this.pda.vault(mint, index);
            // Get vault token account
            const [vaultTokenAccount,] = web3_js_1.PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode(__1.VAULT_TOKEN_SEED), vault.key.toBuffer()], this.ctx.program.programId);
            // Get user token account
            const userTokenAccount = yield this.ctx.connection.getTokenAccountsByOwner(user, {
                mint,
            });
            const tx = (yield this.ctx.methods.lock({
                accounts: {
                    authority: user,
                    authorityTokenAccount: userTokenAccount.value[0].pubkey,
                    vaultAccount: vault.key,
                    vaultTokenAccount,
                    mint,
                },
                inputs: {
                    index,
                    destination: user,
                    amount,
                    releaseTimestamp
                },
            })).toTx();
            return tx;
        });
    }
    changeDestination(mint, index, newDestination) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = this.pda.vault(mint, index);
            const tx = (yield this.ctx.methods.changeDestination({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    vaultAccount: vault.key,
                },
                inputs: {
                    newDestination
                },
            })).toTx();
            return tx;
        });
    }
    unlock(user, mint, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const vault = this.pda.vault(mint, index);
            // Get vault token account
            const vaultTokenAccount = yield this.ctx.connection.getTokenAccountsByOwner(vault.key, {
                mint,
            });
            // Get user token account
            const userTokenAccount = yield this.ctx.connection.getTokenAccountsByOwner(user, {
                mint,
            });
            const tx = (yield this.ctx.methods.unlock({
                accounts: {
                    authority: this.ctx.wallet.publicKey,
                    destinationTokenAccount: userTokenAccount.value[0].pubkey,
                    vaultAccount: vault.key,
                    vaultTokenAccount: vaultTokenAccount.value[0].pubkey,
                },
                inputs: {},
            })).toTx();
            return tx;
        });
    }
    getVaultByUserIndex(user, mint, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const pda = new __1.PDA(this.ctx.program.programId);
            const vault = pda.vault(mint, index);
            const vaultData = yield this.ctx.fetcher.getVault(vault.key, true);
            if (!vaultData) {
                throw new Error(`Vault of user ${user}. mint ${mint}, index ${index} not found`);
            }
            return vaultData;
        });
    }
    getOneVault(vault) {
        return __awaiter(this, void 0, void 0, function* () {
            const vaultData = yield this.ctx.fetcher.getVault(vault, true);
            if (!vaultData) {
                throw new Error(`Vault ${vault} not found`);
            }
            return vaultData;
        });
    }
}
exports.LockSplClient = LockSplClient;
