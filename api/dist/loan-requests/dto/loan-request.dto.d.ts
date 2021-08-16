declare type LoanRequestDto = {
    id: string;
    creationTime: string;
    amount: number;
    approved: number;
    assets: number;
    borrower: string;
    creditScore: number;
    debt: number;
    decisionDate: string;
    requestDate: string;
    type: 'car' | 'house' | 'general';
    status: 'open' | 'solved';
    isFirst: boolean;
    sortValues: [string, string];
};
export type { LoanRequestDto };
