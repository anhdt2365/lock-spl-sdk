export declare type LockSpl = {
    "version": "0.1.0";
    "name": "lock_spl";
    "instructions": [
        {
            "name": "lock";
            "accounts": [
                {
                    "name": "authority";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "authorityTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "vaultAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "vaultTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "mint";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "rent";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "clock";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "index";
                    "type": "u8";
                },
                {
                    "name": "destination";
                    "type": "publicKey";
                },
                {
                    "name": "amount";
                    "type": "u64";
                },
                {
                    "name": "releaseTimestamp";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "changeDestination";
            "accounts": [
                {
                    "name": "authority";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "vaultAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [
                {
                    "name": "newDestination";
                    "type": "publicKey";
                }
            ];
        },
        {
            "name": "unlock";
            "accounts": [
                {
                    "name": "authority";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "destinationTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "vaultAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "vaultTokenAccount";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "tokenProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "clock";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        }
    ];
    "accounts": [
        {
            "name": "vault";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "tokenBump";
                        "type": "u8";
                    },
                    {
                        "name": "index";
                        "type": "u8";
                    },
                    {
                        "name": "destination";
                        "type": "publicKey";
                    },
                    {
                        "name": "mint";
                        "type": "publicKey";
                    },
                    {
                        "name": "amount";
                        "type": "u64";
                    },
                    {
                        "name": "releaseTimestamp";
                        "type": "u64";
                    },
                    {
                        "name": "claimed";
                        "type": "bool";
                    }
                ];
            };
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "AlreadyClaimed";
            "msg": "Already claimed";
        },
        {
            "code": 6001;
            "name": "CannotLockZero";
            "msg": "Cannot lock 0";
        },
        {
            "code": 6002;
            "name": "CannotUnlockSoon";
            "msg": "Cannot unlock before release time";
        },
        {
            "code": 6003;
            "name": "OnlyDestination";
            "msg": "Only destination can change themselves";
        },
        {
            "code": 6004;
            "name": "InvalidDestinationTokenAccount";
            "msg": "Invalid destination token account";
        },
        {
            "code": 6005;
            "name": "InsufficientBalance";
            "msg": "Insufficient balance";
        }
    ];
};
export declare const IDL: LockSpl;
