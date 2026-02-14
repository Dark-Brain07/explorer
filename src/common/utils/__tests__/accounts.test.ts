import { hasTokenBalance, hasStxBalance, getStackingStartBlockHeight } from '../accounts';
import {
    AddressBalanceResponse,
    ContractCallTransaction,
    Transaction,
} from '@stacks/stacks-blockchain-api-types';

describe('hasTokenBalance', () => {
    it('returns false when balances is undefined', () => {
        expect(hasTokenBalance(undefined)).toBe(false);
    });

    it('returns false when there are no tokens', () => {
        const balances = {
            fungible_tokens: {},
            non_fungible_tokens: {},
        } as unknown as AddressBalanceResponse;
        expect(hasTokenBalance(balances)).toBe(false);
    });

    it('returns true when there are fungible tokens with a positive balance', () => {
        const balances = {
            fungible_tokens: {
                'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-token::newyorkcitycoin': {
                    balance: '1000',
                    total_sent: '0',
                    total_received: '1000',
                },
            },
            non_fungible_tokens: {},
        } as unknown as AddressBalanceResponse;
        expect(hasTokenBalance(balances)).toBe(true);
    });

    it('returns true when there are non-fungible tokens', () => {
        const balances = {
            fungible_tokens: {},
            non_fungible_tokens: {
                'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.some-nft::nft': {
                    count: '1',
                    total_sent: '0',
                    total_received: '1',
                },
            },
        } as unknown as AddressBalanceResponse;
        expect(hasTokenBalance(balances)).toBe(true);
    });

    it('returns false when fungible token balance is zero', () => {
        const balances = {
            fungible_tokens: {
                'SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.token::ft': {
                    balance: '0',
                    total_sent: '0',
                    total_received: '0',
                },
            },
            non_fungible_tokens: {},
        } as unknown as AddressBalanceResponse;
        expect(hasTokenBalance(balances)).toBe(false);
    });
});

describe('hasStxBalance', () => {
    it('returns false when balances is undefined', () => {
        expect(hasStxBalance(undefined)).toBe(false);
    });

    it('returns false when all STX values are zero', () => {
        const balances = {
            stx: {
                balance: '0',
                total_sent: '0',
                total_received: '0',
                total_fees_sent: '0',
                total_miner_rewards_received: '0',
            },
        } as unknown as AddressBalanceResponse;
        expect(hasStxBalance(balances)).toBe(false);
    });

    it('returns true when balance is positive', () => {
        const balances = {
            stx: {
                balance: '1000000',
                total_sent: '0',
                total_received: '0',
                total_fees_sent: '0',
                total_miner_rewards_received: '0',
            },
        } as unknown as AddressBalanceResponse;
        expect(hasStxBalance(balances)).toBe(true);
    });

    it('returns true when total_received is positive', () => {
        const balances = {
            stx: {
                balance: '0',
                total_sent: '0',
                total_received: '500000',
                total_fees_sent: '0',
                total_miner_rewards_received: '0',
            },
        } as unknown as AddressBalanceResponse;
        expect(hasStxBalance(balances)).toBe(true);
    });

    it('returns true when total_miner_rewards_received is positive', () => {
        const balances = {
            stx: {
                balance: '0',
                total_sent: '0',
                total_received: '0',
                total_fees_sent: '0',
                total_miner_rewards_received: '250000',
            },
        } as unknown as AddressBalanceResponse;
        expect(hasStxBalance(balances)).toBe(true);
    });

    it('returns false when stx property is missing', () => {
        const balances = {} as unknown as AddressBalanceResponse;
        expect(hasStxBalance(balances)).toBe(false);
    });
});

describe('getStackingStartBlockHeight', () => {
    it('returns undefined when transactions is undefined', () => {
        expect(getStackingStartBlockHeight(undefined)).toBeUndefined();
    });

    it('returns undefined when transactions is empty', () => {
        expect(getStackingStartBlockHeight([])).toBeUndefined();
    });

    it('returns the start burn height from a successful stack-stx transaction', () => {
        const transactions = [
            {
                tx_type: 'contract_call',
                tx_status: 'success',
                contract_call: {
                    function_name: 'stack-stx',
                    function_args: [
                        { name: 'amount-ustx', repr: 'u1000000' },
                        { name: 'start-burn-ht', repr: 'u50000' },
                    ],
                },
            },
        ] as unknown as Transaction[];

        expect(getStackingStartBlockHeight(transactions)).toBe('50000');
    });

    it('returns undefined when there are no stack-stx transactions', () => {
        const transactions = [
            {
                tx_type: 'contract_call',
                tx_status: 'success',
                contract_call: {
                    function_name: 'transfer',
                    function_args: [],
                },
            },
        ] as unknown as Transaction[];

        expect(getStackingStartBlockHeight(transactions)).toBeUndefined();
    });

    it('ignores failed stack-stx transactions', () => {
        const transactions = [
            {
                tx_type: 'contract_call',
                tx_status: 'abort_by_response',
                contract_call: {
                    function_name: 'stack-stx',
                    function_args: [
                        { name: 'start-burn-ht', repr: 'u50000' },
                    ],
                },
            },
        ] as unknown as Transaction[];

        expect(getStackingStartBlockHeight(transactions)).toBeUndefined();
    });
});
